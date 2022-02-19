function makeElement(tag, innerHTML=null, id=null, classes=null) {
    let element = document.createElement(tag)
    if(innerHTML){element.innerHTML = innerHTML}
    if(id){element.id = id}
    if (classes) {
        for (let myClass in classes) {
            element.classList.add(classes[myClass])
            classes[myClass]
        }
    }
    return element
}

let head = document.getElementsByTagName("head")[0]
let body = document.getElementsByTagName("body")[0]