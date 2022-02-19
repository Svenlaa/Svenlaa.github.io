let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letters = document.getElementsByClassName('l');
let l0 = "A", l1 = "B";

function genLetter(non = 30) {
    let l = Math.floor(Math.random() * 26)
    return l === non ? genLetter(non) : l;
}

function newTurn() {
    l0 = genLetter();
    l1 = genLetter(l0);
    letters[0].innerHTML = alphabet[l0]
    letters[1].innerHTML = alphabet[l1]
}

let WINS = parseInt(getCookie("Lettest_WINS")) || 0;
let LOSS = parseInt(getCookie("Lettest_LOSS")) || 0;

function sla_button(input) {
    let isCorrect = l0 > l1 ? "AFTER" === input : "BEFORE" === input;
    let resultBanners = document.getElementsByClassName('result');
    for (let {style} of resultBanners) {
        style.display = 'none';
    }
    document.getElementsByClassName("result")[isCorrect + 0].style.display = 'inherit';
    let stats = isCorrect ? WINS += 1 : LOSS += 1;
    setCookie("FUN", isCorrect ? "Lettest_WINS" : "Lettest_LOSS", stats, 365);
    document.getElementById('winPercent').innerHTML = `&nbsp;.${(WINS / (WINS + LOSS) * 100).toFixed(0)}&#127942;`
    newTurn()
}