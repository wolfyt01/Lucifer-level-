let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let character = { x: 180, y: 500, size: 30, emoji: "👹" };
let obstacles = [];
let gameRunning = false;
let score = 0;

// Start Game
function startGame() {
  document.getElementById("menu").style.display = "none";
  canvas.style.display = "block";
  gameRunning = true;
  obstacles = [];
  score = 0;
  requestAnimationFrame(updateGame);
}

// How to play
function howToPlay() {
  let inst = document.getElementById("instructions");
  inst.style.display = inst.style.display === "none" ? "block" : "none";
}

// Draw character
function drawCharacter() {
  ctx.font = character.size + "px Arial";
  ctx.fillText(character.emoji, character.x, character.y);
}

// Draw obstacles
function drawObstacles() {
  ctx.fillStyle = "red";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
  });
}

// Update game
function updateGame() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move & draw obstacles
  if (Math.random() < 0.03) {
    obstacles.push({ x: Math.random() * 350, y: 0, w: 40, h: 20 });
  }
  obstacles.forEach(obs => obs.y += 5);

  drawCharacter();
  drawObstacles();

  // Collision detection
  obstacles.forEach(obs => {
    if (
      character.x < obs.x + obs.w &&
      character.x + character.size > obs.x &&
      character.y < obs.y + obs.h &&
      character.y + character.size > obs.y
    ) {
      gameOver();
    }
  });

  // Remove passed obstacles
  obstacles = obstacles.filter(obs => obs.y < 600);

  // Score
  score++;
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 10, 20);

  requestAnimationFrame(updateGame);
}

// Controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft" && character.x > 0) {
    character.x -= 20;
  } else if (e.key === "ArrowRight" && character.x < canvas.width - character.size) {
    character.x += 20;
  }
});

// Game over
function gameOver() {
  gameRunning = false;
  alert("Game Over! Your score: " + score);
  document.location.reload();
    }
