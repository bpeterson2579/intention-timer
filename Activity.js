class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category,
    this.description = description,
    this.minutes = minutes,
    this.seconds = seconds,
    this.completed = false,
    this.id = Date.now(),
  }
  countdown(this.minutes, this.seconds) {
    setInterval(function() {
      min = parseInt(timer / 60, 10);
      sec = parseInt(timer % 60, 10);

      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;

    
    }
  }, 1000);
  markComplete() {

  }
  saveToStorage() {

  }
}

module.exports = Activity;
