let buttonColours =["red", "blue", "green", "yellow"]

let gamePattern=[];

let userClickedPattern=[];

var started= false;

let level=0;

nextSequence =()=> {
    userClickedPattern =[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    checkAnswer(randomChosenColour);
   
}

$(".btn").click(function (){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1); 
});

checkAnswer =(currentLevel) =>{ 
    if(gamePattern [currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === currentLevel+1){
            console.log("success");
            setTimeout( () =>{
                nextSequence();
            },1000)
        }
    }else {
        startOver()
        playSound("wrong");
        $(".body").addClass(".game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout( () =>{
            $(".body").removeClass("#game-over");
        },200)
    }

}

animatePress = (currentColour)=>{
    $("#"+currentColour).addClass("pressed");
    setTimeout( () =>{
        $("#"+currentColour).removeClass("pressed");
    },100)
}



$(document).keypress(function () {
    nextSequence();
   
    $("#level-title").text("Level "+level);
})

playSound = (name) =>{
    let audio= new Audio("sounds/"+name+".mp3");
    audio.play();
} 

startOver=() =>{
level=0;
gamePattern =[];
started=false;
}