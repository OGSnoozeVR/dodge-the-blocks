const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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

    requestAnimationFrame(update);
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
    blockSpeedMultiplier = 1;
    latestHighScoreIndex = -1;

    document.getElementById("score").innerText = "Score: 0";
    document.getElementById("gameOverScreen").classList.add("hidden");

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
