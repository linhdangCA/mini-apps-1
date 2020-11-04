// ------------ model ---------------
// player x positions
// player o positions
// winning combinations
// spots that have already been picked
// show who's turn it is
// winner set to null
var playerXPicks = [];
var playerOPicks = [];
var winningCombinations = [
  [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]
];
var unavailablePicks = {};
var currentPlayer = 'X';
var winner = null;

// announce winner or tie
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
  // check for conflict and if there is already a winner
    // post player's choice in grid
    // swap to other player's turn
  // if winner is not null
    // update player turn on webpage
var placePick = (event, updatePlayerTurn) => {
  var pick = event.target.id;
  if (unavailablePicks[pick] === undefined && (!winner)) {
    unavailablePicks[pick] = true;
    document.getElementById(pick).innerHTML = currentPlayer;
    (currentPlayer === 'X') ?
      (playerXPicks.push(Number(pick)), isWinner(playerXPicks, declareWinner), currentPlayer = 'O') :
      (playerOPicks.push(Number(pick)), isWinner(playerOPicks, declareWinner), currentPlayer = 'X') ;
    if (!winner) {
      updatePlayerTurn(currentPlayer);
    }
  }
};

// logic for winner
  // player picks must be greater than 2
    // loop over winning combinations
      // loop over winning combination
        // if value is not included in player's number
          // break
            // if all match
              // invoke callback
  // check if game is a tie
var isWinner = (playerPicks, callback) => {
  if (playerPicks.length > 2) {
    for (var i = 0; i < winningCombinations.length; i++) {
      var winningCombination = winningCombinations[i];
      for (var j = 0; j < winningCombination.length; j++) {
        if (!playerPicks.includes(winningCombination[j])) {
          break;
        }
        if (j === winningCombinations[i].length - 1) {
          winner = currentPlayer
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
var resetGame = () => {
  // set both players back to zero picks
  // set winner to null
  // loop over to clear the board and set player X to start
  playerXPicks = [];
  playerOPicks = [];
  unavailablePicks = {};
  winner = null;
  for (var i = 1; i < 10; i++) {
    document.getElementById(i).innerHTML = '';
  }
  document.getElementById("playerTurn").innerHTML = 'Player X goes first';
}



// ------------- view ---------------
// build event listener for placing player's pick
document.getElementById("board").addEventListener("click", (event)=> placePick(event, playerTurn));
// button to reset the board
document.getElementById("reset").addEventListener("click", (event)=> resetGame());



