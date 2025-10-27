let angle = 0;
let wobble = 0;
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
}

function draw() {
  background('lightblue');
  noFill();
  fill(255,255,224,30);
  stroke(60,179,113,random(50));
  
  let stepW = PI/15;
  
  let my = map(sin(wobble), -1, 1, -PI/60, PI/60);
  let mx = map(cos(wobble), 1, -1, PI/60, -PI/60);
  let  radius = map(angle,0,TWO_PI,PI,0);
  let baseRadius = min(width, height) * 0.18;
  beginShape();
   for (let i= 0; i<TWO_PI+0.5;i+=stepW){
     let r = baseRadius + sin(wobble + i * 3) * 5;
     let tx = width/2 + cos(angle+i)*(r+radius);//r;
     let ty = height/2 + sin(angle+i)*(r+radius);//r;
     stroke('white');
     curveVertex(tx+mx,ty+my);
     circle(tx+mx, ty+my, random(15));    
    }
   endShape();
   wobble += 0.1;
   angle+=0.005;
}