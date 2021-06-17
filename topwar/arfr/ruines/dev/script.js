// Avoids relying on the global space, except the loading call that provides html-defined ids
let global = this;
global._load = function(loadInput,loadId,listId,buttonId,outputId,saveId,sortId,errorClass) {
  delete global._load;
  (function(){
    "use strict";
    let doc = global.document;
    
    const HOME = "ArFR";
    const TOP = ["~OX~","D_K."];
    const ALLIS = (function(){
        let output = [];
        let index = 0;
        for (let alli of [[HOME,"ArmeeFr"],[null,"OmegaX"],[null,"DeathKnights"],["SHxH","SFairyTail"],["DUTC","Dutch69"],["B4F","B4F"]]) {
          if (alli[0] == null) alli[0] = TOP[index++];
          output.push(alli);
        }
        return output;
      })();

    // UI view
    const twoCharStr = function(nbr) {
      return nbr.toString().padStart(2,"0");
    };
    const debugMatrix = function(matrix) {
      console.log("=====START=====");
      let index = 0;
      for (let arr of matrix) {
        let line = "";
        for (let item of arr) {
          if (item === undefined || item.length == 0) item = "--";
          else item = item[0].toString().padStart(2,"0");
          line+=item+",";
        }
        console.log(twoCharStr(++index)+") "+line.substring(0,line.length-1));
      }
      console.log("======END======");
    };

    class Observer {
      onUpdate(subject, valName, newValue, oldValue) {}
      onError(subject, valName, msg, newValue, oldValue) {}
    };
    class Subject {
      constructor() {
        this.observers = new Array();
        this.errors = new Map();
      }
      otherError(exclName) {
        console.log(this.errors);
        for (const [key,value] of this.errors)
          if (key !== exclName)
            return value;
        return null;
      }
      subscribe(obs) {
        if (!this.observers.includes(obs))
          this.observers.push(obs);
      }
      unsubscribe(obs) {
        this.onservers.remove(obs);
      }
      onUpdate(valName, newValue, oldValue) {
        this.onError(valName, null, newValue, oldValue);
        for (const obs of this.observers)
          obs.onUpdate(this, valName, newValue, oldValue);
      }
      onError(valName, msg, newValue, oldValue) {
        for (const obs of this.observers)
          obs.onError(this, valName, msg, newValue, oldValue);
        if (msg == null) this.errors.delete(valName);
        else this.errors.set(valName,msg);
      }
    };

    // Coords mapping

    const BASE = 2, ADJUST = 1;
    const SIDE = 15; 
    const getCycle = (x,y)=>{
      if (x < 0 || x > SIDE) return -1;
      if (y < 0 || y > SIDE) return -1;
      x = Math.min(x,SIDE-x);
      y = Math.min(y,SIDE-y);
      return Math.min(Math.floor(x/BASE),Math.floor(y/BASE));
    };

    const ruinMatrix = (function(){  
      class SafeMatrix {
        constructor(SIDE) {
          this.id = 0; // 0 is capital
          let m = new Array(SIDE);
          for (let i=0;i<SIDE;++i)
            m[i] = new Array(SIDE);
          this.matrix = m;
        }

        insertId(x,y,margin) {
          if (margin < 0) return false;
          if (x < margin || x+margin >= this.matrix.length) return false;
          let arr = this.matrix[x];
          if (y < margin || y+margin >= arr.length) return false;
          if (arr[y] !== undefined) return false;
          arr[y] = [ ++this.id, {} ];
          return true;
        }
      }
      const Directions = {UP:{name:"UP"},DOWN:{name:"DOWN"},LEFT:{name:"LEFT"},RIGHT:{name:"RIGHT"}};
      Directions.UP.next=Directions.RIGHT;
      Directions.UP.coords=(x,y,adjust)=>{return [x-adjust,y];};
      Directions.DOWN.next=Directions.LEFT;
      Directions.DOWN.coords=(x,y,adjust)=>{return [x+adjust,y];};
      Directions.LEFT.next=Directions.UP;
      Directions.LEFT.coords=(x,y,adjust)=>{return [x,y-adjust];};
      Directions.RIGHT.next=Directions.DOWN;
      Directions.RIGHT.coords=(x,y,adjust)=>{return [x,y+adjust];};

      const MIDDLE = ((SIDE+1)/2)-1;
      const inMiddle = function(pos) {
       return (pos >= MIDDLE-ADJUST && pos <= MIDDLE+ADJUST);
      }; 
      const adjustMiddle = function(pos, other) {
        if (!inMiddle(pos)) return pos;
        if (getCycle(pos,other)%2 === 0) return MIDDLE;
        return null;
      };
      let gen = new SafeMatrix(SIDE);
      const middleCorrect = function(x,y,direction) {
        x = adjustMiddle(x, y, direction);
        if (x === null) {
          x = direction.coords(MIDDLE,y,BASE+ADJUST)[0];
        }
        y = adjustMiddle(y, x, direction);
        if (y === null)
          y = direction.coords(x,MIDDLE,BASE+ADJUST)[1];
        return [x,y];
      };

      gen.matrix[MIDDLE][MIDDLE] = []; // Capital
      let x = 0, y = -BASE, direction = Directions.RIGHT;
      while (true) {
        let arr = direction.coords(x,y,BASE*2);
        let tempX = arr[0];
        let tempY = arr[1];

        let correct = middleCorrect(tempX,tempY,direction);
        tempX = correct[0];
        tempY = correct[1];

        let move = BASE;

        if (!gen.insertId(tempX,tempY,getCycle(tempX,tempY)*BASE)) {
          if (direction === Directions.UP) {
            direction = direction.next;
            arr = direction.coords(x,y,BASE*2);
          }
          else {
            arr = direction.coords(x,y,BASE);
            direction = direction.next;
            arr = direction.coords(arr[0],arr[1],BASE);
          }

          correct = middleCorrect(arr[0],arr[1],direction);
          tempX = correct[0];
          tempY = correct[1];
          if (!gen.insertId(tempX,tempY,getCycle(tempX,tempY)*BASE)) break;
        }

          if (tempX === MIDDLE || tempY === MIDDLE) {
            arr = direction.coords(tempX,tempY,ADJUST);
            tempX = arr[0];
            tempY = arr[1];
          }
          x = tempX;
          y = tempY;
      }
      return gen.matrix;
    })();
    debugMatrix(ruinMatrix);

    const RuinDifficulty = {
      LEVEL1:{
        title:"Ruines",
        cycle:1,
        rewards:{
          GOLD:{},
          ATK:{},
          COLL:{},
          WALK:{},
          PV:{},
          SHOT:{}
        }
      },
      LEVEL2:{
        title:"Ruines Antiques",
        cycle:2,
        rewards:{
          QUEST:{}
        }
      },
      LEVEL2BIS:{
        title:"Ruines Anciennes",
        cycle:2,
        rewards:{
          RELIC:{},
          UNIT:{},
          ITEM:{}
        }
      },
      LEVEL3:{
        title:"Ruines de l'Empereur",
        cycle:3,
        rewards:{
          GUARD:{},
          RES:{}
        }
      }
    };
    
    const calculateCoord = function(main,sec) {
      let result = (main+1)*32;
      const cycle = getCycle(main,sec);
      if (cycle === 3)
      return result;
    };    
    const calculateCoords = function(x,y) {
      let posX = calculateCoord(x,y);
      let posY = calculateCoord(y,x);
      return [posX, 2*posY];
    };
    class RuinData {
     constructor(id) {
        this.id = id;
        let i, j, data;
        for (i = 0; i < ruinMatrix.length; ++i) {
          let row = ruinMatrix[i];
          for (j = 0; j < row.length; ++j) {
            data = row[j] || [];
            console.log(data);
            console.log(data[0]);
            if (data.length > 0 && data[0] === id) break;
          }
        }
       
        if (data.length > 0) {
          this.x = calculateCoord(i);
          this.y = calculateCoord(j)*2;
          //this.reward = reward;
        }
      }
    };
    for (let _i = 0; _i <= 24; ++_i)
    {
      const debug = new RuinData(_i);
      console.log(debug.id+":"+debug.x+":"+debug.y);
    }

    let ruinIds = new Array();
    for (let i = 0; i < ruinMatrix.length; ++i) {
      const arr = ruinMatrix[i];
      for (let j = 0; j < arr.length; ++j) {
        const data = arr[j];
        if (data !== undefined && data.length !== 0)
          ruinIds.push(twoCharStr(data[0]));
      }
    }
    ruinIds = ruinIds.sort();

    /*
    let ruinCoords = function(id) {
      for (let i = 0; i < ruinMatrix.length; ++i) {
        let array = ruinMatrix[i];
        for (let j = 0; j < array.length; ++j) {
          let value = array[j];
          if (id === value) {
            let posX = i*2+1;
            if
          }
        }
      }
    };
    let calculateCoord = function(id, index) {
    };
    let calculateCoords = function(id, indexX, indexY) {
        let pox
    };
  */
    
    const createNumberField = function(getter, setter) {
      let field = doc.createElement("input");
      field.type = 'number';
      field.value = getter();
      field.addEventListener('input', event=>setter(parseInt(event.target.value)) );
      return field;
    };
    
    const addError = function(arr, err){
      if (err != null) arr.push(err);
    };
    class Diff extends Subject {
      constructor() {
        super();
        this.expiration = new Date();
        this.h = this.m = this.s = 0;
      }
      
      setHour(h) {
        if (h < 0) return this.onError("hour","Heure négative");
        this.h = h;
        return this.onUpdate("expirationHour");
      }
      setMin(m) {
        if (m < 0) return this.onError("min","Minutes négatives");
        if (m >= 60) return this.onError("min","Minutes trop élevées");
        this.m = m;
        return this.onUpdate("expirationMin");
      }
      setSec(s) {
        if (s < 0) return this.onError("sec","Secondes négatives");
        if (s >= 60) return this.onError("sec","Secondes trop élevées");
        this.s = s;
        return this.onUpdate("expirationSec");
      }

      getDate() {
        return this.expiration;
      }
      setDate(date) {
        this.expiration = date;
        let diff = this.expiration.getTime()-new Date().getTime();
        let s = Math.floor(diff/1000);
        this.s = Math.floor(s%60);
        let m = Math.floor(s/60);
        this.m = Math.floor(m%60);
        let h = Math.floor(m/60);
        this.h = Math.floor(h);
        return this.onUpdate("expiration");
      }

      serialize() {
        let time = this.getDate();
        return twoCharStr(time.getUTCFullYear())+twoCharStr(time.getUTCMonth()+1)+twoCharStr(time.getUTCDate())+twoCharStr(time.getUTCHours())+twoCharStr(time.getUTCMinutes());
      }
      unserialize(data) {
        let year = parseInt(data.substring(0,4));
        data = data.substring(4);
        let month = parseInt(data.substring(0,2));
        data = data.substring(2);
        let day = parseInt(data.substring(0,2));
        data = data.substring(2);
        let hour = parseInt(data.substring(0,2));
        data = data.substring(2);       
        let min = parseInt(data.substring(0,2));
        data = data.substring(2);
        
        this.setDate(new Date(Date.UTC(year, month-1, day, hour, min)));        
        return data;
      }
      createUI() {
        let ui = doc.createElement("span");
        let hourField, minField, secField;
        const updateDate = ()=>{
          this.setDate(new Date(new Date().getTime()+( ( (parseInt(hourField.value*60)) +parseInt(minField.value) )*60+parseInt(secField.value) )*1000) );
        };
        
        hourField = createNumberField(()=>this.h,value=>{updateDate(); this.setHour(value);});
        minField = createNumberField(()=>this.m,value=>{updateDate(); this.setMin(value);});
        secField = createNumberField(()=>this.s,value=>{updateDate(); this.setSec(value);});
        
        ui.appendChild(hourField);
        ui.appendChild(doc.createTextNode(":"));
        ui.appendChild(minField);
        ui.appendChild(doc.createTextNode(":"));
        ui.appendChild(secField);
        return ui;
      }
    };

    class Ruin extends Subject {
      constructor() {
        super();
        this.id = 0;
        this.spoil = new Diff();
        this.owner = "";
      }
      otherError(exclName) {
        let temp = this.spoil.otherError(exclName);
        if (temp != null) return temp;
        return super.otherError(exclName);
      }
      
      subscribe(obs) {
        this.spoil.subscribe(obs);
        super.subscribe(obs);
      }
      unsubscribe(obs) {
        this.spoil.unsubscribe(obs);
        super.unsubscribe(obs);
      }

      setId(id) {
        if (id < 0) return this.onError("id", "Id négatif");
        if (id > 99) return this.onError("id", "Id trop grand");
        this.id = id;
        return this.onUpdate("id");
      }
      setSpoil(spoil) {
        for (const obs of this.spoil.observers)
          spoil.subscribe(obs);
        this.spoil = spoil;
        return this.onUpdate("spoil");
      }
      setOwner(owner) {
        if (owner.length > 9) return this.onError("owner", "9 lettres max");
        if (TOP.includes(owner)) return this.onError("owner", "Alliance hors-limite!");
        this.owner = owner;
        return this.onUpdate("owner");
      }
      setCountdown(diff) {
        this.setSpoil(diff.getTime());
        return this.onUpdate("spoil");
      }

      serialize() {
        let pos = 0;
        for (let index = 0; index < ALLIS.length; ++index)
          if (ALLIS[index][0] === this.owner) {
            pos = index+1;
            break;
          }
        
        let own = (pos === 0) ? this.owner : "";
        return twoCharStr(this.id)+this.spoil.serialize()+pos+own.length+own;
      }
      unserialize(data) {
        this.setId(parseInt(data.substring(0,2)));
        data = data.substring(2);
        let spoil = new Diff();
        data = spoil.unserialize(data);
        this.setSpoil(spoil);
        
        let pos = parseInt(data.substring(0,1))-1;
        data = data.substring(1);
        let length = parseInt(data.substring(0,1));
        
        this.setOwner((0 <= pos && pos < ALLIS.length) ? ALLIS[pos][0] : data.substring(1,1+length));
        return data.substring(1+length);
      }
      createUI() {
        let ui = doc.createElement("div");
        
        const errorId = addInputSection(ui, (section,error)=>{
          section.appendChild(doc.createTextNode("Id: #"));
          let field = doc.createElement('select');
          for (const id of ruinIds) {
            let option = doc.createElement('option');
            option.textContent = option.value = id;
            field.appendChild(option);
          }
          
          field.value = this.id;
          field.addEventListener('input', event=>this.setId(parseInt(event.target.value)) );
          return field;
        });
        
        const errorSpoil = addInputSection(ui, ()=>this.spoil.createUI());
        
        const errorOwner = addInputSection(ui, (section,error)=>{
          section.appendChild(doc.createTextNode("Possédé par: "));
          let input = doc.createElement("select");
          
          const createOption = function(text, value) {
            let result = doc.createElement("option");
            result.text = text;
            result.value = value;
            return result;
          };
 
          const UNKNOWN = "";
          let special = createOption("Autre",UNKNOWN);
          let selected = special;
          for (const alli of ALLIS) {
            let newOption = createOption(alli[0],alli[0]);
            if (alli[0] === this.owner) selected = newOption;
            input.appendChild(newOption);              
          }
          input.appendChild(special);        
          selected.selected = 'selected';
          
          let textField = doc.createElement('input');
          textField.type = 'text';
          textField.value = '';
          textField.addEventListener('input', event=>this.setOwner(event.target.value));
          const DEF_STYLE = textField.style.display;
          
          const switchTextField = ()=>{       
            textField.style.display = (this.owner === UNKNOWN) ? DEF_STYLE : 'none';
          };
          switchTextField();
          
          input.addEventListener('change', event=>{
            const val = event.target.value;
            this.setOwner(val);
            switchTextField();
          });
          section.appendChild(input);
          
          return textField;
        });
        
        class ErrorObserver extends Observer {
            onError(ruin, valName, err, newValue, oldValue) {
              let section;
              if (valName === "id") section = errorId;
              else if (valName === "spoil") section = errorSpoil;
              else section = errorOwner;
              
              let errMsg = (err == null) ? ruin.otherError(valName) : err;
              section.innerHTML = (errMsg == null) ? "" : "Erreur : "+errMsg;
              if (err != null) updateOutput();
            }
        };
        this.subscribe(new ErrorObserver());
        
        return ui;
      }
    };
    
    const addInputSection = function(parent, callback) {
        let section = doc.createElement('div');
        let error = doc.createElement('span');
        error.classList.add(errorClass);
        section.appendChild(callback(section, error));
        section.appendChild(doc.createElement('br'));
        section.appendChild(error);
        parent.appendChild(section);
        return error;
    };
    
    let ruinList = new Array();
    const sortRuins = function() {
      return ruinList.sort((a,b)=>{
          const A = (a.owner === HOME), B = (b.owner === HOME);
          if (A !== B) return A ? -1 : 1;
          return a.spoil.getDate().getTime()-b.spoil.getDate().getTime();
        });
    };
    let inputList = doc.getElementById(listId);
    const clearList = function() {
      while (inputList.firstChild) inputList.removeChild(inputList.firstChild);
    };
    
    const updateOutput = function() {
      let backup = "", output = "";
      const NEW_LINE = '\r\n', NL_LEN = 2;
      for (const ruin of sortRuins()) {
        if (ruin.errors.size > 0) continue;
        backup += ruin.serialize();
        let spoilTime = ruin.spoil.getDate();
        output += NEW_LINE + "#"+ruin.id + NEW_LINE + "Le " + spoilTime.getDate() + " à " + twoCharStr(spoilTime.getHours()) + ":" + twoCharStr(spoilTime.getMinutes());
        
        let own = ruin.owner;
        if (own.length === 0) continue;
        for (const alli of ALLIS) {
          if (alli[0] !== own) continue;
          own = alli[1];
          break;
        }
        output += NEW_LINE + "Possédé par " + own;     
      }
      doc.getElementById(saveId).value = backup;
      doc.getElementById(outputId).value = output.substring(NL_LEN);
    };
    
    const addRuinView = function(ruin) {
      let newItem = doc.createElement('li');
      newItem.classList.add('list-group-item'); // Bootstrap
      newItem.appendChild(ruin.createUI());
        
      const deleteButton = doc.createElement("button");
      deleteButton.appendChild(doc.createTextNode("Supprimer"));
      deleteButton.classList.add("btn");
      deleteButton.classList.add("btn-danger");
      
      deleteButton.addEventListener('click', event=>{
        ruinList = ruinList.filter(item=>item!==ruin);
        newItem.remove();
        for (const obs of ruin.observers)
          ruin.unsubscribe(obs);
        updateOutput();
      });
      newItem.appendChild(deleteButton);
      
      inputList.appendChild(newItem);
    };
    
    class ChangeObserver extends Observer {
      onUpdate(ruin, valName, newValue, oldValue) {
        updateOutput();
      };
    }
    const changeObs = new ChangeObserver();
    updateOutput();
   
    doc.getElementById(buttonId).addEventListener('click', ()=>{
      let newItem = new Ruin();
      newItem.subscribe(changeObs);
      ruinList.push(newItem);
      addRuinView(newItem);
      updateOutput();
    });
    
    doc.getElementById(sortId).addEventListener('click', ()=>{
      ruinList = sortRuins();
      clearList();
      for (const ruin of ruinList) {
        addRuinView(ruin);
      }
      updateOutput();
    });
    
    doc.getElementById(loadId).addEventListener('click', ()=>{
      let val = doc.getElementById(loadInput).value;
      clearList();
      
      let loaded = new Array();
      while (val.length > 0) {
        let ruin = new Ruin();
        ruin.subscribe(changeObs);
        val = ruin.unserialize(val);
        loaded.push(ruin);
        addRuinView(ruin);
      }
      ruinList = loaded;
      updateOutput();
    });
    
  })();
}
