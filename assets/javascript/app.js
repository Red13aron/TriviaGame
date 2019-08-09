
//Global Variables
const startDiv = document.createElement("div");
const questionDiv = document.createElement("div");
const answerDiv = document.createElement("div");
const timerDiv = document.createElement("div");

let time = 30;
let questionOn = 0;
let numRight = 0;
let numWrong = 0;
let intervalId, timeoutId;

const questionSheet = {
    questions: [{
        question: "Who played Lars Thorwald in Hitchcock's Rear Window?",
        choices: ["Grace Kelly", "Georgine Darcy", "James Stewart", "Reymond Burr"],
        answer: "Reymond Burr"
    },
    {
        question: "What was Alfred Hitchcock's most successful film?",
        choices: ["Rear Window", "Psycho", "The Birds", "Vertigo"],
        answer: "Vertigo"
    },
    {
        question: "Where in the movie The Exorcist did the death of Father Karras take place?",
        choices: ["Washington, D.C.", "Chicago, Illinois", "New York City, New York", "Boston, Massachusetts"],
        answer: "Washington, D.C."
    },
    {
        question: "Is the film The Exorcist based on a true story?",
        choices: ["Yes", "Maybe", "So", "No"],
        answer: "Yes"
    },
    {
        question: "How much was the budget for the movie The Texas Chainsaw Massacre?",
        choices: ["60,000", "100,000", "500,000", "1,000,000"],
        answer: "60,000"
    },
    {
        question: "Who was the lead actor for The Shining?",
        choices: ["Danny Lloyd", "Shelly Duvall", "Jack Nicholson", "Scatman Crothers"],
        answer: "Jack Nicholson"
    }
    ]
}

//Global Functions

//  The decrement function.
function decrement() {

    //  Decrease number by one.
    time--;

    //  Show the number in the #show-number tag.
    timerDiv.innerHTML = "Time Left: " + time;
    horrify(timerDiv, false);
    document.querySelector(".space").append(timerDiv);
    console.log("Inside decrement: " + intervalId);
    //  Once number hits zero...
    if (time === 0) {

        //  ...run the stop function.
        stop();

    }
}

function stop() {

    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
    document.querySelector(".space").innerHTML = "Times up!";
}

function horrify(element, isButton) {
    if (isButton) {
        element.setAttribute("class", "horrorButton");
    }
    else {
        element.setAttribute("class", "horror");
    }
}

function nextQuestion(element) {
    element.classList.add("continueButton");
}

function addText(text, element) {
    element.textContent = text;
}

function addQuestion(questionSheet, questionNum, element) {
    console.log(questionSheet.questions[questionNum].question);
    element.textContent = questionSheet.questions[questionNum].question;
}

function addChoice(questionSheet, questionNum, element, choiceNum) {
    element.textContent = questionSheet.questions[questionNum].choices[choiceNum];
}

function addAnswer(questionSheet, questionNum, element) {
    element.textContent = questionSheet.questions[questionNum].answer;
}

function populate(parent, element) {
    document.getElementById(parent).append(element);
}

function deleteChildren(parent) {
    document.getElementById(parent).innerHTML = "";
}

function quiz() {
    console.log("At the begininning of quiz:" + intervalId);
    deleteChildren("answerContainer");
    clearTimeout(timeoutId);
    console.log("After clearTimeout: " + intervalId);
    time = 30;

    const choice1Div = document.createElement("div");
    const choice2Div = document.createElement("div");
    const choice3Div = document.createElement("div");
    const choice4Div = document.createElement("div");
    horrify(choice1Div, true);
    horrify(choice2Div, true);
    horrify(choice3Div, true);
    horrify(choice4Div, true);
    nextQuestion(choice1Div);
    nextQuestion(choice2Div);
    nextQuestion(choice3Div);
    nextQuestion(choice4Div);

    console.log(questionOn);

    addQuestion(questionSheet, questionOn, questionDiv);
    populate("questionContainer", questionDiv);
    addChoice(questionSheet, questionOn, choice1Div, 0);
    addChoice(questionSheet, questionOn, choice2Div, 1);
    addChoice(questionSheet, questionOn, choice3Div, 2);
    addChoice(questionSheet, questionOn, choice4Div, 3);

    populate("answerContainer", choice1Div);
    populate("answerContainer", choice2Div);
    populate("answerContainer", choice3Div);
    populate("answerContainer", choice4Div);

    intervalId = setInterval(decrement, 1000);
    console.log("After setting setInterval: " + intervalId);
    document.querySelectorAll(".continueButton").forEach(function (element) {
        element.addEventListener("click", function () {
            clearInterval(intervalId);
            if (element.textContent === questionSheet.questions[questionOn].answer) {
                deleteChildren("questionContainer");
                deleteChildren("answerContainer");
                document.querySelector(".space").innerHTML = "";
                answerDiv.textContent = "You got it right!";
                populate("answerContainer", answerDiv);
                numRight++;
            }
            else {
                deleteChildren("questionContainer");
                deleteChildren("answerContainer");
                document.querySelector(".space").innerHTML = "";
                answerDiv.textContent = "You got it wrong!";
                populate("answerContainer", answerDiv);
                numWrong++;
            }
            questionOn++;
            if (questionOn < questionSheet.questions.length) {
                timeoutId = setTimeout(quiz, 5000);
                console.log("After running setTimeout: " + intervalId);
            }
            else {
                deleteChildren("answerContainer");
                addText("You're done!", answerDiv);
                answerDiv.textContent += " You got: " + numRight + "right" + " You got: " + numWrong + "wrong";
                populate("answerContainer", answerDiv)
            };
        })
    })
    if(time === 0){
        clearInterval(intervalId);
        deleteChildren("questionContainer");
        deleteChildren("answerContainer");
        document.querySelector(".space").innerHTML = "";
        answerDiv.textContent = "You ran out of time!";
        populate("answerContainer", answerDiv);
        numWrong++;
        questionOn++;
        if (questionOn < questionSheet.questions.length) {
            timeoutId = setTimeout(quiz, 5000);
            console.log("After running setTimeout: " + intervalId);
        }
        else {
            deleteChildren("answerContainer");
            addText("You're done!", answerDiv);
            answerDiv.textContent += " You got: " + numRight + "right" + " You got: " + numWrong + "wrong";
            populate("answerContainer", answerDiv)
        };
    }
}
//Main Functions
//Making Divs Spooky
horrify(startDiv, true);
horrify(questionDiv, false);
horrify(answerDiv, false);
horrify(timerDiv, false);

//Makes these Divs continue the quizz



//Setting up start
addText("Start", startDiv);
populate("answerContainer", startDiv);
startDiv.addEventListener("click", function () {
    deleteChildren("answerContainer");
    quiz();
})




