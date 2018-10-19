
// start game button
// starts timer
// set timer display to 1 min
window.onload = function () {
    $("#start").click(timer.start);
    $("#timer-display").text("01:00");
}


// timer
//  Variable that will hold our setInterval that runs the timer
var intervalId;
var timerRunning = false;
// timer that counts down starting at 15 secs
var timer = {

    time: 60,

    start: function () {
        clearInterval(intervalId);
        if (!timerRunning) {
            intervalId = setInterval(timer.count, 1000)
        }

        if (timer.time === 0) {
            timer.reset();
        }

    },

    stop: function () {
        clearInterval(intervalId);
    },

    reset: function () {
        timer.time = 60;
        $("#timer-display").text("01:00");

    },

    count: function () {

        timer.time -= 1;
        if (timer.time === 0) {
            timer.stop();
        }
        var convertedTime = timer.timeConverter(timer.time)
        $("#timer-display").text(convertedTime);
    },

    timeConverter: function (t) {

        //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
        var minutes = Math.floor(t / 60);
        var seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    }
};




// 10 question quiz
// 4 possilble answers, 1 correct answer
var myQuestions = [
    {
        question: "What is Bart's full first name?",
        answers: {
            a: "Bartrum",
            b: "Barty",
            c: "Barticus",
            d: "Bartholomew",
        },
        correctAnswer: "d",
    },
    
    {
        question: "What are the names of Marge's sisters?",
        answers: {
            a: "Patsy and Selina",
            b: "Patsy and Selma",
            c: "Patty and Selma",
            d: "Patty and Selina",
        },
        correctAnswer: "c",
    },
    
    {
        question: "What town do the Simpson's live in?",
        answers: {
            a: "Springfield",
            b: "Shelbyville",
            c: "Capitol City",
            d: "Ogdenville",
        },
        correctAnswer: "a",
    },
    
    {
        question: "What is the name of Bart's best friend?",
        answers: {
            a: "Ralph",
            b: "Martin",
            c: "Jimbo",
            d: "Milhouse",
        },
        correctAnswer: "d",
    },
    
    {
        question: "What was Maggie's first word?",
        answers: {
            a: "Mommy",
            b: "Daddy",
            c: "Bart",
            d: "Lisa",
        },
        correctAnswer: "b",
    },
    
    {
        question: "What is *not* a Bart Simpson catchphrase?",
        answers: {
            a: "Take is easy, dude",
            b: "I'm Bart Simpson, who the hell are you?",
            c: "No problemo",
            d: "Don't have a cow, man",
        },
        correctAnswer: "a",
    },
    
    {
        question: "What is the name of the school bully?",
        answers: {
            a: "Martin",
            b: "Nelson",
            c: "Bob",
            d: "Tim",
        },
        correctAnswer: "b",
    },
    
    {
        question: "What is the name of the groundsman at the school?",
        answers: {
            a: "Groundskeeper Wallie",
            b: "Groundskeeper Jock",
            c: "Groundskeeper Billy",
            d: "Groundskeeper Willie",
        },
        correctAnswer: "d",
    },
    
    {
        question: "What is the name of the shop owned by Apu?",
        answers: {
            a: "Kwik-E-Mart",
            b: "Fast-E-Mart",
            c: "Speed-E-Mart",
            d: "Dash-E-Mart",
        },
        correctAnswer: "a",
    },
    
    {
        question: "What are the names of Homer's two co-workers?",
        answers: {
            a: "Moe and Barney",
            b: "Carl and Lenny",
            c: "Skinner and Krabappel",
            d: "Wiggum and Abe",
        },
        correctAnswer: "b",
    },
    
];

var quizContainer = document.getElementById('quiz');
// $("#quiz").text(quizContainer);
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');


generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {
    
    // questions displayed on screen
    function showQuestions(questions, quizContainer) {
        // stores the output and the answer choices
        var output = [];
        var answers;
    
        // for each question
        for (var i = 0; i < questions.length; i++) {
            
            // resets the list of answers
            answers = [];
            
            // multiple choice of answers
            // for each answer in the question
            for (letter in questions[i].answers) {
                // add an html radio button
                answers.push(`<label><input type="radio" name="question${i}" value="${letter}"> ${letter}: ${questions[i].answers[letter]}</label><br>`)
            }
            
            // add question and answers to the output array
            output.push(`<div class="question"><h3>${questions[i].question}</h3></div>
            <div class="answers">${answers.join('')}</div>`);
        }
        
        // combine output list into html string and add to the page
        $(quizContainer).html(output.join(''));
    }
    
    function showResults(questions, quizContainer, resultsContainer) {
        
        // gather answer containers from our quiz
        // var answerContainers = quizContainer.querySelectorAll('.answers');
        var answerContainers = $('.answers:radio:checked').val();
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        var numWrong = 0;
        
        // for each question...
        for (var i = 0; i < questions.length; i++) {
            
            // find selected answer
            userAnswer = $('input[name=question' + i + ']:checked').val();
            
            // if answer is correct
            if (userAnswer === questions[i].correctAnswer) {
                // add to the number of correct answers
                numCorrect++;
                console.log(userAnswer);
                
                // color the answers green
                // answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else {
                // color the answers red
                // answerContainers[i].style.color = 'red';
                numWrong++;
            }
        }
        
        // once game is over. display # of right or wrong numbers
        // show number of correct answers out of total
        $(resultsContainer).html(`<p>${numCorrect} out of ${questions.length}<p>
        <button id='restart'>Restart Game</button>`);
        // restart game button
        $("#restart").on("click", function () {
            timer.stop;
        })
    }
    
    // show the questions
    showQuestions(questions, quizContainer);
    
    // when user clicks submit, show results
    $(submitButton).on("click", function () {
        showResults(questions, quizContainer, resultsContainer);
    })
}


// if timer runs out before question is answered, answered is determind to be wrong
// resets timer
// reloads questions
