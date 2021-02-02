import React, { useState } from 'react'
import { CreatePlayer } from './Player'

import Header from './components/Header'
// import Intro from "./components/Intro";
// import NewGame from "./components/NewGame";
import Game from './components/Game'
// import Announcer from './components/Announcer'
import './style/App.css'

const App = () => {
	let PlayerOne = CreatePlayer('light', 'human')
	let PlayerTwo = CreatePlayer('dark', 'computer')
	const [winner, setWinner] = useState('')
	console.clear()

	return (
		<div>
			<Header />
			{/* <Intro /> */}
			{/* <NewGame /> */}
			<Game
				PlayerOne={PlayerOne}
				PlayerTwo={PlayerTwo}
				setWinner={setWinner}
				winner={winner}
			/>
			{/* <Announcer winner={winner} setWinner={setWinner} /> */}
			<div className="stars"></div>
			<div className="twinkling"></div>
		</div>
	)
}

export default App
