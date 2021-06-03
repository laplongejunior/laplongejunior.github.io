(function(global){
  "use strict";
  
  let addError = function(arr, err){
    if (err != null) arr.push(err);
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

class SafeMatrix {
let matrix;
constructor(SIDE) {
matrix = new Array(SIDE);
for (let i=0;i<SIDE;++i)
matrix.push(new Array(SIDR).fill(undefined));
}

let id = 1, tries = 0;
insertId(x,y) {
let result = _insertId(x,y);
if (result) tries = 0;
else ++tries;
}
_insertId(x,y) {
if (x < 0 || x >= matrix.length) return false;
let arr = matrix[x];
if (y < 0 || y >= arr.length) return false;
if (arr[y] !== undefined) return false;
arr[y] = id;
++id;
return true;
}

const BASE = 2;
const Directions = {
UP:{next:Directions.RIGHT, onX:function(x){}}, 
DOWN:{next:Directions.LEFT},
LEFT:{next:Directions.UP}, 
RIGHT:{next:Directions.DOWN}
};
const SIDE = 16, BASE = 2;
let gen = new SafeMatrix(SIDE);
const MIDDLE = SIZE/2;
const UPPER=MIDDLE+1, LOWER=MIDDLE-1;
const inMiddle = function(index) {
return index >= UPPER && index <= LOWER;
}
let x = 1, y = 3, direction = EnumDirections.RIGHT;

while (gen.tries < 4) {
if (inMiddle(x)) x = MIDDLE;
if (inMiddle(y)) y = MIDDLE;
if (!gen.insertId(x,y)) direction = direction.next;

switch (direction) {
case EnumDirections.UP:

break;
}

}

  /*
  const ruinMatrix = [
    [1,2,3],
    [12,13,14,4],
    [20,21,15],
    [11,24,22,5],
    [19,23,16],
    [10,18,17,6],
    [9,8,7]
  ];
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
