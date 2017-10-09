var animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 100/60) };

var canvas = document.createElement('canvas');
var width =  400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
  document.body.appendChild(canvas);
  animate(step);
};

//step function
var step = function() {
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
    if(value == 37) { // left arrow key identifier
      this.paddle.move(-4, 0);
    } else if (value == 39) { // right arrow key identifier
      this.paddle.move(4, 0);
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
  if(this.x < 0) { //left side of canvas
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > 400) { //right side of canvas
    this.x = 0;
    this.x = 400 - this.width;
    this.x_speed = 0;
  }
}


var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);

//render canvas elements
var render = function() {
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
  player.render();
  computer.render();
};

//paddle features
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

//paddle render
Paddle.prototype.render = function() {
  context.fillRect(this.x, this.y, this.width, this.height);
};

//player paddle
function Player() {
  this.paddle = new Paddle(175, 580, 50, 10);
}

//computer paddle
function Computer() {
  this.paddle = new Paddle(175, 10, 50, 10);
}

Player.prototype.render = function() {
  context.fillStyle = "blue";
  this.paddle.render();
};

Computer.prototype.render = function() {
  context.fillStyle = "red";
  this.paddle.render();
};

//ball features
function Ball(x, y) {
  this.x = x;
  this.y = y;
  // this.x_speed = 0;
  // this.y_speed = 3;
  this.radius = 5;
}

//ball render
Ball.prototype.render = function() {
  // context.beginPath();
  context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
  context.fillStyle = "white";
  context.fill();
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
