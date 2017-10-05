window.onload = function() {
  render();
};

var ta = document.getElementById('table');
var width =  1000;
var height = 600;
var table = ta.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball(675, 300);

var render = function() {
  table.rect(175, 10, width, height);
  table.stroke();
  player.render();
  computer.render();
  ball.render();
};

function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Paddle.prototype.render = function() {
  table.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
  this.paddle = new Paddle(1165, 275, 10, 50);
}

function Computer() {
  this.paddle = new Paddle(175, 275, 10, 50);
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
