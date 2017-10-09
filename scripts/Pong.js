// var animate = window.requestAnimationFrame ||
//     function(callback) { window.setTimeout(callback, 1000/60) };
var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 100/60) };

var canvas = document.createElement('canvas');
var width =  1000;
var height = 600;
canvas.width = width;
canvas.height = height;
var table = canvas.getContext('2d');

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};


function step(){
    update();
    render();
    animate(step);
};

//update canvas
var update = function() {
  player.update();
};

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 38) { // up arrow key identifier
      this.paddle.move(0, -4);
    } else if (value == 40) { // down arrow key identifier
      this.paddle.move(0, 4);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.y < 0) { //top side of canvas
    this.x = 0;
    this.x_speed = 0;
  } else if (this.y + this.height > 600) { //bottom side of canvas
    this.x = 0;
    this.x = 600 - this.width;
    this.x_speed = 0;
  }
}

var player = new Player();
var computer = new Computer();
var ball = new Ball(675, 300);


var render = function() {
  table.rect(0, 0, width, height);
  table.stroke();
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


function Player() {
  this.paddle = new Paddle(990, 300, 10, 50);
}

function Computer() {
  this.paddle = new Paddle(0, 275, 10, 50);
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

var keysDown = {};

//if key is pressed
window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

//if key is let go
window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});
