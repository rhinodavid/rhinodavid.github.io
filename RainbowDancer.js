var instantaneousRadius;

var rand = function (min, max) {
  return Math.random() * (max - min) + min;
};

var randInt = function(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
};

var RainbowCircle = function() {
  this.damper = 16; // easing in x,y movement; 1 to 20 work well
  this.x = width / 2, + 1; // start in center of screen
  this.y = height / 2 + 1; // start in center of screen
  this.targetX = this.x;
  this.targetY = this.y;
  this.angle = 0; // initial value
  this.distance = 0; // inital value
  

  this.path = [];
  this.count = 20;//randInt(10, 60);
  this.hue = 0;
  this.radius = 40;
  this.theta = rand(0, Math.PI * 2); // angle of new paths relative to center
  this.thetaSpeed = Math.PI / 20; // speed of the 'sweep'
  this.clockwise = 1; // -1 for counterclockwise

  this.updateAngleAndDistance();

};

RainbowCircle.prototype.draw = function(i) {
  ctx.beginPath();
  var rando = rand(1, 4);
  for (var j = 0, length = this.path.length; j < length; j++ ) {
    ctx[(j === 0) ? 'moveTo' : 'lineTo' ](this.path[j].x + rand(-rando, rando), this.path[j].y + rand(-rando, rando));
  }
  ctx.strokeStyle = 'hsla(' + rand(this.hue, this.hue + 10) + ', 45%, 75%, 60)';
  ctx.lineWidth = rand(1, 3);
  ctx.stroke();

  // debugging angle
  // ctx.beginPath();
  // ctx.moveTo(this.x, this.y);
  // ctx.lineTo(this.x + this.radius * Math.cos(this.theta), this.y + this.radius * Math.sin(this.theta));
  // ctx.lineWidth = 2;
  // ctx.strokeStyle = 'hsla(0, 70%, 50%, 1)';
  // ctx.stroke();

  // // debugging angle
  // ctx.beginPath();
  // ctx.moveTo(this.x, this.y);
  // ctx.lineTo(this.x + this.radius * Math.cos(this.angle), this.y + this.radius * Math.sin(this.angle));
  // ctx.lineWidth = 2;
  // ctx.strokeStyle = 'hsla(200, 70%, 50%, 1)';
  // ctx.stroke();
};

RainbowCircle.prototype.step = function(i) {
  this.updateAngleAndDistance();

  this.x = this.x + Math.cos(this.angle) * this.distance / this.damper;
  this.y = this.y + Math.sin(this.angle) * this.distance / this.damper;
  
  var diffAngle = Math.abs((this.angle - this.theta));
  
  if (this.distance < this.radius || Math.abs(diffAngle - Math.PI) > Math.PI / 6) {
    this.theta = this.theta > Math.PI ? this.theta - Math.PI * 2 : this.theta;

    this.theta = ((this.theta + this.thetaSpeed * this.clockwise) % (2 * Math.PI));
  }

  // make the orb to 'breathe'
  instantaneousRadius = this.radius + Math.cos(tick / 20 % (Math.PI * 2)) * this.radius / 8;

  
  this.path.push({
    x: this.x + instantaneousRadius / (this.distance / instantaneousRadius * .25 + 1) * Math.cos(this.theta),
    y: this.y + instantaneousRadius / (this.distance / instantaneousRadius * .25 + 1) * Math.sin(this.theta)
  });


  this.hue = tick / 2 % 360;

  if (this.path.length > this.count) {
    this.path.shift();
  }
};

RainbowCircle.prototype.moveTo = function(x, y) {
  this.targetX = x;
  this.targetY = y;
};

RainbowCircle.prototype.updateAngleAndDistance = function() {
  var dx = this.targetX - this.x;
  var dy = this.targetY - this.y;
  this.distance = Math.sqrt(dx * dx + dy * dy);
  this.angle = Math.atan2(dy, dx);
};
