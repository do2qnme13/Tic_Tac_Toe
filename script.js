const gameBoard = document.querySelector('.gameBoard');
const displayWinner = document.querySelector('.displayWinner');
const restartBtn = document.querySelector('.restart')



const game = (function(){

  const gameGrids = ['','','','','','','','',''];
  let circleTurn = false;

  gameGrids.forEach((gameGird,index) => {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.id = index;
    grid.addEventListener('click',runGame,{once:true})
    gameBoard.appendChild(grid);
  })

  restartBtn.addEventListener('click',restartGame)


  function runGame (e) {
    const cell = e.target
    let nextTurn = circleTurn?'circle':'cross';
    nextMove(cell,nextTurn);
    checkWinner(cell.id);
  }

  function nextMove(cell,arg) {
    if(arg === "cross") {
      cell.classList.add("cross")
      circleTurn = true;
    } else {
      cell.classList.add('circle')
      circleTurn = false;
    }
  }

  function checkWinner(id) {
    const allGirds = document.querySelectorAll('.grid');
    const winningCombos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [2,4,6],[0,4,8]
  ]
    //console.log(allGirds);
    winningCombos.forEach(arr => {
      let crossWins = arr.every(id => allGirds[id].classList.contains('cross'));
      if(crossWins){
        displayWinner.textContent = "Cross Wins!"
        allGirds.forEach(grid => grid.removeEventListener('click',runGame));
      }
    })
    winningCombos.forEach(arr => {
      let circleWins = arr.every(id => allGirds[id].classList.contains('circle'));
      if(circleWins){
        displayWinner.textContent = "Cross Wins!"
        allGirds.forEach(grid => grid.removeEventListener('click',runGame));
      }
    })

  }
   
  function restartGame () {
    let gameCells = document.querySelectorAll('.grid');
    gameCells.forEach(cell => cell.classList.remove('circle'))
    gameCells.forEach(cell => cell.classList.remove('cross'))
    gameCells.forEach(cell => cell.addEventListener('click',runGame,{once:true}))
    displayWinner.innerText = 'Hello'
  }

})();


