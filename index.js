console.log(window);
const CANVASTAG = document.getElementById("game");
const canvasContext = CANVASTAG.getContext("2d");

const numberOfAsteroids = 10;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

const spaceShip = new Square(15, 15, "green", 225, 225, canvasContext);
const asteroidList = [];

let time = new Date();

function gameLoop() {
  const loop = () => {
    render();
    if (asteroidList.length < numberOfAsteroids) {
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
  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
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
  this.speed = 0;
  this.x = x;
  this.y = y;
  this.increaseSpeed = function () {
    this.speed = this.speed + 0.15;
  };
  this.setSpeedToZero = function () {
    if (this.speed > 0) {
      this.speed = this.speed - 0.05;
    } else if (this.speed < 0) {
      this.speed = this.speed + 0.05;
    } else {
      this.speed = 0;
    }
  };

  this.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  };

  this.update = function () {
    if (rightPressed) {
      this.moveAngle = 3;
    } else if (leftPressed) {
      this.moveAngle = -3;
    } else {
      this.moveAngle = 0;
    }
    if (upPressed) {
      if (this.speed < 7) {
        this.increaseSpeed();
      }
    } else if (downPressed) {
      if (this.speed > -7) {
        this.speed = this.speed - 0.15;
      }
    } else {
      this.setSpeedToZero();
    }

    this.angle += (this.moveAngle * Math.PI) / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);

    if (this.x > CANVASTAG.width + this.width) {
      this.x = 0;
    }
    if (this.x < -this.width) {
      this.x = CANVASTAG.width + this.width;
    }
    if (this.y > CANVASTAG.height + this.height) {
      this.y = 0;
    }
    if (this.y < -this.height) {
      this.y = CANVASTAG.height + this.height;
    }
  };

  this.checkCollisions = function (object) {
    if (
      this.x < object.x + object.width &&
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y
    ) {
      console.log("bati");
    }
  };
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
  if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = true;
  }
  if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
  if (e.key == "Up" || e.key == "ArrowUp") {
    upPressed = false;
  }
  if (e.key == "Down" || e.key == "ArrowDown") {
    downPressed = false;
  }
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
  this.canRender = true;
  this.draw = function () {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillRect(this.width / 2, this.height / 2, this.width, this.height);
    ctx.closePath();
    ctx.restore();
  };
  this.move = function () {
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += (this.moveAngle * Math.PI) / 180;
    if (this.x > CANVASTAG.width + this.width) {
      this.x = 0;
    } else if (this.x < -this.width) {
      this.x = CANVASTAG.width + this.width;
    }
    if (this.y > CANVASTAG.height + this.height) {
      this.y = 0;
    } else if (this.y < -this.height) {
      this.y = CANVASTAG.height + this.height;
    }
  };
  this.checkCollisions = function (object, index) {
    if (
      this.x < object.x + object.width &&
      this.x + this.width > object.x &&
      this.y < object.y + object.height &&
      this.y + this.height > object.y
    ) {
      console.log("Bati: ", asteroidList[index]);
      asteroidList[index].canRender = false;
    }
  };
  this.setPositionAndDirection = function () {
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
  spaceShip.update();
  spaceShip.draw();
  asteroidList.forEach((asteroid, index) => {
    if (asteroid.canRender) {
      asteroid.draw();
      asteroid.move();
      asteroid.checkCollisions(spaceShip, index);
    }
  });
}

gameLoop();
inputProcess();
