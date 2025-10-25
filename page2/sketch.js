let panna;
let rainbow;
function setup() {
  createCanvas(windowWidth,windowHeight).parent('sketch-container');
  panna = new Panna(width/2,height/2);
  rainbow = new Rainbow(width/2,height/2);
}

function draw() {
  background(0);

  panna.update();
  panna.show();
  
  rainbow.update();
  rainbow.show();
}