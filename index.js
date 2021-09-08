var background = document.getElementById("game");
var ctx = background.getContext("2d");

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

const square = new component(30, 30, "red", 225, 500);

function clearScreen() {
  ctx.clearRect(0, 0, 500, 500);
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
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
      this.speed = this.speed - 0.15;
    } else if (this.speed < 0) {
      this.speed = this.speed + 0.15;
    } else {
      this.speed = 0;
    }
    // this.moveAngle = 0;
  };
  // this.setSpeedToOne = function() {
  //   console.log("entrou não é mais zero")
  //   if (this.speed == 0) {
  //     this.speed = 1;
  //   }
  // };

  this.update = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = color;
    ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  };

  this.newPos = function () {
    // const aceleracao = 0.25
    //   if (this.speed == 0) {
    //     this.speed = 1;
    //   }
    //   if (this.speed < 7) {
    //     this.speed = this.speed + aceleracao;
    //     console.log(this.speed)
    //   }

    //this.angle += this.moveAngle * Math.PI / 180;
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

    if (this.x > background.width + this.width) {
      this.x = 0;
    }
    if (this.x < -this.width) {
      this.x = background.width + this.width;
    }
    if (this.y > background.height + this.height) {
      this.y = 0;
    }
    if (this.y < -this.height) {
      this.y = background.height + this.height;
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

function updateGameArea() {
  clearScreen();
  square.newPos();
  square.update();
}

const gameLopp = setInterval(() => {
  updateGameArea();
}, 20);
