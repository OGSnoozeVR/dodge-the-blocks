const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

let coinDrops = [];
const coinImage = new Image();
coinImage.src = "assets/coin.png";

let coins = 0;

const playerSprite = new Image();
playerSprite.src = "assets/player1.png";

let frame = 0;

let blocks = [];
let score = 0;
let gameOver = false;
let spawnRate = 1000;
let blockSpeedMultiplier = 1;
let latestHighScoreIndex = -1;

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

const blockImage = new Image();
blockImage.src = "https://i.imgur.com/8Qf6FQF.png"; // free block image

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
    if (e.key === "ArrowLeft" || e.key === "a") player.x -= player.speed;
    if (e.key === "ArrowRight" || e.key === "d") player.x += player.speed;

    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
}

function createBlock() {
    let size = 40;
    let x = Math.random() * (canvas.width - size);
    blocks.push({
        x: x,
        y: -size,
        width: size,
        height: size,
        speed: (3 + Math.random() * 3) * blockSpeedMultiplier
    });
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);


    
    // Update Blocks
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].y += blocks[i].speed;

        ctx.drawImage(
    playerSprite,
    frame * 32,
    0,
    32,
    32,
    player.x,
    player.y,
    player.width,
    player.height
);

frame++;
if (frame > 3) frame = 0; {endGame(); }

        // Remove off screen
if (blocks[i].y > canvas.height) {

    // 30% chance to spawn a coin
    if (Math.random() < 0.3) {
        coinDrops.push({
            x: blocks[i].x,
            y: blocks[i].y
        });
    }

    blocks.splice(i, 1);

    score++;
    document.getElementById("score").innerText = "Score: " + score;
}
    }
for (let i = 0; i < coinDrops.length; i++) {

        coinDrops[i].y += 3;

        ctx.drawImage(coinImage, coinDrops[i].x, coinDrops[i].y, 25, 25);

        if (
            player.x < coinDrops[i].x + 25 &&
            player.x + player.width > coinDrops[i].x &&
            player.y < coinDrops[i].y + 25 &&
            player.y + player.height > coinDrops[i].y
        ) {

            coins++;
            document.getElementById("coins").innerText = "Coins: " + coins;

            document.getElementById("coinSound").play();

            coinDrops.splice(i, 1);
        }
    }
for (let i = 0; i < particles.length; i++) {

    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.fillStyle = "orange";
    ctx.fillRect(p.x, p.y, 4, 4);

    if (p.life <= 0) {
        particles.splice(i,1);
        i--;
    }
}
    requestAnimationFrame(update);
}
// PARTICLE EXPLOSION FUNCTION
function createExplosion(x, y) {

    for (let i = 0; i < 30; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 60
        });
    }
}
function endGame() {
    gameOver = true;
    saveScore(score);

    document.getElementById("finalScore").innerText =
        "Final Score: " + score;

    document.getElementById("gameOverScreen").classList.remove("hidden");
}

function restartGame() {
    blocks = [];
    score = 0;
    gameOver = false;
function buySkin(file, price) {

    if (coins < price) {
        alert("Not enough coins!");
        return;
    }

    coins -= price;

    playerSprite.src = "assets/" + file;

    document.getElementById("coins").innerText =
        "Coins: " + coins;
}
    blockSpeedMultiplier = 1;
    latestHighScoreIndex = -1;
    document.getElementById("music").play();
    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("gameOverScreen").classList.add("hidden");
    createExplosion(player.x, player.y);
    document.getElementById("hitSound").play();
    update();
}

function saveScore(newScore) {
    const nameInput = document.getElementById("playerName");
    let playerName = nameInput.value.trim() || "Anonymous";

    const entry = { name: playerName, score: newScore };

    leaderboard.push(entry);
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);

    latestHighScoreIndex = leaderboard.findIndex(e => e === entry);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    const list = document.getElementById("leaderboard");
    list.innerHTML = "";

    leaderboard.forEach((entry, index) => {
        const li = document.createElement("li");
        li.textContent = `${entry.name} – ${entry.score}`;

        if (index === latestHighScoreIndex) {
            li.classList.add("gold");
        }

        list.appendChild(li);
    });
}

function clearLeaderboard() {
    leaderboard = [];
    localStorage.removeItem("leaderboard");
    displayLeaderboard();
}

function setColor(color) {
    player.color = color;
}

// Difficulty scaling
setInterval(() => {
    if (!gameOver) {
        blockSpeedMultiplier += 0.1;
        if (spawnRate > 400) {
            spawnRate -= 50;
            clearInterval(spawnInterval);
            spawnInterval = setInterval(createBlock, spawnRate);
        }
    }
}, 5000);

let spawnInterval = setInterval(createBlock, spawnRate);

displayLeaderboard();
update();
