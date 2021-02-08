/* eslint-disable no-undef */
import { Ship, GameBoard } from './Battleships';
import { Player } from './Player';

describe('Ships', () => {
	let starFighter;
	let superStarDestroyer;
	beforeEach(() => {
		starFighter = new Ship('TIE', 1, 'horizontal');
		superStarDestroyer = new Ship('Super Star Destroyer', 4, 'horizontal');
	});

	it('displays hit state properly', () => {
		expect(superStarDestroyer.hitState).toStrictEqual(['o', 'o', 'o', 'o']);
	});

	it('take hit', () => {
		superStarDestroyer.hit();
		expect(superStarDestroyer.hitState).toStrictEqual(['hit', 'o', 'o', 'o']);
	});

	it('take multiple hits', () => {
		superStarDestroyer.hit();
		superStarDestroyer.hit();
		expect(superStarDestroyer.hitState).toStrictEqual(['hit', 'hit', 'o', 'o']);
	});

	it('shows that the boat is not sunk', () => {
		superStarDestroyer.hit();
		superStarDestroyer.hit();
		expect(superStarDestroyer.isSunk()).toBe(false);
	});

	it('shows that the boat is  sunk', () => {
		starFighter.hit(0);
		expect(starFighter.isSunk()).toBe(true);
		superStarDestroyer.hit();
		superStarDestroyer.hit();
		superStarDestroyer.hit();
		superStarDestroyer.hit();
		expect(superStarDestroyer.isSunk()).toBe(true);
	});
});

describe('GameBoard', () => {
	let testBoard;
	beforeEach(() => {
		testBoard = new GameBoard('light');
		testBoard.makeBoard();
		testBoard.getShips();
	});

	it('creates game-board properly', () => {
		expect(testBoard.board).toEqual([
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
		]);
	});

	it('has ship array', () => {
		expect(testBoard.ships.length).toBe(6);
		expect(testBoard.ships[5].name).toBe('MC80 Star Cruiser');
	});

	it('allows change direction of ship', () => {
		expect(testBoard.ships[5].direction).toBe('horizontal');
		testBoard.changeShipDirection(testBoard.ships[5]);
		expect(testBoard.ships[5].direction).toBe('vertical');
	});

	it('takes a hit', () => {
		testBoard.receiveAttack(3, 10);
		expect(testBoard.board[9][2]).toBe('•');
	});

	//check for illegal move
	it('allows a ship to be placed', () => {
		testBoard.placeShip(testBoard.ships[5], 3, 3);
		expect(testBoard.board[0]).toEqual([
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
		expect(testBoard.board[1]).toEqual([
			'_',
			'*',
			'*',
			'*',
			'*',
			'*',
			'*',
			'_',
			'_',
			'_',
		]);
		expect(testBoard.board[2]).toEqual([
			'_',
			'*',
			'6',
			'6',
			'6',
			'6',
			'*',
			'_',
			'_',
			'_',
		]);
		expect(testBoard.board[3]).toEqual([
			'_',
			'*',
			'*',
			'*',
			'*',
			'*',
			'*',
			'_',
			'_',
			'_',
		]);
		expect(testBoard.board[4]).toEqual([
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
	});

	it('allows a ship to be placed in a bottom corner', () => {
		testBoard.placeShip(testBoard.ships[5], 1, 1);
		// console.log(testBoard.board[0])
		// console.log(testBoard.board[1])
		expect(testBoard.board[0]).toEqual([
			'6',
			'6',
			'6',
			'6',
			'*',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
		expect(testBoard.board[1]).toEqual([
			'*',
			'*',
			'*',
			'*',
			'*',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
	});

	it('allows a ship to be placed in a top corner', () => {
		testBoard.placeShip(testBoard.ships[5], 7, 10);
		// console.log(testBoard.board[8])
		// console.log(testBoard.board[9])
		expect(testBoard.board[8]).toEqual([
			'_',
			'_',
			'_',
			'_',
			'_',
			'*',
			'*',
			'*',
			'*',
			'*',
		]);
		expect(testBoard.board[9]).toEqual([
			'_',
			'_',
			'_',
			'_',
			'_',
			'*',
			'6',
			'6',
			'6',
			'6',
		]);
	});

	it('allows a ship to be placed vertically', () => {
		testBoard.changeShipDirection(testBoard.ships[4]);
		testBoard.placeShip(testBoard.ships[4], 1, 1);
		expect(testBoard.board[0][0]).toEqual('5');
		expect(testBoard.board[2][0]).toEqual('5');
		expect(testBoard.board[3][0]).toEqual('*');
		expect(testBoard.board[5][0]).toEqual('_');
		// console.log(testBoard.board);
	});

	it('Checks for illegal placement', () => {
		expect(testBoard.checkPlacement(testBoard.ships[4], 1, 1)).toBe(true);
		testBoard.placeShip(testBoard.ships[4], 1, 1);
		// console.log(testBoard.board);
		expect(testBoard.checkPlacement(testBoard.ships[3], 7, 6)).toBe(true);
		expect(testBoard.checkPlacement(testBoard.ships[5], 2, 2)).toBe(false);
		testBoard.changeShipDirection(testBoard.ships[5]);
		expect(testBoard.checkPlacement(testBoard.ships[3], 7, 6)).toBe(true);
		expect(testBoard.checkPlacement(testBoard.ships[5], 2, 2)).toBe(false);
	});

	it('Propagates hit to a ship and marks it on board', () => {
		expect(testBoard.ships[5].hitState).toEqual(['o', 'o', 'o', 'o']);
		testBoard.placeShip(testBoard.ships[5], 1, 1);
		testBoard.receiveAttack(1, 1);
		expect(testBoard.board[0][0]).toBe('※');
		expect(testBoard.board[0]).toEqual([
			'※',
			'6',
			'6',
			'6',
			'*',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
		expect(testBoard.board[1]).toEqual([
			'*',
			'*',
			'*',
			'*',
			'*',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
		expect(testBoard.ships[5].hitState).toEqual(['hit', 'o', 'o', 'o']);
	});

	it('destroys ship properly', () => {
		testBoard.placeShip(testBoard.ships[2], 2, 2);
		expect(testBoard.ships[2].hitState).toEqual(['o', 'o']);
		// console.log(testBoard.ships);
		testBoard.receiveAttack(2, 2);
		expect(testBoard.board[1]).toEqual([
			'*',
			'※',
			'3',
			'*',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
		testBoard.receiveAttack(3, 2);
		expect(testBoard.ships[2].hitState).toEqual(['hit', 'hit']);
		expect(testBoard.ships[2].isSunk()).toBe(true);
		expect(testBoard.board[0]).toEqual([
			'•',
			'•',
			'•',
			'•',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
		expect(testBoard.board[1]).toEqual([
			'•',
			'※',
			'※',
			'•',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
		expect(testBoard.board[2]).toEqual([
			'•',
			'•',
			'•',
			'•',
			'_',
			'_',
			'_',
			'_',
			'_',
			'_',
		]);
	});

	it('Places all ships at random on a board', () => {
		expect(testBoard.isReady).toBeFalsy();
		testBoard.placeShipsAtRandom();
		console.log(testBoard.board);
		testBoard.ships.forEach((ship) => expect(ship.onBoard).toBe(true));
		expect(testBoard.isReady).toBeTruthy();
	});

	// doesn't end until all ships are drawn
	//
	it('does end when all ships are drawn', () => {
		expect(testBoard.isGameOver).toBeFalsy();
		testBoard.ships.map((ship) => (ship.isSunk = true));
		testBoard.checkGameOver();
		console.log(!testBoard.ships.find((ship) => ship.isSunk === false));
		expect(testBoard.isGameOver).toBeTruthy();
	});
});

describe('Player', () => {
	let PlayerOne;
	let PlayerTwo;
	let testBoardLight;
	let testBoardDark;
	beforeEach(() => {
		testBoardLight = new GameBoard('light');
		testBoardDark = new GameBoard('dark');
		PlayerOne = new Player('Jedi Master', 'light', 'human', testBoardLight);
		PlayerTwo = new Player('Lord Sith', 'dark', 'computer', testBoardDark);
		testBoardLight.makeBoard();
		testBoardLight.getShips();
		testBoardDark.makeBoard();
		testBoardDark.getShips(PlayerTwo.side);
	});

	test('Creates Players properly', () => {
		expect(PlayerOne.isWinner).toBeFalsy();
		expect(PlayerTwo.isWinner).toBeFalsy();
		PlayerOne.gameBoard.placeShipsAtRandom();
		PlayerTwo.gameBoard.placeShipsAtRandom();
	});

	test('Checks if Players win properly', () => {
		expect(PlayerOne.isWinner).toBeFalsy();
		PlayerOne.gameBoard.placeShipsAtRandom();
		PlayerTwo.gameBoard.placeShipsAtRandom();
		PlayerTwo.gameBoard.ships.map((ship) => (ship.isSunk = true));
		PlayerTwo.gameBoard.checkGameOver();
		PlayerOne.hasWon(PlayerTwo.gameBoard);
		expect(PlayerOne.isWinner).toBeTruthy();
	});
});
