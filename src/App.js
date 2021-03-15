import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CreatePlayer } from './Player';

import Header from './components/Header';
import Intro from './components/Intro';
import NewGame from './components/NewGame';
import Game from './components/Game';
import Announcer from './components/Announcer';
import './style/App.css';

const App = () => {
	const [appStatus, setAppStatus] = useState('intro');
	const [winner, setWinner] = useState(null);
	let PlayerOne = CreatePlayer('light', 'human');
	let PlayerTwo = CreatePlayer('dark', 'computer');
	let timeout = 2000;

	return (
		<div>
			<Header />
			<CSSTransition
				in={appStatus === 'intro'}
				timeout={timeout}
				classNames="trans"
				unmountOnExit={true}
				onExited={() => setAppStatus('newGame')}
			>
				<Intro setAppStatus={setAppStatus} appStatus={appStatus} />
			</CSSTransition>
			<CSSTransition
				in={appStatus === 'newGame'}
				timeout={timeout}
				classNames="trans"
				unmountOnExit={true}
			>
				<NewGame setAppStatus={setAppStatus} setWinner={setWinner} />
			</CSSTransition>
			<CSSTransition
				in={appStatus === 'game'}
				timeout={timeout}
				classNames="trans"
				unmountOnExit={true}
			>
				<Game
					player={PlayerOne}
					opponent={PlayerTwo}
					setWinner={setWinner}
					winner={winner}
					setAppStatus={setAppStatus}
				/>
			</CSSTransition>

			<CSSTransition
				in={appStatus === 'announcer'}
				timeout={timeout}
				classNames="trans"
				unmountOnExit={true}
			>
				<Announcer winner={winner} setAppStatus={setAppStatus} />
			</CSSTransition>

			<div className="stars"></div>
			<div className="twinkling"></div>
		</div>
	);
};

export default App;
