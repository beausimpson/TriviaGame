
// start game button
// loads first question, starts timer
window.onload = function () {
    $("#start").click(timer.start);
}


// timer
//  Variable that will hold our setInterval that runs the timer
var intervalId;

var timerRunning = false;

// timer that counts down starting at 15 secs
var timer = {

    time: 15,

    start: function () {
        clearInterval(intervalId);
        //  TODO: Use setInterval to start the count here and set the clock to running.
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
        timer.time = 15;
        $("#timer-display").text("00:15");

    },

    count: function () {

        timer.time -= 1;
        console.log(timer.time);
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
}
// timer resets when question is answered
// if timer runs out before question is answered, answered is determind to be wrong


// 10 question quiz
// 4 possilble answers, 1 correct answer
// questions displayed on screen
// multiple choice of answers
// once question is answered, notify if answer is right or wrong
// move to next question
// timer resets for each questions

// once game is over. display 3 of right or wrong numbers
// restart game button
// resets timer
// reloads questions

