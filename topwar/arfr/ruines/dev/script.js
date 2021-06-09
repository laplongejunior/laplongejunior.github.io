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
          if (item === undefined) item = "--";
          else item = item.toString().padStart(2,"0");
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
          if (arr === undefined) console.log("!!!"+x);
          if (y < margin || y+margin >= arr.length) return false;
          if (arr[y] !== undefined) return false;
          arr[y] = this.id;
          this.id++;
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

      gen.insertId(MIDDLE,MIDDLE); // Capital
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

    for (let i = 0; i < ruinMatrix.length; ++i) {
      const arr = ruinMatrix[i];
      for (let j = 0; j < arr.length; ++j) {
         // todo
      }
    }

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
    
    const addError = function(arr, err){
      if (err != null) arr.push(err);
    };
    class Diff extends Subject {
      constructor() {
        super();
        this.h = 0;
        this.m = 0;
        this.s = 0;
      }

      setHour(h) {
        if (h < 0) return this.onError("hour","Heure négative");
        this.h = h;
        return this.onUpdate("hour");
      }
      setMin(m) {
        if (m < 0) return this.onError("min","Minutes négatives");
        if (m >= 60) return this.onError("min","Minutes trop élevées");
        this.m = m;
        return this.onUpdate("min");
      }
      setSec(s) {
        if (s < 0) return this.onError("sec","Secondes négatives");
        if (s >= 60) return this.onError("sec","Secondes trop élevées");
        this.s = s;
        return this.onUpdate();
      }
      setTimestamp(timestamp) {
        let errors = new Array();
        let arr = timestamp.split(':');
        addError(errors, this.setHour(parseInt(arr[0])));
        addError(errors, this.setMin(parseInt(arr[1])));
        addError(errors, this.setSec(parseInt(arr[2])));
        return errors;
      }

      getTime() {
        let today = new Date().getTime();
        return new Date( today+ ((((this.h*60)+this.m*60)+this.s)*1000) );
      }
      setTime(time) {
        let diff = new Date().getTime()-time.getTime();
        console.log(diff);
      }

      serialize() {
        let time = this.getTime();
        return twoCharStr(time.getUTCFullYear())+twoCharStr(time.getUTCMonth())+twoCharStr(time.getUTCDate())+twoCharStr(time.getUTCHours())+twoCharStr(time.getUTCMinutes());
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
        
        this.setTime(new Date(Date.UTC(year, month, day, hour, min)));        
        return data;
      }
      createUI() {
        let ui = doc.createElement("span");
        ui.appendChild(doc.createTextNode(this.h+":"+this.m+":"+this.s));
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

      setId(id) {
        if (id < 0) return this.onError("id", "Id négatif");
        if (id > 99) return this.onError("id", "Id trop grand");
        this.id = id;
        return this.onUpdate("id");
      }
      setSpoil(spoil) {
        this.spoil = spoil;
        return this.onUpdate("spoil");
      }
      setOwner(owner) {
        if (owner.length > 9) return this.onError("owner", "9 lettres max");
        this.owner = owner;
        return this.onUpdate("owner");
      }
      setCountdown(diff) {
        this.spoil = diff.getTime();
        return this.onUpdate("spoil");
      }

      serialize() {
        return twoCharStr(this.id)+this.spoil.serialize()+this.owner.length+this.owner;
      }
      unserialize(data) {
        this.setId(parseInt(data.substring(0,2)));
        data = data.substring(2);
        let spoil = new Spoil();
        data = spoil.unserialize(data);
        this.setSpoil(spoil);
        data = data.substring(12);
        let length = parseInt(data.substring(0,1));
        owner = data.substring(0,1+length);
        return data.substring(1+length);
      }
      createUI() {
        let ui = doc.createElement("div");
        let self = this;
        
        const errorId = addInputSection(ui, (section,error)=>{
          section.appendChild(doc.createTextNode("Id: #"));
          let input = doc.createElement("input");
          input.classList.add("arfr-ruin-id");
          input.type='number';
          input.addEventListener('input', function(event) {self.setId(event.target.value);});
          return input;
        });
        
        const errorSpoil = addInputSection(ui, ()=>{return this.spoil.createUI();});
        
        const errorOwner = addInputSection(ui, (section,error)=>{
          section.appendChild(doc.createTextNode("Possédé par: "));
          let input = doc.createElement("input");
          input.classList.add("arfr-ruin-owner");
          input.type='text';
          input.addEventListener('input', function(event) {self.setOwner(event.target.value);});
          return input;
        });
        
        class ErrorObserver extends Observer {
            onError(ruin, valName, err, newValue, oldValue) {
              let section;
              console.log(valName);
              if (valName === "id") section = errorId;
              else if (valName === "spoil") section = errorSpoil;
              else section = errorOwner;
              section.innerHTML = (err == null) ? "" : "Error : "+err;
            }
        };
        this.subscribe(new ErrorObserver());
        
        return ui;
      }
    };
    
    const addInputSection = function(parent, callback) {
        let section = global.document.createElement('div');
        let error = global.document.createElement('span');
        error.classList.add(errorClass);
        section.appendChild(callback(section, error));
        section.appendChild(error);
        parent.appendChild(section);
        return error;
    };
    
    let ruinList = new Array();

    let createRuinView = function(ruin) {
      let newItem = doc.createElement('li');
      newItem.classList.add('list-group-item'); // Bootstrap
      newItem.appendChild(ruin.createUI());
      return newItem;
    };
    
    const updateOutput = function() {
      let output = "";
      for (const ruin of ruinList) {
        output += ruin.serialize();
      }
      doc.getElementById(saveId).value = output;
    };
    
    class ChangeObserver extends Observer {
      onUpdate(ruin, valName, newValue, oldValue) {
        updateOutput();
      };
    }
    const changeObs = new ChangeObserver();
   
    let inputList = doc.getElementById(listId);
    doc.getElementById(buttonId).addEventListener('click', function() {
      let newItem = new Ruin();
      newItem.subscribe(changeObs);
      ruinList.push(newItem);
      inputList.appendChild(createRuinView(newItem));
      updateOutput();
    });
    doc.getElementById(sortId).addEventListener('click', function() {
      ruinList.sort((a,b)=>b.spoil.getDate()-a.spoil.getDate());
      inputList.innerHTML = '';
      for (const ruin of ruinList) {
        inputList.appendChild(createRuinView(ruin));
      }
      updateOutput();
    });
    
    
    doc.getElementById(loadId).addEventListener('click', function() {
      console.log(doc.getElementById(loadInput).value);
    });
    
  })();
}
