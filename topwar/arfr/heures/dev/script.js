(function(global){
  class Ruin {
    constructor(id, spoil, owner) {
      this.id = id;
      this.spoil = spoil;
      this.owner = owner;
    }
    
    setCountdown(countdown) {
      alert("Unfinished setCountdown");
      return this;
    }
  };
})(this);
