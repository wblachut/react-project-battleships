import { GameBoard as Board } from './Battleships'

export const Player = (name, side, type = 'human', gameBoard) => {
	const player = {
		name,
		side,
		type,
		gameBoard,
		isWinner: false,
		isMakingMove: false,
		makeMove: (opponent, xCord, yCord) => {
			let legal = opponent.gameBoard.receiveAttack(xCord, yCord)
			if (legal) {
				opponent.gameBoard.receiveAttack(xCord, yCord)
				// player.passMove(opponent)
				return true
			} else {
				console.log('NOT A LEGAL MOVE')
				return false
			}
		},
		makeAIMove: (opponent) => {
			let randX = Math.ceil(Math.random() * 10)
			let randY = Math.ceil(Math.random() * 10)
			let legal = opponent.gameBoard.receiveAttack(randX, randY)
			console.log('AI Move:', randX, randY, 'was legal?', legal)
			if (legal) {
				opponent.gameBoard.receiveAttack(randX, randY)
				// console.log(opponent.gameBoard)
				// player.passMove(opponent)
				return true
			} else {
				player.makeAIMove(opponent)
			}
		},
		passMove: (opponent) => {
			player.isMakingMove = false
			opponent.isMakingMove = true
		},

		hasWon: (board) => {
			// opposite board
			board.isGameOver === true
				? (player.isWinner = true)
				: (player.isWinner = false)
		},
	}
	return player
}

export const CreatePlayer = (side, type) => {
	if (side === 'light') {
		let boardLightSide = Board('light side')
		boardLightSide.makeBoard()
		boardLightSide.getShips()
		boardLightSide.placeShipsAtRandom()
		return Player('Jedi Master', side, type, boardLightSide)
	}
	if (side === 'dark') {
		let boardDarkSide = Board('dark side')
		boardDarkSide.makeBoard()
		boardDarkSide.getShips('dark')
		boardDarkSide.placeShipsAtRandom()
		return Player('Lord Sith', side, type, boardDarkSide)
	}
}
