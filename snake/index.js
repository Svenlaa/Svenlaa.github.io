const fieldSide = 15
let snake = [[7, 5], [7, 4], [7, 3], [7, 2], [7, 1]]
let input = []
let goMove;

function setup() {
    for (let i = 0; i < fieldSide * fieldSide; i++) {
        let cell = document.createElement('div')
        cell.id = i
        cell.className = "gridCell"
        document.getElementById('field').appendChild(cell)
    }
    spawnTomato()
    goMove = setInterval(moveSnake, 200)
}

setup()

function getCellStyle(pos, bgColor) {
    if (bgColor) {
        return document.getElementById(pos[0] * fieldSide + pos[1]).style.backgroundColor
    }
    return document.getElementById(pos[0] * fieldSide + pos[1]).style
}

function getRandomCell() {
    let randomCell = [Math.floor(Math.random() * fieldSide), Math.floor(Math.random() * fieldSide)]
    let bgColor = getCellStyle(randomCell, true)
    if (['rgb(39, 159, 39)', 'tomato', 'rgb(34, 139, 34)'].includes(bgColor)) {
        return getRandomCell()
    }
    return randomCell
}

function spawnTomato() {
    drawSnake()
    getCellStyle(getRandomCell()).backgroundColor = 'tomato'
}

function gameOver() {
    clearInterval(goMove)
    window.alert(`Your snake was ${(snake.length - 1)} tiles long!`)
    window.location = window.location
}

//listens for keydown event
document.addEventListener('keydown', function (event) {
    inputRegister(event.code)
})

//handles the input, from touch or keyboard
function inputRegister(k) {
    let direction = null
    if (["KeyH", "KeyA", "ArrowLeft"].includes(k)) {
        direction = "left"
    } else if (["KeyL", "KeyD", "ArrowRight"].includes(k)) {
        direction = "right"
    } else if (["KeyK", "KeyW", "ArrowUp"].includes(k)) {
        direction = "up"
    } else if (["KeyJ", "KeyS", "ArrowDown"].includes(k)) {
        direction = "down"
    }
    if (input.length >= 3) {
        return
    }
    let prevInput = input[input.length - 1]
    if (
        prevInput === "right" && direction === "left" ||
        prevInput === "left" && direction === "right" ||
        prevInput === "up" && direction === "down" ||
        prevInput === "down" && direction === "up" ||
        !input[0] && direction === "left" || // special case for game init
        prevInput === direction
    ) {
        return
    }
    if (direction) {
        input.push(direction)
    }
}

function drawSnake() {
    for (let o = 1; o <= snake.length; o++) {
        let cellStyle = getCellStyle(snake[o - 1])
        if (o === 1) {
            cellStyle.backgroundColor = 'rgb(34, 139, 34)';
        } else if (o >= snake.length) {
            if (cellStyle.backgroundColor !== 'tomato') {
                cellStyle.backgroundColor = null;
            } // if not tomato, is blank
        } else if (o > 1) {
            cellStyle.backgroundColor = 'rgb(39, 159, 39)';
        }
    }
}

let buttonsVisible = true;

function toggleControls() {
    document.getElementsByClassName("controlWrapper")[0].style.display = buttonsVisible ? "none" : "inherit";
    buttonsVisible = !buttonsVisible
}

function moveSnake() {
    let nextCell = null
    if (input[0] === 'left') {
        nextCell = [snake[0][0], snake[0][1] - 1]
    } else if (input[0] === 'right') {
        nextCell = [snake[0][0], snake[0][1] + 1]
    } else if (input[0] === 'up') {
        nextCell = [snake[0][0] - 1, snake[0][1]]
    } else if (input[0] === 'down') {
        nextCell = [snake[0][0] + 1, snake[0][1]]
    }
    if (!input[0]) {
        return
    }
    if (input.length > 1) {
        input.shift()
    } //Trims inputList
    if (nextCell[0] >= fieldSide || nextCell[0] < 0 || nextCell[1] >= fieldSide || nextCell[1] < 0) {
        gameOver();
        return
    } //Wall is hit
    if (getCellStyle(nextCell, true) === 'rgb(39, 159, 39)') {
        gameOver();
        return
    } //Body is hit
    getCellStyle(nextCell, true) !== 'tomato' ? snake.pop() : spawnTomato();
    snake.unshift(nextCell)
    drawSnake()
}