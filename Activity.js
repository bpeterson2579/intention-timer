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
    var x = setInterval(function() {
      var min = Math.floor
    }
  }, 1000);
  markComplete() {

  }
  saveToStorage() {
    
  }
}

module.exports = Activity;
