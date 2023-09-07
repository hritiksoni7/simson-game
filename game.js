var gamePattern=[];
var buttonColor=["red","blue","green","yellow"];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level "+level );
        nextSequence();
        started=true;
    }
});

$(".btn").click(function handler(event){

    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkanswer((userClickedPattern.length)-1);
});

function nextSequence()
{
    userClickedPattern=[];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor=buttonColor[randomNumber];

    gamePattern.push(randomChosenColor);

    
    $("#"+randomChosenColor).fadeOut();
    $("#"+randomChosenColor).fadeIn();
    playSound(randomChosenColor);
    
}
function playSound(name){
        
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

 }
 
   
    
    
 function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){$("#"+currentColor).removeClass("pressed")},100)

 }

function checkanswer(currentlevel){
    if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
        console.log("success");

        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("level-title").text("Game Over, Press Any Key to Restart");
        
            startover();
        

    }

}
function startover(){
    level=0;
    started=false;
    gamePattern=[];
}








