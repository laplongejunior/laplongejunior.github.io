// Avoids relying on the global space, except the loading call that provides html-defined ids
let global = this;
global._load = function(loadInput,loadId,listId,buttonId,outputId,saveId,sortId,errorClass) {
  delete global._load;
  (function(){
    "use strict";
    let doc = global.document;

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
      }
      subscribe(obs) {
        if (!this.observers.includes(obs))
          this.observers.push(obs);
      }
      unsubscribe(obs) {
        this.onservers.remove(obs);
      }
      onUpdate(valName, newValue, oldValue) {
        for (const obs of this.observers) {
          obs.onUpdate(this, valName, newValue, oldValue);
          obs.onError(this, valName, null, newValue, oldValue);
        }
      }
      onError(valName, msg, newValue, oldValue) {
        for (const obs of this.observers)
          obs.onError(this, valName, msg, newValue, oldValue);
      }
    };

    // Coords mapping

    const BASE = 2, ADJUST = 1;
    const SIDE = 15; 
    const getCycle = function(x,y) {
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
      Directions.UP.coords=function(x,y,adjust){return [x-adjust,y];};
      Directions.DOWN.next=Directions.LEFT;
      Directions.DOWN.coords=function(x,y,adjust){return [x+adjust,y];};
      Directions.LEFT.next=Directions.UP;
      Directions.LEFT.coords=function(x,y,adjust){return [x,y-adjust];};
      Directions.RIGHT.next=Directions.DOWN;
      Directions.RIGHT.coords=function(x,y,adjust){return [x,y+adjust];};

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
    class RuinData {
     constructor(id, x, y, reward) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.reward = reward;
      }
    };

    let ruinIds = new Array();
    for (let i = 0; i < ruinMatrix.length; ++i) {
      const arr = ruinMatrix[i];
      for (let j = 0; j < arr.length; ++j) {
        const data = arr[j];
        if (data === undefined || data.length === 0) continue;
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
        let self = this;
        const updateDate = function() {
          self.setDate(new Date(new Date().getTime()+( ( (parseInt(hourField.value*60)) +parseInt(minField.value) )*60+parseInt(secField.value) )*1000) );
        };
        
        hourField = createNumberField(()=>this.h,(value)=>{updateDate(); this.setHour(value);});
        minField = createNumberField(()=>this.m,(value)=>{updateDate(); this.setMin(value);});
        secField = createNumberField(()=>this.s,(value)=>{updateDate(); this.setSec(value);});
        
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
        this.owner = owner;
        return this.onUpdate("owner");
      }
      setCountdown(diff) {
        this.setSpoil(diff.getTime());
        return this.onUpdate("spoil");
      }

      serialize() {
        return twoCharStr(this.id)+this.spoil.serialize()+this.owner.length+this.owner;
      }
      unserialize(data) {
        this.setId(parseInt(data.substring(0,2)));
        data = data.substring(2);
        let spoil = new Diff();
        data = spoil.unserialize(data);
        this.setSpoil(spoil);
        let length = parseInt(data.substring(0,1));
        this.setOwner(data.substring(1,1+length));
        return data.substring(1+length);
      }
      createUI() {
        let ui = doc.createElement("div");
        let self = this;
        
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
          //input.classList.add("arfr-ruin-id");
        });
        
        const errorSpoil = addInputSection(ui, ()=>{return this.spoil.createUI();});
        
        const errorOwner = addInputSection(ui, (section,error)=>{
          section.appendChild(doc.createTextNode("Possédé par: "));
          let input = doc.createElement("input");
          //input.classList.add("arfr-ruin-owner");
          input.type = 'text';
          input.value = self.owner;
          input.addEventListener('input', function(event) {self.setOwner(event.target.value);});
          return input;
        });
        
        class ErrorObserver extends Observer {
            onError(ruin, valName, err, newValue, oldValue) {
              let section;
              if (valName === "id") section = errorId;
              else if (valName === "spoil") section = errorSpoil;
              else section = errorOwner;
              section.innerHTML = (err == null) ? "" : "Erreur : "+err;
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
    let inputList = doc.getElementById(listId);
    
    const updateOutput = function() {
      let backup = "", output = "";
      const NEW_LINE = '\r\n', NL_LEN = 2;
      for (const ruin of ruinList) {
        backup += ruin.serialize();
        let spoilTime = ruin.spoil.getDate();
        output += NEW_LINE + "#"+ruin.id + NEW_LINE + "Le " + spoilTime.getDate() + " à " + twoCharStr(spoilTime.getHours()) + ":" + twoCharStr(spoilTime.getMinutes()) + NEW_LINE + "Possédé par " + ruin.owner;     
      }
      doc.getElementById(saveId).value = backup;
      doc.getElementById(outputId).value = output.substring(NL_LEN);
    };
    
    let addRuinView = function(ruin) {
      let newItem = doc.createElement('li');
      newItem.classList.add('list-group-item'); // Bootstrap
      newItem.appendChild(ruin.createUI());
        
      const deleteButton = doc.createElement("button");
      deleteButton.appendChild(doc.createTextNode("Supprimer"));
      deleteButton.classList.add("btn");
      deleteButton.classList.add("btn-danger");
      
      deleteButton.addEventListener('click', function(event) {
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
   
    doc.getElementById(buttonId).addEventListener('click', function() {
      let newItem = new Ruin();
      newItem.subscribe(changeObs);
      ruinList.push(newItem);
      addRuinView(newItem);
      updateOutput();
    });
    
    const clearList = function() {
      while (inputList.firstChild) inputList.removeChild(inputList.firstChild);
    };
    
    doc.getElementById(sortId).addEventListener('click', function() {
      ruinList.sort((a,b)=>b.spoil.getDate()-a.spoil.getDate());
      clearList();
      for (const ruin of ruinList) {
        addRuinView(ruin);
      }
      updateOutput();
    });
    
    doc.getElementById(loadId).addEventListener('click', function() {
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
