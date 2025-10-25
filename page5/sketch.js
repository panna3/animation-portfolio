let firstCircle;
let secondCircle;
let thirdCircle;
let centerPanna;
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  firstCircle = new FirstCircle(width/2,height/2);
  secondCircle = new SecondCircle(width/2,height/2);
  thirdCircle = new ThirdCircle(width/2,height/2);
  centerPanna = new CenterPanna(width/2,height/2);
}

function draw() {
  background(220);
  
  firstCircle.update();
  firstCircle.show();
  
  secondCircle.show();
  thirdCircle.show();
  centerPanna.show();
}