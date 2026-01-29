// game.js
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let birdY, velocity, pipes, score, gameOver;

const gravity = 0.6;
const jump = -10;
const birdX = 80;
const birdRadius = 20;
const pipeWidth = 60;
const pipeGap = 160;
const pipeSpeed = 3;

function reset() {
  birdY = canvas.height / 2;
  velocity = 0;
  pipes = [];
  score = 0;
  gameOver = false;
}

reset();

function flap() {
  if (gameOver) {
    reset();
  } else {
    velocity = jump;
  }
}

// MOBILE
canvas.addEventListener("touchstart", flap);

// DESKTOP (mouse)
canvas.addEventListener("mousedown", flap);

// DESKTOP (keyboard)
document.addEventListener("keydown", e => {
  if (e.code === "Space") flap();
});

function addPipe() {
  const top = Math.random() * (canvas.height - pipeGap - 120) + 60;
  pipes.push({ x: canvas.width, top, passed: false });
}

setInterval(addPipe, 1500);

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameOver) {
    velocity += gravity;
    birdY += velocity;
  }

  // Bird
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(birdX, birdY, birdRadius, 0, Math.PI * 2);
  ctx.fill();

  // Pipes
  ctx.fillStyle = "green";
  pipes.forEach(p => {
    if (!gameOver) p.x -= pipeSpeed;

    ctx.fillRect(p.x, 0, pipeWidth, p.top);
    ctx.fillRect(p.x, p.top + pipeGap, pipeWidth, canvas.height);

    // Collision
    if (
      birdX + birdRadius > p.x &&
      birdX - birdRadius < p.x + pipeWidth &&
      (birdY - birdRadius < p.top ||
        birdY + birdRadius > p.top + pipeGap)
    ) {
      gameOver = true;
    }

    // Score
    if (!p.passed && p.x + pipeWidth < birdX) {
      p.passed = true;
      score++;
    }
  });

  // Out of bounds
  if (birdY > canvas.height || birdY < 0) gameOver = true;

  // Score text
  ctx.fillStyle = "#000";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 20, 40);

  if (gameOver) {
    ctx.font = "32px Arial";
    ctx.fillText(
      "Tap / Click / Space to Restart",
      canvas.width / 2 - 200,
      canvas.height / 2
    );
  }

  requestAnimationFrame(update);
}

update();

