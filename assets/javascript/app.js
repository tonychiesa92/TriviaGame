// set variables
var countDown = "";
var currentQuestion = "";
var currentChoices = "";
var pointer = 0;  //question we are on
var choiceList = $("#current-choices");
var audio = new Audio("assets/images/theme.mp3");
audio.loop = true;
document.body.appendChild(audio);


$("#count-down").hide();
$("#restart-button").hide();
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
    $("#count-down").show();
    game.displayQuestion(pointer);

});

$("#restart-button").on("click", function () {
    $(this).hide();
    $("#result-page").text("");
    $("#correct").text("");
    $("#incorrect").text("");
    $("#unanswered").text("");
    $("#count-down").show();
    game.displayQuestion(pointer);
    
});


var game = {
    wins: 0,
    losses: 0,
    unanswered: 0,

    displayQuestion: function (pointer) {
        run();
        audio.play();
        currentQuestion = questions[pointer].question;
        $("#current-question").text(currentQuestion);

        for (var i = 0; i < questions[pointer].answer.length; i++) {
            var test = questions[pointer].answer[i];
            //var str = "<button type='button' class='btn btn-secondary' id= 'c" + i + "'>" + test + "</button><br>";
            //alert(str);
            choiceList.append("<button type='button' class='btn btn-secondary' id='c" + i + "'>" + test + "</button><br>");
        }
        $("#c0").on("click", function () {
            game.validateAnswer(pointer, 0);
        });
        $("#c1").on("click", function () {
            game.validateAnswer(pointer, 1);
        });
        $("#c2").on("click", function () {
            game.validateAnswer(pointer, 2);
        });
        $("#c3").on("click", function () {
            game.validateAnswer(pointer, 3);
        });
    },
    validateAnswer: function (pointer, ans) {
        if(ans !== 15){
            stop();
        }
       
        $("#c0").hide();
        $("#c1").hide();
        $("#c2").hide();
        $("#c3").hide();
        if (questions[pointer].answer[ans] === questions[pointer].correctAnswer) {
            this.wins++;
            $("#current-question").text("Correct!");
            $("#current-choices").prepend("<img src='assets/images/correct-answer.gif'/>");
        }
        else {
            // if (ans === 15) {
            //     this.unanswered++;
            // }
            // else {
                this.losses++;
            // }

            $("#current-question").text("Wrong!");
            $("#wrong-answer").text("The correct answer is: " + questions[pointer].correctAnswer);
            $("#current-choices").prepend("<img src='assets/images/wrong-answer.gif'/>");
        }

        pointer++;

        if (pointer >= questions.length) {
            game.results();
        }
        else{
            setTimeout(function () {
                game.reset(pointer);
            }, 5000);
        }

    },

    reset: function (pointer) {
        number = 30;
        $("#count-down").html("<h2>Time Remaining: " + number + " seconds</h2>");
        $("#current-question").text("");
        $("#wrong-answer").text("");
        $("#current-choices").text("");
        game.displayQuestion(pointer);

    },

    results: function () {
        $("#count-down").hide();
        $("#restart-button").show();
       audio.pause();
       audio.currentTime = 0;
        $("#current-question").text("");
        $("#wrong-answer").text("");
        $("#current-choices").text("");
        $("#result-page").text("All done, here is how you did!");
        $("#correct").text("Correct Answers: " + this.wins);
        $("#incorrect").text("Incorrect Answers: " + this.losses);
        $("#unanswered").text("Unanswered: " + this.unanswered);
        this.wins=0;
        this.losses=0;
        this.unanswered=0;
        pointer=0;
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
        game.validateAnswer(pointer, 15);
    }
}

function stop() {
    clearInterval(intervalId);

}

// display wins looses
//format
//more questions
//