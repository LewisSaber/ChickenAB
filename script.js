let game = {}
let loading = 0;
let upgradelimits = []

function reset() {
    game = {
      Basic: Decimal(1),
      eggs: Decimal(0),
      upgrades : []
    }
    
  }








Decimal.config({ precision: 8, rounding: 4 })

Number.prototype.formateNumber = function (max = 1e5) {
  if (this.valueOf() >= max) {
    formatestring = this.valueOf().toExponential(1).replace("+", "")
  } else formatestring = this.valueOf() >> 0
  return formatestring
}

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
for(let i = game.upgrades.length; i < upgradesNames.length;i++) game.upgrades.push(0)
   upgradesNames.forEach((x,i)=>{
       switch (i) {
           case 1:
            upgradelimits.push(20)
       break;
           default:
            upgradelimits.push(10000000)
               break;
       }
      
       buyupgrade(i)
   })

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
    if(game.upgrades[1] && random(20/game.upgrades[1])) ThrowEgg(gEPT().mul(5))
   updateChickens()
   e.eggcounter.innerText = game.eggs.formateNumber()
   if(random(100)&& !isEventOn) randomEvent()

  }
  //10 times second
  function fasttick(){
      game.eggs = game.eggs.plus(game.Basic.mul(0.05))
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
  function gEPT()
  {
    return getUpgradeEffect(2)  }

  function buyupgrade(r) {
    let bupgrade = false
     cost = getCost(r)
     if (
       game[upgradeCosts[r]].greaterThanOrEqualTo(cost) &&
       loading == 1 &&
       game.upgrades[r] < upgradelimits[r]
     ) {
       game.upgrades[r] += 1
       switch (r) {
         case 0:
          ThrowEgg(gEPT());
          break;
         default:
   
           break
       }
       tick()
       game[upgradeCosts[r]] = game[upgradeCosts[r]].sub(cost)
       bupgrade = true
       
     }
     e["cost" + r].innerText = getCost(r).formateNumber() + getCostName(r)
     if (game.upgrades[r] >= upgradelimits[r]) {
       e["upgrade" + r].style.display = "none"
       temphideupgrades()
     }// else e["upgrade" + r].style.display = "block"
     return bupgrade
   }

   function temphideupgrades() {
    let totalupgrades = 0
    for (let i = 0; i < upgradesNames.length; i++) {
      if (game.upgrades[i] < upgradelimits[i]) {
       
          totalupgrades++
          if (totalupgrades > 6) {
            e["upgrade" + i].style.display = "none"
          } else e["upgrade" + i].style.display = "block"
        
      }
    }
  }
  function getCost(r){
     switch (r) {
         case 0:
             return Decimal(5).mul(gEPT())
         case 1:
             return Decimal(1000).mul(Decimal(2.4).toPower(Decimal(game.upgrades[r])))
         case 2:
           return Decimal(2000).mul(Decimal(1.5).toPower(Decimal(game.upgrades[r])))
         default:
             return Decimal(1e300)
             
     }
  }
  function random(r){
    r = Math.round(r)
      return Math.floor(Math.random()*r) == 0
  }
  function ThrowEgg(r=1,c = 0){

      if(random(4) || c){
         
          game.Basic = game.Basic.plus(Decimal(1).mul(r))
          updateChickens()
      }
  }
  let holding = 0
  let holdingtimer 

  function holdingpp(r){ holding++
    if(holding > 3)
    {
      clearInterval(holdingtimer)
      holingtimer = setInterval(buyupgrade,300,r)
    }
   }
  function holdUpdates(r){
    holdingtimer = setInterval(holdingpp,100,r)
   
  }
  function releaseUpdates(){
    holding = 0
    clearInterval(holdingtimer)
  }
  function getUpgradeEffect(r){
    switch (r) {
      case 2:
       return Decimal(game.upgrades[r] + 1)
       
    
      default:
        return Decimal(0)
   
    }
  }
  let totalevents = 1
  let isEventOn = false
  function randomEvent(){
     isEventOn = true
    let r = Math.floor(Math.random() *totalevents)
    switch (r) {
      case 0:
        e.largeEggEvent.style.display = "block"
        break;
    
      default:
        break;
    }
  }


  function getWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }

  //large egg Event
  let percentsize = 23 
  function growLargeEgg(){
    percentsize = (getComputedStyle(e.largeEggEvent).width.slice(0,-2)/getWidth()).toFixed(2)*100 
  e.largeEggEvent.style.width =   (getComputedStyle(e.largeEggEvent).width.slice(0,-2)/percentsize)*(percentsize+1)     +"px"
  if(percentsize > 45){
    e.largeEggEvent.style.display = "none"
    e.largeEggEvent.style.width =   (getComputedStyle(e.largeEggEvent).width.slice(0,-2)/percentsize)*22    +"px"
    percentsize = 22
     let reward = Decimal(600 + Math.floor(Math.random()*600)).mul(gEPT())
     ThrowEgg(reward,1)
     
     notification("Reward: "+ reward.formateNumber() + " Basic Chickens")
     isEventOn = false
  }
  }