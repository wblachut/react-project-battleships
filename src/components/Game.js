/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import '../style/Game.css';
import GameBoard from './GameBoard';

const Game = (props) => {
	const { player, opponent } = props;
	const [isGameReady, setGameReady] = useState(false);
	const [board, setBoard] = useState([...player.gameBoard.board]);
	const [opponentBoard, setOpponentBoard] = useState([
		...opponent.gameBoard.board,
	]);
	const [EnemyShipCount, setEnemyShipCount] = useState(
		opponent.gameBoard.shipCount
	);

	useEffect(() => {
		console.warn('GAME HAS A WINNER');
	}, [props.winner]);

	useEffect(() => {
		handlePlayerShipDisplay();
	}, [board]);

	useEffect(() => {
		handleComputerShipDisplay();
		console.log('use Effect:', EnemyShipCount);
	}, [EnemyShipCount]);

	const onPlaceRandomly = () => {
		onResetBoard();
		player.gameBoard.placeShipsAtRandom();
		setBoard([...player.gameBoard.board]);
	};

	const onFlipShips = () => {
		player.gameBoard.ships.map((ship) => {
			if (!ship.onBoard) player.gameBoard.changeShipDirection(ship);
		});
		setBoard([...player.gameBoard.board]);
	};

	const onResetBoard = () => {
		player.gameBoard.makeBoard();
		player.gameBoard.getShips();
		setBoard([...player.gameBoard.board]);
	};

	const onPlaceShip = (e) => {
		const y = e.target.dataset.cord.split(',')[0];
		const x = e.target.dataset.cord.split(',')[1];
		const shipID = e.dataTransfer.getData('ship');
		const ship = player.gameBoard.ships[shipID - 1];
		player.gameBoard.placeShip(ship, x, y);
		console.table(board);
		setBoard([...player.gameBoard.board]);
	};

	const onStartGame = () => {
		if (player.gameBoard.isReady) setGameReady(true);
	};

	const onMakeMove = (e) => {
		console.log('Your move:');
		const y = e.target.dataset.cord.split(',')[0];
		const x = e.target.dataset.cord.split(',')[1];
		if (player.makeMove(opponent, x, y) === true) {
			setOpponentBoard([...opponent.gameBoard.board]);
			setEnemyShipCount(opponent.gameBoard.shipCount);
			console.table(opponentBoard);
			if (opponent.gameBoard.isGameOver) {
				onEndGame(player);
			}
			onAIMove();
		}
	};

	const onAIMove = () => {
		console.log('Computer move:');
		opponent.makeAIMove(player);
		setBoard([...player.gameBoard.board]);
		console.table(board);
		if (player.gameBoard.isGameOver) {
			onEndGame(opponent);
		}
	};

	const onEndGame = (winner) => {
		setTimeout(() => {
			props.setWinner(winner);
			props.setAppStatus('announcer');
		}, 500);
	};

	const handlePlayerShipDisplay = () => {
		player.gameBoard.ships.map((ship) => {
			mountShip(player, ship);
		});
	};

	const handleComputerShipDisplay = () => {
		opponent.gameBoard.ships.map((ship) => {
			if (ship.isSunk() === true) {
				mountShip(opponent, ship);
			}
		});
	};

	const mountShip = (owner, ship) => {
		if (ship.onBoard) {
			const cords = [ship.coordinates[1], ship.coordinates[0]];
			const boardDiv = document.querySelector(`.${owner.side}`);
			const startingCell = boardDiv.querySelector(`div[data-cord="${cords}"]`);
			if (!startingCell.querySelector('.ship-img-grid')) {
				const shipImg = document.createElement('img');
				shipImg.src =
					// eslint-disable-next-line no-undef
					process.env.PUBLIC_URL + `/images/${owner.side}${ship.id}.png`;
				shipImg.alt = `ship-${owner.side}${ship.id}`;
				shipImg.classList.add(`ship-img-grid`);
				shipImg.classList.add(ship.direction);
				shipImg.targetAble = false;
				startingCell.appendChild(shipImg);
			}
		}
	};

	return (
		<div>
			{isGameReady ? (
				<div className="game">
					<GameBoard player={player} board={board} isGameReady={isGameReady} />
					<GameBoard
						player={opponent}
						board={opponentBoard}
						onMakeMove={onMakeMove}
						isGameReady={isGameReady}
					/>
				</div>
			) : (
				<div className="game">
					<CSSTransition in={!isGameReady} timeout={1000} classNames="swipe">
						<GameBoard
							player={player}
							board={board}
							isGameReady={isGameReady}
							setGameReady={setGameReady}
							onFlipShips={onFlipShips}
							onPlaceShip={onPlaceShip}
							onPlaceRandomly={onPlaceRandomly}
							onResetBoard={onResetBoard}
							onStartGame={onStartGame}
						/>
					</CSSTransition>
				</div>
			)}
		</div>
	);
};

export default Game;

Game.propTypes = {
	player: PropTypes.object,
	board: PropTypes.array,
	setBoard: PropTypes.func,
	opponent: PropTypes.object,
	opponentBoard: PropTypes.array,
	setOpponentBoard: PropTypes.func,
	PlayerOne: PropTypes.object,
	PlayerTwo: PropTypes.object,
	gameReady: PropTypes.bool,
	setGameReady: PropTypes.func,
	winner: PropTypes.object,
	setWinner: PropTypes.func,
	setAppStatus: PropTypes.func,
};
