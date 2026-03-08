const Enemies = {

list:[],
bosses:[],
timer:0,

spawn(){

this.list.push({
x:Math.random()*(canvas.width-40),
y:-40
})

},

spawnBoss(){

this.bosses.push({
x:Math.random()*(canvas.width-80),
y:-80,
hp:10
})

},

update(){

this.timer++

if(this.timer%60===0) this.spawn()
if(this.timer%800===0) this.spawnBoss()

this.list.forEach(e=>e.y+=4)

this.bosses.forEach(b=>b.y+=2)

},

draw(){

this.list.forEach(e=>{
ctx.drawImage(enemyImg,e.x,e.y,40,40)
})

this.bosses.forEach(b=>{
ctx.drawImage(bossImg,b.x,b.y,80,80)
})

}

}
