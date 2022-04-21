let game = {}
let loading = 0;


function reset() {
    game = {
      Basic: Decimal(1),
      eggs: Decimal(0),
    }
    
  }








Decimal.config({ precision: 8, rounding: 4 })

Decimal.prototype.formateNumber = function (max = 5, r = 0) {
    if (this.e >= 100000) {
      formatestring = 1 + "ee" + Math.log10(this.e).toFixed(1)
    } else if (this.e >= max) {
      formatestring = this.toExponential(1).replace("+", "")
    } else formatestring = this.toFixed(r, Decimal.ROUND_DOWN)
    return formatestring
  }
  function save() {
    localStorage.setItem("theChickenABSave", JSON.stringify(game))
  }
  
  function load() {
    reset()
    let loadgame = JSON.parse(localStorage.getItem("theChickenABSave"))
    if (loadgame != null) {
      loadGame(loadgame)
    }
  }
  
  function loadGame(loadgame) {
    //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
    for (i = 0; i < Object.keys(loadgame).length; i++) {
      if (loadgame[Object.keys(loadgame)[i]] != "undefined") {
        if (Object.keys(loadgame)[i] == "upgrade") {
          for (j = 0; j < Object.keys(game.upgrade).length; j++) {
            if (loadgame.upgrade[Object.keys(game.upgrade)[j]] == null) {
              loadgame.upgrade[Object.keys(game.upgrade)[j]] =
                game.upgrade[Object.keys(game.upgrade)[j]]
            } else {
              console.log("loading")
              game.upgrade[Object.keys(game.upgrade)[j]] =
                loadgame.upgrade[Object.keys(game.upgrade)[j]]
            }
          }
        } else if (typeof loadgame[Object.keys(loadgame)[i]] == "string") {
          game[Object.keys(loadgame)[i]] = Decimal(
            loadgame[Object.keys(loadgame)[i]]
          )
        } else {
          game[Object.keys(game)[i]] = loadgame[Object.keys(loadgame)[i]]
        }
      }
    }
  }
  
  function exportGame() {
    save()
    navigator.clipboard.writeText(btoa(JSON.stringify(game))).then(
      function () {
        alert("Copied to clipboard!")
      },
      function () {
        alert("Error copying to clipboard, try again...")
      }
    )
  }
  
  function importGame() {
    loadgame = JSON.parse(atob(prompt("Input your save here:")))
    if (loadgame && loadgame != null && loadgame != "") {
      reset()
      loadGame(loadgame)
      save()
    } else {
      alert("Invalid input.")
    }
    window.location.reload()
  }

  let savetimer
  let ticktimer
  let fastticktimer
  let loadingtimer
   function LOADING(){
    loadIDS()
    createElements()
    load()


fastticktimer = setInterval(fasttick,100)
ticktimer = setInterval(tick,1000)
  savetimer = setInterval(save,1000)
  loadingtimer = setInterval(loadScreen,20)
  loading = 1;
   }





   function notification(r) {
    e.notification.innerText = r
    e.notification.style.display = "block"
    setTimeout(removenotification, 2000)
  }
  function removenotification() {
    e.notification.style.display = "none"
  }
  function updateChickens(){
      chickenNames.forEach((x) =>{ 
    e["chicken"+x+"Counter"].innerText = game[x].formateNumber()
      })
  }
//once a second
  function tick(){
   updateChickens()
   e.eggcounter.innerText = game.eggs.formateNumber()

  }
  //10 times secon
  function fasttick(){
      game.eggs = game.eggs.plus(game.Basic.mul(0.1))
  }

  let loadingScreenOpacity = 1.5
  
  
  function loadScreen()
  {
    if(loadingScreenOpacity < 0.5)
    loadingScreenOpacity = loadingScreenOpacity-0.03
    else
    loadingScreenOpacity = loadingScreenOpacity-0.01
    
      e.loading.style.opacity = loadingScreenOpacity
    if(loadingScreenOpacity <= 0){
        e.loading.style.display = "none"
        clearInterval(loadingtimer)
    }
  }