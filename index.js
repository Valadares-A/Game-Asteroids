const CANVASTAG = document.getElementById("game");
const canvasContext = CANVASTAG.getContext("2d");
var gameIsRunning = true;
const FRAME = 1000 / 60;

const square = new component(15, 15, "green", 225, 225);

// var img = new Image();
// img.src = "https://i.redd.it/pzaudo3x5nu51.jpg";
// img.onload = function () {
//   canvasContext.drawImage(img, 50, 0);
// };

function startGameLoop() {
  const loop = () => {
    updateGame();

    // canvasContext.fillStyle = "green";
    // canvasContext.fillRect(0, 0, 15, 15);

    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
}

function startInputProcess() {
  window.addEventListener("keydown", (event) => {
    event.preventDefault();
    console.log(event);
    square.keys = square.keys || [];
    square.keys[event.key] = event.type === "keydown";
    if (square[event.key]) {
      square[event.key]();
    }
    console.log(square);
  });
  window.addEventListener("keyup", function (event) {
    square.keys[event.key] = event.type === "keydown";
  });
}

function clearScreen() {
  canvasContext.clearRect(0, 0, 500, 500);
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.angle = 0;
  this.moveAngle = 0;
  this.speed = 0;
  this.x = x;
  this.y = y;
  this.update = function () {
    canvasContext.save();
    canvasContext.translate(this.x, this.y);
    canvasContext.rotate(this.angle);
    canvasContext.fillStyle = color;
    canvasContext.fillRect(
      this.width / 2,
      this.height / 2,
      this.width,
      this.height
    );
    canvasContext.restore();
  };

  this.a = () => {
    this.speed = -1;
  };
  this.d = () => {
    this.speed = 1;
  };

  this.newPos = function () {
    this.angle += (this.moveAngle * Math.PI) / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  };
}

function updateGame() {
  clearScreen();
  square.moveAngle = 0;
  square.speed = 0;
  square.newPos();
  square.update();
}

startGameLoop();
startInputProcess();
