const fieldSide = 15
let snake = [[7,5],[7,4],[7,3],[7,2],[7,1]]
let input = []
let goMove;
let buffAmount = 1

function setup() {
  for (let i=0; i < fieldSide * fieldSide;i++) {
    let cell = document.createElement('div')
    cell.id = i
    cell.className = "gridCell"
    document.getElementById('main').appendChild(cell)
  }
  tomato()
  goMove = setInterval(moveSnake, 200)
}
setup()

for (let i=0; i < fieldSide * fieldSide;i++) {
  let cell = document.createElement('div')
  cell.id = i
  cell.className = "gridCell"
  document.getElementById('main').appendChild(cell)
}

function drawSnake() {
  for (let o = snake.length-buffAmount; o >= 0; o--) {
    let cellStyle = getCellStyle(snake[o])
    if (o==snake.length-buffAmount) {cellStyle.backgroundColor = null; continue}
    if (o>0) {cellStyle.backgroundColor = '#279f27'; continue}
    if (o==0) {cellStyle.backgroundColor = '#228b22'}
  }
}

function getCellStyle(pos) {
  return document.getElementById(pos[0]*fieldSide+pos[1]).style
}

function tomato() {
  drawSnake()
  getCellStyle(getRandomCell()).backgroundColor = 'tomato'
}

function getRandomCell() {
  let randomCell = [Math.floor(Math.random()*fieldSide), Math.floor(Math.random()*fieldSide)]
  let bgColor = getCellStyle(randomCell).backgroundColor
  if (bgColor=='rgb(39, 159, 39)'||bgColor=='tomato'||bgColor=='rgb(34, 139, 34)') {return getRandomCell()}
  return randomCell
}

function moveSnake() {
  drawSnake()
  let nextCell = null
  if (input[0] == 'h') {nextCell = [snake[0][0],snake[0][1]-1]} else // left
  if (input[0] == 'l') {nextCell = [snake[0][0],snake[0][1]+1]} else // right
  if (input[0] == 'k') {nextCell = [snake[0][0]-1,snake[0][1]]} else // up
  if (input[0] == 'j') {nextCell = [snake[0][0]+1,snake[0][1]]}      // down
  if (input.length>1){input.shift()}
  if (nextCell[0]>=fieldSide||nextCell[0]<0||nextCell[1]>=fieldSide||nextCell[1]<0) {gameOver()}
  if (getCellStyle(nextCell).backgroundColor=='rgb(39, 159, 39)'){gameOver()}
  snake.unshift(nextCell)
  if (getCellStyle(nextCell).backgroundColor!='tomato') {
    snake.pop()
  } else {tomato()}
  drawSnake()
}

function gameOver() {
  clearInterval(goMove);
  window.alert("Your length was "+(snake.length-buffAmount)+"!");
  window.location=window.location
}

document.addEventListener('keydown', function(event) {
  inputRegister(event.key)
});

function inputRegister(k) {
  let direction = null
  if(k=="h"||k=="a") {direction="h"} else
  if(k=="l"||k=="d") {direction="l"} else
  if(k=="k"||k=="w") {direction="k"} else
  if(k=="j"||k=="s") {direction="j"} 
  if (input.length>=3){return}
  let prevInput = input[input.length-1]
  if (
    prevInput=="h"&&direction=="l"||
    prevInput=="l"&&direction=="h"||
    prevInput=="k"&&direction=="j"||
    prevInput=="j"&&direction=="k"||
    !input[0]&&direction=="h" ||
    prevInput==direction
  ) {return}
  if(direction){input.push(direction)}
}