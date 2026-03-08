const Player = {

x:330,
y:380,
width:40,
height:40,
speed:8,

frame:0,
timer:0,

sprite:new Image(),

init(){

this.sprite.src="assets/player_spritesheet.png"

},

update(){

if(Input.left) this.x -= this.speed
if(Input.right) this.x += this.speed

if(this.x < 0) this.x = 0
if(this.x + this.width > canvas.width)
this.x = canvas.width - this.width

this.timer++

if(this.timer > 6){

this.frame = (this.frame + 1) % 4
this.timer = 0

}

},

draw(){

ctx.drawImage(
this.sprite,
this.frame*32,
0,
32,
32,
this.x,
this.y,
this.width,
this.height
)

}

}
