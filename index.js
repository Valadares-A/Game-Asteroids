const CANVASTAG = document.getElementById("game");
const canvasContext = CANVASTAG.getContext("2d");
var gameIsRunning = true;
const numberOfAsteroids = 10;

const square = new Square(15, 15, "green", 225, 225, canvasContext);
const asteroidList = [];

// for (let index = 0; index < numberOfAsteroids; index++) {
//   const asteroid = new Asteroid(15, 15, "white", canvasContext);
//   asteroid.setPositionAndDirection();
//   asteroidList.push(asteroid);
// }

let time = new Date();

function gameLoop() {
  console.time();
  const loop = () => {
    render();
    if (asteroidList.length < 10) {
      const newTime = new Date();
      if (time.getSeconds() !== newTime.getSeconds()) {
        const asteroid = new Asteroid(15, 15, "white", canvasContext);
        asteroid.setPositionAndDirection();
        asteroidList.push(asteroid);
        time = newTime;
      }
    }
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
  this.color = color;
  this.angle = 0;
  this.moveAngle = 0;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.draw = () => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
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

function Asteroid(width, height, color, ctx) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.angle = 0;
  this.moveAngle = 0;
  this.speedX = 0.3;
  this.speedY = 0.3;
  this.x = 0;
  this.y = 0;
  this.draw = () => {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillRect(this.width / 2, this.height / 2, this.width, this.height);
    ctx.closePath();
    ctx.restore();
  };
  this.move = () => {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += (this.moveAngle * Math.PI) / 180;
    if (this.x > CANVASTAG.width + this.width) {
      this.x = -this.width;
    } else if (this.x < -this.width) {
      this.x = CANVASTAG.width + this.width;
    }
    if (this.y > CANVASTAG.height + this.height) {
      this.y = -this.height;
    } else if (this.y < -this.height) {
      this.y = CANVASTAG.height + this.height;
    }
  };
  this.setPositionAndDirection = () => {
    const xDirection = Math.floor(Math.random() * 2);
    const yDirection = Math.floor(Math.random() * 2);
    this.moveAngle = Math.floor(Math.random() * 2);
    this.x = Math.floor(Math.random() * CANVASTAG.width) * xDirection;
    this.y = Math.floor(Math.random() * CANVASTAG.height) * yDirection;
    this.speedX = xDirection ? this.speedX * -1 : this.speedX;
    this.speedY = yDirection ? this.speedY * -1 : this.speedY;
  };
}

function render() {
  clearScreen();
  square.draw();
  asteroidList.forEach((asteroid) => {
    asteroid.draw();
    asteroid.move();
  });
}

gameLoop();
inputProcess();
