// ------------ model ---------------

var playerXPicks = [];
var playerOPicks = [];
var unavailablePicks = {};
var currentPlayer = 'X';
var playerXName = '';
var playerOName = '';
var winner = null;
var lastWinner = 'X';
var winnerCount = {'X': 0, 'O': 0}

var winningCombinations = [
  [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]
];



// ----------- controller -----------
var declareWinner = (winner) => {
  if (winner === "tie") {
    document.getElementById("playerTurn").innerHTML = `This game is a tie!`;
  } else {
    winnerCount[winner]++
    lastWinner = winner;
    displayWinnerCount();
    document.getElementById("playerTurn").innerHTML = `Player ${winner} is the winner!`;
  }
}

var placePick = (event, updatePlayerTurn) => {
  if (event.target.id === 'board') {
    return;
  }
  var pick = event.target.id;
  if (unavailablePicks[pick] === undefined && (!winner)) {
    unavailablePicks[pick] = true;
    (currentPlayer === 'X') ?
      document.getElementById(pick).innerHTML = currentPlayer + playerXName :
      document.getElementById(pick).innerHTML = currentPlayer + playerOName;
    (currentPlayer === 'X') ?
      (playerXPicks.push(Number(pick)), isWinner(playerXPicks, declareWinner), currentPlayer = 'O') :
      (playerOPicks.push(Number(pick)), isWinner(playerOPicks, declareWinner), currentPlayer = 'X') ;
    if (!winner) {
      updatePlayerTurn(currentPlayer);
    }
  }
};

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

var isTie = (callback) => {
  if ((playerXPicks.length + playerOPicks.length) === 9 && (!winner)) {
    winner = 'tie';
    callback(winner);
  }
}

var resetGame = () => {
  playerXPicks = [];
  playerOPicks = [];
  unavailablePicks = {};
  currentPlayer = lastWinner;
  winner = null;
  for (var i = 1; i < 10; i++) {
    document.getElementById(i).innerHTML = '';
  }
  document.getElementById("playerTurn").innerHTML = `Player ${lastWinner} goes first`;
}



// ------------- view ---------------
// build event listener for placing player's pick
document.getElementById("board").addEventListener("click", (event)=> placePick(event, playerTurn));
// button to reset the board
document.getElementById("reset").addEventListener("click", (event)=> resetGame());

// shows winner count
var displayWinnerCount = () => {
  document.getElementById("winnerCount").innerHTML = `X wins: ${winnerCount.X} \\(@ , @)/ O wins: ${winnerCount.O}`;
}

// show current player
var playerTurn = (currentPlayer) => {
  document.getElementById("playerTurn").innerHTML = `Player ${currentPlayer}'s turn`;
}

// update with inputted names
var updateNames = () => {
  playerXName = ` (${document.getElementById("updateNames").elements.item(0).value})`;
  playerOName = ` (${document.getElementById("updateNames").elements.item(1).value})`;
}