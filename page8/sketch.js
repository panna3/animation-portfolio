let star =[];
let cnt=200;
let c3 =200;
let v1;
let angle = 0;
let panna;
let heart = [];
let al = 200;
let circles = 50;
let img;
 function preload() {
   img = loadImage('assets/panna.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL).parent('sketch-container');
  for(i=0;i<10;i++){
    star.push(new Star(0,0,10));
    heart.push(new Heart(0,0,20));
  } 
}

function draw() {
  background(0);
 
  v1 = createVector(c3,0);

  for(i=0;i<10;i++){
    drawSq(i, v1.rotate(angle),color(random(100,cnt), random(100,cnt), random(100,cnt)));
    fill('white');
    noStroke();
    circle(random(v1.x-50,v1.x+50),random(v1.y-50,v1.y+50),random(5));
    fill(color(random(100,cnt), random(100,cnt), random(100,cnt)));
    star[i].show(v1.x,v1.y);
  }

  angle += 0.01;
  if(cnt >= 255){
    cnt=200;
  }
  else{
    cnt++;
  }
  if(v1.x>200)
  {
    c3=200;
    angle =0;
    circles=50;
    al=200;
  }
}
function drawSq(index, vec, myColor){
  push();
  stroke(myColor);
  strokeWeight(3);
  
  rotateY(angle);
  rotateX(angle * 1.3);
  rotateZ(angle * 0.7);
  ambientLight(300);
  texture(img);
  box(100);

  noFill();
  stroke(myColor);
  strokeWeight(0.3);
  
  fill(myColor);  
  heart[index].show(vec.x,vec.y);
  
  pop();
  
}