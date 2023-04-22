const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn  = document.querySelector(".btn");
const popper = document.querySelector(".popper");
const crackerLeft = document.querySelector(".crackerleft");
const crackerRight = document.querySelector(".crackerright");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function initGame() {
    popper.style.visibility = "hidden";
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box) => {
        box.innerText = ("");
        box.style.pointerEvents = ("all");
        box.classList.remove("win")
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    crackerLeft.classList = "cracker"
    crackerRight.classList = "cracker"
}

initGame();

function swapTurn() {
    if(currentPlayer === 'X'){
        currentPlayer = "O"
    }
    else{
        currentPlayer ='X'
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    winningPositions.forEach((position) => {
        if(  (gameGrid[position[0]] !== "" || gameGrid[position[1]] || gameGrid[position[2]]) 
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){

            answer = gameGrid[position[0]];

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        popper.style.visibility = "visible";
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        })
        crackerLeft.classList = "active";
        crackerRight.classList = "active";
    }
    else{
        let fillCount=0;
        gameGrid.forEach((value) => {
            if (value !== ""){
                fillCount++;
            }
        })

        if(fillCount === 9){
            gameInfo.innerText = `Game Tied!`;
            newGameBtn.classList.add("active");
        }
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);