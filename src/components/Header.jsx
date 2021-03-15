import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
	return (
		<header className="header">
			<div className="header-row">
				<span className="title-main">starships </span>
				<a
					href="https://github.com/wblachut/react-project-battleships"
					className="gh-btn"
				>
					<FontAwesomeIcon icon={['fab', 'github']} className="gh-icon" />
				</a>
			</div>
		</header>
	);
};

export default Header;
