let buttonColours = ["red", "blue", "green", "yellow"];

let userClickedPattern = [];
let gamePattern = [];

let started = false;
let level = 0;

// Start of the game
$(document).keydown(function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// User's input registered and stored in userClickedPattern array
$(".btn").click(function(e) {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// The game
function nextSequence() {
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);    
}

// User's answers checked
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
;
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver()
    }
}

// Button sounds
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();     
}

// Button animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

// Game restart
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}