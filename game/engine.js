const Engine = {

loop(){

if(!Game.running) return

ctx.clearRect(0,0,canvas.width,canvas.height)

Player.update()
Enemies.update()
Powerups.update()
Particles.update()

Player.draw()
Enemies.draw()
Powerups.draw()
Particles.draw()

Game.score++

ctx.fillStyle="white"
ctx.fillText("Score: "+Game.score,10,20)

requestAnimationFrame(Engine.loop)

}

}
