// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { CreatePlayer } from './Player'
// import { CSSTransition } from 'react-transition-group'

import Header from './components/Header'
import Intro from './components/Intro'
import NewGame from './components/NewGame'
import Game from './components/Game'
import Announcer from './components/Announcer'
import './style/App.css'

const App = () => {
	const [appStatus, setAppStatus] = useState('intro')
	const [winner, setWinner] = useState(null)
	let PlayerOne = CreatePlayer('light', 'human')
	let PlayerTwo = CreatePlayer('dark', 'computer')
	console.clear()

	return (
		<div>
			<Header />
			{/* <CSSTransition in={appStatus} timeout={300}> */}
			{appStatus === 'intro' && <Intro setAppStatus={setAppStatus} />}
			{/* </CSSTransition> */}
			{appStatus === 'newGame' && <NewGame setAppStatus={setAppStatus} />}
			{appStatus === 'game' && (
				<Game
					player={PlayerOne}
					opponent={PlayerTwo}
					setWinner={setWinner}
					winner={winner}
					setAppStatus={setAppStatus}
				/>
			)}
			{appStatus === 'announcer' && (
				<Announcer
					winner={winner}
					setWinner={setWinner}
					setAppStatus={setAppStatus}
				/>
			)}
			<div className="stars"></div>
			<div className="twinkling"></div>
		</div>
	)
}

export default App
