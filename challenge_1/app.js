// ------------ model ---------------
// build the board
// player x positions
var playerXPicks = [];
// player o positions
var playerOPicks = [];
// winning combinations
var winningCombinations = [
  [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]
];
// spots that have already been picked
var unavailablePicks = {};
// show who's turn it is
var currentPlayer = 'X';

// render the placed pick
// render winner or tie

var winner = null;

var declareWinner = (winner) => {
  if (winner === "tie") {
    document.getElementById("playerTurn").innerHTML = `This game is a tie!`;
  } else {
    document.getElementById("playerTurn").innerHTML = `Player ${winner} is the winner!`;
  }
}

// show current player
var playerTurn = (currentPlayer) => {
  document.getElementById("playerTurn").innerHTML = `Player ${currentPlayer}'s turn`;
}

// ----------- controller -----------
// logic for placing pick
var placePick = (event, callback) => {
  var pick = event.target.id;
  // check for conflict and if there is already a winner
  if (unavailablePicks[pick] === undefined && (!winner)) {
    unavailablePicks[pick] = true;
    // post player's choice in grid
    document.getElementById(pick).innerHTML = currentPlayer;
    // swap to other player's turn
    (currentPlayer === 'X') ?
      (playerXPicks.push(Number(pick)), isWinner(playerXPicks, declareWinner), currentPlayer = 'O') :
      (playerOPicks.push(Number(pick)), isWinner(playerOPicks, declareWinner), currentPlayer = 'X') ;

    if (!winner) {
      callback(currentPlayer);
    }
  }
};

// logic for winner
var isWinner = (playerPicks, callback) => {
  // player picks must be greater than 2
  if (playerPicks.length > 2) {
    // loop over winning combinations
    for (var i = 0; i < winningCombinations.length; i++) {
      // loop over winning combination
      var winningCombination = winningCombinations[i];
      for (var j = 0; j < winningCombination.length; j++) {
        // if value is not included in player's number
        if (!playerPicks.includes(winningCombination[j])) {
          // break
          break;
        }
        // if all match
        if (j === winningCombinations[i].length - 1) {
          winner = currentPlayer
          // invoke callback
          callback(currentPlayer);
        }
      }
    }
  }
  isTie(callback);
}

// tie if all 9 spots are filled and no winner
var isTie = (callback) => {
  if ((playerXPicks.length + playerOPicks.length) === 9) {
    winner = 'tie';
    callback(winner);
  }
}

// functionality to button to reset the board




// ------------- view ---------------
// build event listener for placing player's pick
document.getElementById("board").addEventListener("click", (event)=> placePick(event, playerTurn));
// button to reset the board




