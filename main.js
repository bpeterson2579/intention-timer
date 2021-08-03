var studyBtn = document.querySelector("#study-button");
var meditateBtn = document.querySelector("#meditate-button");
var exerciseBtn = document.querySelector("#exercise-button");
var goalInput = document.querySelector("#goal");
var minutesInput = document.querySelector("#minutes");
var secondsInput = document.querySelector("#seconds");
var activityBtn = document.querySelector("#startActivitySection");
var submitBtn = document.querySelector('#startActivityButton');
var buttons = document.querySelectorAll('button');
var displayCounter = document.querySelector('#displayCounter');
var activityClass = document.querySelector('#activityClass');
var timeRemain = document.querySelector('#timeRemain');
var startStop = document.querySelector('#startStop');
var minorHeading = document.querySelector('#minorHeading');
var categoryIcon = document.querySelector('#categoryIcon');
var specificGoal = document.querySelector('#specificGoal');
var timeEntered = document.querySelector('#minutesSeconds');
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
var promptMessage = document.querySelector('#promptMessage');
var pastActivitiesSection = document.querySelector('#pastActivitiesSection');

// Onload actions

var invalidInput = ['-', '+', 'e'];
var pastActivities = [];
var selectedCategory = null;
var newActivity = null;
var activity = null;

displayPastActivities();

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

function preventInvalidInput(event) {
  if (invalidInput.includes(event.key)) {
     event.preventDefault();
  };
};

function displayForm(event) {
  event.preventDefault();

  selectedCategory = null;

  minorHeading.innerText = 'New Activity';

  show(categoryIcon);
  show(specificGoal);
  show(timeEntered);
  show(submitBtn);
  hide(displayCounter);
  hide(createNewActivityBtn);
  hide(error);
  hide(errorMin);
  hide(errorSec);
  hide(categoryError);

  form.reset();

  studyBtn.classList.remove('active-study');
  meditateBtn.classList.remove('active-meditate');
  exerciseBtn.classList.remove('active-exercise');

  studyImg.src = './assets/study.svg';
  meditateImg.src = './assets/meditate.svg';
  exerciseImg.src = './assets/exercise.svg';
};

function displayCard(event) {
  event.preventDefault();

  newActivity.markComplete();
  newActivity.saveToStorage();

  hide(displayCounter);
  show(createNewActivity);
  hide(promptMessage);
  hide(cardSection);

  pastActivitiesSection.innerHTML +=
  `<section class="list-activities">
    <div class="color-slot color-slot-${newActivity.category}" id="${newActivity.category}"></div>
    <div class="card-activities">
    <div class="category-list">${newActivity.category}</div>
    <div class="time-list">${newActivity.minutes} MIN</div>
    <div class="goal-list">${newActivity.description}</div>
    </div>
  </section>`;
};

function startActivity(event) {
  event.preventDefault();
  startStop.innerText = 'IN PROGRESS';
  startStop.disabled = true;
  newActivity.countdown();
};

function submitForm(event) {
  event.preventDefault();
  showCustomMessage();

  if (!goalInput.value || !minutesInput.value || !secondsInput.value || !selectedCategory) {
      return;
  };

  hide(logActivityBtn);

  startStop.innerText = 'START';
  updateDataModel(selectedCategory);

  hide(categoryIcon);
  hide(specificGoal);
  hide(timeEntered);
  hide(submitBtn);

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

    if (event.target.id === 'study-button' || event.target.id === 'studyBtn') {
        studyImg.src = './assets/study-active.svg';
        meditateImg.src = './assets/meditate.svg';
        exerciseImg.src = './assets/exercise.svg';
        studyBtn.classList.add('active-study');
        meditateBtn.classList.remove('active-meditate');
        exerciseBtn.classList.remove('active-exercise');
        chooseCategory();
    };

    if (event.target.id === 'meditate-button' || event.target.id === 'meditateBtn') {
        meditateImg.src = './assets/meditate-active.svg';
        exerciseImg.src = './assets/exercise.svg';
        studyImg.src = './assets/study.svg';
        meditateBtn.classList.add('active-meditate');
        studyBtn.classList.remove('active-study');
        exerciseBtn.classList.remove('active-exercise');
        chooseCategory();
    };

    if (event.target.id === 'exercise-button' || event.target.id === 'exerciseBtn') {
        exerciseImg.src = './assets/exercise-active.svg';
        meditateImg.src = './assets/meditate.svg';
        studyImg.src = './assets/study.svg';
        exerciseBtn.classList.add('active-exercise');
        meditateBtn.classList.remove('active-meditate');
        studyBtn.classList.remove('active-study');
        chooseCategory();
    };
};

// Helper Functions //

function show(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
};

function showCustomMessage() {

  if(studyBtn.className === "study-button" && meditateBtn.className === "meditate-button" && exerciseBtn.className === "exercise-button") {
    show(categoryError);
    return;
  } else {
    hide(categoryError);
  };

  if (!goalInput.value) {
    show(error);
    return;
  } else {
    hide(error);
  };

  if (!minutesInput.value) {
    show(errorMin);
    return;
  } else {
    hide(errorMin);
  };

  if (!secondsInput.value) {
    show(errorSec);
    return;
  } else {
    hide(errorSec);
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

function displayPastActivities() {

  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.length > 0) {

    hide(cardSection);

    activity = JSON.parse(localStorage.getItem(localStorage.key(i)));

    pastActivitiesSection.innerHTML +=
    `<section class="list-activities">
      <div class="color-slot color-slot-${activity.category}" id="${activity.category}"></div>
      <div class="card-activities id="cardActivities">
      <div class="category-list">${activity.category}</div>
      <div class="time-list">${activity.minutes} MIN</div>
      <div class="goal-list">${activity.description}</div>
      </div>
    </section>`;
    };
  };
};
