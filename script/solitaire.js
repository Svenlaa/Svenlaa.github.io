function createDeck() {
    field = [cardArray.splice(0, 1), cardArray.splice(0, 2), cardArray.splice(0, 3), cardArray.splice(0, 4), cardArray.splice(0, 5), cardArray.splice(0, 6), cardArray.splice(0, 7)],
        foundation = [["S0"], ["H0"], ["D0"], ["C0"]],
        inventory = [cardArray, field, foundation],
        writeDeck()
}

function writeDeck() {
    let e = 0
        , t = 0
        , n = 0;
    field.forEach(function (t) {
        n = 0,
            t.forEach(t => {
                    let i;
                    i = n == e ? '><img src="/img/solitaire/' + t + '.webp"' : 'class="hiddenCard"><img src="/img/solitaire/BG.webp"',
                        document.getElementsByClassName("column")[e].innerHTML += '<li id="' + t + '" onclick="moveCard(this)"' + i + 'class="card"></li>',
                        n++
                }
            ),
            e++
    }),
        foundation.forEach(function (e) {
            e.forEach(e => {
                    let n;
                    n = 0 == e[1] ? 'class="lowOpacity"' : 'onclick="moveCard(this)"',
                        document.getElementsByClassName("found")[t].innerHTML += '<li id="' + e + '"' + n + '><img src="/img/solitaire/' + e + '.webp" class="card"></li>'
                }
            ),
                t++
        }),
        writeStack(cardArray)
}

function writeStack(e) {
    document.getElementById("sDown").innerHTML = '<li id="NS" class="lowOpacity" onclick="rewriteStack()"><img src="/img/solitaire/NS.webp" class="card"></li>',
        e.forEach(e => {
                document.getElementById("sDown").innerHTML += '<li id="' + e + '" class="hiddenCard" onclick="moveCard(this)"><img src="/img/solitaire/BG.webp" class="card"></li>'
            }
        ),
        document.getElementById("sUp").innerHTML = '<li id="TT" class="hiddenCard"><img src="/img/solitaire/TT.webp" class="card"></li><li id="TT"><img src="/img/solitaire/TT.webp" class="card"></li>'
}

function rewriteStack() {
    let e = document.getElementById("sUp").childNodes
        , t = [];
    e.forEach(e => {
            "TT" != e.id && t.push(e.id)
        }
    ),
        writeStack(t.reverse())
}

let firstShuffle = !0;

function shuffle(e) {
    let t = e.length;
    for (; 0 !== t;) {
        let n = Math.floor(Math.random() * t)
            , i = e[t -= 1];
        e[t] = e[n],
            e[n] = i
    }
    return firstShuffle = !1,
        e
}

function getNumber(e) {
    return parseInt("0x" + e.id[1])
}

function getColor(e) {
    let t = e.id[0];
    return "C" == t || "S" == t ? "R" : "D" == t || "H" == t ? "B" : void 0
}

function getSymbol(e) {
    return e.id[0]
}

function isLastOfColumn(e) {
    return e == e.parentElement.lastChild
}

let timer, clicks = 0, sDiff = 0;

function isClicked() {
    1 == ++clicks && (timer = setInterval(repeatTime, 1e3)),
        document.getElementById("clicks").innerHTML = clicks + "x"
}

function repeatTime() {
    sDiff++,
        document.getElementById("time").innerHTML = new Date(1e3 * sDiff).toISOString().substr(14, 5)
}

function stopTimer() {
    clearInterval(timer)
}

function grabNext(e, t) {
    return e || (e = t),
        e = e.nextElementSibling ? e.nextElementSibling : e.parentElement.firstElementChild,
        optionsChecked++,
        e
}

let cardString = "C1,C2,C3,C4,C5,C6,C7,C8,C9,CA,CB,CC,CD,D1,D2,D3,D4,D5,D6,D7,D8,D9,DA,DB,DC,DD,H1,H2,H3,H4,H5,H6,H7,H8,H9,HA,HB,HC,HD,S1,S2,S3,S4,S5,S6,S7,S8,S9,SA,SB,SC,SD"
    , cardArray = cardString.split(",");
shuffle(cardArray),
    console.log(cardArray.toString()),
    createDeck();
const stackDown = document.getElementById("sDown")
    , stackUp = document.getElementById("sUp");
let found = document.getElementsByClassName("found")[0]
    , column = document.getElementsByClassName("column")[0];

function showHidden(e) {
    return !!e && ("column" == cardOrigin && (score += 5),
        e.classList.remove("hiddenCard"),
        e.firstElementChild.src = "/img/solitaire/" + e.id + ".webp",
        !0)
}

function moveTheCard(e, t, n) {
    null == n && (n = !0),
    "foundation" == cardOrigin && (score -= 10);
    "stack" == cardOrigin && 1 == n && (score += 5);
    let i = [e]
        , r = e.nextElementSibling;
    for (; r;)
        i.push(r),
            r = r.nextElementSibling;
    for (1 == n && showHidden(e.previousElementSibling); i.length > 0;) {
        let e = i.shift();
        t.appendChild(e.cloneNode(!0)),
            e.remove()
    }
    return !0
}

let cardOrigin, nextFound, nextColumn, score = 0, optionsChecked = 0;

function moveCard(e) {
    let t = !1;
    if ("found" == (cardOrigin = e.parentElement.className) && (found = e.parentElement),
    "column" == cardOrigin && (column = e.parentElement),
    "hiddenCard" == e.className)
        e == stackDown.lastChild && (showHidden(e),
            t = moveTheCard(e, stackUp, !1));
    else {
        if ("stack" == cardOrigin && !isLastOfColumn(e))
            return !1;
        for (optionsChecked = 0; optionsChecked < 4 && !t;)
            nextFound = grabNext(nextFound, found),
            getSymbol(e) == getSymbol(nextFound.lastChild) && getNumber(e) - 1 == getNumber(nextFound.lastChild) && isLastOfColumn(e) && (t = moveTheCard(e, nextFound),
                score += 10);
        for (; optionsChecked < 11 && !t;)
            (nextColumn = grabNext(nextColumn, column)).lastChild || 13 != getNumber(e) ? nextColumn.lastChild && getColor(e) != getColor(nextColumn.lastChild) && getNumber(e) + 1 == getNumber(nextColumn.lastChild) && (t = moveTheCard(e, nextColumn)) : t = moveTheCard(e, nextColumn)
    }
    14 == document.getElementsByClassName("found")[0].children.length && 14 == document.getElementsByClassName("found")[1].children.length && 14 == document.getElementsByClassName("found")[2].children.length && 14 == document.getElementsByClassName("found")[3].children.length && (clearInterval(timer),
        console.log(cardArray.toString())),
        document.getElementById("score").innerHTML = score + "P"
}
