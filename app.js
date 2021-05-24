
var btnColors = ["red","green","blue","yellow"],gamePattern = [],userClickedPattern = [];
var level = 0,started = false;

$(document).on("keydown",function(){
    if(!started){
        nextSequence();
        started = true;
    }
})

$(".btn").on("click",function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
})

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else {
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level +=1;
    $("h1").text("Level " + level);

    var randomNumer = Math.floor(Math.random() * 4);
    var randomChosenColor = btnColors[randomNumer];
    gamePattern.push(randomChosenColor);
    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(function(){
        $("."+currentColor).removeClass("pressed");
    },100);
}