const CANVASTAG = document.getElementById("game");
const canvasContext = CANVASTAG.getContext("2d");
var gameIsRunning = true;
const FRAME = 1000 / 60;

const square = new Square(15, 15, "green", 225, 225, canvasContext);

function gameLoop() {
  const loop = () => {
    render();
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
}

function inputProcess() {
  window.addEventListener("keydown", (event) => {
    event.preventDefault();
    console.log(event);
    square.keys = square.keys || [];
    square.keys[event.key] = event.type === "keydown";
    if (square[event.key]) {
      square[event.key](true);
    }
    console.log(square);
  });
  window.addEventListener("keyup", function (event) {
    square.keys[event.key] = event.type === "keydown";
    if (square[event.key]) {
      square[event.key](false);
    }
  });
}

function clearScreen() {
  canvasContext.clearRect(0, 0, 500, 500);
}

function Square(width, height, color, x, y, ctx) {
  this.width = width;
  this.height = height;
  this.angle = 0;
  this.moveAngle = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.draw = () => {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  };
  this.a = (press) => {
    if (press) {
      this.speedX = 1;
      this.x += -this.speedX;
    } else {
      this.speedX = 0;
      this.x += -this.speedX;
    }
  };
  this.d = (press) => {
    if (press) {
      this.speedX = 1;
      this.x += this.speedX;
    } else {
      this.speedX = 0;
      this.x += this.speedX;
    }
  };
  this.w = (press) => {
    if (press) {
      this.speedY = 1;
      this.y += -this.speedY;
    } else {
      this.speedY = 0;
      this.y += -this.speedY;
    }
  };
  this.s = (press) => {
    if (press) {
      this.speedY = 1;
      this.y += this.speedY;
    } else {
      this.speedY = 0;
      this.y += this.speedY;
    }
  };
}

function render() {
  clearScreen();
  square.draw();
}

gameLoop();
inputProcess();
