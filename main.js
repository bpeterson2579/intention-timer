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
var logActivityBtn = document.querySelector('#logActivity');
var newActivityBTN = document.querySelector('#createNewActivity');
var cardSection = document.querySelector('#cardSection');
var createNewActivityBtn = document.querySelector('#createNewActivity');
var form = document.querySelector('form');
var studyImg = document.querySelector('#studyBtn');
var meditateImg = document.querySelector('#meditateBtn');
var exerciseImg = document.querySelector('#exerciseBtn');
var inputMin = document.querySelector('#minutes');
var inputSec = document.querySelector('#seconds');
var error = document.querySelector('#error');
var errorMin = document.querySelector('#minError');
var errorSec = document.querySelector('#secError');
var promtMessage = document.querySelector('#promtMessage');

var invalidInput = ['-', '+', 'e'];
var pastActivities = [];
var selectedCategory = null;
var newActivity = null;

// Event listeners

studyBtn.addEventListener('click', changeBtn);
meditateBtn.addEventListener('click', changeBtn);
exerciseBtn.addEventListener('click', changeBtn);
submitBtn.addEventListener('click', submitForm);
startStop.addEventListener('click', startActivity);
logActivityBtn.addEventListener('click', displayCard);
createNewActivityBtn.addEventListener('click', displayForm);
inputMin.addEventListener('keydown', preventInvalidInput);
inputSec.addEventListener('keydown', preventInvalidInput);

//Event Handlers

function displayForm(event) {
  event.preventDefault();
  categoryIcon.classList.remove('hidden');
  specificGoal.classList.remove('hidden');
  timeEntered.classList.remove('hidden');
  submitBtn.classList.remove('hidden');
  displayCounter.classList.add('hidden');
  createNewActivityBtn.classList.add('hidden');
  form.reset();
  studyBtn.classList.remove('active-study');
  meditateBtn.classList.remove('active-meditate');
  exerciseBtn.classList.remove('active-exercise');
  studyImg.src = "./assets/study.svg";
  meditateImg.src = "./assets/meditate.svg";
  exerciseImg.src = "./assets/exercise.svg";
  error.classList.add('hidden');
  errorMin.classList.add('hidden');
  errorSec.classList.add('hidden');
  categoryError.classList.add('hidden');
};

function displayCard(event) {
  event.preventDefault();
  displayCounter.classList.add('hidden');
  createNewActivity.classList.remove('hidden');
  promtMessage.classList.add('hidden');
  cardSection.innerHTML += `<section class="list-activities">
  <div class="color-slot"></div>
  <div class="card-activities">
    <div class="category-list">${newActivity.category}</div>
    <div class="time-list">${newActivity.minutes}:${newActivity.seconds}</div>
    <div class="goal-list">${newActivity.description}</div>
  </div>
</section>`;
};

function startActivity(event) {
  event.preventDefault();
  startStop.innerText = 'IN PROGRESS';
  startStop.disabled = true;
  newActivity.countdown();
  newActivity.markComplete();
};

function submitForm(event) {
  event.preventDefault();
  showCustomMessage();
  
  if (!goalInput.value || !minutesInput.value || !secondsInput.value) {
      return;
  };

  updateDataModel(selectedCategory);

  categoryIcon.classList.add('hidden');
  specificGoal.classList.add('hidden');
  timeEntered.classList.add('hidden');
  submitBtn.classList.add('hidden');
  displayCounter.classList.remove('hidden');


  if(newActivity.category === 'study') {
    startStop.classList.add('category-study');
  } else if (newActivity.category === 'exercise') {
    startStop.classList.add('category-exercise');
  } else if (newActivity.category === 'meditate') {
    startStop.classList.add('category-meditate');
  };


  minorHeading.innerText = 'Current Activity';
  timerActivity.innerText = `${newActivity.description}`;
  var displayMinutes;
  var displaySeconds;
  if (newActivity.minutes < 10) {
      displayMinutes = '0' + newActivity.minutes;
  } else {
      displayMinutes = newActivity.minutes
  };
  if (newActivity.seconds < 10) {
    displaySeconds = '0' + newActivity.seconds;
  } else if (newActivity.seconds === 0) {
    displaySeconds = '00';
  } else {
      displaySeconds = newActivity.seconds;
  };
  timerTimeRemaining.innerText = `${displayMinutes}:${displaySeconds}`;
};

function changeBtn(event) {
    event.preventDefault();

    if (event.target.id === "study-button" || event.target.id === "studyBtn") {
        studyImg.src = "./assets/study-active.svg";
        meditateImg.src = "./assets/meditate.svg";
        exerciseImg.src = "./assets/exercise.svg";
        studyBtn.classList.add('active-study');
        meditateBtn.classList.remove('active-meditate');
        exerciseBtn.classList.remove('active-exercise');
        chooseCategory();
    };
    if (event.target.id === "meditate-button" || event.target.id === "meditateBtn") {
        meditateImg.src = "./assets/meditate-active.svg";
        exerciseImg.src = "./assets/exercise.svg";
        studyImg.src = "./assets/study.svg";
        meditateBtn.classList.add('active-meditate');
        studyBtn.classList.remove('active-study');
        exerciseBtn.classList.remove('active-exercise');
        chooseCategory();
    };
    if (event.target.id === "exercise-button" || event.target.id === "exerciseBtn") {
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
  
  if (!goalInput.value) {
    error.classList.remove('hidden');
  };

  if (!minutesInput.value) {
    errorMin.classList.remove('hidden');
  };

  if (!secondsInput.value) {
    errorSec.classList.remove('hidden');
  };

  if(studyBtn.className === "study-button" && meditateBtn.className === "meditate-button" && exerciseBtn.className === "exercise-button") {
    categoryError.classList.remove('hidden');
    return;
  };
};

function preventInvalidInput(event) {
  if (invalidInput.includes(event.key)) {
     event.preventDefault();
  };
};

function updateDataModel(selectedCategory) {
  newActivity = new Activity(selectedCategory, goalInput.value, minutesInput.value, secondsInput.value);
  pastActivities.unshift(newActivity);
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

      3.1 A card with a category, time, and the users input for specific goal appears on the right side of the screen with the styling provided on the comp.
        Create an event handler that creates a an HTML element that contains the category, minutes, seconds and the specific goal.
        Create a CSS class to position and style the card.

    4. Before moving on the cards should match the comp.
*/
