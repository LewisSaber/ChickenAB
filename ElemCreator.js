let e = {}
function loadIDS(){
  var allElements = document.querySelectorAll("*[id]")
    for (let i = 0, n = allElements.length; i < n; i++) {
      e[allElements[i].id] = allElements[i]
    }
}

function createElements(){
//chickens
chickenNames.forEach(x => {  
  
  tag = document.createElement("div")
  tag.setAttribute("class", "chicken")
  tag.setAttribute("id", "chicken" + x)   
  tag.innerHTML  ="<img src='img/"+x+"chicken.png'> <div class='chickentext'>"+ x+ " <p id='chicken"+x+"Counter'>0</p></div>"
  e.chickensdiv.appendChild(tag)
 })

 upgradesNames.forEach((x,i)=>{
  tag = document.createElement("button")
  tag.setAttribute("class", "upgrade")
  tag.setAttribute("id", "upgrade" + i)
  tag.setAttribute("onclick", "buyupgrade(" + i + ")")
  tag.setAttribute("onmousedown", "holdUpdates(" + i + ")")
  tag.setAttribute("onmouseup", "releaseUpdates()")
  tag.innerHTML =
    x +
    '<p class="cost" id="cost' +
    i +
    '">0' +
    getCostName(i) +
    "</p>"
  e.upgradesdiv.appendChild(tag)
})

loadIDS()
}
function getCostName(r){
  r = upgradeCosts[r]
  switch (r) {
    default:
      return " " + r[0].toUpperCase() + r.slice(1); 
   
  }
}