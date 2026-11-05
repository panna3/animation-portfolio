let spirits=[];
let cColor=[];
let positions=[];
let panna;
let fog;
let pannaImg;
function preload() {
  pannaImg = loadImage('panna_drawn.png');
}
function setup() {
  //createCanvas(1000, 1000);
  createCanvas(windowWidth,windowHeight).parent('sketch-container');
  cColor = [
    color(255, 215, 0, 35), //gold
    color(255,192,203,35), //pink
    color(0,250,154,25), //green
    color(0,255,255,25), //cyan
    color(230,230,250,98)]; //purple
  positions=[  
  {x: width/2+300, y: height/2-300}, //gold
  {x: width/2-150, y: height/2-250}, //pink
  {x: width/2-400, y: height/2-200}, //green
  {x: width/2-280, y: height/2-400}, //blue
  {x: width/2+100, y: height/2-380}]; //purple
  //spirit = new Spirit(width/2+200+random(-15,15),height/2-200+random(-15,15), cColor(0));
  for(let i = 0; i<cColor.length;i++){
    let pos = positions[i];
    pos = {x: pos.x, y: pos.y + 70};   // a little lower than before, nearer Panna
    //spirits.push(new Spirit(width/2+200+random(-15,15),height/2-200+random(-15,15), cColor[i]));
    spirits.push(new Spirit(pos.x,pos.y, cColor[i], 30+random(-11,11)));
  }
  panna = new Panna(width/2+90, height - 40, pannaImg);   // near the front: low, her paws near the bottom
  fog = new Fog();
}

function draw() {
  fog.show();   // misty sky with a far-off white tower (fog.js)
  // spirit.update();
  // spirit.show();
  
  for(spirit of spirits){
    spirit.update();
    spirit.show();
  }
  // no shadow under her (a shadow made her look as if she were hovering above it)
  const sy = panna.y;   // where her paws are
  panna.update();
  panna.show();
  fog.feetMist(sy);   // a thin wisp of the cloud sea drifting past in front of her paws
}
