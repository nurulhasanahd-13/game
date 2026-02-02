let move_speed = 3,
  gravity = 0.5;

let bird = document.querySelector(".bird");
let img = document.getElementById("bird-1");

let sound_point = new Audio("sounds effect/point.wav");
let sound_die = new Audio("sounds effect/die.wav");
let sound_tap = new Audio("sounds effect/tap.wav");

// properti burung & background
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();

let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");

let game_state = "Start";
img.style.display = "none";
message.classList.add("messageStyle");

sound_tap.play();

/* ================== START GAME ================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && game_state !== "Play") {
    document.querySelectorAll(".pipe_sprite").forEach((e) => e.remove());

    img.style.display = "block";
    bird.style.top = "40vh";
    game_state = "Play";

    message.innerHTML = "";
    score_title.innerHTML = "Skor : ";
    score_val.innerHTML = "0";
    message.classList.remove("messageStyle");

    play();
  }
});

/* ================== MAIN GAME ================== */
function play() {
  function move() {
    if (game_state !== "Play") return;

    let pipe_sprite = document.querySelectorAll(".pipe_sprite");

    pipe_sprite.forEach((element) => {
      let pipe_props = element.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();

      if (pipe_props.right <= 0) {
        element.remove();
      } else {
        if (
          bird_props.left < pipe_props.left + pipe_props.width &&
          bird_props.left + bird_props.width > pipe_props.left &&
          bird_props.top < pipe_props.top + pipe_props.height &&
          bird_props.top + bird_props.height > pipe_props.top
        ) {
          game_state = "End";
          message.innerHTML =
            "Game Over".fontcolor("red") +
            "<br>Tekan Enter untuk memulai kembali";
          message.classList.add("messageStyle");
          img.style.display = "none";
          sound_die.play();
          return;
        } else {
          if (
            pipe_props.right < bird_props.left &&
            pipe_props.right + move_speed >= bird_props.left &&
            element.increase_score === "1"
          ) {
            score_val.innerHTML = +score_val.innerHTML + 1;
            sound_point.play();
            element.increase_score = "0";
          }
          element.style.left = pipe_props.left - move_speed + "px";
        }
      }
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  /* ================== GRAVITY ================== */
  let bird_dy = 0;

  function apply_gravity() {
    if (game_state !== "Play") return;

    bird_dy += gravity;

    bird.style.top = bird_props.top + bird_dy + "px";
    bird_props = bird.getBoundingClientRect();

    if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
      game_state = "End";
      window.location.reload();
      return;
    }

    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  /* ================== PIPE ================== */
  let pipe_separation = 0;
  let pipe_gap = 35;

  function create_pipe() {
    if (game_state !== "Play") return;

    if (pipe_separation > 115) {
      pipe_separation = 0;

      let pipe_posi = Math.floor(Math.random() * 43) + 8;

      let pipe_inv = document.createElement("div");
      pipe_inv.className = "pipe_sprite";
      pipe_inv.style.top = pipe_posi - 70 + "vh";
      pipe_inv.style.left = "100vw";
      document.body.appendChild(pipe_inv);

      let pipe = document.createElement("div");
      pipe.className = "pipe_sprite";
      pipe.style.top = pipe_posi + pipe_gap + "vh";
      pipe.style.left = "100vw";
      pipe.increase_score = "1";
      document.body.appendChild(pipe);
    }

    pipe_separation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}

/* ================== JUMP CONTROL (KEYBOARD) ================== */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" || e.key === " ") {
    img.src = "images/bird-2.png";
    bird_dy = -7.6;
    sound_tap.play();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp" || e.key === " ") {
    img.src = "images/bird.png";
  }
});

/* ================== MOBILE BUTTON SUPPORT ================== */
document.addEventListener("DOMContentLoaded", () => {
  const jumpBtn = document.getElementById("jumpBtn");

  if (jumpBtn) {
    jumpBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      img.src = "images/bird-2.png";
      bird_dy = -7.6;
      sound_tap.play();
    });

    jumpBtn.addEventListener("touchend", () => {
      img.src = "images/bird.png";
    });
  }
});
