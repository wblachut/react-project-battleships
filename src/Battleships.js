export const Ship = (name = 'ship', size = 1, direction = 'horizontal') => {
	const ship = {
		name,
		size,
		direction,
		hitState: Array(size).fill('o'),
		hit: () => {
			const nextHit = ship.hitState.findIndex((field) => field === 'o');
			ship.hitState[nextHit] = 'hit';
		},
		isSunk: () => !ship.hitState.includes('o'),
	};
	return ship;
};

export const GameBoard = (playerSide) => {
	const gameBoard = {
		side: playerSide,
		board: [],
		ships: [],
		shipCount: 0,
		isReady: false,
		isGameOver: false,

		emptyBoard: () => {
			return [
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
				['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
			];
		},
		makeBoard: () => {
			gameBoard.board = gameBoard.emptyBoard();
			gameBoard.shipCount = 0;
			gameBoard.isReady = false;
			gameBoard.isGameOver = false;
		},

		createShips: (playerSide) => {
			if (playerSide === 'dark') {
				return [
					Ship('TIE-fighter', 1),
					Ship('TIE-fighter', 1),
					Ship('TIE-bomber', 2),
					Ship('TIE-bomber', 2),
					Ship('Star Destroyer', 3),
					Ship('Super Star Destroyer', 4),
				];
			} else {
				return [
					Ship('Shuttle', 1),
					Ship('Shuttle', 1),
					Ship('X-wing starfighter', 2),
					Ship('X-wing starfighter', 2),
					Ship('CR90 corvette', 3),
					Ship('MC80 Star Cruiser', 4),
				];
			}
		},
		getShips: () => {
			const shipArray = gameBoard.createShips();
			shipArray.map((ship, id) => (ship.id = id + 1));
			gameBoard.ships = shipArray;
			return shipArray;
		},

		changeShipDirection: (ship) => {
			ship.direction === 'horizontal' && ship.size > 1
				? (ship.direction = 'vertical')
				: (ship.direction = 'horizontal');
		},
		receiveAttack: (xCord, yCord) => {
			let isLegalMove = true;
			const val = gameBoard.board[yCord - 1][xCord - 1];
			if (val === '_' || val === '*') {
				gameBoard.board[yCord - 1][xCord - 1] = '•';
			} else if (Number.isInteger(parseInt(val))) {
				const attackedShip = gameBoard.ships[parseInt(val) - 1];
				attackedShip.hit();
				gameBoard.board[yCord - 1][xCord - 1] = '※';

				if (attackedShip.isSunk()) {
					gameBoard.markShipArea('•', attackedShip);
					gameBoard.shipCount--;
					gameBoard.checkGameOver();
					if (gameBoard.isGameOver === true) console.log('GAME OVER!');
				}
			} else {
				isLegalMove = false;
			}
			return isLegalMove;
		},

		checkPlacement: (ship, xCord, yCord) => {
			xCord = parseFloat(xCord);
			yCord = parseFloat(yCord);
			let isLegalPlace = true;
			if (ship.direction === 'horizontal') {
				if (ship.size + xCord - 1 > 10) {
					isLegalPlace = false;
					return;
				}
				for (let i = 0; i < ship.size; i++) {
					if (gameBoard.board[yCord - 1][xCord - 1 + i] !== '_') {
						isLegalPlace = false;
						return;
					}
				}
			} else if (ship.direction === 'vertical') {
				if (ship.size + yCord - 1 > 10) {
					isLegalPlace = false;
					return;
				}
				for (let i = 0; i < ship.size; i++) {
					if (gameBoard.board[yCord - 1 + i][xCord - 1] !== '_') {
						isLegalPlace = false;
					}
				}
			}
			// isLegalPlace ? console.log('legal place') : console.log('Illegal place!');
			return isLegalPlace;
		},

		placeShip: (ship, xCord, yCord) => {
			if (
				gameBoard.shipCount < 6 &&
				gameBoard.checkPlacement(ship, xCord, yCord)
			) {
				if (ship.direction === 'horizontal') {
					ship.hitState.forEach((cell, i) => {
						gameBoard.board[yCord - 1][xCord - 1 + i] = `${ship.id}`;
					});
				} else if (ship.direction === 'vertical') {
					ship.hitState.forEach((cell, i) => {
						gameBoard.board[yCord - 1 + i][xCord - 1] = `${ship.id}`;
					});
				}
				gameBoard.markShipArea('*', ship, xCord, yCord);
				ship.onBoard = true;
				ship.coordinates = [parseFloat(xCord), parseFloat(yCord)];
				// console.log(
				// 	`${ship.name} was placed ${ship.direction} on ${ship.coordinates}`
				// );
				gameBoard.shipCount++;
				if (gameBoard.shipCount === 6) {
					gameBoard.isReady = true;
				}
				return true;
			} else {
				return false;
			}
		},

		markShipArea: (
			mark,
			ship,
			xCord = ship.coordinates[0],
			yCord = ship.coordinates[1]
		) => {
			ship.hitState.forEach((cell, i) => {
				if (ship.direction === 'horizontal') {
					// horizontal areas
					if (yCord < 10) {
						gameBoard.board[yCord][xCord - 1 + i] = `${mark}`;
					}
					if (yCord > 1) {
						gameBoard.board[yCord - 2][xCord - 1 + i] = `${mark}`;
					}
					// vertical areas
					if (xCord > 1) {
						if (yCord > 1) {
							gameBoard.board[yCord - 2][xCord - 2] = `${mark}`;
						}
						gameBoard.board[yCord - 1][xCord - 2] = `${mark}`;
						if (yCord < 10) {
							gameBoard.board[yCord][xCord - 2] = `${mark}`;
						}
					}

					if (xCord - 1 + ship.size < 10) {
						if (yCord > 1) {
							gameBoard.board[yCord - 2][xCord - 1 + ship.size] = `${mark}`;
						}
						gameBoard.board[yCord - 1][xCord - 1 + ship.size] = `${mark}`;
						if (yCord < 10) {
							gameBoard.board[yCord][xCord - 1 + ship.size] = `${mark}`;
						}
					}
				} else if (ship.direction === 'vertical') {
					if (xCord < 10) {
						gameBoard.board[yCord - 1 + i][xCord] = `${mark}`;
					}
					if (xCord > 1) {
						gameBoard.board[yCord - 1 + i][xCord - 2] = `${mark}`;
					}
					// horizontal areas
					if (yCord > 1) {
						if (xCord > 1) {
							gameBoard.board[yCord - 2][xCord - 2] = `${mark}`;
						}
						gameBoard.board[yCord - 2][xCord - 1] = `${mark}`;
						if (xCord < 10) {
							gameBoard.board[yCord - 2][xCord] = `${mark}`;
						}
					}
					if (yCord - 1 + ship.size < 10) {
						if (xCord > 1) {
							gameBoard.board[yCord - 1 + ship.size][xCord - 2] = `${mark}`;
						}
						gameBoard.board[yCord - 1 + ship.size][xCord - 1] = `${mark}`;
						if (xCord < 10) {
							gameBoard.board[yCord - 1 + ship.size][xCord] = `${mark}`;
						}
					}
				}
			});
		},

		placeShipsAtRandom: () => {
			const reversedShips = [...gameBoard.ships].reverse();
			while (gameBoard.shipCount < 6) {
				reversedShips.forEach((ship) => {
					gameBoard.randomlyPlaceShip(ship);
				});
			}
		},

		randomlyPlaceShip: (ship) => {
			if (ship.onBoard !== true) {
				const randX = Math.ceil(Math.random() * 10);
				const randY = Math.ceil(Math.random() * 10);
				if (Math.random() * 2 > 1) gameBoard.changeShipDirection(ship);
				gameBoard.placeShip(ship, randX, randY);
				gameBoard.randomlyPlaceShip(ship);
			}
		},
		checkGameOver: () => {
			if (gameBoard.shipCount === 0) {
				gameBoard.isGameOver = true;
				return true;
			}
			return false;
		},
	};
	return gameBoard;
};
