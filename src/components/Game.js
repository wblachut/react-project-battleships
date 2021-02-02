import React from 'react'
import PropTypes from 'prop-types'
import '../style/Game.css'
import GameBoard from './GameBoard'

const Game = (props) => {
	return (
		<div className="game">
			<GameBoard player={props.PlayerOne} opponent={props.PlayerTwo} />
			<GameBoard player={props.PlayerTwo} opponent={props.PlayerOne} />
		</div>
	)
}

export default Game

Game.propTypes = {
	player: PropTypes.object,
	PlayerBoard: PropTypes.array,
	setPlayerBoard: PropTypes.func,
	opponent: PropTypes.object,
	OpponentBoard: PropTypes.array,
	setOpponentBoard: PropTypes.func,
	PlayerOne: PropTypes.object,
	PlayerTwo: PropTypes.object,
	PlayerOneBoard: PropTypes.array,
	setP1Board: PropTypes.func,
	PlayerTwoBoard: PropTypes.array,
	setP2Board: PropTypes.func,
}
