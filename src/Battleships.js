// Spaceships:
// star fighters: (TIE-fighter, x-wing, y-wing)
// (shuttle, star-fighter, bomber, destroyer, magister-destroyer)
// https://starwars.fandom.com/wiki/Starfighter/Legends
// 
// ships images visible on sides of boardgames
// ship damaged => ember gif on the ship image
// ship destroyed => red opacity
// lose/win => different icon appearing 
// Battleship.Proto


export const Ship = (name, size, direction = "horizontal") => {
  const ship = {
    name,
    size,
    direction,
    hitState: Array(size).fill("o"),
    hit:  () => {
      let nextHit = ship.hitState.findIndex(field => field === 'o');
      ship.hitState[nextHit] = "hit"
    },
    isSunk: () => !ship.hitState.includes("o")
  }
  return ship
}


export const GameBoard = (playerSide) => {
  const gameBoard = {
    side: playerSide,
    board: [],
    ships: [],
    shipCount: 0,
    isReady: false,
    isGameOver: false,

    emptyBoard: () => {
      return [
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
      ];
    },
    makeBoard: () => {gameBoard.board = gameBoard.emptyBoard()},
    getShips: (playerSide) => {
      let shipArray = [];
      let starFighter, starFighter2
      let superStarFighter, superStarFighter2
      let starDestroyer
      let superStarDestroyer
      if (playerSide === 'dark') {
        starFighter = Ship('TIE-fighter', 1);
        starFighter2 = Ship('TIE-fighter', 1);
        superStarFighter = Ship('TIE-bomber', 2);
        superStarFighter2 = Ship('TIE-bomber', 2);
        starDestroyer = Ship('Star Destroyer', 3);
        superStarDestroyer = Ship('Super Star Destroyer', 4);
        shipArray.push(starFighter, starFighter2, superStarFighter, superStarFighter2, starDestroyer, superStarDestroyer)
      } else {
        starFighter = Ship('Shuttle', 1);
        starFighter2 = Ship('Shuttle', 1);
        superStarFighter = Ship('X-wing', 2);
        superStarFighter2 = Ship('X-wing', 2);
        starDestroyer = Ship('Rebel heavy ship', 3);
        superStarDestroyer = Ship('Rebel Super Ship', 4);
        shipArray.push(starFighter, starFighter2, superStarFighter, superStarFighter2, starDestroyer, superStarDestroyer)
      }
      shipArray.map((ship, id) => ship.id = id + 1);
      gameBoard.ships = shipArray;
      return shipArray
    },
    changeShipDirection: (ship) => {
      (ship.direction === 'horizontal') ?
      ship.direction = 'vertical' :
      ship.direction = 'horizontal'
    },
    receiveAttack: (xCord, yCord) => {
      let isLegalMove = true;
      if (gameBoard.board[yCord - 1][xCord - 1] === '_' ||
          gameBoard.board[yCord - 1][xCord - 1] === '*') {
            gameBoard.board[yCord - 1][xCord - 1] = '•'
        // if is a ship
      } else if (Number.isInteger(
        parseInt(gameBoard.board[yCord - 1][xCord - 1]))) { 
        // pass a hit to ship
        let shipId = parseInt(gameBoard.board[yCord - 1][xCord - 1]);
        let attackedShip = gameBoard.ships[shipId - 1];
        attackedShip.hit()
        console.log(`hit a ship, field number: ${shipId}, attacked id: ${attackedShip.id}`)
        gameBoard.board[yCord - 1][xCord - 1] = '※'
        
        if (attackedShip.isSunk()) {
          console.log(`${attackedShip.name} was destroyed`)
          gameBoard.markShipArea('•', attackedShip)
          gameBoard.shipCount--
          gameBoard.checkGameOver()
          if (gameBoard.isGameOver === true) {
            console.log('Game Over')
          }
        }
      } else {
        console.log('NOT A LEGAL MOVE')
        isLegalMove = false
      }
      if (isLegalMove) { // && !isGameOver
        console.log('move was legal...' )
        // pass a turn
      }
      return isLegalMove
    },

    checkPlacement:  (ship, xCord, yCord) => {
      // X, Y - coords to be checked
      let isLegalPlace = true
      if (ship.direction === 'horizontal') {
        if (ship.size + xCord -1 > 10) isLegalPlace = false
        for (let j = 0; j < 3; j++ ) {
          let Y = yCord - 2 + j
          if (0 <= Y && Y <= 9) {
            for (let i = 0; i < ship.size + 2; i++) {
              let X = xCord - 2 + i
              if (0 <= X && X <= 9) {
                if (gameBoard.board[Y][X] !== '_') {
                  isLegalPlace = false
                }
              }
            }
          }
        }
      } else if (ship.direction === 'vertical') {
        if (ship.size + yCord -1 > 10) isLegalPlace = false
        for (let j = 0; j < 3; j++ ) {
          let X = xCord - 2 + j
          if (0 <= X && X <= 9) {
            for (let i = 0; i < ship.size + 2; i++) {
              let Y = yCord - 2 + i
              if (0 <= Y && Y <= 9) {
                if (gameBoard.board[Y][X] !== '_') {
                  isLegalPlace = false
                }
              }
            }
          }
        }
      }
      (isLegalPlace? console.log('legal place') : console.log('Illegal place!'))
      return isLegalPlace
    },

    placeShip: (ship, xCord, yCord) => {
      // yCord - row cord (array)
      // xCord - column cord (array element)
      if (gameBoard.checkPlacement(ship, xCord, yCord)) {
      if (ship.direction === 'horizontal') {
        ship.hitState.forEach((cell, i) => {
          gameBoard.board[yCord - 1][xCord - 1 + i] = `${ship.id}`
        });
      } else if (ship.direction === 'vertical') {
       ship.hitState.forEach((cell, i) => {
         gameBoard.board[yCord - 1 + i][xCord - 1] = `${ship.id}`
       });
      }
      gameBoard.markShipArea('*', ship, xCord, yCord)
      ship.onBoard = true
      ship.coordinates = [xCord, yCord];
      console.log(`${ship.name} was placed ${ship.direction} on ${ship.coordinates}`);
      gameBoard.shipCount++
      if (gameBoard.shipCount === 6) {
        gameBoard.isReady = true;
      }
      }
    },

    markShipArea: (mark, ship, xCord = ship.coordinates[0], yCord =  ship.coordinates[1]) => {
      ship.hitState.forEach((cell, i) => {
        if (ship.direction === 'horizontal') {
          // horizontal areas
          if (yCord < 10) {
            gameBoard.board[yCord][xCord - 1 + i] = `${mark}`
          }
          if (yCord > 1) {
            gameBoard.board[yCord - 2][xCord - 1 + i] = `${mark}`
          }
          // vertical areas
          if (xCord > 1) {
            if (yCord > 1) {
              gameBoard.board[yCord - 2][xCord - 2] = `${mark}`} 
              gameBoard.board[yCord - 1][xCord - 2] = `${mark}`
            if (yCord < 10) {
              gameBoard.board[yCord][xCord - 2] = `${mark}`}
            }
          
          if (xCord + ship.size < 10) {
            if (yCord > 1) {
              gameBoard.board[yCord - 2][xCord - 1 + ship.size] = `${mark}`}
              gameBoard.board[yCord - 1][xCord - 1 + ship.size] = `${mark}`
            if (yCord < 10) {
              gameBoard.board[yCord][xCord - 1 + ship.size] = `${mark}`} 
          }
        } else if (ship.direction === 'vertical') {
         if (xCord < 10) {
           gameBoard.board[yCord - 1 + i][xCord] = `${mark}`
         }
         if (xCord > 1) {
           gameBoard.board[yCord - 1 + i][xCord - 2] = `${mark}`
         }
         // horizontal areas
         if (yCord > 1) {
           if (xCord > 1) {
             gameBoard.board[yCord - 2][xCord - 2] = `${mark}`} 
           gameBoard.board[yCord - 2][xCord - 1] = `${mark}`
           if (xCord < 10) {
             gameBoard.board[yCord - 2][xCord] = `${mark}`}
           }
         if (yCord + ship.size < 10) {
           if (xCord > 1) {
             gameBoard.board[yCord- 1 + ship.size][xCord- 2] = `${mark}` }
           gameBoard.board[yCord- 1 + ship.size][xCord - 1] = `${mark}`
           if (xCord < 10)
            {gameBoard.board[yCord- 1 + ship.size][xCord] = `${mark}`} 
         }
        }
      })  
    },

    placeShipsAtRandom: () => {
      let reversedShips = [...gameBoard.ships].reverse()
      while (gameBoard.shipCount < 6) {
        reversedShips.forEach((ship) => {
          gameBoard.randomlyPlaceShip(ship);
        })
      }
    },

    randomlyPlaceShip: (ship) => {
      if (ship.onBoard !== true) {
        let randX = Math.ceil(Math.random() * 10);
        let randY = Math.ceil(Math.random() * 10);
        if (Math.random() * 2 > 1) gameBoard.changeShipDirection(ship)
        gameBoard.placeShip(ship, randX, randY)
        gameBoard.randomlyPlaceShip(ship)
      }
    },
    checkGameOver: () => {
       console.log("Game over? ", (gameBoard.shipCount === 0));
      if (gameBoard.shipCount === 0) {
        gameBoard.isGameOver = true;
        return true
      }
        return false
    }
  }
  return gameBoard
}
