(function(global){
  let addError = function(arr, err){
    if (err != null) arr.push(err);
  };
  
  class Observer {
    fire() {}
  };
  class Subject {
    this.observers = new Array();
    subscribe(obs) {
      this.observers.push(obs);
    }
    unsubscribe(obs) {
      this.onbservers.remove(obs);
    }
    onUpdate() {
      for (obs : observers)
        obs.fire();
    }
  
  };
  
  class Diff {
    constructor() {
      this.h = 0;
      this.m = 0;
      this.s = 0;
    }
    
    setHour(h) {
      if (h < 0) return "Heure négative";
      this.h = h;
      return null;
    }
    setMin(m) {
      if (m < 0) return "Minutes négatives";
      if (m >= 60) return "Minutes trop élevées";
      this.m = m;
      return null;
    }
    setSec(s) {
      if (s < 0) return "Secondes négatives";
      if (s >= 60) return "Secondes trop élevées";
      this.s = s;
      return null;
    }
    constructor(h, m, s) {
      setHour(h);
      setMin(m);
      setSec(s);
    }
    setTimestamp(timestamp) {
      let errors = new Array();
      let arr = timestamp.split(':');
      addError(errors, setHour(parseInt(arr[0])));
      addError(errors, setMin(parseInt(arr[1])));
      addError(errors, setSec(parseInt(arr[2])));
    }
    
    getTime() {
      let time = new Date();
      return new Date(time.getTime()+ ((((h*60)+m*60)+s)*1000) );
    }
  }
  class Ruin {
    constructor(id, spoil, owner) {
      this.id = id;
      this.spoil = spoil;
      this.owner = owner;
    }
    
    setCountdown(diff) {
      this.spoil = diff.getTime();
    }
  };
})(this);
