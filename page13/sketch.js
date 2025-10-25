let bg;
let panna = [];
let rainbow;
let balloon;
let shape;
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  bg = new Bg(0,height/2+50);
  let minX = width + 20;
  let maxX = width + 100;

  panna.push(new Panna(random((minX),random(maxX)),random(height/2,height/2+50),2));
  panna.push(new Panna(random((minX),random(maxX)),height/2+150,1));
  panna.push(new Panna(random((minX),random(maxX)),height/2+200,3));
  
  rainbow = new Rainbow(width+70,height/2+100);
  
  shape = new Shape(80,-50);
}

function draw() {
  
  rainbow.show();
  bg.show();
  shape.show();
  
  for(let i =0;i<panna.length;i++){
    panna[i].update();
    panna[i].show();
  }
  
}