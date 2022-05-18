document.oncontextmenu = (() => false);

function pad(number) {
    return number.toString().padStart(2, "0")
}

const selectID = document.getElementById("selectedItem");
const headerID = document.getElementById("header");
const flagsID = document.getElementById("flagLeft");
const mainEle = document.getElementsByTagName("main")[0];
const gameStateID = document.getElementById("gameState");
const minGridSize = 50;
const timer = setInterval(updateTime, 1e3);
let xCells = 0;
let cellSize = 0;
let yCells = 0;
let totalBombs = 0;
let cellNumbers = []; // Holds the number of each cell, bomb = 9
let timePlayed = 0;
let noMove = false;
let shownFields = 0;

function updateTime() {
    let m = timePlayed++ % 60;
    let h = Math.floor(timePlayed / 60);
    document.getElementById("timePlayed").innerHTML = `${h}:${pad(m)}`
}

function cellClick(cellElement, isContextClick) {
    let classList = cellElement.classList;
    let cellIndex = [...cellElement.parentNode.children].indexOf(cellElement);
    if (!(classList.contains("show") || noMove)) {
        if (flagSelected || isContextClick) {
            classList.toggle("flag")
        } else {
            if (classList.add("show"),
                classList.add("o" + cellNumbers[cellIndex]),
                shownFields++,
            0 == cellNumbers[cellIndex]
            ) {
                let surroundingCells = [cellIndex + xCells, cellIndex - xCells];
                cellIndex % xCells != 0 && surroundingCells.push(cellIndex - 1, cellIndex - 1 - xCells, cellIndex - 1 + xCells);
                (cellIndex + 1) % xCells != 0 && surroundingCells.push(cellIndex + 1, cellIndex + 1 - xCells, cellIndex + 1 + xCells);
                surroundingCells.forEach(l => {
                    l >= 0 && xCells * yCells > l && cellClick([...cellElement.parentNode.children][l], !1)
                })
            }
            cellNumbers[cellIndex] != 9 ?
                xCells * yCells - totalBombs == shownFields && finishGame("gold", "&#x1F601") :
                finishGame("red", "&#x1F615");
        }
    }

    function finishGame(color, emoji) {
        gameStateID.innerHTML = emoji
        headerID.style.backgroundColor = color
        selectID.style.backgroundColor = "#0000"
        clearInterval(timer)
        noMove = true
    }
}

function drawCells(bombChance) {
    function spawnBomb() {
        let randomCell = Math.floor(Math.random() * xCells * yCells);
        allBombs.includes(randomCell) ? spawnBomb() : allBombs.push(randomCell)
    }

    headerID.style.height = "auto"
    mainEle.style.height = "100%"
    xCells = Math.floor(mainEle.offsetWidth / minGridSize)
    cellSize = mainEle.offsetWidth / xCells
    yCells = Math.floor(mainEle.offsetHeight / cellSize)
    const totalCells = xCells * yCells;
    mainEle.style.gridTemplateColumns = `repeat(${xCells}, ${cellSize}px)`
    mainEle.style.gridTemplateRows = `repeat(${yCells}, ${cellSize}px)`
    headerID.style.height = "100%"
    mainEle.style.height = "auto"
    totalBombs = Math.floor(totalCells * bombChance)
    let allBombs = [];
    for (bombsPlaced = 0; bombsPlaced < totalBombs; bombsPlaced++) {
        spawnBomb()
    }
    for (i = 0; i < totalCells; i++) {
        let cellEle = document.createElement("div");
        cellEle.classList.add("gridCell");
        let surroundingCells = [i - xCells];
        if (i % xCells != 0) {
            surroundingCells.push(i - 1, i - 1 - xCells)
        }
        if ((i + 1) % xCells != 0) {
            surroundingCells.push(i + 1 - xCells)
        }
        if (allBombs.includes(i)) {
            cellNumbers[i] = 9;
            surroundingCells.forEach(cell => {
                if (cell >= 0 && totalCells > cell && cellNumbers[cell] != 9) {
                    cellNumbers[cell]++
                }
            })
        } else {
            cellNumbers[i] = 0;
            surroundingCells.forEach(cell => {
                if (cell >= 0 && totalCells > cell && cellNumbers[cell] == 9) {
                    cellNumbers[i]++
                }
            })
        }
        cellEle.addEventListener("click", function () {
            cellClick(this, false)
        });
        cellEle.addEventListener("contextmenu", function () {
            cellClick(this, true)
        });
        mainEle.appendChild(cellEle);
    }
    console.log(cellNumbers)
    flagsID.innerHTML = totalBombs
}

drawCells(.15);
let flagSelected = !1;

function _selectFlag() {
    if (!noMove) {
        if (flagSelected) {
            selectID.style.backgroundColor = "red";
            flagSelected = false
        } else {
            selectID.style.backgroundColor = "forestGreen";
            flagSelected = true
        }
    }
}