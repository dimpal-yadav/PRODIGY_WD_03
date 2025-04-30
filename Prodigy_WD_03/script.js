const board = document.getElementById('board');
const cells = Array.from(board.getElementsByClassName('cell'));
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

  if (gameState[clickedIndex] !== '' || !gameActive) {
    return;
  }

  gameState[clickedIndex] = currentPlayer;
  clickedCell.textContent = currentPlayer;

  if (checkWinner()) {
    statusDisplay.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== '')) {
    statusDisplay.textContent = 'It\'s a draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  return winningConditions.some(condition => {
    const [a, b, c] = condition;
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function handleReset() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.textContent = '');
  statusDisplay.textContent = `${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleReset);
