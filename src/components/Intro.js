import React from 'react';
import PropTypes from 'prop-types';

import '../style/Intro.css';

const Intro = ({ setAppStatus }) => {
	const onSkipIntro = () => {
		setAppStatus('newGame');
	};

	return (
		<div className="fade">
			<section className="star-wars-intro" onClick={onSkipIntro}>
				<div className="crawl">
					<div className="title">
						<p>Episode XII</p>
						<h1>The Spaceships</h1>
					</div>
					<p>
						It is a browser battleships game react application styled on the
						Star Wars movie by George Lucas. This project was realized on
						learning purpose for The Odin Project curriculum. Main aim of the
						project is to build game logic using Test Driven Development. I hope
						you enjoy it.
					</p>
					<br></br>
					<p className="p-center">Confront the sith lord...</p>
					<br></br>
					<p className="p-center">May the force be with you jedi master!</p>
					<br></br>
					<p className="p-center">Click the mouse to continue to the game!</p>
				</div>
			</section>
		</div>
	);
};

export default Intro;

Intro.propTypes = {
	setAppStatus: PropTypes.func,
};
