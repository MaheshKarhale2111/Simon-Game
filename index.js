var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["green", "red", "yellow", "blue"];

var level = 0;
var maxLevel =0;
var started = false;
var userColorId = 0;
var highScore = 0;

$(document).on("keypress", function () {
  if (started == false) {
    setTimeout(function () {
      cpuPlay();
    }, 300);
    started = true;
  }
});

function cpuPlay() {
  level++;
  $("#title-text").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColorChosen = buttonColors[randomNumber];
  buttonPlay(randomColorChosen);
  gamePattern.push(randomColorChosen);
  console.log(gamePattern);
}

$(".box").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  buttonPlay(userChosenColor);
  console.log(userClickedPattern);
  checkAnswer(userColorId);
});

function checkAnswer(id) {
  userColorId++;
  if (userClickedPattern[id] === gamePattern[id]) {
    console.log("sahi hai");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        cpuPlay();
      }, 1000);
      userClickedPattern.length = 0;
      userColorId = 0;
      console.log(level);
      if (level >= maxLevel) {
          maxLevel = level;
        highScore = maxLevel;
        $("#highScore-no").text(highScore);
      }
    }
  } else {
    wrong();
  }
}
function buttonPlay(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
  $("#" + color)
    .fadeIn(50)
    .fadeOut(50)
    .fadeIn(50);
  $("#" + color).on("click", function () {
    $(this).addClass("pressed");
    setTimeout(function () {
      $(".box").removeClass("pressed");
    }, 80);
  });
}

function wrong() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#title-text").text("Game Over, Press Any Key to Restart");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  userClickedPattern.length = 0;
  gamePattern.length = 0;
  userColorId = 0;
  started = false;
  level = 0;
}
