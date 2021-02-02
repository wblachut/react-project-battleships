/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

//maybe problem is caused because of 2 game boards, check if they are special ?

const GameBoard = (props) => {
	const { player, opponent } = props
	// add outer side column with ships - on destroy add fire gif
	// use different cursor eg. aim (find info on net) ?
	const [board, setBoard] = useState(player.gameBoard.board)
	const [opponentBoard, setOpponentBoard] = useState(opponent.gameBoard.board)
	const [friendlyShipCount, setFriendlyShipsCount] = useState(
		player.gameBoard.shipCount
	)
	console.log(opponentBoard)

	useEffect(() => {
		handleHumanPlayerShipDisplay()
	}, [])

	useEffect(() => {
		handleComputerShipDisplay()
		console.log('use Effect:', friendlyShipCount)
	}, [friendlyShipCount])

	const onMakeMove = (e) => {
		// console.log(e.currentTarget)
		// console.log(e.currentTarget.dataset.cord)
		const y = e.target.dataset.cord.split(',')[0]
		const x = e.target.dataset.cord.split(',')[1]
		// console.log(x, y)
		opponent.makeMove(player, x, y)
		setBoard(player.gameBoard.board)
		setFriendlyShipsCount(player.gameBoard.shipCount)
		// console.table(board)
		onAIMove()
	}

	const onAIMove = () => {
		player.makeAIMove(opponent)
		setOpponentBoard(opponent.gameBoard.board)
		// console.table(opponentBoard)
	}

	const handleHumanPlayerShipDisplay = () => {
		if (player.type === 'human')
			player.gameBoard.ships.map((ship) => {
				mountShip(ship)
			})
	}

	const handleComputerShipDisplay = () => {
		if (player.type === 'computer')
			player.gameBoard.ships.map((ship) => {
				if (ship.isSunk() === true) {
					mountShip(ship)
				}
			})
	}

	const mountShip = (ship) => {
		const cords = [ship.coordinates[1], ship.coordinates[0]]
		// console.log(ship.name, ship.coordinates)
		const playerBoardDiv = document.querySelector(`.${player.side}`)
		// console.log(playerBoardDiv)
		const startingCell = playerBoardDiv.querySelector(
			`div[data-cord="${cords}"]`
		)
		if (!startingCell.querySelector('.ship-img-grid')) {
			// console.log(startingCell)
			const shipImg = document.createElement('img')
			shipImg.src =
				process.env.PUBLIC_URL + `/images/${player.side}${ship.id}.png`
			shipImg.alt = `ship-${player.side}${ship.id}`
			shipImg.classList.add(`ship-img-grid`)
			shipImg.classList.add(ship.direction)
			shipImg.targetAble = false
			startingCell.appendChild(shipImg)
		}
	}

	return (
		<div className={`${player.side} gameBoard`}>
			<div className={`${player.side} side-title`}>The {player.side} side</div>
			<div className="board-wrapper">
				<div className="column-description">
					{board.map((arr, i) => {
						return (
							<div className="numbers" key={[i + 1]}>
								{' '}
								{[i + 1]}{' '}
							</div>
						)
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
							)
						})}
					</div>

					{/* grid */}
					<div className={`${player.side} grid-wrapper`}>
						{board.map((arr, j) =>
							arr.map((element, i) => {
								if (player.type === 'human') {
									if (element === '_' || element === '*') {
										return (
											<div
												className="cell"
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
											></div>
										)
									} else if (Number.isInteger(parseInt(element))) {
										let ship = player.gameBoard.ships[element - 1]
										return (
											<div
												className={`cell ship ship${ship.id}`}
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
											>
												{/* {(i + 1, j + 1) ===
													(ship.coordinates[0], ship.coordinates[1]) && (
													<img
														className={`ship-img-grid ${ship.direction}`}
														src={
															process.env.PUBLIC_URL +
															`/images/${player.side}${ship.id}.png`
														}
														alt={`ship-${player.side}${ship.id}`}
													/>
												)} */}
											</div>
										)
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
										)
									} else {
										return (
											<div
												className={`cell empty`}
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
											>
												•
											</div>
										)
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
										)
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
										)
									} else {
										return (
											<div
												className="cell"
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
												onClick={(e) => onMakeMove(e)}
											></div>
										)
									}
								}
							})
						)}{' '}
					</div>
				</div>
			</div>
			<div className="ship-wrapper">
				{player.gameBoard.ships.map((ship) => {
					return (
						<div className="ship-view" key={`ship${ship.id}`}>
							{/* <img
								className={`ship-img`}
								src={
									process.env.PUBLIC_URL +
									`/images/${player.side}${ship.id}.png`
								}
								alt={`ship-${player.side}${ship.id}`}
							/> */}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default React.memo(GameBoard)

GameBoard.propTypes = {
	player: PropTypes.object,
	PlayerBoard: PropTypes.array,
	setPlayerBoard: PropTypes.func,
	opponent: PropTypes.object,
	OpponentBoard: PropTypes.array,
	setOpponentBoard: PropTypes.func,
}
