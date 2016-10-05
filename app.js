var canvas;
var ctx;
var width;
var height;
var circle;
var tick;

var reset = function() {
  width = Math.ceil(window.innerWidth / 2) * 2;
  height = Math.ceil(window.innerHeight / 2) * 2;
  tick = 0;
  
  canvas.width = width;
  canvas.height = height;
};

var clear = function() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1)';
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'lighter';
};

var loop = function() {
  requestAnimationFrame(loop);
  circle.step();
  clear();
  circle.draw();
  tick++;
};

var moveCircle = function(e) {
  var x = e.clientX;
  var y = e.clientY;
  circle.moveTo(x, y);
};

var resetCircle = function(e) {
  e.preventDefault();
  var x = window.innerWidth / 2 + 1;
  var y = window.innerHeight / 2 + 1;
  circle.moveTo(x, y);
};

var handleTouch = function(e) {
  e.preventDefault();
  var touches = e.changedTouches;
  var x = touches[0].pageX;
  var y = touches[0].pageY;
  circle.moveTo(x, y);
};

var init = function() {
  canvas = document.getElementById('canvas');
  canvas.addEventListener('mousemove', moveCircle);
  canvas.addEventListener('mouseout', resetCircle);
  canvas.addEventListener('touchstart', handleTouch);
  canvas.addEventListener('touchmove', handleTouch);
  canvas.addEventListener('touchcancel', resetCircle);
  canvas.addEventListener('touchend', resetCircle);
  ctx = canvas.getContext('2d');
  reset();
  circle = new RainbowCircle();
  loop();
};

var onresize = function() {
  reset();  
};

window.addEventListener('resize', onresize);

init();
