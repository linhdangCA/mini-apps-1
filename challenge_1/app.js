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


// ----------- controller -----------
// logic for placing pick
var placePick = (event) => {
  var pick = event.target.id;
  // check for conflict
  if (unavailablePicks[pick] === undefined) {
    unavailablePicks[pick] = true;
    document.getElementById(pick).innerHTML = currentPlayer;
    // swap to other player's turn
    currentPlayer === 'X' ? (playerXPicks.push(pick), currentPlayer = 'O') : (playerOPicks.push(pick), currentPlayer = 'X');
    playerTurn(currentPlayer);
  }
};
// logic for winner and tie
  // map winning combinations combinations
  // tie if all 9 spots are filled and no winner
// functionality to button to reset the board




// ------------- view ---------------
// show current player
var playerTurn = (currentPlayer) => {
  document.getElementById("playerTurn").innerHTML = `Player ${currentPlayer}'s turn`;
}
// build event listener for placing player's pick
document.getElementById("board").addEventListener("click", (event)=> placePick(event));
// button to reset the board




