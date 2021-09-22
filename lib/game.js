function updatePlayer(player, screen) {
  if (player.keys.rightPressed) {
    player.moveAngle = 3;
  } else if (player.keys.leftPressed) {
    player.moveAngle = -3;
  } else {
    player.moveAngle = 0;
  }
  if (player.keys.upPressed) {
    if (player.speed < player.maxSpeed) {
      player.speed = player.speed + 0.15;
    }
  } else if (player.keys.downPressed) {
    if (player.speed > -player.maxSpeed) {
      player.speed = player.speed - 0.15;
    }
  } else {
    if (player.speed > 0) {
      player.speed = player.speed - 0.05;
    } else if (player.speed < 0) {
      player.speed = player.speed + 0.05;
    } else {
      player.speed = 0;
    }
  }

  player.angle += (player.moveAngle * Math.PI) / 180;
  player.x += player.speed * Math.sin(player.angle);
  player.y -= player.speed * Math.cos(player.angle);

  if (player.x > screen.width + player.width) {
    player.x = 0;
  }
  if (player.x < -player.width) {
    player.x = screen.width + player.width;
  }
  if (player.y > screen.height + player.height) {
    player.y = 0;
  }
  if (player.y < -player.height) {
    player.y = screen.height + player.height;
  }
}

function Player(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.color = color;
  this.angle = 0;
  this.moveAngle = 0;
  this.speed = 0;
  this.x = x;
  this.y = y;
  this.keys = {
    upPressed: false,
    downPressed: false,
    leftPressed: false,
    rightPressed: false,
    spacePressed: false,
  };
  this.maxSpeed = 7;
}

module.exports = {
  updatePlayer,
  Player,
};
