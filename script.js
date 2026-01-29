const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let birdY = canvas.height / 2;
let velocity = 0;
const gravity = 0.6;
const jump = -10;

let pipes = [];
let score = 0;
let gameOver = false;

function addPipe() {
  const gap = 160;
  const top = Math.random() * (canvas.height - gap - 120) + 60;
  pipes.push({ x: canvas.width, top });
}

function reset() {
  birdY = canvas.height / 2;
  velocity = 0;
  pipes = [];
  score = 0;
  gameOver = false;
}

function flap() {
  if (gameOver) {
    reset();
  } else {
    velocity = jump;
  }
}

/* ===== TAMBAHAN INPUT (TIDAK UBAH GAME) ===== */

// Mobile
canvas.addEventListener("touchstart", flap);

// Desktop mouse
canvas.addEventListener("mousedown", flap);

// Desktop keyboard
document.addEventListener("keydown", e => {
  if (e.code === "Space") flap();
});

/* ========================================== */

setInterval(addPipe, 1500);

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameOver) {
    velocity += gravity;
    birdY += velocity;
  }

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(80, birdY, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "green";
  pipes.forEach(p => {
    if (!gameOver) p.x -= 3;

    ctx.fillRect(p.x, 0, 60, p.top);
    ctx.fillRect(p.x, p.top + 160, 60, canvas.height);

    if (
      80 + 20 > p.x &&
      80 - 20 < p.x + 60 &&
      (birdY - 20 < p.top || birdY + 20 > p.top + 160)
    ) {
      gameOver = true;
    }

    if (p.x + 60 === 80) score++;
  });

  if (birdY > canvas.height || birdY < 0) gameOver = true;

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
