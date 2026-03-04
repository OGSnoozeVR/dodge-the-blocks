const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
let player = {
    x: 180,
    y: 550,
    width: 40,
    height: 40,
    speed: 6
};

let blocks = [];
let score = 0;
let gameOver = false;

document.addEventListener("keydown", movePlayer);

function movePlayer(e) {
    if (e.key === "ArrowLeft" || e.key === "a") {
        player.x -= player.speed;
    }
    if (e.key === "ArrowRight" || e.key === "d") {
        player.x += player.speed;
    }

    // Prevent going off left side
    if (player.x < 0) {
        player.x = 0;
    }

    // Prevent going off right side
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

function createBlock() {
    let size = 30;
    let x = Math.random() * (canvas.width - size);
    blocks.push({
        x: x,
        y: -size,
        width: size,
        height: size,
        speed: 3 + Math.random() * 3
    });
}

function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player
    ctx.fillStyle = "lime";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Update Blocks
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].y += blocks[i].speed;

        ctx.fillStyle = "red";
        ctx.fillRect(blocks[i].x, blocks[i].y, blocks[i].width, blocks[i].height);

        // Collision
        if (
            player.x < blocks[i].x + blocks[i].width &&
            player.x + player.width > blocks[i].x &&
            player.y < blocks[i].y + blocks[i].height &&
            player.y + player.height > blocks[i].y
        ) {
            gameOver = true;
            alert("Game Over! Final Score: " + score);
        }

        // Remove off screen
        if (blocks[i].y > canvas.height) {
            blocks.splice(i, 1);
            score++;
            document.getElementById("score").innerText = "Score: " + score;
        }
    }

    requestAnimationFrame(update);
}

function restartGame() {
    blocks = [];
    score = 0;
    gameOver = false;
    player.x = 180;
    document.getElementById("score").innerText = "Score: 0";
    update();
}

// Spawn blocks every second
setInterval(createBlock, 1000);
function saveScore(newScore) {
    leaderboard.push(newScore);

    // Sort highest to lowest
    leaderboard.sort((a, b) => b - a);

    // Keep only top 5
    leaderboard = leaderboard.slice(0, 5);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    displayLeaderboard();
}

function displayLeaderboard() {
    const list = document.getElementById("leaderboard");
    list.innerHTML = "";

    leaderboard.forEach(score => {
        const li = document.createElement("li");
        li.textContent = score;
        list.appendChild(li);
    });
}
update();
