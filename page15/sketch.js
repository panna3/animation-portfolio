let panna;
let flowers =[];
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  panna = new Panna(width/2,height/2);
  flowers.push(new Flower(width/2+200,height-150));
  flowers.push(new Flower(width/2-200,height-150));
}
function draw() {
  background(220);
  
  panna.update();
  panna.show();
  
  for(let f of flowers){
    f.update();
    f.show();
  }
}