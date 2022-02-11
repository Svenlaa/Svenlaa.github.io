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

    let cN = 35; //number for Unicode Clock Emoji
    h%12===0 ? cN+=12 : cN+=h%12;
    if (m>=15) {
        m/15<3? cN+=12: cN!==47? cN+=1: cN-11
    }
    let c = "&#1283"+cN+";" // final emoji code

    document.getElementById("time").innerHTML = c+pad(h)+":"+pad(m)+"&nbsp;"
}
let everySecond = true;
const TickTock = setInterval(clock, 1000);