function addNew() {
  document.getElementById("inputBar").style.display = "flex",
  document.getElementById("itemInput").value = null,
  document.getElementById("itemInput").focus()
}
const listID = document.getElementById("list");
function _newItem(e, t) {
  console.log(`_newItem(${e},${t}) executed`);
  let n = document.createElement("li");
  n.classList.add("listItem"),
  t && n.classList.add("crossedItem");
  let l = document.createElement("button");
  l.addEventListener("click", function() {
      toggleState(this)
  }),
  l.classList.add("cButton");
  let o = document.createElement("img");
  o.alt = "checkbox",
  o.src = t ? "/img/icon/check-circle-1.png" : "/img/icon/sl-circle.png",
  l.appendChild(o);
  let i = document.createElement("span");
  i.innerHTML = e;
  let s = document.createElement("button");
  s.classList.add("deleteButton"),
  s.addEventListener("click", function() {
      deleteItem(this)
  });
  let a = document.createElement("img");
  return a.src = "/img/icon/close.png",
  a.alt = "delete",
  s.appendChild(a),
  n.appendChild(l),
  n.appendChild(i),
  n.appendChild(s),
  n
}
function confirmItem(e) {
  if (e) {
      let e = document.getElementById("itemInput").value;
      listID.appendChild(_newItem(e, !1)),
      addStorage(e, !1)
  }
  document.getElementById("itemInput").value = null,
  document.getElementById("inputBar").style.display = "none"
}
document.getElementById("inputBar").onkeydown = function(e) {
  "Enter" == e.key && confirmItem(!0)
}
;
let delButtonsShown = !1;
function delItems() {
  let e = document.getElementsByClassName("deleteButton")
    , t = 0;
  for (t = 0; t <= e.length; t++)
      0 != t && (e[t - 1].style.display = delButtonsShown ? "none" : "block");
  delButtonsShown = !delButtonsShown
}
function toggleState(e) {
  let t = e.parentElement;
  t.classList.contains("crossedItem") ? (e.firstChild.src = "/img/icon/sl-circle.png",
  t.classList.remove("crossedItem"),
  toggleStorage(e)) : (e.firstChild.src = "/img/icon/check-circle-1.png",
  t.classList.add("crossedItem"),
  toggleStorage(e))
}
function deleteItem(e) {
  e.parentElement.remove(),
  delButtonsShown = 0 != document.getElementsByClassName("listItem").length,
  delStorage(e)
}
function arrayColumn(e, t) {
  return e.map(e=>e[t])
}
function addStorage(e, t) {
  null == localStorage.getItem("items") && setStorage();
  let n = JSON.parse(localStorage.getItem("items"));
  n.push([e, t]),
  localStorage.setItem("items", JSON.stringify(n))
}
function toggleStorage(e) {
  let t = e.nextSibling.innerHTML
    , n = e.parentElement.classList.contains("crossedItem");
  null == localStorage.getItem("items") && setStorage();
  let l = JSON.parse(localStorage.getItem("items"));
  l[arrayColumn(l, 0).findIndex(e=>e == t)] = [t, n],
  localStorage.setItem("items", JSON.stringify(l))
}
function delStorage(e) {
  let t = e.previousSibling.innerHTML;
  null == localStorage.getItem("items") && setStorage();
  let n = JSON.parse(localStorage.getItem("items"))
    , l = arrayColumn(n, 0).findIndex(e=>e == t);
  n.splice(l, 1),
  localStorage.setItem("items", JSON.stringify(n))
}
function setStorage() {
  localStorage.setItem("items", JSON.stringify([]))
}
function addFromStorage() {
  document.getElementById("list").innerHTML = null;
  let e = JSON.parse(localStorage.getItem("items"));
  e || (e = []),
  e.forEach(e=>{
      let t = e[0]
        , n = e[1];
      listID.appendChild(_newItem(t, n))
  }
  )
}
addFromStorage();
