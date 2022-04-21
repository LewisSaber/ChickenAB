let e = {}
function loadIDS(){
  var allElements = document.querySelectorAll("*[id]")
    for (let i = 0, n = allElements.length; i < n; i++) {
      e[allElements[i].id] = allElements[i]
    }
}