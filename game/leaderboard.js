const Leaderboard = {

save(score){

let name =
document.getElementById("playerName").value || "Player"

let scores =
JSON.parse(localStorage.getItem("scores")) || []

scores.push({name,score})

scores.sort((a,b)=>b.score-a.score)

scores=scores.slice(0,10)

localStorage.setItem("scores",JSON.stringify(scores))

this.display()

},

display(){

let scores =
JSON.parse(localStorage.getItem("scores")) || []

let list=document.getElementById("leaderboard")

list.innerHTML=""

scores.forEach(s=>{

let li=document.createElement("li")

li.textContent=s.name+" - "+s.score

list.appendChild(li)

})

}

}

Leaderboard.display()
