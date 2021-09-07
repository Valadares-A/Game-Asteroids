
var backgound = document.getElementById("game");
var ctx = backgound.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

const square = new component(30, 30, "red", 225, 225);

function clearScreen() {
  ctx.clearRect(0, 0, 500, 500)
}
function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.angle = 0;
  this.moveAngle = 1;
  this.speed = 1;
  this.x = x;
  this.y = y;
  this.update = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  }

  this.newPos = function () {
    this.speed = 0;
    this.moveAngle = 0;
    //this.angle += this.moveAngle * Math.PI / 180;
    if (rightPressed) {
      this.moveAngle = 3;

    }
    if (leftPressed) {
      this.moveAngle = -3;

    }
    if (upPressed) {
      this.speed = -3;

    }
    if (downPressed) {
      this.speed = 3;

    }

    this.angle += this.moveAngle * Math.PI / 180;
    this.x += this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);

  }
}

function keyDownHandler(e) {
  console.log(e)
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



function updateGameArea() {
  clearScreen();
  square.newPos();
  square.update();
}

const gameLopp = setInterval(() => {
  updateGameArea();
}, 20);