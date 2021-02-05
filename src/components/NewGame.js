import React from 'react'
import PropTypes from 'prop-types'
import '../style/Intro.css'

const NewGame = ({ setAppStatus }) => {
	const onStartGame = () => {
		setAppStatus('game')
	}

	return (
		<div>
			<div className="new-game">
				<div className="new-game-wrapper"></div>
			</div>
			<button className="new-game-btn star-btn" onClick={onStartGame}>
				Contend the Empire
			</button>
		</div>
	)
}

export default NewGame

NewGame.propTypes = {
	setAppStatus: PropTypes.func,
}
