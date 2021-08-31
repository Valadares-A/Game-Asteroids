
var backgound = document.getElementById("game");
var ctx = backgound.getContext("2d");

const square = new component(30, 30, "red", 225, 225);

function clearScreen(){
    ctx.clearRect(0, 0, 500, 500)
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.speed = 1;
    this.x = x;
    this.y = y;
    this.update = function() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = color;
      ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
      ctx.restore();
    }
    
    this.newPos = function() {
      this.x += this.speed * Math.sin(this.angle);
      this.y -= this.speed * Math.cos(this.angle);
    }
}

// class seiLa{
// 	constructor(x,y){}

// 	newPos(){
// 		this.x += this.speed * Math.sin(this.angle);
//       		this.y -= this.speed * Math.cos(this.angle);
// 	}

// }

// var kkkk = new seiLa(10,20)

function updateGameArea() {
	clearScreen();
	square.newPos();
	square.update();
    }

const gameLopp = setInterval(() => {
	updateGameArea();
}, 20);