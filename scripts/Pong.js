window.onload = function() {
    animate(step);
};

window.addEventListener('keydown', function(event){
  if(event.key == "ArrowUp"){
    player.paddle.move(-4)
  }
  else if (event.key == "ArrowDown") {
      player.paddle.move(4)
  }
});

var animate = window.requestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

function step(){
    ball.move(player.paddle, computer.paddle);
    render();
    animate(step);
};

var ta = document.getElementById('table');
var width =  1000;
var height = 600;
var table = ta.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball(500, 300);
var x = true;

var render = function() {
  table.fillStyle = "black"
  table.fillRect(0, 0, width, height);  //This is where the issue was.  I do not know why, but table.rect caused the problems.
  player.render();
  computer.render();
  ball.render();
};

function Paddle(x, y) {
  this.x = x;
  this.y = y;
  this.width = 10;
  this.height = 50;
  this.ySpeed = 0;
  this.xSpeed = 0;
}

Paddle.prototype.render = function() {
  table.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function(y) {
  if(this.y < 0){
    this.y = 0
  }
  else if(this.y > 549){
    this.y = 549;
  }
  else{
    this.ySpeed = y
    this.y += y;
  }
}

Ball.prototype.move = function(pPaddle, cPaddle){
  this.x += this.xSpeed;
  this.y += this.ySpeed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(top_y < 0){
    this.ySpeed = -this.ySpeed;
  }
  else if(bottom_y > 599)
    this.ySpeed = -this.ySpeed;

  if(top_x > 500) {
    if (pPaddle.x < top_x + 10 &&
        pPaddle.x + pPaddle.width > top_x &&
        pPaddle.y < top_y + 10 &&
        pPaddle.height + pPaddle.y > top_y){  // hit the player's paddle
          this.xSpeed = -4;
          this.ySpeed += (pPaddle.ySpeed / 2);
          this.x += this.xSpeed;
        }
   }
else {
  if (cPaddle.x < top_x + 10 &&
      cPaddle.x + cPaddle.width > top_x &&
      cPaddle.y < top_y + 10 &&
      cPaddle.height + cPaddle.y > top_y){   // hit the computer's paddle
        this.xSpeed = 4;
        this.ySpeed += (cPaddle.ySpeed / 2);
        this.x += this.xSpeed;
    }
  }
};

function Player() {
  this.paddle = new Paddle(990, 275);
}

function Computer() {
  this.paddle = new Paddle(0, 275);
}

Player.prototype.render = function() {
  table.fillStyle = "#0000FF";
  this.paddle.render();
};

Computer.prototype.render = function() {
  table.fillStyle = "#CC3300";
  this.paddle.render();
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.xSpeed = 4;
  this.ySpeed = 0;
  this.radius = 5;
}

Ball.prototype.render = function() {
  table.beginPath();
  table.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  table.fillStyle = "white";
  table.fill();
};
