(this["webpackJsonpreact-project-battleships"]=this["webpackJsonpreact-project-battleships"]||[]).push([[0],{11:function(e,a,t){},20:function(e,a,t){},21:function(e,a,t){},27:function(e,a,t){},28:function(e,a,t){},29:function(e,a,t){"use strict";t.r(a);var c=t(0),n=t(2),i=t.n(n),r=t(12),o=t.n(r),s=(t(20),t(21),t(4)),d=t(3),l=function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"horizontal",c={name:e,size:a,direction:t,hitState:Array(a).fill("o"),hit:function(){var e=c.hitState.findIndex((function(e){return"o"===e}));c.hitState[e]="hit"},isSunk:function(){return!c.hitState.includes("o")}};return c},m=function(e,a){var t=function(e){var a={side:e,board:[],ships:[],shipCount:0,isReady:!1,isGameOver:!1,emptyBoard:function(){return[["_","_","_","_","_","_","_","_","_","_"],["_","_","_","_","_","_","_","_","_","_"],["_","_","_","_","_","_","_","_","_","_"],["_","_","_","_","_","_","_","_","_","_"],["_","_","_","_","_","_","_","_","_","_"],["_","_","_","_","_","_","_","_","_","_"],["_","_","_","_","_","_","_","_","_","_"],["_","_","_","_","_","_","_","_","_","_"],["_","_","_","_","_","_","_","_","_","_"],["_","_","_","_","_","_","_","_","_","_"]]},makeBoard:function(){a.board=a.emptyBoard(),a.shipCount=0,a.isReady=!1,a.isGameOver=!1},getShips:function(e){var t,c,n,i,r,o,s=[];return"dark"===e?(t=l("TIE-fighter",1),c=l("TIE-fighter",1),n=l("TIE-bomber",2),i=l("TIE-bomber",2),r=l("Star Destroyer",3),o=l("Super Star Destroyer",4),s.push(t,c,n,i,r,o)):(t=l("Shuttle",1),c=l("Shuttle",1),n=l("X-wing starfighter",2),i=l("X-wing starfighter",2),r=l("CR90 corvette",3),o=l("MC80 Star Cruiser",4),s.push(t,c,n,i,r,o)),s.map((function(e,a){return e.id=a+1})),a.ships=s,s},changeShipDirection:function(e){"horizontal"===e.direction&&e.size>1?e.direction="vertical":e.direction="horizontal"},receiveAttack:function(e,t){var c=!0,n=a.board[t-1][e-1];if("_"===n||"*"===n)a.board[t-1][e-1]="\u2022",console.log("miss !!");else if(Number.isInteger(parseInt(n))){var i=a.ships[parseInt(n)-1];i.hit(),console.log("hit a ship! field number: ".concat(parseInt(n),", attacked id: ").concat(i.id)),a.board[t-1][e-1]="\u203b",i.isSunk()&&(console.log("".concat(i.name," was destroyed")),a.markShipArea("\u2022",i),a.shipCount--,a.checkGameOver(),!0===a.isGameOver&&console.info("Game Over"))}else c=!1;return c},checkPlacement:function(e,t,c){t=parseFloat(t),c=parseFloat(c);var n=!0;if("horizontal"===e.direction){if(e.size+t-1>10)return void(n=!1);for(var i=0;i<e.size;i++)if("_"!==a.board[c-1][t-1+i])return void(n=!1)}else if("vertical"===e.direction){if(e.size+c-1>10)return void(n=!1);for(var r=0;r<e.size;r++)"_"!==a.board[c-1+r][t-1]&&(n=!1)}return n?console.log("legal place"):console.log("Illegal place!"),n},placeShip:function(e,t,c){return!!(a.shipCount<6&&a.checkPlacement(e,t,c))&&("horizontal"===e.direction?e.hitState.forEach((function(n,i){a.board[c-1][t-1+i]="".concat(e.id)})):"vertical"===e.direction&&e.hitState.forEach((function(n,i){a.board[c-1+i][t-1]="".concat(e.id)})),a.markShipArea("*",e,t,c),e.onBoard=!0,e.coordinates=[parseFloat(t),parseFloat(c)],console.log("".concat(e.name," was placed ").concat(e.direction," on ").concat(e.coordinates)),console.log(e.coordinates),a.shipCount++,6===a.shipCount&&(a.isReady=!0),!0)},markShipArea:function(e,t){var c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t.coordinates[0],n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:t.coordinates[1];t.hitState.forEach((function(i,r){"horizontal"===t.direction?(n<10&&(a.board[n][c-1+r]="".concat(e)),n>1&&(a.board[n-2][c-1+r]="".concat(e)),c>1&&(n>1&&(a.board[n-2][c-2]="".concat(e)),a.board[n-1][c-2]="".concat(e),n<10&&(a.board[n][c-2]="".concat(e))),c-1+t.size<10&&(n>1&&(a.board[n-2][c-1+t.size]="".concat(e)),a.board[n-1][c-1+t.size]="".concat(e),n<10&&(a.board[n][c-1+t.size]="".concat(e)))):"vertical"===t.direction&&(c<10&&(a.board[n-1+r][c]="".concat(e)),c>1&&(a.board[n-1+r][c-2]="".concat(e)),n>1&&(c>1&&(a.board[n-2][c-2]="".concat(e)),a.board[n-2][c-1]="".concat(e),c<10&&(a.board[n-2][c]="".concat(e))),n-1+t.size<10&&(c>1&&(a.board[n-1+t.size][c-2]="".concat(e)),a.board[n-1+t.size][c-1]="".concat(e),c<10&&(a.board[n-1+t.size][c]="".concat(e))))}))},placeShipsAtRandom:function(){for(var e=Object(d.a)(a.ships).reverse();a.shipCount<6;)e.forEach((function(e){a.randomlyPlaceShip(e)}))},randomlyPlaceShip:function(e){if(!0!==e.onBoard){var t=Math.ceil(10*Math.random()),c=Math.ceil(10*Math.random());2*Math.random()>1&&a.changeShipDirection(e),a.placeShip(e,t,c),a.randomlyPlaceShip(e)}},checkGameOver:function(){return 0===a.shipCount&&(a.isGameOver=!0,!0)}};return a}("".concat(e));return t.makeBoard(),t.getShips("".concat(e)),"computer"===a&&t.placeShipsAtRandom(),function(e,a){var t={name:e,side:a,type:arguments.length>2&&void 0!==arguments[2]?arguments[2]:"human",gameBoard:arguments.length>3?arguments[3]:void 0,isWinner:!1,isMakingMove:!1,makeMove:function(e,a,t){return!!e.gameBoard.receiveAttack(a,t)||(console.log("NOT A LEGAL MOVE"),!1)},makeAIMove:function(e){var a=Math.ceil(10*Math.random()),c=Math.ceil(10*Math.random()),n=e.gameBoard.receiveAttack(a,c);if(console.log("AI Move:",a,c,"was legal?",n),n)return e.gameBoard.receiveAttack(a,c),!0;t.makeAIMove(e)},passMove:function(e){t.isMakingMove=!1,e.isMakingMove=!0}};return t}("dark"===e?"Lord Sith":"Jedi Master",e,a,t)},h=t(13),b=function(){return Object(c.jsxs)("header",{className:"header",children:[Object(c.jsxs)("div",{className:"header-row",children:[Object(c.jsxs)("h1",{className:"col-sm-8",children:[Object(c.jsx)("span",{className:"title1",children:"SpaceShips "})," "]}),Object(c.jsx)("a",{href:"https://github.com/wblachut/react-project-battleships",className:"gh-btn",children:Object(c.jsx)(h.a,{icon:["fab","github"],className:"gh-icon"})}),Object(c.jsx)("i",{className:"fab fa-github"})]}),Object(c.jsx)("nav",{})]})},u=(t(11),function(e){var a=e.setIntro;Object(n.useEffect)((function(){setTimeout((function(){a(!1)}),2e4)}),[]);return Object(c.jsx)("div",{className:"fade",children:Object(c.jsx)("section",{className:"star-wars-intro",onClick:function(){a(!1)},children:Object(c.jsxs)("div",{className:"crawl",children:[Object(c.jsxs)("div",{className:"title",children:[Object(c.jsx)("p",{children:"Episode XII"}),Object(c.jsx)("h1",{children:"The Spaceships"})]}),Object(c.jsx)("p",{children:"It is a browser battleships game styled on the Star Wars movie by George Lucas. This project was realized on learning purpose for The Odin Project curriculum. Main aim of the project is to build game logic using TDD. I hope you enjoy it"}),Object(c.jsx)("br",{}),Object(c.jsx)("p",{className:"p-center",children:"Confront the sith lord..."}),Object(c.jsx)("br",{}),Object(c.jsx)("p",{className:"p-center",children:"May the force be with you jedi master!"})]})})})}),j=function(e){var a=e.setGame;return Object(c.jsxs)("div",{children:[Object(c.jsx)("div",{className:"new-game",children:Object(c.jsx)("div",{className:"new-game-wrapper"})}),Object(c.jsx)("button",{className:"new-game-btn star-btn",onClick:function(){console.log("start game clicked"),a(!0)},children:"Contend the Empire"})]})},p=(t(27),function(e){var a=e.player,t=e.board,n=e.isGameReady;return Object(c.jsxs)("div",{className:"".concat(a.side," gameBoard"),children:[Object(c.jsxs)("div",{className:"".concat(a.side," side-title"),children:["The ",a.side," side"]}),Object(c.jsxs)("div",{className:"outer-wrapper",children:[Object(c.jsxs)("div",{className:"board-wrapper",children:[Object(c.jsx)("div",{className:"column-description",children:t.map((function(e,a){return Object(c.jsxs)("div",{className:"numbers",children:[" ",[a+1]," "]},[a+1])}))}),Object(c.jsxs)("div",{className:"inner-wrapper",children:[Object(c.jsxs)("div",{className:"".concat(a.side," row-description"),children:[" ",t.map((function(e,a){return Object(c.jsxs)("div",{className:"letters",children:[" ",(a+10).toString(36)," "]},"letter".concat(a))}))]}),Object(c.jsxs)("div",{className:"".concat(a.side," grid-wrapper ").concat(a.type),children:[a.gameBoard.board.map((function(t,i){return t.map((function(t,r){if("human"===a.type){if("_"===t||"*"===t)return"_"!==t||n?Object(c.jsx)("div",{className:"cell","data-cord":[i+1,r+1]},[i+1,r+1]):Object(c.jsx)("div",{className:"cell droppable","data-cord":[i+1,r+1],onDragOver:function(e){e.preventDefault()},onDragEnter:function(e){e.preventDefault(),e.target.classList.add("hover")},onDragLeave:function(e){e.preventDefault(),e.target.classList.remove("hover")},onDrop:function(a){return e.onPlaceShip(a)}},[i+1,r+1]);if(Number.isInteger(parseInt(t))){var o=a.gameBoard.ships[t-1];return Object(c.jsx)("div",{className:"cell ship ship".concat(o.id),"data-cord":[i+1,r+1],children:parseFloat(o.coordinates[0])===r+1&&parseFloat(o.coordinates[1])===i+1&&Object(c.jsx)("img",{className:"ship-img-grid ".concat(o.direction),src:"/react-project-battleships"+"/images/".concat(a.side).concat(o.id,".png"),alt:"ship-".concat(a.side).concat(o.id)})},[i+1,r+1])}return"\u203b"===t?Object(c.jsx)("div",{className:"cell hit ship","data-cord":[i+1,r+1],children:Object(c.jsx)("img",{className:"flame-gif",src:"/react-project-battleships/images/flame.gif",alt:"flames"})},[i+1,r+1]):Object(c.jsx)("div",{className:"cell empty","data-cord":[i+1,r+1],children:"\u2022"},[i+1,r+1])}return"\u2022"===t?Object(c.jsx)("div",{className:"cell empty","data-cord":[i+1,r+1],children:"\u2022"},[i+1,r+1]):"\u203b"===t?Object(c.jsx)("div",{className:"cell hit","data-cord":[i+1,r+1],children:Object(c.jsx)("img",{className:"flame-gif",src:"/react-project-battleships/images/flame.gif",alt:"as"})},[i+1,r+1]):Object(c.jsx)("div",{className:"cell","data-cord":[i+1,r+1],onClick:function(a){return e.onMakeMove(a)}},[i+1,r+1])}))}))," "]})]})]}),!n&&Object(c.jsxs)("div",{className:"ship-wrapper",children:[Object(c.jsxs)("div",{className:"button-container",children:[Object(c.jsx)("button",{className:"star-btn",onClick:e.onPlaceRandomly,children:"Place randomly"}),Object(c.jsx)("button",{className:"star-btn",onClick:e.onResetBoard,children:"Reset Board"}),Object(c.jsx)("button",{className:"star-btn",onClick:e.onFlipShips,children:"Flip Ships"})]}),a.gameBoard.ships.map((function(e){return!e.onBoard&&Object(c.jsx)("div",{className:"ship-view",children:Object(c.jsx)("img",{className:"ship-img ".concat(e.direction),src:"/react-project-battleships"+"/images/".concat(a.side).concat(e.id,".png"),alt:"ship-".concat(a.side).concat(e.id),"data-ship":e.id,draggable:!0,onDragStart:function(e){e.dataTransfer.setData("ship",e.target.dataset.ship)}},"ship-".concat(a.side).concat(e.id))},"ship".concat(e.id))}))]})]}),!n&&Object(c.jsx)("div",{className:"button-container",children:Object(c.jsx)("button",{className:"start-game-btn star-btn",onClick:e.onStartGame,children:"Start Game"})})]})}),f=i.a.memo(p),g=function(e){var a=e.player,t=e.opponent,i=Object(n.useState)(!1),r=Object(s.a)(i,2),o=r[0],l=r[1],m=Object(n.useState)(Object(d.a)(a.gameBoard.board)),h=Object(s.a)(m,2),b=h[0],u=h[1],j=Object(n.useState)(Object(d.a)(t.gameBoard.board)),p=Object(s.a)(j,2),g=p[0],v=p[1],O=Object(n.useState)(t.gameBoard.shipCount),_=Object(s.a)(O,2),x=_[0],S=_[1];Object(n.useEffect)((function(){console.warn("GAME HAS A WINNER")}),[e.winner]),Object(n.useEffect)((function(){B()}),[b]),Object(n.useEffect)((function(){w(),console.log("use Effect:",x)}),[x]);var N=function(){a.gameBoard.makeBoard(),a.gameBoard.getShips(),u(Object(d.a)(a.gameBoard.board))},k=function(){console.log("Computer move:"),t.makeAIMove(a),u(Object(d.a)(a.gameBoard.board)),console.table(b),a.gameBoard.isGameOver&&y(t)},y=function(a){setTimeout((function(){e.setWinner(a)}),2e3)},B=function(){a.gameBoard.ships.map((function(e){M(a,e)}))},w=function(){t.gameBoard.ships.map((function(e){!0===e.isSunk()&&M(t,e)}))},M=function(e,a){if(a.onBoard){var t=[a.coordinates[1],a.coordinates[0]],c=document.querySelector(".".concat(e.side)).querySelector('div[data-cord="'.concat(t,'"]'));if(!c.querySelector(".ship-img-grid")){var n=document.createElement("img");n.src="/react-project-battleships"+"/images/".concat(e.side).concat(a.id,".png"),n.alt="ship-".concat(e.side).concat(a.id),n.classList.add("ship-img-grid"),n.classList.add(a.direction),n.targetAble=!1,c.appendChild(n)}}};return Object(c.jsx)("div",{children:o?Object(c.jsxs)("div",{className:"game",children:[Object(c.jsx)(f,{player:a,board:b,isGameReady:o}),Object(c.jsx)(f,{player:t,board:g,onMakeMove:function(e){console.log("Your move:");var c=e.target.dataset.cord.split(",")[0],n=e.target.dataset.cord.split(",")[1];!0===a.makeMove(t,n,c)&&(v(Object(d.a)(t.gameBoard.board)),S(t.gameBoard.shipCount),console.table(g),console.log(g),t.gameBoard.isGameOver&&y(a),k())},isGameReady:o})]}):Object(c.jsx)("div",{className:"game",children:Object(c.jsx)(f,{player:a,board:b,isGameReady:o,setGameReady:l,onFlipShips:function(){a.gameBoard.ships.map((function(e){e.onBoard||a.gameBoard.changeShipDirection(e)})),u(Object(d.a)(a.gameBoard.board))},onPlaceShip:function(e){var t=e.target.dataset.cord.split(",")[0],c=e.target.dataset.cord.split(",")[1],n=e.dataTransfer.getData("ship"),i=a.gameBoard.ships[n-1];console.log("Placing:",i.name,c,t),a.gameBoard.placeShip(i,c,t),console.table(b),u(Object(d.a)(a.gameBoard.board))},onPlaceRandomly:function(){N(),a.gameBoard.placeShipsAtRandom(),u(Object(d.a)(a.gameBoard.board))},onResetBoard:N,onStartGame:function(){a.gameBoard.isReady&&l(!0)}})})})},v=function(e){var a=e.winner,t=e.setWinner,i=e.setGame;Object(n.useEffect)((function(){}),[]);return Object(c.jsxs)("div",{className:"announcer-container",children:[Object(c.jsxs)("div",{className:"announcer ".concat(a.side),children:[Object(c.jsxs)("h1",{children:[a.name," has won!"]}),"light"===a.side&&Object(c.jsxs)("h2",{children:["Hrrmmm. A true leader you are. About your tactical prowess all galaxies should know !",Object(c.jsx)("div",{className:"img-wrapper ".concat(a.side)})]}),"dark"===a.side&&Object(c.jsxs)("h2",{children:["You don\u2019t know the power of the dark side! I must obey my master..."," ",Object(c.jsx)("div",{className:"img-wrapper ".concat(a.side)})]})]}),Object(c.jsx)("button",{className:"new-game-btn star-btn",onClick:function(){i(!1),t(null)},children:"Play again!"})]})},O=(t(28),function(){var e=Object(n.useState)(!0),a=Object(s.a)(e,2),t=a[0],i=a[1],r=Object(n.useState)(null),o=Object(s.a)(r,2),d=o[0],l=o[1],h=Object(n.useState)(!1),p=Object(s.a)(h,2),f=p[0],O=p[1],_=m("light","human"),x=m("dark","computer");return console.clear(),Object(c.jsxs)("div",{children:[Object(c.jsx)(b,{}),t&&Object(c.jsx)(u,{isIntro:t,setIntro:i}),!t&&!f&&Object(c.jsx)(j,{setGame:O}),f&&null===d&&Object(c.jsx)(g,{player:_,opponent:x,setWinner:l,winner:d}),null!==d&&Object(c.jsx)(v,{winner:d,setWinner:l,setGame:O}),Object(c.jsx)("div",{className:"stars"}),Object(c.jsx)("div",{className:"twinkling"})]})}),_=t(5),x=t(14),S=t(8);_.b.add(x.a,S.b,S.a),o.a.render(Object(c.jsx)(i.a.StrictMode,{children:Object(c.jsx)(O,{})}),document.getElementById("root"))}},[[29,1,2]]]);
//# sourceMappingURL=main.77dbcb50.chunk.js.map