class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  };

  countdown() {
    
    setInterval(timer, 1000);
    var minutes = parseInt(this.minutes);
    var seconds = parseInt(this.seconds);
    
    var totalSec = (minutes * 60) + seconds;

    function timer() {
      var min = Math.floor(totalSec / 60);
      var sec = totalSec % 60;
      
      if (sec < 0) {
        return;
      };

      if (sec < 10) {
        sec = "0" + sec;
      }else {
        sec;
      };

      timerTimeRemaining.innerText = `${min}:${sec}`;
      totalSec--
    };
  };

  markComplete() {

  };

  saveToStorage() {

  };
};
