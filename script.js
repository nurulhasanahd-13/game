* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  touch-action: manipulation;
}

body {
  background: #70c5ce;
  overflow: hidden;
}

/* Canvas tetap full */
canvas {
  display: block;
  width: 100vw;
  height: 100vh;
}

/* Tombol khusus HP */
#btnFlap {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: none;
  background: rgba(0,0,0,0.5);
  color: white;
  font-size: 18px;
  font-weight: bold;
}

const jumpBtn = document.getElementById("jumpBtn");

if (jumpBtn) {
  jumpBtn.addEventListener("touchstart", () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: " " })
    );
  });
}
/* Desktop: tombol tidak mengganggu */
@media (min-width: 768px) {
  #btnFlap {
    display: none;
  }
}

