const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//function initialize game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // updating ui
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");        

    });
    newGameBtn.classList.remove("active");
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
     let answer ="";

     winningPositions.forEach((position)=>{
        // all 3 boxes should be non empty and exactly same
        if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")&&( gameGrid[position[0]] === gameGrid[position[1]] )&&(gameGrid[position[1]] === gameGrid[position[2]])){
            
            // check if winnder is x or 0
            if(gameGrid[position[0]]==="X"){
                answer ="X";
            }else{
                answer = "0";
            }

            //disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            });

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }
     });
     // we have winner
     if(answer!=""){
        gameInfo.innerHTML =`Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
     }

     //lets check for tie
     let fillCount = 0;
     gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }
     });

     //board is fill, game is tie
     if(fillCount===9){
        gameInfo.innerText= "Game Tied !";
        newGameBtn.classList.add("active");
     }

}

initGame();

function swapTurn(){
    if(currentPlayer ==="X"){
        currentPlayer= "0";
    }else{
        currentPlayer ="X";
    }
    gameInfo.innerHTML=`Current Player - ${currentPlayer}`;
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swapturn
        swapTurn();
        //check winner
        checkGameOver();
    }
}

newGameBtn.addEventListener("click",initGame);