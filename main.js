const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

const Game = {

running:false,
paused:false,
score:0,

start(){

document.getElementById("menu").style.display="none"
canvas.style.display="block"

this.running=true

Engine.loop()

},

restart(){

location.reload()

},

pause(){

this.paused=!this.paused

document.getElementById("pause").style.display =
this.paused ? "block" : "none"

},

over(){

this.running=false

document.getElementById("gameOver").style.display="block"

document.getElementById("finalScore").innerText =
"Score: "+this.score

Leaderboard.save(this.score)

}

}

document.addEventListener("keydown",e=>{

if(e.key==="p")Game.pause()

})
