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
<<<<<<< HEAD
    var x = setInterval(function() {
      var min = Math.floor
=======
    setInterval(function() {
      min = parseInt(timer / 60, 10);
      sec = parseInt(timer % 60, 10);

      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;

    
>>>>>>> 7e21760f4e2c99d867b9804ccd36f475b546cba3
    }
  }, 1000);
  markComplete() {

  }
  saveToStorage() {
<<<<<<< HEAD
    
=======

>>>>>>> 7e21760f4e2c99d867b9804ccd36f475b546cba3
  }
}

module.exports = Activity;
