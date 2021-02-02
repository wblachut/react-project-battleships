import React from 'react'
import '../style/Intro.css'

const Intro = () => {
	return (
		<div className="fade">
			<section className="star-wars-intro">
				<div className="crawl">
					<div className="title">
						<p>Episode XII</p>
						<h1>The Spaceships</h1>
					</div>
					<p>
						It is a browser battleships game styled on the Star Wars movie by
						George Lucas. This project was realized on learning purpose for The
						Odin Project curriculum. Main aim of the project is to build game
						logic using TDD. I hope you enjoy it
					</p>
					<br></br>
					<p className="p-center">Confront the sith lord...</p>
					<br></br>
					<p className="p-center">May the force be with you jedi master!</p>
				</div>
			</section>
		</div>
	)
}

export default Intro
