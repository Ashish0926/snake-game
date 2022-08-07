// constants and variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
const board = document.getElementById("board");
let lastPaintTime = 0;
let speed = 3;
let score = 0;
let snakeArr = [
  { x: 13, y: 15 },
  { x: 12, y: 15 },
];
let foodArr = [{ x: 15, y: 12 }];

// Game Functions
const main = (ctime) => {
  window.requestAnimationFrame(main);
  //console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
};

function collided(arr) {
    x_val = arr[0].x;
    y_val = arr[0].y;
    for(let i=1; i<arr.length; i++){
        if(snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y) {
            return true;
        }
    }
    if(x_val == 0 || x_val == 18 || y_val == 0 || y_val == 18){
        return true;
    }
    return false;
}

function gameEngine() {
  // updating the snake array and food
  if(collided(snakeArr)){
    gameOverSound.play();
    musicSound.pause();
    inputDir = {x: 0, y: 0};
    alert('Game Over! Press any key to play again.');
    snakeArr = [{x: 13, y: 15}];
    musicSound.play();
    score = 0;
  }

  // if the snake eats the food, increment the score and re-render the food
  if(snakeArr[0].x == foodArr[0].x && snakeArr[0].y == foodArr[0].y){
    foodSound.play();
    snakeArr.unshift({x: snakeArr[0].x = inputDir.x, y: snakeArr[0].y + inputDir.y});
    x_val = Math.round(2 + 14 * Math.random());
    y_val = Math.round(2 + 14 * Math.random());
    foodArr = [{x: x_val, y: y_val}]
  }

  // moving the snake
  for(let i = snakeArr.length-2; i>=0; i--){
    snakeArr[i+1] = {...snakeArr[i]};
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y; 

  // render the snake
  board.innerHTML = "";
  snakeArr.forEach((element, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = element.y;
    snakeElement.style.gridColumnStart = element.x;
    if (index == 0) {
      snakeElement.classList.add("snakeHead");
    }else{
        snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });

  // render the food
  foodArr.forEach((element, index) => {
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = element.y;
    foodElement.style.gridColumnStart = element.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
  });
}

// Main logic starts here
window.requestAnimationFrame(main);

window.addEventListener("keydown", (event) => {
  inputDir = { x: 0, y: 1 };
  moveSound.play();
  switch (event.key) {
    case "ArrowUp":
      //console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
        inputDir.x = 0;
        inputDir.y = 1;
      break;
    case "ArrowRight":
        inputDir.x = 1;
        inputDir.y = 0;
      break;
    case "ArrowLeft":
        inputDir.x = -1;
        inputDir.y = 0;
      break;

    default:
      break;
  }
});

