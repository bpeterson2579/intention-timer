var studyBtn = document.querySelector("#study-button");
var meditateBtn = document.querySelector("#meditate-button");
var exerciseBtn = document.querySelector("#exercise-button");
var goalInput = document.querySelector("#goal");
var minutesInput = document.querySelector("#minutes");
var secondsInput = document.querySelector("#seconds");
var activityBtn = document.querySelector(".start-activity-section");
var submitBtn = document.querySelector('#start-activity-section');
var buttons = document.querySelectorAll('button');
var displayCounter = document.querySelector('#displayCounter');
var activityClass = document.querySelector('#activityClass');
var timeRemain = document.querySelector('#timeRemain');
var startStop = document.querySelector('#startStop');
var minorHeading = document.querySelector('#minorHeading');
var categoryIcon = document.querySelector('#categoryIcon');
var specificGoal = document.querySelector('.specific-goal');
var timeEntered = document.querySelector('.minutes-seconds');
var timerActivity = document.querySelector('#activityClass');
var timerTimeRemaining = document.querySelector('#timeRemain');
var categoryError = document.querySelector('#categoryError');


var pastActivities = [];
var selectedCategory = null;

// Event listeners

studyBtn.addEventListener('click', changeBtn);
meditateBtn.addEventListener('click', changeBtn);
exerciseBtn.addEventListener('click', changeBtn);
submitBtn.addEventListener('click', submitForm);
startStop.addEventListener('click', startActivity);

//Event Handlers

function startActivity() {
  startStop.innerText = 'IN PROGRESS';
  pastActivities[0].countdown();
};

function submitForm(event) {
  event.preventDefault();
  showCustomMessage();
  
  if(studyBtn.className === "study-button" && meditateBtn.className === "meditate-button" && exerciseBtn.className === "exercise-button") {
    categoryError.classList.remove('hidden');
    return;
  };
  
  if (!goalInput.value || !minutesInput.value || !secondsInput.value) {
      return;
  };

  updateDataModel(selectedCategory);

  categoryIcon.classList.add('hidden');
  specificGoal.classList.add('hidden');
  timeEntered.classList.add('hidden');
  submitBtn.classList.add('hidden');
  displayCounter.classList.remove('hidden');


  if(pastActivities[0].category === 'study') {
    startStop.classList.add('category-study');
  } else if (pastActivities[0].category === 'exercise') {
    startStop.classList.add('category-exercise');
  } else if (pastActivities[0].category === 'meditate') {
    startStop.classList.add('category-meditate');
  };


  minorHeading.innerText = 'Current Activity';
  timerActivity.innerText = `${pastActivities[0].description}`;
  var displayMinutes;
  var displaySeconds;
  if (pastActivities[0].minutes < 10) {
      displayMinutes = '0' + pastActivities[0].minutes;
  } else {
      displayMinutes = pastActivities[0].minutes
  };
  if (pastActivities[0].seconds < 10) {
    displaySeconds = '0' + pastActivities[0].seconds;
  } else if (pastActivities[0].seconds === 0) {
    displaySeconds = '00';
  } else {
      displaySeconds = pastActivities[0].seconds;
  };
  timerTimeRemaining.innerText = `${displayMinutes}:${displaySeconds}`;
};

function changeBtn(event) {
    event.preventDefault();

    var studyImg = document.querySelector('#studyBtn');
    var meditateImg = document.querySelector('#meditateBtn');
    var exerciseImg = document.querySelector('#exerciseBtn');

    if (event.target.id === "study-button") {
        studyImg.src = "./assets/study-active.svg";
        meditateImg.src = "./assets/meditate.svg";
        exerciseImg.src = "./assets/exercise.svg";
        studyBtn.classList.add('active-study');
        meditateBtn.classList.remove('active-meditate');
        exerciseBtn.classList.remove('active-exercise');
        chooseCategory();
    };
    if (event.target.id === "meditate-button") {
        meditateImg.src = "./assets/meditate-active.svg";
        exerciseImg.src = "./assets/exercise.svg";
        studyImg.src = "./assets/study.svg";
        meditateBtn.classList.add('active-meditate');
        studyBtn.classList.remove('active-study');
        exerciseBtn.classList.remove('active-exercise');
        chooseCategory();
    };
    if (event.target.id === "exercise-button") {
        exerciseImg.src = "./assets/exercise-active.svg";
        meditateImg.src = "./assets/meditate.svg";
        studyImg.src = "./assets/study.svg";
        exerciseBtn.classList.add('active-exercise');
        meditateBtn.classList.remove('active-meditate');
        studyBtn.classList.remove('active-study');
        chooseCategory();
    };
};

// Helper Functions //

function showCustomMessage() {
  var error = document.querySelector('#error');
  var errorMin = document.querySelector('#minError');
  var errorSec = document.querySelector('#secError');

  if (!goalInput.value) {
    error.classList.remove('hidden');
  };

  if (!minutesInput.value) {
    errorMin.classList.remove('hidden');
  };

  if (!secondsInput.value) {
    errorSec.classList.remove('hidden');
  };
};

var inputMin = document.querySelector('#minutes');
var inputSec = document.querySelector('#seconds');
var invalidInput = ['-', '+', 'e'];

inputMin.addEventListener('keydown', function(event) {
  if (invalidInput.includes(event.key)) {
    event.preventDefault();
  }
});

inputSec.addEventListener('keydown', function(event) {
  if (invalidInput.includes(event.key)) {
    event.preventDefault();
  }
});

function updateDataModel(selectedCategory) {
  var newActivity = new Activity(selectedCategory, goalInput.value, minutesInput.value, secondsInput.value);
  pastActivities.push(newActivity);
  return newActivity;
};

function chooseCategory() {
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].className === "study-button active-study") {
      selectedCategory = buttons[i].name;
    }else if (buttons[i].className === "meditate-button active-meditate") {
        selectedCategory = buttons[i].name;
    } else if (buttons[i].className === "exercise-button active-exercise") {
        selectedCategory = buttons[i].name;
    };
  };
  return selectedCategory;
};

/*
    Iteration 4 - Logging Past Activities
    1. When the timer completes the alert no longer appears

    2. Display a motivational or congratulatory message on the left side of the page, replacing the timer.
      Modify the InnerText of the p element when the timer stops.

    3. The user needs to be able to acknowledge the message by clicking a log activity button.
        Create LOG ACTIVITY button and hide it on the html.
        Remove the hidden class when the time is up.

      3.1 A card with a category, time, and the users input for specific goal appears on the right side of the screen with the styling provided on the comp.
        Add a click event to the log activity button
        Create an event handler that creates a an HTML element that contains the category, minutes, seconds and the specific goal.
        Create a CSS class to position and style the card.
        
    4. Before moving on the cards should match the comp.
*/
