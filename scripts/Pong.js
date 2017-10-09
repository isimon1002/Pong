window.onload = function() {
    animate(step);
};

window.addEventListener('keydown', function(event){
  if(event.key == "ArrowUp"){
    player.paddle.move(-2)
  }
  else if (event.key == "ArrowDown") {
      player.paddle.move(2)
  }
});

var animate = window.requestAnimationFrame ||
    function(callback) { window.setTimeout(callback, 1000/60) };

function step(){
    render();
    animate(step);
};

var ta = document.getElementById('table');
var width =  1000;
var height = 600;
var table = ta.getContext('2d');
var ta2 = document.getElementById('table2');
var width =  1000;
var height = 600;
var table2 = ta.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball(675, 300);

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
    console.log(this.y)
    console.log(this.height)
  }
  else if(this.y > 549){
    this.y = 549;
    console.log(this.y)
    console.log(this.height)
  }
  else{
    this.ySpeed = y
    this.y += y;
    console.log(this.y)
    console.log(this.height)
  }
}

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
  this.radius = 5;
}

Ball.prototype.render = function() {
  table.beginPath();
  table.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  table.fillStyle = "#000000";
  table.fill();
};
