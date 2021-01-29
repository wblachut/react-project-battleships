import React from "react";

const GameBoard = (props) => {
 const {player,
  PlayerBoard,
  setPlayerBoard,
  opponent,
  OpponentBoard,
  setOpponentBoard, setMoveCount, moveCount
 } = props
// on outer side column with ships - on destroy add fire gif
// if player show ships
// add onClick function with 
// use different cursor eg. aim (find info on net)

const onMakeMove = (e) => {
  // console.log(e.target.dataset.cord.split(',')[1])
  const y = e.target.dataset.cord.split(',')[0];
  const x = e.target.dataset.cord.split(',')[1];
  // console.log(x, y)
  opponent.makeMove(player, x, y)
  // console.table(player.gameBoard.board)
  setPlayerBoard(player.gameBoard.board)
  // setMoveCount(moveCount+1)
  console.table(PlayerBoard)
  console.log(setPlayerBoard)
  onAIMove();
} 

const onAIMove = () => {
  player.makeAIMove(opponent)
  setOpponentBoard(opponent.gameBoard.board)
  console.table(OpponentBoard)
}

    return (
      <div className={`${player.side} gameBoard`}>
          <div className={`${player.side} side-title`}> The {player.side} side </div>
          <div className="board-wrapper">
          <div className="column-description">
            {PlayerBoard.map((arr, i) => {
             return <div className="numbers" key={[i+1]}> {[i + 1]}  </div> })}
          </div> 
          <div className="inner-wrapper">
            <div className={`${player.side} row-description`}> {PlayerBoard.map((arr, i) => {
              return <div className="letters" key={`letter${i}`}> {(i + 10).toString(36)} </div> })}</div>

              {/* grid */}
            <div className={`${player.side} grid-wrapper`}>
              {PlayerBoard.map((arr, j) =>
               arr.map((element, i) => {
                if (player.type === 'human') {
                  if (element === '_' || element === '*') {
                    return <div className="cell"
                      data-cord={[(j+1), (i+1)]}
                      key={[j+1, i+1]}>
                    </div>
                  } else if ( (Number.isInteger(parseInt(element))) ) {
                    return <div className={`cell ship ship${element}`}
                      data-cord={[j+1, i+1]}
                      key={[j+1, i+1]}>
                    </div>
                  } else if (element === '※') {
                    return <div className={`cell hit ship`} data-cord={[j+1, i+1]} key={[j+1, i+1]}> 
                    <img src="./images/flame.gif" alt="aj"/>
                    </div>
                  } else  {
                    return <div className={`cell empty`} data-cord={[j+1, i+1]} key={[j+1, i+1]}> •
                    </div>
                  }
                }
                // ai board
                else {
                  // add different displays to different element vals: fire to ※, empty to  •
                  if (element === '•') {
                    return <div className="cell empty" data-cord={[(j+1), (i+1)]}
                    key={[j+1, i+1]} > • </div>
                  } else if (element === '※') {
                    return <div className="cell hit"
                     data-cord={[(j+1), (i+1)]} key={[j+1, i+1]} >
                       <img src="./images/flame.gif" alt="a"/>
                    </div>
                  } else {
                  return <div className="cell" data-cord={[(j+1), (i+1)]}
                  key={[j+1, i+1]}
                  onClick={(e) => onMakeMove(e)}> </div> }
                }
              } ))} </div>
            </div>
        </div>
      </div>        
    )
}

export default React.memo(GameBoard)
