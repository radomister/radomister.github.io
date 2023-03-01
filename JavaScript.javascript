const gameBoard = document.getElementById("game-board");
const newGameBtn = document.getElementById("new-game");
const checkGameBtn = document.getElementById("check-game");

const ROWS = 9;
const COLUMNS = 9;
const EMPTY_CELL = 0;
const MIN_CLUES = 17;

let puzzle = [];
let solution = [];

function createGameBoard() {
	for (let row = 0; row < ROWS; row++) {
		let tr = document.createElement("tr");

		for (let col = 0; col < COLUMNS; col++) {
			let td = document.createElement("td");
			td.id = `cell-${row}-${col}`;
			td.contentEditable = true;
			td.addEventListener("input", updateCell);

			if (row < 3 && col < 3 || // top-left square
				row < 3 && col > 5 || // top-right square
				row > 5 && col < 3 || // bottom-left square
				row > 5 && col > 5 || // bottom-right square
				row > 2 && row < 6 && col > 2 && col < 6 || // center square
				row === 3 && col === 3 || // top-left center cell
				row === 3 && col === 7 || // top-right center cell
				row === 7 && col === 3 || // bottom-left center cell
				row === 7 && col === 7) { // bottom-right center cell
				td.classList.add("disabled");
				td.contentEditable = false;
			}

			tr.appendChild(td);
		}

		gameBoard.appendChild(tr);
	}
}

function updateCell() {
	let [row, col] = this.id.split("-").slice(1);
	puzzle[row][col] = parseInt(this.innerText);
}

function generatePuzzle() {
	puzzle = new Array(ROWS).fill(null).map(() => new Array(COLUMNS).fill(EMPTY_CELL));
	solution = generateSolution();
	let clues = MIN_CLUES;

	while (clues > 0)
