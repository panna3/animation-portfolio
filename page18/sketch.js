let angle = 0;
let wobble = 0;
let wobb;
function setup() {
  createCanvas(windowWidth, windowHeight);
  wobb = new WobbleCircle(width/2, height/2,200);
}

function draw() {
  background('lightblue');
  wobb.show();
  wobble += 0.1;
  angle+=0.005;
}
