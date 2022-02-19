document.oncontextmenu = (()=>!1);
function pad (n) {return n.toString().padStart(2,"0")}
const selectID = document.getElementById("selectedItem")
  , headerID = document.getElementById("header")
  , flagsID = document.getElementById("flagLeft")
  , mainEle = document.getElementsByTagName("main")[0]
  , gameStateID = document.getElementById("gameState")
  , minGridSize = 50
  , timer = setInterval(updateTime, 1e3);
let xCells = 0
  , cellSize = 0
  , yCells = 0
  , totalBombs = 0
  , cellPlaces = []
  , timePlayed = 0
  , noMove = !1
  , shownFields = 0;
function updateTime() {
    let e = ++timePlayed % 60
      , l = Math.floor(timePlayed / 60);
    document.getElementById("timePlayed").innerHTML = `${l}:${pad(e)}`
}
function cellClick(e, l) {
    let t = e.classList
      , s = [...e.parentNode.children].indexOf(e);
    if (!t.contains("show") && !noMove)
        if (flagSelected || l)
            t.contains("flag") ? i(t, !1) : i(t, !0);
        else if (t.contains("flag"))
            i(t, 0);
        else {
            if (t.add("show"),
            t.add("o" + cellPlaces[s]),
            shownFields++,
            0 == cellPlaces[s]) {
                let l = [s + xCells, s - xCells];
                s % xCells != 0 && l.push(s - 1, s - 1 - xCells, s - 1 + xCells),
                (s + 1) % xCells != 0 && l.push(s + 1, s + 1 - xCells, s + 1 + xCells),
                l.forEach(l=>{
                    0 <= l && l < xCells * yCells && cellClick([...e.parentNode.children][l], !1)
                }
                )
            }
            9 == cellPlaces[s] ? a("red", ":-(") : xCells * yCells - totalBombs == shownFields && a("gold", ":-)")
        }
    function i(e, l) {
        l ? (flagsID.innerHTML--,
        e.add("flag")) : l || (e.remove("flag"),
        flagsID.innerHTML++)
    }
    function a(e, l) {
        gameStateID.innerHTML = l,
        headerID.style.backgroundColor = e,
        selectID.style.backgroundColor = "#0000",
        clearInterval(timer),
        noMove = !0
    }
}
function drawCells(e) {
    headerID.style.height = "auto",
    mainEle.style.height = "100%",
    xCells = Math.floor(mainEle.offsetWidth / minGridSize),
    cellSize = mainEle.offsetWidth / xCells,
    yCells = Math.floor(mainEle.offsetHeight / cellSize);
    const l = xCells * yCells;
    mainEle.style.gridTemplateColumns = `repeat(${xCells}, ${cellSize}px)`,
    mainEle.style.gridTemplateRows = `repeat(${yCells}, ${cellSize}px)`,
    headerID.style.height = "100%",
    mainEle.style.height = "auto",
    totalBombs = Math.floor(xCells * yCells * e);
    let t = [];
    for (i = 0; i < totalBombs; i++) {
        function s() {
            let e = Math.floor(Math.random() * xCells * yCells);
            t.includes(e) ? s() : t.push(e)
        }
        s()
    }
    for (i = 0; i < l; i++) {
        let e = document.createElement("div");
        e.classList.add("gridCell");
        let s = [i - xCells];
        i % xCells != 0 && s.push(i - 1, i - 1 - xCells),
        (i + 1) % xCells != 0 && s.push(i + 1 - xCells),
        t.includes(i) ? (cellPlaces[i] = 9,
        s.forEach(e=>{
            0 <= e && e < l && 9 != cellPlaces[e] && cellPlaces[e]++
        }
        )) : (cellPlaces[i] = 0,
        s.forEach(e=>{
            0 <= e && e < l && 9 == cellPlaces[e] && cellPlaces[i]++
        }
        )),
        e.addEventListener("click", function() {
            cellClick(this, !1)
        }),
        e.addEventListener("contextmenu", function() {
            cellClick(this, !0)
        }),
        mainEle.appendChild(e)
    }
    flagsID.innerHTML = totalBombs
}
drawCells(.15);
let flagSelected = !1;
function _selectFlag() {
    noMove || (flagSelected ? (flagSelected = !1,
    selectID.style.backgroundColor = "red") : flagSelected || (flagSelected = !0,
    selectID.style.backgroundColor = "forestGreen"))
}
