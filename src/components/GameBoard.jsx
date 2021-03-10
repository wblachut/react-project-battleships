/* eslint-disable no-undef */ // process.env
import React from 'react';
import PropTypes from 'prop-types';

const GameBoard = (props) => {
	const { player, board, isGameReady } = props;
	return (
		<div className={`${player.side} game-board`}>
			<div className={`${player.side} side-title`}>The {player.side} side</div>

			<div className="outer-wrapper">
				{/* {BOARD} */}
				<div className="board-wrapper">
					<div className="column-description">
						{board.map((arr, i) => {
							return (
								<div className="numbers" key={[i + 1]}>
									{' '}
									{[i + 1]}{' '}
								</div>
							);
						})}
					</div>
					<div className="inner-wrapper">
						<div className={`${player.side} row-description`}>
							{' '}
							{board.map((arr, i) => {
								return (
									<div className="letters" key={`letter${i}`}>
										{' '}
										{(i + 10).toString(36)}{' '}
									</div>
								);
							})}
						</div>
						{/* grid */}
						<div className={`${player.side} grid-wrapper ${player.type}`}>
							{player.gameBoard.board.map((arr, j) =>
								arr.map((element, i) => {
									if (player.type === 'human') {
										if (element === '_' || element === '*') {
											if (element === '_' && !isGameReady) {
												return (
													<div
														className="cell droppable"
														data-cord={[j + 1, i + 1]}
														key={[j + 1, i + 1]}
														onDragOver={(e) => {
															e.preventDefault();
														}}
														onDragEnter={(e) => {
															e.preventDefault();
															e.target.classList.add('hover');
														}}
														onDragLeave={(e) => {
															e.preventDefault();
															e.target.classList.remove('hover');
														}}
														onDrop={(e) => props.onPlaceShip(e)}
													></div>
												);
											} else {
												return (
													<div
														className="cell"
														data-cord={[j + 1, i + 1]}
														key={[j + 1, i + 1]}
													></div>
												);
											}
										} else if (Number.isInteger(parseInt(element))) {
											let ship = player.gameBoard.ships[element - 1];
											return (
												<div
													className={`cell ship ship${ship.id}`}
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													{parseFloat(ship.coordinates[0]) === i + 1 &&
														parseFloat(ship.coordinates[1]) === j + 1 && (
															<img
																className={`ship-img-grid ${ship.direction}`}
																src={
																	process.env.PUBLIC_URL +
																	`/images/${player.side}${ship.id}.png`
																}
																alt={`ship-${player.side}${ship.id}`}
															/>
														)}
												</div>
											);
										} else if (element === '※') {
											return (
												<div
													className={`cell hit ship`}
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													<img
														className={`flame-gif`}
														src={process.env.PUBLIC_URL + '/images/flame.gif'}
														alt="flames"
													/>
												</div>
											);
										} else {
											return (
												<div
													className={`cell empty`}
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													•
												</div>
											);
										}
									}
									// AI board
									else {
										if (element === '•') {
											return (
												<div
													className="cell empty"
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													•
												</div>
											);
										} else if (element === '※') {
											return (
												<div
													className="cell hit"
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
												>
													<img
														className={`flame-gif`}
														src={process.env.PUBLIC_URL + '/images/flame.gif'}
														alt="as"
													/>
												</div>
											);
										} else {
											return (
												<div
													className="cell"
													data-cord={[j + 1, i + 1]}
													key={[j + 1, i + 1]}
													onClick={(e) => props.onMakeMove(e)}
												></div>
											);
										}
									}
								})
							)}{' '}
						</div>
					</div>
				</div>
				{!isGameReady && (
					<div className="ship-menage-wrapper">
						<div className="button-container">
							<button className="star-btn" onClick={props.onPlaceRandomly}>
								Place randomly
							</button>
							<button className="star-btn" onClick={props.onResetBoard}>
								Reset Board
							</button>
							<button className="star-btn" onClick={props.onFlipShips}>
								Flip Ships
							</button>
						</div>
						<div className="ship-wrapper">
							{player.gameBoard.ships.map((ship) => {
								return (
									!ship.onBoard && (
										<div
											className={`ship-view ${ship.direction}`}
											key={`ship${ship.id}`}
										>
											<img
												className={`ship-img ${ship.direction}`}
												src={
													process.env.PUBLIC_URL +
													`/images/${player.side}${ship.id}.png`
												}
												alt={`ship-${player.side}${ship.id}`}
												key={`ship-${player.side}${ship.id}`}
												data-ship={ship.id}
												draggable
												onDragStart={(e) => {
													e.dataTransfer.setData('ship', e.target.dataset.ship);
												}}
											/>
										</div>
									)
								);
							})}
						</div>
					</div>
				)}
			</div>
			{!isGameReady && (
				<div className="button-container">
					<button
						className="start-game-btn star-btn"
						onClick={props.onStartGame}
					>
						Start Game
					</button>
				</div>
			)}
		</div>
	);
};

export default GameBoard;

GameBoard.propTypes = {
	isGameReady: PropTypes.bool,
	player: PropTypes.object.isRequired,
	board: PropTypes.array.isRequired,
	onMakeMove: PropTypes.func,
	onPlaceShip: PropTypes.func,
	onFlipShips: PropTypes.func,
	onPlaceRandomly: PropTypes.func,
	onResetBoard: PropTypes.func,
	onStartGame: PropTypes.func,
};

GameBoard.defaultProps = {
	isGameReady: false,
	onMakeMove: () => {},
	onPlaceShip: () => {},
	onFlipShips: () => {},
	onPlaceRandomly: () => {},
	onResetBoard: () => {},
	onStartGame: () => {},
};
