var canvas,
  ctx,
  width,
  height,
  size,
  circles,
  tick;



var reset = function() {
  width = Math.ceil(window.innerWidth / 2) * 2;
  height = Math.ceil(window.innerHeight / 2) * 2;
  tick = 0;
  
  circles.length = 0; // reset circles
  canvas.width = width;
  canvas.height = height;
};


// var create = function () {
//   if (tick % 10 === 0) {   
//     circles.push(new RainbowCircle());
//   }
// };

var create = function() {
  if (circles.length < 1) {
    circles.push(new RainbowCircle());
  }
};

var draw = function() {
  //ctx.save();
  //ctx.translate( width / 2, height / 2 );
  //ctx.rotate( tick * 0.001 );
  //var scale = 0.8 + Math.cos( tick * 0.02 ) * 0.2;
  //ctx.scale( scale, scale );
  //ctx.translate( -width / 2, -height / 2 );
  var i = circles.length;
  while (i--) {
    circles[i].draw(i); 
  }
  //ctx.restore();
};

var step = function () {
  var i = circles.length;
  while (i--) {
    circles[i].step(i); 
  }
};

var clear = function() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1)';
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'lighter';
};

var loop = function() {
  requestAnimationFrame(loop);
  create();
  step();
  clear();
  draw();
  tick++;
};

var updateCircles = function(e) {
  var x = e.clientX;
  var y = e.clientY;
  var i = circles.length;
  while (i--) {
    circles[i].moveTo(x, y);
  }
};

var resetCircles = function(e) {
  var x = window.innerWidth / 2 + 1;
  var y = window.innerHeight / 2 + 1;
  var i = circles.length;
  while (i--) {
    circles[i].moveTo(x, y);
  }
};

var init = function() {
  canvas = document.getElementById('canvas');
  canvas.addEventListener('mousemove', updateCircles);
  canvas.addEventListener('mouseout', resetCircles);
  ctx = canvas.getContext('2d');
  size = 30;
  circles = [];
  reset();
  loop();
};

init(); // kick it off


/*
var onresize = function () {
  reset();  
};

window.addEventListener( 'resize', onresize );
*/
