var question = 0;
var score = 0;

var quiz = document.getElementById('quiz');
var ques = document.getElementById('Question');
var choice1 = document.getElementById('Choice1');
var choice2 = document.getElementById('Choice2');
var choice3 = document.getElementById('Choice3');

var next = document.getElementById('next');
var result = document.getElementById('result');

var total = db.length;

fetch('db.json')
    .then((res) => {
        return res.json();
    })
    .then((importQuestion) => {
        questions = importQuestion;
        startQuiz();
    })
    .catch((err) => {
        console.error(err);
    });

function importQuestion (index) {
    var q = db.json[index];
    ques.textContent = (index + 1) + "." + q.question;
    choice1.textContent = q.Choice1;
    choice2.textContent = q.Choice2;
    choice3.textContent = q.Choice3;
}

function next() {
    var inputtedAnswer = document.querySelector('input[type=radio]:checked');
    if(!inputtedAnswer) {
        alert('Please make a selection.');
        return;
    }
    var answer = inputtedAnswer.value;
    if(db[question].answer == answer) {
        score+=1;
    }
    inputtedAnswer.check = false;
    question++;

    if(question = total - 1) {
        next.textContent='finish';
    }
    if(question = total) {
        quiz.style.display = 'none';
        result.style.display = '';
        result.textContent = 'Score:' + score;
        return;
    }
    importQuestion(question);
}
