const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6],            // diagonals
];

const checkWin = () => {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      isGameActive = false;
      statusText.textContent = `🎉 Player ${gameState[a]} Wins!`;
      combo.forEach(i => cells[i].classList.add("winner"));
      return;
    }
  }

  if (!gameState.includes("")) {
    isGameActive = false;
    statusText.textContent = "It's a Tie! 🤝";
  }
};

const handleClick = (e) => {
  const index = e.target.dataset.index;
  if (!gameState[index] && isGameActive) {
    gameState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    checkWin();
    if (isGameActive) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
  }
};

const resetGame = () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player X's Turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
};

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
