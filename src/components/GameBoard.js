import React from 'react'
import PropTypes from 'prop-types'

const GameBoard = (props) => {
	const {
		player,
		PlayerBoard,
		setPlayerBoard,
		opponent,
		OpponentBoard,
		setOpponentBoard,
	} = props
	// add outer side column with ships - on destroy add fire gif
	// use different cursor eg. aim (find info on net) ?

	const onMakeMove = (e) => {
		const y = e.target.dataset.cord.split(',')[0]
		const x = e.target.dataset.cord.split(',')[1]
		// console.log(x, y)
		opponent.makeMove(player, x, y)
		// console.table(player.gameBoard.board)
		setPlayerBoard(player.gameBoard.board)
		console.table(PlayerBoard)
		onAIMove()
	}

	const onAIMove = () => {
		player.makeAIMove(opponent)
		setOpponentBoard(opponent.gameBoard.board)
		console.table(OpponentBoard)
	}

	return (
		<div className={`${player.side} gameBoard`}>
			<div className={`${player.side} side-title`}>The {player.side} side</div>
			<div className='board-wrapper'>
				<div className='column-description'>
					{PlayerBoard.map((arr, i) => {
						return (
							<div className='numbers' key={[i + 1]}>
								{' '}
								{[i + 1]}{' '}
							</div>
						)
					})}
				</div>
				<div className='inner-wrapper'>
					<div className={`${player.side} row-description`}>
						{' '}
						{PlayerBoard.map((arr, i) => {
							return (
								<div className='letters' key={`letter${i}`}>
									{' '}
									{(i + 10).toString(36)}{' '}
								</div>
							)
						})}
					</div>

					{/* grid */}
					<div className={`${player.side} grid-wrapper`}>
						{PlayerBoard.map((arr, j) =>
							arr.map((element, i) => {
								if (player.type === 'human') {
									if (element === '_' || element === '*') {
										return (
											<div
												className='cell'
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
											></div>
										)
									} else if (Number.isInteger(parseInt(element))) {
										return (
											<div
												className={`cell ship ship${element}`}
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
											></div>
										)
									} else if (element === '※') {
										return (
											<div
												className={`cell hit ship`}
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
											>
												<img src='./images/flame.gif' alt='aj' />
											</div>
										)
									} else {
										return (
											<div
												className={`cell empty`}
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
											>
												{' '}
												•
											</div>
										)
									}
								}
								// ai board
								else {
									if (element === '•') {
										return (
											<div
												className='cell empty'
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
											>
												{' '}
												•{' '}
											</div>
										)
									} else if (element === '※') {
										return (
											<div
												className='cell hit'
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
											>
												<img src='./images/flame.gif' alt='a' />
											</div>
										)
									} else {
										return (
											<div
												className='cell'
												data-cord={[j + 1, i + 1]}
												key={[j + 1, i + 1]}
												onClick={(e) => onMakeMove(e)}
											>
												{' '}
											</div>
										)
									}
								}
							})
						)}{' '}
					</div>
				</div>
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
