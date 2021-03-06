import React from 'react';
import PropTypes from 'prop-types';

const Announcer = ({ winner, setAppStatus }) => {
	const onPlayAgain = () => {
		setAppStatus('newGame');
	};

	return (
		<div>
			<div className={`announcer ${winner.side}`}>
				<h1>{winner.name} has won!</h1>
				{winner.side === 'light' && (
					<h2>
						Hrrmmm. A true leader you are. About your tactical prowess all
						galaxies should know !
						<div className={`img-wrapper ${winner.side}`}></div>
					</h2>
				)}
				{winner.side === 'dark' && (
					<h2>
						You don’t know the power of the dark side! I must obey my master...{' '}
						<div className={`img-wrapper ${winner.side}`}></div>
					</h2>
				)}
			</div>
			<button className="new-game-btn star-btn" onClick={onPlayAgain}>
				Play again!
			</button>
		</div>
	);
};

export default Announcer;

Announcer.propTypes = {
	winner: PropTypes.object,
	setAppStatus: PropTypes.func,
};
