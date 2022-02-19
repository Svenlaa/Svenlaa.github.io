//Add Clock.css to <head>
head = document.getElementsByTagName("head")[0]
let cssLink = document.createElement("link")
cssLink.rel = "stylesheet"
cssLink.type = "text/css"
cssLink.href = "/style/clock.css"
head.appendChild(cssLink)

//Add Clock Element to <body>
body = document.getElementsByTagName("body")[0]
let clockElement = document.createElement("span")
clockElement.id = "clock"
clockElement.classList.add("smallText")
body.appendChild(clockElement)

function clock() {
    let time = new Date();
    if(everySecond && time.getSeconds()===0){
        everySecond = false
        clearInterval(TickTock)
        setInterval(clock, 60000)
    }
    function pad (n) {return n.toString().padStart(2,"0")}

    let h = time.getHours();
    let m = time.getMinutes();

    let cN = 35; //part number for Unicode Clock Emoji
    h%12===0 ? cN+=12 : cN+=h%12;
    if (m>=15) {
        m/15<3? cN+=12: cN!==47? cN+=1: cN-11
    }
    let c = `&#1283${cN};` // final emoji code

    clockElement.innerHTML = `${c+pad(h)}:${pad(m)}&nbsp`
}
let everySecond = true;
const TickTock = setInterval(clock, 1000);