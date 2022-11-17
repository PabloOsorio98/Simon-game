var gamePattern = [];
var userClickedPattern = [];
var buttonsColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = false;

$(".btn").click(function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(function(){
    if(!gameStarted){
        nextSequence();
        gameStarted = true;
    }
    
});

function nextSequence(){
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonsColors[randomNumber];
    gamePattern.push(randomChosenColor);
    level++;
    console.log(gamePattern);
    $("#level-title").text("Level " + level);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(color){
    var audio = new Audio("sounds/"+ color + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){$("#" + currentColor).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            userClickedPattern = [];
            setTimeout(function(){nextSequence();}, 1000);
        }
    }
    else{
        console.log("wrong");
        StartOver();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over");}, 200);

        var gameOverSound = new Audio("sounds/wrong.mp3");
        gameOverSound.play();

        $("h1").text("Game Over, Press Any Key To Restart");


    }


}

function StartOver(){
    console.clear();
    gameStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}






