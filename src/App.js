import React, { useState } from 'react'
import { CreatePlayer } from './Player'

import Header from './components/Header'
// import Intro from "./components/Intro";
// import NewGame from "./components/NewGame";
import Game from './components/Game'
import './style/App.css'

const App = () => {
	let PlayerOne = CreatePlayer('light', 'human')
	let PlayerTwo = CreatePlayer('dark', 'computer')
	const [PlayerOneBoard, setP1Board] = useState(PlayerOne.gameBoard.board)
	const [PlayerTwoBoard, setP2Board] = useState(PlayerTwo.gameBoard.board)
	console.clear()

	return (
		<div>
			<Header />
			{/* <Intro /> */}
			{/* <NewGame /> */}
			<Game
				PlayerOne={PlayerOne}
				PlayerTwo={PlayerTwo}
				PlayerOneBoard={PlayerOneBoard}
				PlayerTwoBoard={PlayerTwoBoard}
				setP1Board={setP1Board}
				setP2Board={setP2Board}
			/>
			<div className='stars'></div>
			<div className='twinkling'></div>
		</div>
	)
}

export default App
