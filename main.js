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



var pastActivities = [];
var category = null;

// Event listeners

studyBtn.addEventListener('click', changeBtn);
meditateBtn.addEventListener('click', changeBtn);
exerciseBtn.addEventListener('click', changeBtn);
submitBtn.addEventListener('click', submitForm);

//Event Handlers

function submitForm(event) {
  event.preventDefault();
  showCustomMessage();
  updateDataModel(category);
  categoryIcon.classList.add('hidden');
  specificGoal.classList.add('hidden');
  timeEntered.classList.add('hidden');
  submitBtn.classList.add('hidden');
  displayCounter.classList.remove('hidden');


  console.log(pastActivities[0]);
  if(newActivity.category === 'study') {
    startStop.classList.add('category-study');
  } else if (category === 'exercise') {
    startStop.classList.add('category-exercise');
  } else if (category === 'meditate') {
    startStop.classList.add('category-meditate');
  };


  minorHeading.innerText = 'Current Activity';
  timerActivity.innerText = `${pastActivities[0].description}`;
  pastActivities[0].countdown();
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
  var error = document.querySelector('.error-message');
  var errorMin = document.querySelector('#minError');
  var errorSec = document.querySelector('#secError');

  if (!goalInput.value) {
    error.classList.remove('hidden');
  }

  if (!minutesInput.value) {
    errorMin.classList.remove('hidden');
  }

  if (!secondsInput.value) {
    errorSec.classList.remove('hidden');
  }
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

function updateDataModel(category) {
  var newActivity = new Activity(category, goalInput.value, minutesInput.value, secondsInput.value);
  pastActivities.push(newActivity);
  return newActivity;
};

function chooseCategory() {
  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].checked) {
      category = buttons[i].name;
    };
  };
  return category;
};

/*

    5. Hide the form and display the timer with the name of the activity but not the category. The circle of the timer should be the color of the category.
        Hide form
        Create an html element to update the section and show the timer.
        Create a css class to style the timer as the comp ask.

    6. If the start activity button is clicked without having all 4 inputs filled, the user will receive an error but will not lose any information that was provided.
*/
