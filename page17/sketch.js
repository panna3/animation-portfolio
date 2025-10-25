let frogs = [];
let rains = [];
let button;
let dn = true;
let bk;
let bg;
function preload(){
  bgi = loadImage('assets/bg0.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  //frogs = new Frog(random(width/2-80,width/2+80), height-210,int(random(2)));
  bk = 225;
  cont = 0;
  button = createButton('Change Day/Night');
  button.position(10, 710);
  button.mousePressed(changeDN);
  bg = new Bg(width/2,height/2);
}

function draw() {
  
  background(bk);
  daynight();
  
  frogs.push(new Frog(random(width/2-80,width/2+80), height-210,int(random(6))));
  rains.push(new Rain(random(0,width+400),random(-500,0)));
  
  for (let i = 0; i<rains.length;i++) {
      rains[i].update();
      rains[i].show();
  }
  for (let i = rains.length - 1; i >= 0; i--) {
    if (rains[i].finished()) {
      rains.splice(i, 1);
    }
  }
  
  for (let i = 0; i<frogs.length;i++) {
    frogs[i].update();
    frogs[i].show();
  }

  for (let i = frogs.length - 1; i >= 0; i--) {
    if (frogs[i].finished()) {
      frogs.splice(i, 1);
    }
  }

}
function changeDN(){
  dn = !dn;
}
function daynight(){
  if(dn){
    bk = 225;
    
    //bg.show();
    image(bgi,0,0,windowWidth, windowHeight);
    extraFrog();
  }
  else{
    bk = 0;
  }
}
function randomColor(v){
    let cc = 0;
    let rC;
    let alpha = random(225);
    for(let i = 164;i<184;i++){
      cc = random(i);
    }
    // stroke
    if(v==1){
        rC = color(cc,cc,cc,alpha);
    }
    else{
        rC = color(cc*random(3),0,0,alpha);
    }

    return rC;
  }
function extraFrog(){
    push();
    //extra frog
    let midx = width/2;
    let midy = height/2;
    let midx2 = -(width*0.1);
    let midy2 = -(height*0.15);
    translate(midx2,midy2);
    stroke('#32d70c');
    fill('#32d70c');
    circle(midx-100,midy-250,35);//body
    
    strokeWeight(3);
    fill('black');
    circle(midx-115,midy-265,7);//left eye
    circle(midx-100,midy-265,7);//right eye
    
    stroke('#32d70c');
    fill('#32d70c');
    circle(midx-118,midy-238,5);//left arm
    circle(midx-100,midy-238,5);//right arm
    
    circle(midx-115,midy-235,5);//left leg
    circle(midx-100,midy-235,5);//right leg
    
    fill('red');
    circle(midx-110,midy-248,10);
    fill("#32d70c");
    circle(midx-110,midy-250,3); 
    pop();
}