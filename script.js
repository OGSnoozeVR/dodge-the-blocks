const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

let player = {
x:280,
y:340,
width:40,
height:40,
speed:8
}

let keys = {}

let blocks=[]
let coinsDrops=[]
let particles=[]

let score=0
let coins=0
let gameOver=false
let spawnRate=60
let frame=0

let playerSprite=new Image()
playerSprite.src="assets/player1.png"

let blockImage=new Image()
blockImage.src="assets/block.png"

let coinImage=new Image()
coinImage.src="assets/coin.png"

document.addEventListener("keydown",e=>keys[e.key]=true)
document.addEventListener("keyup",e=>keys[e.key]=false)

function spawnBlock(){

blocks.push({
x:Math.random()*(canvas.width-40),
y:-40,
width:40,
height:40
})

}

function createExplosion(x,y){

for(let i=0;i<30;i++){

particles.push({
x:x,
y:y,
vx:(Math.random()-0.5)*8,
vy:(Math.random()-0.5)*8,
life:60
})

}

}

function update(){

if(gameOver)return

frame++

if(frame%spawnRate===0){

spawnBlock()

if(spawnRate>20)spawnRate--

}

if(keys["ArrowLeft"])player.x-=player.speed
if(keys["ArrowRight"])player.x+=player.speed
if(keys["ArrowUp"])player.y-=player.speed
if(keys["ArrowDown"])player.y+=player.speed

if(player.x<0)player.x=0
if(player.x+player.width>canvas.width)player.x=canvas.width-player.width
if(player.y<0)player.y=0
if(player.y+player.height>canvas.height)player.y=canvas.height-player.height

for(let i=0;i<blocks.length;i++){

blocks[i].y+=4

ctx.drawImage(blockImage,blocks[i].x,blocks[i].y,40,40)

if(
player.x<blocks[i].x+40 &&
player.x+player.width>blocks[i].x &&
player.y<blocks[i].y+40 &&
player.y+player.height>blocks[i].y
){

document.getElementById("deathSound").play()

createExplosion(player.x,player.y)

endGame()

}

if(blocks[i].y>canvas.height){

score++

if(Math.random()<0.3){

coinsDrops.push({
x:blocks[i].x,
y:blocks[i].y
})

}

blocks.splice(i,1)

}

}

for(let i=0;i<coinsDrops.length;i++){

coinsDrops[i].y+=3

ctx.drawImage(coinImage,coinsDrops[i].x,coinsDrops[i].y,25,25)

if(
player.x<coinsDrops[i].x+25 &&
player.x+player.width>coinsDrops[i].x &&
player.y<coinsDrops[i].y+25 &&
player.y+player.height>coinsDrops[i].y
){

coins++

document.getElementById("coins").innerText="Coins: "+coins

document.getElementById("coinSound").play()

coinsDrops.splice(i,1)

}

}

for(let i=0;i<particles.length;i++){

let p=particles[i]

p.x+=p.vx
p.y+=p.vy
p.life--

ctx.fillStyle="orange"
ctx.fillRect(p.x,p.y,4,4)

if(p.life<=0)particles.splice(i,1)

}

ctx.drawImage(playerSprite,player.x,player.y,player.width,player.height)

ctx.fillStyle="white"
ctx.fillText("Score: "+score,10,20)

requestAnimationFrame(gameLoop)

}

function gameLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height)

update()

}

function endGame(){

gameOver=true

saveScore()

document.getElementById("gameOverScreen").style.display="block"

document.getElementById("finalScore").innerText="Score: "+score

}

function restartGame(){

location.reload()

}

function buySkin(file,price){

if(coins<price){

alert("Not enough coins!")

return

}

coins-=price

playerSprite.src="assets/"+file

document.getElementById("coins").innerText="Coins: "+coins

}

function saveScore(){

let name=document.getElementById("playerName").value||"Player"

let leaderboard=JSON.parse(localStorage.getItem("leaderboard"))||[]

leaderboard.push({name,score})

leaderboard.sort((a,b)=>b.score-a.score)

leaderboard=leaderboard.slice(0,10)

localStorage.setItem("leaderboard",JSON.stringify(leaderboard))

displayLeaderboard()

}

function displayLeaderboard(){

let leaderboard=JSON.parse(localStorage.getItem("leaderboard"))||[]

let list=document.getElementById("leaderboard")

list.innerHTML=""

leaderboard.forEach((entry,i)=>{

let li=document.createElement("li")

li.textContent=`${entry.name} – ${entry.score}`

if(i===0)li.classList.add("gold")

list.appendChild(li)

})

}

function clearLeaderboard(){

localStorage.removeItem("leaderboard")

displayLeaderboard()

}

displayLeaderboard()

document.getElementById("music").play()

gameLoop()
