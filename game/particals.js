const Particles = {

list:[],

explode(x,y){

for(let i=0;i<40;i++){

this.list.push({
x,
y,
vx:(Math.random()-0.5)*10,
vy:(Math.random()-0.5)*10,
life:60
})

}

},

update(){

this.list.forEach(p=>{

p.x+=p.vx
p.y+=p.vy
p.life--

})

this.list=this.list.filter(p=>p.life>0)

},

draw(){

ctx.fillStyle="orange"

this.list.forEach(p=>{

ctx.fillRect(p.x,p.y,4,4)

})

}

}
