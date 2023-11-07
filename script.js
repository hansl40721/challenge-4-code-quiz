const correct = document.getElementById("correct-incorrect");
const scoreTracker = document.getElementById("scoreTracker");
const start = document.getElementById("start");
const questionContainer = document.getElementById("questions");
var questionNumber = document.getElementById("question-number");
const saveHighscore = document.getElementById("highscoreSave");
const timer = document.getElementById("timer");
const highscoreContainer = document.getElementById("highscores");
var playerInitials;
var playerScore = 0;
var timeLeft = 90;
var index = 0;
var highscores = [];
highscores[0] = ["LCH", "5"];
var scoreToSave;
var interval;



var questions = [
    {
        question: "What tag do you give the title element of a webpage?",
        optionA: "p",
        optionB: "div",
        optionC: "h1",
        optionD: "title"
    },

    {
        question: "What does a # refer to in CSS?",
        optionA: "id",
        optionB: "class",
        optionC: "number",
        optionD: "None of the above"
    },

    {
        question: "What do you use to stop a loop from running again?",
        optionA: "switch",
        optionB: "if/else",
        optionC: "Math.round",
        optionD: "break"
    },

    {
        question: "What does CSS stand for?",
        optionA: "Concentrated Style Semantics",
        optionB: "Correct Stored Standards",
        optionC: "Cascading Style Sheets",
        optionD: "Computer Software Styling"
    },

    {
        question: "In HTML, what do you call tags that identify the content they contain?",
        optionA: "Encapsulated",
        optionB: "Semantic",
        optionC: "Accurate",
        optionD: "Titular"
    },

    {
        question: "How many li's can be stored in one ul?",
        optionA: "As many as you want",
        optionB: "5",
        optionC: "10",
        optionD: "100"
    },

    {
        question: "Which symbols mark an array and its contents in JavaScript?",
        optionA: "{ }",
        optionB: ": :",
        optionC: "( )",
        optionD: "[ ]"
    },

    {
        question: "Given a standard for loop, which section (divided by a semi-colon) indicates the break condition of the loop?",
        optionA: "First",
        optionB: "Second",
        optionC: "Third",
        optionD: "Fourth"
    },

    {
        question: "If you initialize a variable within a function in JavaScript, its scope would be considered ______",
        optionA: "global",
        optionB: "universal",
        optionC: "local",
        optionD: "hidden"
    },

    {
        question: "What does DOM stand for?",
        optionA: "Document Object Model",
        optionB: "Definitive Obstruction Mode",
        optionC: "Document Order Model",
        optionD: "Double Object Maker"
    }
]

function init() {
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

    if (storedHighscores !== null) {
        highscores = storedHighscores;
    }
}

function gameHandler() {
    timerHandler();
    if (index < 10) {
        document.getElementById("hidden").style.display = "block";
        document.getElementById("shown").style.display = "none";
        playerScore.textContent = playerScore;
        questionNumber.textContent = index + 1;
        scoreTracker.textContent = playerScore;
        questionContainer.innerHTML = ``;
        questionContainer.innerHTML = `
                <div class="question">
                    <p class="query">${questions[index].question}</p>
                    <button class="optionButton" id="first">${questions[index].optionA}</button><br></br>
                    <button class="optionButton" id="second">${questions[index].optionB}</button><br></br>
                    <button class="optionButton" id="third">${questions[index].optionC}</button><br></br>
                    <button class="optionButton" id="fourth">${questions[index].optionD}</button><br></br>
                </div>
            `;
    } else {
        endgameHandler();
    }
}

function timerHandler() {
    timer.style.display = "inline-block";
    interval = setInterval(function () {
        timer.textContent = timeLeft;
        timeLeft--;
        if (timeLeft === 0 || timeLeft < 0) {
            endgameHandler();
        }
    }, 1000);
}

function checkAnswers(event) {
    // Correct answers by question: c, a, d, c, b, a, d, b, c, a
    let value = event.target.id;
    if (value === "first" || value === "second" || value === "third" || value === "fourth") {
        var compare = event.target.textContent;
        console.log(compare);

        var correctAnswer;

        switch (index) {
            case 0: correctAnswer = questions[index].optionC; break;
            case 1: correctAnswer = questions[index].optionA; break;
            case 2: correctAnswer = questions[index].optionD; break;
            case 3: correctAnswer = questions[index].optionC; break;
            case 4: correctAnswer = questions[index].optionB; break;
            case 5: correctAnswer = questions[index].optionA; break;
            case 6: correctAnswer = questions[index].optionD; break;
            case 7: correctAnswer = questions[index].optionB; break;
            case 8: correctAnswer = questions[index].optionC; break;
            case 9: correctAnswer = questions[index].optionA; break;
        }
        console.log(correctAnswer);
        if (compare === correctAnswer) {
            playerScore++; index++;
            correct.textContent = "Correct!";
            clearInterval(interval);
        } else {
            index++;
            correct.textContent = "Incorrect!"
            timeLeft -= 15;
            clearInterval(interval);
        }
        gameHandler();
    }
}

function endgameHandler() {
    document.getElementById("hidden").style.display = "none";
    document.getElementById("endgame").style.display = "block";
    document.getElementById("finalScore").textContent = playerScore;
}

function highscoreHandler(event) {
    event.preventDefault();
    playerInitials = document.getElementById("playerInitials").value;
    scoreToSave = playerScore;
    for (let i = 0; i < 10; i++) {
        if (highscores[i] !== undefined) {
            const scoreToBeat = highscores[i][1];
            if (scoreToSave > scoreToBeat) {
                console.log(highscores);
                highscores.splice(i, 0, [playerInitials, scoreToSave]);
                break;
            }
        } else {
            highscores.push([playerInitials, scoreToSave]);

            if (highscores.length > 10) {
                highscores.length = 10;
            }
            break;
        }
    }
    storeHighscore();
    displayHighscores();
    console.log(highscores);
}

function storeHighscore() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}

function displayHighscores() {
    document.getElementById("highscores").style.display = "block"
    for (let i = 0; i < highscores.length; i++) {
        var savedInitials = highscores[i][0];
        var highscoreEl = highscores[i][1];

        var highscoreToDisplay = document.createElement("div");
        highscoreToDisplay.setAttribute("class", "highscoreEl");
        highscoreToDisplay.innerHTML =
            `
        <div class="scoreboardEl">${savedInitials} ----- ${highscoreEl}</div>
        `
        highscoreContainer.append(highscoreToDisplay);
    }
}

function restart() {
    index = 0;
    playerScore = 0;
    timeLeft = 120;
}

start.addEventListener("click", gameHandler);
questionContainer.addEventListener("click", checkAnswers);
saveHighscore.addEventListener("click", highscoreHandler);

init();