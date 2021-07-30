class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category,
    this.description = description,
    this.minutes = minutes,
    this.seconds = seconds,
    this.completed = false,
    this.id = Date.now(),
  };

  countdown(this.minutes, this.seconds) {
    var timeDisplay = document.querySelector('#countDown');
    var min = this.minutes;
    var totalSec = (min * 60) + this.seconds;
    
    setInterval(timer, 1000);

    function timer() {
      var min = Math.floor(totalSec / 60);
      var sec = totalSec % 60;

      if (sec < 0) {
        return;
      }; 

      if (sec < 10) {
        sec = "0" + sec 
      }else {
        sec
      };

      timeDisplay.innerText = `${min}:${sec}`;
      totalSec--
    };
  };

  markComplete() {
        
  };

  saveToStorage() {
    
  };
}
    
module.exports = Activity;