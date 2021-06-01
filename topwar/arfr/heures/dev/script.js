(function(global){
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
  
  global.addEventListener("load", function() {
    
  });
})(this);
