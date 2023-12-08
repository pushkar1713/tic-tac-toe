const cells = document.querySelectorAll(".box");
const statusText = document.querySelector("#statusText");
const restartButton = document.getElementById("Restart");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

init(); // this will take care of any setup we need to take care pf before we start the game

function init() {
  cells.forEach((box) => box.addEventListener("click", cellclicked));
  restartButton.addEventListener("click", restartGame);
  statusText.textContent = `${currentPlayer}'s Turn`;
  running = true;
}

function cellclicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let index = 0; index < winConditions.length; index++) {
    const condtion = winConditions[index];
    const cellA = options[condtion[0]];
    const cellB = options[condtion[1]];
    const cellC = options[condtion[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} Wins`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw`;
    running = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s Turn`;

  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
