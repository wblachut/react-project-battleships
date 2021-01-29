import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
	return (
		<header className='header'>
			<div className='header-row'>
				<h1 className='col-sm-8'>
					<span className='title1'>SpaceShips </span>{' '}
				</h1>
				<a
					href='https://github.com/wblachut/react-project-battleships'
					className='gh-btn'
				>
					<FontAwesomeIcon icon={['fab', 'github']} className='gh-icon' />
				</a>
				<i className='fab fa-github'></i>
			</div>
			<nav></nav>
		</header>
	)
}

export default Header
