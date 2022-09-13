/*----- constants -----*/
/*
- winningCombinations (an object or array because we have a list of combos 
    (each combo is going to be an array with three elements))
  - we will go with a nested array
*/
const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
];
const PLAYER_LOOKUP = {
    '1': {
        name: 'Player 1',
        symbol: 'X'
    },
    '-1': {
        name: 'Player 2',
        symbol: 'O'
    },
};
/*----- app's state (variables) -----*/
let turn, board, winner

/*----- cached element references -----*/
const messageDisplayEl = document.querySelector('h2');
const resetBtnEl = document.querySelector('button');
const boardEl = document.querySelector('#board');

/*----- event listeners -----*/

resetBtnEl.addEventListener('click', handleResetClick);
boardEl.addEventListener('click', handleBoardClick)

/*----- functions -----*/
function init(){
    turn = 1;
    board = [null, null, null, null, null, null, null, null, null];
    winner = null;
    render();
}

function handleResetClick(){
    console.log('reset clicked')
    init();
}

function handleBoardClick(evt){
   if(winner) {
    return;
   }
   if(evt.target.id !== 'board'){
    const idx = evt.target.id[2]
    if(!board[idx]){
     board[idx] = turn;
     checkWin();
     changeTurn();
     render();
        }
    }
}

function render(){
    if (!winner && board.every(square => square)){
        messageDisplayEl.innerText =  "Cat's Game";
    } else if (!winner){
        messageDisplayEl.innerText =  `${PLAYER_LOOKUP[turn].name}'s turn'`;
    }   
    else   {
        messageDisplayEl.innerText =  `${PLAYER_LOOKUP[winner].name} has won!`;
    }

    board.forEach((square, idx) => {
        if(square){
            document.getElementById(`sq${idx}`).textContent = PLAYER_LOOKUP[square].symbol;
        } else {
            document.getElementById(`sq${idx}`).textContent = '';
        }
    });
}

function changeTurn(){
    turn *= -1;
}

function checkWin() {
    for (let combo of WIN_COMBOS){
        let total = 0
        combo.forEach(idx => {
            total += board[idx]
        })
        if(Math.abs(total)===3){
            winner = turn;
            break;
        }
    }

}

//GAME START
init();