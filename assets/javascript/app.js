// set variables
var countDown = "";
var currentQuestion = "";
var currentChoices = "";
var pointer = 0;
var choiceList = $("#current-choices");

// $("#count-down").text(countDown);
// $("#current-question").text(currentQuestion);
// $("#current-choices").text(currentChoices);




var questions = [{
    question: "What is the only country that borders both the Caspian Sea and the Persian Gulf?",
    answer: ["Iraq", "Iran", "Saudi Arabia", "Turkey"],
    correctAnswer: "Iran"
}, {
    question: "The invasion of Fort Sumter was part of which war?",
    answer: ["French & Indian War", "American Revolutionary War", "American Civil War", "Spanish-American War"],
    correctAnswer: "American Civil War"
}, {
    question: "What city is the capital of North Dakota?",
    answer: ["Fargo", "Grand Forks", "Pierre", "Bismark"],
    correctAnswer: "Bismark"
}];

$("#start-button").on("click", function () {
    $(this).hide();
    run();
    game.displayQuestion(pointer);
    game.displayChoices(pointer);
    
});


var game = {
    wins: 0,
    losses: 0,
    
    displayQuestion: function (pointer) {
        currentQuestion = questions[pointer].question;
        $("#current-question").text(currentQuestion);
    },
    displayChoices: function (pointer) {
        for (var i = 0; i < questions[pointer].answer.length; i++) {
            var test = questions[pointer].answer[i];
            choiceList.append("<button type='button' class='btn btn-secondary'>" + test + "</button><br>");

        }

    }
}

var number = 30;
var intervalId;

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--;

    $("#count-down").html("<h2>Time Remaining: " + number + " seconds</h2>");
    if (number === 0) {
        stop();
        alert("Time Up!");
    }
}

function stop() {
    clearInterval(intervalId);
}
