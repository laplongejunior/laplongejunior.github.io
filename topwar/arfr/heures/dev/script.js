(function(global){
  "use strict";
  
  // UI view
  let addError = function(arr, err){
    if (err != null) arr.push(err);
  };
  let debugMatrix = function(matrix) {
    console.log("=====START=====");
    let index = 0;
    for (let arr of matrix) {
      let line = "";
      for (let item of arr) {
        if (item === undefined) item = "--";
        else item = item.toString().padStart(2,"0");
        line+=item+",";
      }
      console.log(++index+") "+line.substring(0,line.length-1));
    }
    console.log("======END======");
  };
  
  class Observer {
    fire(subject) {}
  };
  class Subject {
    constructor() {
      this.observers = new Array();
    }
    subscribe(obs) {
      this.observers.push(obs);
    }
    unsubscribe(obs) {
      this.onbservers.remove(obs);
    }
    onUpdate() {
      for (obs of observers)
        obs.fire(this);
    }
  
  };
  
  class Diff extends Subject {
    constructor() {
      this.h = 0;
      this.m = 0;
      this.s = 0;
    }
    
    setHour(h) {
      if (h < 0) return "Heure négative";
      this.h = h;
      onUpdate();
      return null;
    }
    setMin(m) {
      if (m < 0) return "Minutes négatives";
      if (m >= 60) return "Minutes trop élevées";
      this.m = m;
      onUpdate();
      return null;
    }
    setSec(s) {
      if (s < 0) return "Secondes négatives";
      if (s >= 60) return "Secondes trop élevées";
      this.s = s;
      onUpdate();
      return null;
    }
    setTimestamp(timestamp) {
      let errors = new Array();
      let arr = timestamp.split(':');
      addError(errors, setHour(parseInt(arr[0])));
      addError(errors, setMin(parseInt(arr[1])));
      addError(errors, setSec(parseInt(arr[2])));
      return errors;
    }
    
    getTime() {
      let time = new Date();
      return new Date(time.getTime()+ ((((h*60)+m*60)+s)*1000) );
    }
    
    createUI() {
      let ui = global.document.createElement("span");
      return ui;
    }
  };
  
  class Ruin extends Subject {
    constructor() {
      this.id = 0;
      this.spoil = new Date();
      this.owner = "";
    }
    
    setId(id) {
      if (id < 0) return "Id négatif";
      this.id = id;
      onUpdate();
      return null;
    }
    setSpoil(spoil) {
      this.spoil = spoil;
      onUpdate();
      return null;
    }
    setOwner(spoil) {
      this.spoil = spoil;
      onUpdate();
      return null;
    }
    setCountdown(diff) {
      this.spoil = diff.getTime();
      onUpdate();
      return null;
    }
    
    createUI() {
      let ui = global.document.createElement("div");
      ui.insertChild(this.spoil.createUI());
      return ui;
    }
  };
  
  let createRuinView = function(ruin) {
    let newItem = doc.createElement("li");
    li.addClass("list-group-item"); // Bootstrap
    li.insertChild(ruin.createUI());
    return newItem;
  };

  // Coords mapping
  
  const BASE = 2, ADJUST = 1;
  const SIDE = 15; 
    const getCycle = function(x,y) {
      if (x < 0 || x > SIDE) return -1;
      if (y < 0 || y > SIDE) return -1;
      x = Math.min(x,SIDE-x);
      y = Math.min(y,SIDE-y);
      let result = Math.min(Math.floor(x/BASE),Math.floor(y/BASE));
      console.log(x+";"+y+ " => cycle "+result);
      return result;
    };
 
  const ruinMatrix = (function(){  
    class SafeMatrix {
      constructor(SIDE) {
        this.id = 1;
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
    const adjustMiddle = function(pos, other) {
      if (pos < MIDDLE-ADJUST || pos > MIDDLE+ADJUST) return pos;
      if (getCycle(pos,other)%2 === 0) return MIDDLE;
      return null;
    };
    let gen = new SafeMatrix(SIDE);

    let x = 0, y = -BASE, direction = Directions.RIGHT;
    while (true) {
      if (gen.id === 21) debugger;
      console.log("Start "+gen.id+" "+x+";"+y+";"+direction.name);
      let arr = direction.coords(x,y,BASE*2);
      let tempX = arr[0];
      let tempY = arr[1];

      tempX = adjustMiddle(tempX, tempY, direction);
      if (tempX === null) {
        tempX = direction.coords(MIDDLE,tempY,BASE+ADJUST)[0];
      } else {
        tempY = adjustMiddle(tempY, tempX, direction);
        if (tempY === null)
          tempY = direction.coords(tempX,MIDDLE,BASE+ADJUST)[1];
      }
      
      let move = BASE;
      console.log("Attempt "+gen.id+" "+tempX+";"+tempY+";"+direction.name);

      if (!gen.insertId(tempX,tempY,getCycle(tempX,tempY)*BASE)) {
        debugMatrix(gen.matrix);
        if (direction === Directions.UP) {
          direction = direction.next;
          arr = direction.coords(x,y,BASE*2);
        }
        else {
          arr = direction.coords(x,y,BASE);
          direction = direction.next;
          arr = direction.coords(arr[0],arr[1],BASE);
        }
        tempX = arr[0];
        tempY = arr[1];
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
  
  global.addEventListener("load", function() {
    let doc = global.document;
    let ruinList = doc.getElementById("arfr-ruin-list");
    let addRuinButton = doc.getElementById("arfr-add-ruin");
    addRuinButton.addEventListener("click", function() {
      ruinList.addChild(createRuinView(new Ruin()));
    });
  });
})(this);
