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
loadIDS()
}