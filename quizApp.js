function startQuiz () {
	var quiz = {
		name: "Eric Clapton",
		questions: [
			{question: "What kind of guitar does Eric Clapton play?",
			 answers: ["Stratocaster","Telecaster","Les Paul","Flying V"],
			 correct: 0
			},
			{question: "What is the name of one of Eric Clapton's guitars?",
			 answers: ["Reddie","Whitey","Blackie","Goldie"],
			 correct: 2
			},
			{question: "Which band was Eric Clapton NOT in?",
			 answers: ["Cream","The Yardbirds","Derek and the Dominos","Metallica"],
			 correct: 3
			},
			{question: "Eric Clapton is also known as?",
			 answers: ["Fasthand","Slowhand","Magic hand","Blues Boy"],
			 correct: 1
			},
			{question: "Eric Clapton played guitar on which Beatles song?",
			 answers: ["Let It Be","Here Comes the Sun","While My Guitar Gently Weeps","Hey Jude"],
			 correct: 2
			}
		]
	};

	function askQuestion(index) {
		var question = document.getElementById("question");
		question.innerHTML = "<p>" + quiz.questions[index].question + "</p>";

		var answers = document.getElementById("answers");
		answers.innerHTML = '';

		for (var i = 0; i < quiz.questions[index].answers.length; i++) {
			answers.innerHTML += "<input type='radio' name='answer' value='" + i + "'>" +
								 quiz.questions[index].answers[i] + "<br>";
		}

		answers.innerHTML += "<input type='submit' value='Submit'>";
	}

	function getInput(event) {
		event.preventDefault();
		var answerValue = document.getElementsByName("answer");
		var isCorrect;

		for (var i = 0; i < answerValue.length; i++) {
			if (answerValue[i].checked) {
				answerValue = parseInt(answerValue[i].value);
				break;
			}
		}

		if (answerValue.length > 1) {
			alert("Please choose an answer");
			return;
		}
		
		isCorrect = checkAnswer(answerValue);

		if (isCorrect) {
			score += 10;
		}

		questionIndex++;

		if (questionIndex >= quiz.questions.length) {
			updateStats(questionIndex,score);
			quizEnd(score,quiz.questions.length);
		}
		else {
			updateStats(questionIndex,score);
			askQuestion(questionIndex);
		}
	}

	function checkAnswer(answerValue) {
		if (answerValue === quiz.questions[questionIndex].correct) {
			return true;
		}
		return false;
	}

	function updateStats(questionIndex,score) {
		var info = document.getElementById("info");
		info.innerHTML = "<h1>Eric Clapton Quiz</h1)";
	
		if (questionIndex < quiz.questions.length) {
			info.innerHTML += "<h2>Question " + (questionIndex + 1) + " of " + quiz.questions.length + "</h2>";
			info.innerHTML += "<h2>Score: " + score + " points</h2>";
		}
		else {
			info.innerHTML += "<h2>Final Score: " + score + " points out of " + (quiz.questions.length * 10) + "</h2>";
		}
	}

	function quizEnd(totalScore,numQuestions) {
		var question = document.getElementById("question");
		question.innerHTML = "<p>Play again?</p>";

		var answers = document.getElementById("answers");
		answers.innerHTML = '';

		var playAgain = document.getElementById("playAgain");
		playAgain.innerHTML = "<input type='submit' value='Submit'>";
		playAgain.addEventListener("submit",startQuiz,false);
	}

	var questionIndex = 0;
	var score = 0;

	updateStats(questionIndex,score);
	askQuestion(questionIndex);

	var form = document.getElementById("answers");
	form.addEventListener("submit",getInput,false);
}

document.addEventListener('DOMContentLoaded',startQuiz);