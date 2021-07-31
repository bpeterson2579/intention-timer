var studyBtn = document.querySelector("#study-button");
var meditateBtn = document.querySelector("#meditate-button");
var exerciseBtn = document.querySelector("#exercise-button");
var goalInput = document.querySelector("#goal");
var minutesInput = document.querySelector("#minutes");
var secondsInput = document.querySelector("#seconds");
var activityBtn = document.querySelector(".start-activity-section");

var pastActivities = [];

// Event listeners

studyBtn.addEventListener('click', changeBtn);
meditateBtn.addEventListener('click', changeBtn);
exerciseBtn.addEventListener('click', changeBtn);

//Event Handlers

function changeBtn(event) {
    event.preventDefault();
    var studyImg = document.querySelector('#studyBtn');
    var meditateImg = document.querySelector('#meditateBtn');
    var exerciseImg = document.querySelector('#exerciseBtn');

    if (event.target.id === "study-button") {
        studyImg.src = "./assets/study-active.svg";
    } else if (event.target.id === "meditate-button") {
        meditateImg.src = "./assets/meditate-active.svg";
    } else if (event.target.id === "exercise-button") {
        exerciseImg.src = "./assets/exercise-active.svg";
    };
};


/*
    PSEUDOCODE

    1. Buttons Exercise, Meditate or Study should change colors when clicked, also the border.
        Access the buttons DONE
        Add event listener for the clicks
        Create an event handler to change the appearance of the 3 buttons
        When clicked add a class to change border and Icon
            Hide previous icon, and show the new one

    2. Form validation. Just accept number in minutes and seconds input and make sure that e cannot be accepted.
        Limit the input type to numbers, and give it a min and max.
        create and alert if `e` is passed to any numeric field.

    3. Show an error message if any input field is left empty when submitting the form
        Add property of required and error message to all inputs in the form.

    4. When pressing Start activity button we need to update the data model with an instance of the Activity class
        Grab the values of the inputs and create and object instance of Activity Class

    5. Hide the form and display the timer with the name of the activity but not the category. The circle of the timer should be the color of the category.
        Hide form
        Create an html element to update the section and show the timer.
        Create a css class to style the timer as the comp ask.
    
    6. If the start activity button is clicked without having all 4 inputs filled, the user will receive an error but will not lose any information that was provided.
*/

