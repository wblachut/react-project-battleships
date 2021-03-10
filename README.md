# The Starships - battleships web game

Do you feel like a good strategist? [Fight the Empire in foreign galaxies!](https://wblachut.github.io/react-project-battleships/) 

#

## PROJECT: BATTLESHIP

Project is a part of The Odin Project [JavaScript learning curriculum](https://www.theodinproject.com/courses/javascript). To learn more open the [TOP assignment](https://www.theodinproject.com/courses/javascript/lessons/battleship).

## Description

The Starships is a project for learning a little bit of **Test Driven Development** and enhancing skills in [React Framework](https://reactjs.org/). This app is not implementing testing the appearance of a webpage! Testing was done to logics. [Jest](https://jestjs.io/) was a tool to test js functions and objects like ships, game board & players. On further stages of development of this app, I've decided to add transitions from [React Transition Group](http://reactcommunity.org/react-transition-group/css-transition). Page is mobile responsive.

On page load you can observe text flowing similarly to one from George Lukas Star Wars movies. If you are perceptive you will spot that stars in the background are glowing, due to the `night-sky` effect (simple css animations). You can start the game by clicking the button on the bottom of the page. Or you can just enjoy looking on the x-wing! In the game preparations you can place your fleet however you want, or just randomly...

![](/public/gifs/preps.gif)

Click on the opponent game board to attack it. If you hit a ship you will see appearing fire. When the ship is sunk you will be able to see it. You are a good guy, **remember that**! Help rebeliants win!

![](/public/gifs/game.gif)

Otherwise...

![](/public/gifs/lose.gif)

## Concepts used and learned:

- Test Driven Development
- Hooks
- React Transition Group
- React Functional Components

## Tools:

- Visual Studio Code
- Javascript
- React
- CSS3
- ESLint
- Prettier
- Adobe Photoshop

## To does and some concepts for future:


- [X] remove `let` everywhere possible - use `const` instead (KM)
- [X] add .jsx extension to JSX files and add `defaultProps` (KM)
- [X] move test files to `_test_` (KN)
- [X] make it responsive
- [ ] apply useContext Hook or Redux instead of drilling props.
- [ ] fix display of flipped ships
- [ ] make AI smart (...in progress)
- [ ] make intro disappearing after 20s

- [ ] make choosing sides possible
- [ ] add more transitions (to GameBoard components in Game) so it switches from preparations to game smoothly
