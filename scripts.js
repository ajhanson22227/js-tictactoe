const Player = (name, symbol) => {
	const getName = () => name;
	const getSymbol = () => symbol;

	return {
		getName,
		getSymbol
	}
}

const gameBoard = (() => {
	let win = false;
	let draw = false;
	let boardArray = [
		["","",""],
		["","",""],
		["","",""]
	]

	const reset = () => {
		win = false;
		draw = false;
		clearBoard();
		displayController.clearHTMLBoard();
		createHTMLBoard();
		currentPlayer = playerOne;
		displayController.changePlayerStatus();
	}

	const clearBoard = () => {
		boardArray = [
			["","",""],
			["","",""],
			["","",""]
		]
	}
	const createHTMLBoard = () => {
		boardArray.forEach((row, rInd) => {
			row.forEach( (col, cInd) => {
				let gridDiv = document.getElementById('grid-container')
				let squareDiv = document.createElement('div')
				squareDiv.classList += `grid-square ${rInd}${cInd}`

				squareDiv.addEventListener('click', function(){
					if (!win && !draw && boardArray[rInd][cInd] == ''){
						squareDiv.textContent = currentPlayer.getSymbol();
						addMark(rInd, cInd, currentPlayer)
					}

				})
				gridDiv.appendChild(squareDiv)
			})
		})
	}

	const addMark = (row, col, mark) => {
		if (boardArray[row][col] == ''){
			boardArray[row][col] = mark.getSymbol();
		}
		checkWin();
		if (!win) checkDraw();
		if (draw) console.log("Tis draw")
		if (win || draw) return;
		swapPlayer();
		
	}

	const swapPlayer = () => {
		currentPlayer = currentPlayer == playerTwo ? playerOne : playerTwo;
		displayController.changePlayerStatus();
	}

	const checkWin = () => {
		if (boardArray[0][0] != '' && boardArray[0][0] == boardArray[0][1] && boardArray[0][1] == boardArray[0][2] ||
			boardArray[1][0] != '' && boardArray[1][0] == boardArray[1][1] && boardArray[1][1] == boardArray[1][2] || 
			boardArray[2][0] != '' && boardArray[2][0] == boardArray[2][1] && boardArray[2][1] == boardArray[2][2]){
			console.log(`${currentPlayer.getName()} wins..`)
			win = true;
			displayController.displayWinner();
		}
		else if (	boardArray[0][0] != '' && boardArray[0][0] == boardArray[1][0] && boardArray[1][0] == boardArray[2][0] ||
					boardArray[0][1] != '' && boardArray[0][1] == boardArray[1][1] && boardArray[1][1] == boardArray[2][1] || 
					boardArray[0][2] != '' && boardArray[0][2] == boardArray[1][2] && boardArray[1][2] == boardArray[2][2]){
			console.log(`${currentPlayer.getName()} wins..`)
			win = true;
			displayController.displayWinner();
		}
		else if (	boardArray[0][0] != '' && boardArray[0][0] == boardArray[1][1] && boardArray[1][1] == boardArray[2][2] ||
					boardArray[0][2] != '' && boardArray[0][2] == boardArray[1][1] && boardArray[1][1] == boardArray[2][0]){
			console.log(`${currentPlayer.getName()} wins..`)
			win = true;
			displayController.displayWinner();
		}
	}

	const checkDraw = () => {
		if (! (boardArray.some(row => row.includes('')))) draw = true;
		displayController.displayDraw();
	}

	const display = () => {
		console.log(boardArray)
	}

	return {
		createHTMLBoard,
		reset,
		display
	}
})();

const displayController = (() => {
	const playerDiv = document.getElementById('current-player-status');


	const changePlayerStatus = () => {
		playerDiv.textContent = `It is ${currentPlayer.getName()}'s turn!`
	}

	const displayWinner = () => {
		playerDiv.textContent = `${currentPlayer.getName()} Wins The Game!`
	}
	const displayDraw = () => {
		playerDiv.textContent = `It's a darned draw..`
	}

	const clearHTMLBoard = () => {
		let gridDiv = document.getElementById('grid-container')
		while (gridDiv.firstChild) {
		    gridDiv.removeChild(gridDiv.firstChild);
		}
	}

	return {
		changePlayerStatus,
		displayWinner,
		displayDraw,
		clearHTMLBoard
	}
})();


let playerOneName = ''
while (playerOneName.length == 0)
	playerOneName = prompt('Player 1 Name?')
let playerTwoName = ''
while (playerTwoName.length == 0)
	playerTwoName = prompt('Player 2 Name?')


const playerOne = Player(playerOneName, 'X');
const playerTwo = Player(playerTwoName, 'O');
let currentPlayer = playerOne;


gameBoard.createHTMLBoard();
displayController.changePlayerStatus();

const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', function(){
	gameBoard.reset();
})

const newGameButton = document.getElementById('new-game-button');
newGameButton.addEventListener('click', function(){
	window.location.reload();
})