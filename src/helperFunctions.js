const attackShip = (gameBoard, xCord, yCord) => {
	const attackedShip =
		gameBoard.ships[parseInt(gameBoard.board[yCord - 1][xCord - 1]) - 1];
	attackedShip.hit();
	gameBoard.board[yCord - 1][xCord - 1] = '※';
	checkIfShipHasSunk(attackedShip, gameBoard);

	function checkIfShipHasSunk(attackedShip, gameBoard) {
		if (attackedShip.isSunk()) {
			markShipArea('•', attackedShip, gameBoard);
			gameBoard.shipCount--;
			gameBoard.checkGameOver();
			if (gameBoard.isGameOver === true) console.log('GAME OVER!');
		}
	}
};

const checkDirectionalShipPlacement = (
	gameBoard,
	ship,
	xCord,
	yCord,
	boardSize
) => {
	xCord = parseFloat(xCord);
	yCord = parseFloat(yCord);
	if (ship.direction === 'horizontal') {
		if (ship.size + xCord - 1 > boardSize) return false;
		for (let i = 0; i < ship.size; i++) {
			if (gameBoard.board[yCord - 1][xCord - 1 + i] !== '_') return false;
		}
	} else {
		if (ship.size + yCord - 1 > boardSize) return false;
		for (let i = 0; i < ship.size; i++) {
			if (gameBoard.board[yCord - 1 + i][xCord - 1] !== '_') return false;
		}
	}
	return true;
};

const markShipOnBoard = (ship = {}, gameBoard = {}, xCord, yCord) => {
	if (ship.direction === 'horizontal') {
		ship.hitState.forEach((cell, i) => {
			gameBoard.board[yCord - 1][xCord - 1 + i] = `${ship.id}`;
		});
	} else if (ship.direction === 'vertical') {
		ship.hitState.forEach((cell, i) => {
			gameBoard.board[yCord - 1 + i][xCord - 1] = `${ship.id}`;
		});
	}
};

const markShipArea = (
	mark = '•',
	ship = {},
	gameBoard = {},
	xCord = ship.coordinates[0],
	yCord = ship.coordinates[1],
	boardSize = 10
) => {
	ship.hitState.forEach((cell, i) => {
		if (ship.direction === 'horizontal') {
			// mark horizontally areas above and bellow
			if (yCord < boardSize) {
				gameBoard.board[yCord][xCord - 1 + i] = `${mark}`;
			}
			if (yCord > 1) {
				gameBoard.board[yCord - 2][xCord - 1 + i] = `${mark}`;
			}
			// mark remaining areas
			if (xCord > 1) {
				if (yCord > 1) {
					gameBoard.board[yCord - 2][xCord - 2] = `${mark}`;
				}
				gameBoard.board[yCord - 1][xCord - 2] = `${mark}`;
				if (yCord < boardSize) {
					gameBoard.board[yCord][xCord - 2] = `${mark}`;
				}
			}

			if (xCord - 1 + ship.size < boardSize) {
				if (yCord > 1) {
					gameBoard.board[yCord - 2][xCord - 1 + ship.size] = `${mark}`;
				}
				gameBoard.board[yCord - 1][xCord - 1 + ship.size] = `${mark}`;
				if (yCord < boardSize) {
					gameBoard.board[yCord][xCord - 1 + ship.size] = `${mark}`;
				}
			}
		} else if (ship.direction === 'vertical') {
			if (xCord < boardSize) {
				// mark vertically areas on right and left
				gameBoard.board[yCord - 1 + i][xCord] = `${mark}`;
			}
			if (xCord > 1) {
				gameBoard.board[yCord - 1 + i][xCord - 2] = `${mark}`;
			}
			// mark horizontally remaining areas
			if (yCord > 1) {
				if (xCord > 1) {
					gameBoard.board[yCord - 2][xCord - 2] = `${mark}`;
				}
				gameBoard.board[yCord - 2][xCord - 1] = `${mark}`;
				if (xCord < boardSize) {
					gameBoard.board[yCord - 2][xCord] = `${mark}`;
				}
			}
			if (yCord - 1 + ship.size < boardSize) {
				if (xCord > 1) {
					gameBoard.board[yCord - 1 + ship.size][xCord - 2] = `${mark}`;
				}
				gameBoard.board[yCord - 1 + ship.size][xCord - 1] = `${mark}`;
				if (xCord < boardSize) {
					gameBoard.board[yCord - 1 + ship.size][xCord] = `${mark}`;
				}
			}
		}
	});
};

const handleShipCount = (gameBoard = {}, fleetQuantity = 6) => {
	gameBoard.shipCount++;
	if (gameBoard.shipCount === fleetQuantity) {
		gameBoard.isReady = true;
	}
};

const randomlyPlaceShip = (ship = {}, gameBoard, boardSize) => {
	if (ship.onBoard !== true) {
		const randX = Math.ceil(Math.random() * boardSize);
		const randY = Math.ceil(Math.random() * boardSize);
		if (Math.random() * 2 > 1) gameBoard.changeShipDirection(ship);
		gameBoard.placeShip(ship, randX, randY);
		randomlyPlaceShip(ship, gameBoard, boardSize);
	}
};

const makeRandomAIMove = (player, opponent, boardSize = 10) => {
	const randX = Math.ceil(Math.random() * boardSize);
	const randY = Math.ceil(Math.random() * boardSize);
	if (opponent.gameBoard.receiveAttack(randX, randY)) {
		opponent.gameBoard.receiveAttack(randX, randY);
		player.lastAIMove = [
			randX,
			randY,
			opponent.gameBoard.board[randY - 1][randX - 1],
		];
		if (opponent.gameBoard.board[randY - 1][randX - 1] === '※') {
			// console.log('AI hit move!');
			player.nextAIMove = 'down';
			return true;
		}
	} else {
		makeRandomAIMove(player, opponent);
	}
};

const makeSmartAIMove = (player, opponent) => {
	// console.log('Smart AI move');
	const lastX = player.lastAIMove[0];
	const lastY = player.lastAIMove[1];
	// const lastMoveStatus = player.lastAIMove[2];
	const atkOppGB = opponent.gameBoard.receiveAttack;
	player.nextAIMove !== ''
		? makeSmartMove(
				player.nextAIMove,
				player.moveIndicator,
				opponent.gameBoard.board
		  )
		: makeRandomAIMove(player, opponent);

	function makeSmartMove(direction = 'down', i = 1, opponentBoard = {}) {
		if (direction === 'down') {
			if (atkOppGB(lastX, lastY + i)) {
				atkOppGB(lastX, lastY + i);
				if (opponentBoard[lastY + i - 1][lastX - 1] !== '※') {
					player.nextAIMove = 'up';
					player.moveIndicator = 1;
				} else {
					console.log(player.moveIndicator);
					player.moveIndicator++;
				}
				return;
			} else {
				player.nextAIMove = 'up';
				makeSmartMove(player.nextAIMove);
			}
		} else if (direction === 'up') {
			if (atkOppGB(lastX, lastY - i)) {
				atkOppGB(lastX, lastY - i);
				if (opponentBoard[lastY - i - 1][lastX - 1] !== '※') {
					player.nextAIMove = 'left';
					player.moveIndicator = 1;
				} else {
					console.log(player.moveIndicator);
					player.moveIndicator++;
				}
				return;
			} else {
				player.nextAIMove = 'left';
				makeSmartMove(player.nextAIMove);
			}
		} else if (direction === 'left') {
			if (atkOppGB(lastX - i, lastY)) {
				atkOppGB(lastX - i, lastY);
				if (opponentBoard[lastY - 1][lastX - i - 1] !== '※') {
					player.nextAIMove = 'right';
					player.moveIndicator = 1;
				} else {
					console.log(player.moveIndicator);
					player.moveIndicator++;
				}
				return;
			} else {
				player.nextAIMove = 'right';
				makeSmartMove(player.nextAIMove);
			}
		} else if (direction === 'right') {
			if (atkOppGB(lastX + i, lastY)) {
				atkOppGB(lastX + i, lastY);
				if (opponentBoard[lastY - 1][lastX + i - 1] !== '※') {
					player.nextAIMove = '';
					player.moveIndicator = 1;
				} else {
					console.log(player.moveIndicator);
					player.moveIndicator++;
				}
				return;
			} else {
				player.nextAIMove = '';
				makeRandomAIMove(player, opponent, 10);
			}
		}
	}
};

export {
	attackShip,
	checkDirectionalShipPlacement,
	markShipOnBoard,
	markShipArea,
	handleShipCount,
	randomlyPlaceShip,
	makeSmartAIMove,
	makeRandomAIMove,
};
