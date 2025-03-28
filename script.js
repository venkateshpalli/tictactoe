const board = document.getElementById('game-board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', '']; // Empty board
let gameActive = true;

// Function to handle cell clicks
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

  // Ignore click if the cell is already filled or if the game is over
  if (gameState[clickedIndex] !== '' || !gameActive) return;

  // Update the game state and UI
  gameState[clickedIndex] = currentPlayer;
  clickedCell.classList.add(currentPlayer.toLowerCase());
  clickedCell.textContent = currentPlayer;

  // Check if the game has been won
  if (checkWinner()) {
    status.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameState.every(cell => cell !== '')) {
    // Check if it's a draw
    status.textContent = 'It\'s a draw!';
    gameActive = false;
  } else {
    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `${currentPlayer}'s turn`;
  }
}

// Function to check if there's a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

// Reset the game
function resetGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  status.textContent = `${currentPlayer}'s turn`;

  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
  });
}

board.addEventListener('click', handleCellClick);
resetButton.addEventListener('click', resetGame);
