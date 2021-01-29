import React from "react";
import '../style/Game.css'
import GameBoard from './GameBoard'
// import '.gif'

const Game = (props) => {
    return (
      <div className="game">
          <GameBoard 
            {...props}
            player = {props.PlayerOne}
            PlayerBoard = {props.PlayerOneBoard}
            setPlayerBoard = {props.setP1Board}
            opponent = {props.PlayerTwo}
            OpponentBoard = {props.PlayerTwoBoard}
            setOpponentBoard = {props.setP2Board} />
          <GameBoard 
            {...props}
            player = {props.PlayerTwo}
            opponent = {props.PlayerOne} 
            OpponentBoard = {props.PlayerOneBoard}
            setOpponentBoard = {props.setP1Board}
            PlayerBoard = {props.PlayerTwoBoard}
            setPlayerBoard = {props.setP2Board}
            setMoveCount = {props.setMoveCount}
            moveCount = {props.moveCount}
             />
      </div>        
    )
}

export default Game
