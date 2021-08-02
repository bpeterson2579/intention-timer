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
    
    var intervalSet = setInterval(timer, 1000);
    var minutes = parseInt(this.minutes);
    var seconds = parseInt(this.seconds);
    
    var totalSec = (minutes * 60) + seconds;

    function timer() {
      var min = Math.floor(totalSec / 60);
      var sec = totalSec % 60;
      
      if (sec === 0) {
        startStop.innerText = 'COMPLETE!';
        logActivityBtn.classList.remove('hidden');
        timerTimeRemaining.innerText = 'Great Job! Keep it up!'
        clearInterval(intervalSet);
        startStop.disabled = false;
        return;
      };
      
      if (min < 10) {
        min = "0" + min;
      }else {
        min;
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
    this.completed = true;
  };

  saveToStorage() {
    var storedName = `activity${number}`;
    var objectString = JSON.stringify(this);
    localStorage.setItem(storedName, objectString);
  };
};
