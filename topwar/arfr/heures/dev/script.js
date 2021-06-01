(function(global){
  class Diff {
    constructor(h, m, s) {
      this.h = h;
      this.m = m;
      this.s = s;
    }
    constructor(timestamp) {
      let arr = timestamp.split(':');
      super(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]));
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
    
    setCountdown(countdown) {
      this.spoil = countdown.getTime();
    }
  };
})(this);
