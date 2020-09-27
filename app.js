// sorular bu constructordan üreticez
function Question(text, choices, answer) {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
}

//Quiz Constructor
function Quiz(questions) {
	this.questions = questions;
	this.score = 0;
	this.questionIndex = 0;
}

//question proto
Question.prototype.checkAnswer = function (answer) {
	return this.answer === answer;
};

//quiz proto
Quiz.prototype.getQuestion = function () {
	return this.questions[this.questionIndex];
};

Quiz.prototype.isFinish = function () {
	return this.questions.length === this.questionIndex;
};

Quiz.prototype.guess = function (answer) {
	var question = this.getQuestion();

	if (question.checkAnswer(answer)) {
		this.score++;
	}

	this.questionIndex++;
};

var q1 = new Question(
	"What's the best programming",
	["C#", "Javascript", "Phyton", "Java"],
	"Javascript",
);

var q2 = new Question(
	"What's the most populer programming",
	["C#", "Javascript", "Visual basic", "Java"],
	"Javascript",
);

var q3 = new Question(
	"What's the best modern programming",
	["C#", "Javascript", "Visual basic", "Java"],
	"Javascript",
);

var questions = [q1, q2, q3];

// Start quiz

var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
	if (quiz.isFinish()) {
		showScore();
	} else {
		var question = quiz.getQuestion();
		var choices = question.choices;

		document.getElementById("question").textContent = question.text;

		for (var i = 0; i < choices.length; i++) {
			var element = document.getElementById("choice" + i);
			element.innerHTML = choices[i];

			guess("btn" + i, choices[i]);
		}

		showProgress();
	}
}

function guess(id, guess) {
	var btn = document.getElementById(id);
	btn.onclick = function () {
		quiz.guess(guess);
		loadQuestion();
	};
}

function showScore() {
	var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

	document.querySelector(".card-body").innerHTML = html;
}

function showProgress() {
	var totalQuestion = quiz.questions.length;
	var questionNumber = quiz.questionIndex + 1;

   document.getElementById("progress").innerHTML = 
   `Question `+questionNumber+` of `+totalQuestion;
}
