var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//event listener for keypress
$(document).keydown(function() {
  //calls nextSequence for first keypress
  if (level === 0) {
    nextSequence();
    $("#level-title").text("Level " + level);
  }
});


//event listener for user clicked button
$(".btn").click(function(event) {
  var userChosenColor = event.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


//next sequence in the game
function nextSequence() {
  //adds random button to the game pattern
  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  //shows the user the next button in sequence
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

  //increases value of level everytime nextSequence is called
  level++;
  $("#level-title").text("Level " + level);

  //emptys the userClickedPattern
  userClickedPattern = [];
}



//fucntion to play sound for the given name of the color
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}



//fucntion to animate the button pressed by the user
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//fucntion to check answer and restart game if pattern is different
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    //displays message when game ends and reset all values
    $("#level-title").text("Wrong, Press any key to restart");
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    //animation when game ends
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

  }
}