$(document).ready(function(){

  // Initializers
  var init = function() {};
  var activeGame = new init();


  // Global

  var solution = Math.round(Math.random() * 100);
  var picked = [];
  var guesses = 5;
  var hintUpper =  Math.round(Math.random() * 10)
  var hintLower =  Math.round(Math.random() * 10)


  // Buttons
  $("#playerGuess").on("keypress", function(e){
    if (e.which == 13) {
      activeGame.numCheck();
    }
  })

  $("#guessSubmit").on("click", function(){
    activeGame.numCheck();
  })

  $("#resetGame").on("click", function(){
    document.location.reload(true);
  })
  $("#numHint").on("click", function(){
    activeGame.hint();
  })


  activeGame = {

    verifyInput : function() {
      var userNum = Number($("#playerGuess").val());
      if ((!Number(userNum)) || (userNum > 100) || (userNum < 1)) {
        alert("Please enter a number between 1 and 100.");
      } else if (picked.indexOf(userNum) !== -1){
        alert("You already guessed this number!");
      } else if((userNum <= 100) && (userNum >= 1)) {
        guesses--;
        $("#guessNum").text("You have " + guesses + " guesses left!");
        return userNum;
      }
    },

    numCheck : function() {
      var userNum = this.verifyInput($("#playerGuess").val());
      if ((userNum === solution) && (guesses >= 0)) {
          $("body").css("background-color", "#ddd");
          $("#youWin").show();
          $("#playerStatus").text("You win! The number was " + solution + ".");
      } else if ((guesses === 0) && (userNum !== solution)) {
          $("#playerStatus").text("No luck! The number was " + solution + ".");
          picked.push(userNum);
      } else if ((guesses !== 0) && (userNum !== solution)) {
          this.updateGuess(userNum);
          this.coldHot(userNum);
          this.lowerHigher(userNum);
      }
    },

    coldHot : function(userNum) {
      var diff = (solution - userNum);

      if (diff < 5) {
        // super hot
        $("body").css("background-color", "FireBrick");
        $("#playerStatus").text("Super hot!");
      } else if ((diff > 6) && (diff < 20)) {
        // hot!
        $("body").css("background-color", "OrangeRed");
        $("#playerStatus").text("Hot!");
      } else if ((diff > 20) && (diff < 30)) {
        // warm!
        $("body").css("background-color", "Tomato");
        $("#playerStatus").text("Warm!");
      } else if ((diff > 30) && (diff < 50)) {
        // cold
        $("body").css("background-color", "DeepSkyBlue");
        $("#playerStatus").text("Cold!");
      } else {
        // freezing
        $("body").css("background-color", "DodgerBlue");
        $("#playerStatus").text("Freezing!");
      }
    },

    lowerHigher : function(userNum) {
      if (userNum < solution) {
        $("#lowerHigher").text("Guess higher!");
      } else {
        $("#lowerHigher").text("Guess lower!");
      }
    },

    updateGuess : function(userNum) {
      picked.push(userNum);
      $("#picks").text(picked);
    },

    hint : function() {
      var playerHint = "";
      if ((solution < 90) && (solution > 11)){
        playerHint = "Number is between " + (solution - hintLower) + " and " + (solution + hintUpper) + ".";
        $("#playerHint").text(playerHint);
      } else if ((solution < 11)) {
        playerHint = "Number is between 0 and 10";
        $("#playerHint").text(playerHint);
      } else if ((solution > 90)) {
        playerHint = "Number is between 90 and 100";
        $("#playerHint").text(playerHint);
      }
    }
  };


});
