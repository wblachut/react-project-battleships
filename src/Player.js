import { GameBoard as Board } from './Battleships';

export const Player = (name, side, type = 'human', gameBoard) => {
	const player = {
		name,
		side,
		type,
		gameBoard,
		isWinner: false,
		isMakingMove: false,
		makeMove: (opponent, xCord, yCord) => {
			let legal = opponent.gameBoard.receiveAttack(xCord, yCord);
			if (legal) {
				return true;
			} else {
				console.log('NOT A LEGAL MOVE');
				return false;
			}
		},
		makeAIMove: (opponent) => {
			let randX = Math.ceil(Math.random() * 10);
			let randY = Math.ceil(Math.random() * 10);
			let legal = opponent.gameBoard.receiveAttack(randX, randY);
			console.log('AI Move:', randX, randY, 'was legal?', legal);
			if (legal) {
				opponent.gameBoard.receiveAttack(randX, randY);
				return true;
			} else {
				player.makeAIMove(opponent);
			}
		},
		// not used so far
		passMove: (opponent) => {
			player.isMakingMove = false;
			opponent.isMakingMove = true;
		},
	};
	return player;
};

export const CreatePlayer = (side, type) => {
	let gameBoard = Board(`${side}`);
	gameBoard.makeBoard();
	gameBoard.getShips(`${side}`);
	if (type === 'computer') {
		gameBoard.placeShipsAtRandom();
	}
	let name;
	if (side === 'dark') {
		name = 'Lord Sith';
	} else {
		name = 'Jedi Master';
	}
	return Player(name, side, type, gameBoard);
};
