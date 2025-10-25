let letter;
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  letter = new Letter(width/2, height/2);    
}
function draw() {
  background(220);
 
  letter.show();
}