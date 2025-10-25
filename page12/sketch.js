let bg;
let snow =[];
let star =[];
let tree=[];
let owl;
let lightning=[];
let inc = 0.01;
let cloud = false;

let button;

function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  button = createButton('Change Weather');
  button.position(100, height-100);
  button.mousePressed(changeBG);

  pixelDensity(1);
  let yoff = 0;
  loadPixels();
  for (let y = 0; y < height-350; y++) {
    let xoff = 0;
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4;
      // let r = random(255);
      let r = noise(xoff, yoff) * 255;
      pixels[index + 0] = r+2;
      pixels[index + 1] = r+7;
      pixels[index + 2] = r+24;
      pixels[index + 3] = 255;

      xoff += inc;
    }
    yoff += inc;
  }

  bg = new Bg(width/2,height/2);
  
  star.push(new Star(100,80,10,0));
  star.push(new Star(800,145,8,2));
  star.push(new Star(550,240,5,1));
  
  tree.push(new Tree(width/2+300,height/2+40,0));
  tree.push(new Tree(width/2-370,height/2+40,1));
  owl = new Owl(width/2+410,height/2-1);
  
  lightning = new Lightning(random(width),-5);

  for(let i = 0;i<10;i++){
    snow.push(new Snow(random(0,width+400),random(-500,height)));
  }
}
function changeBG(){
  cloud = !cloud;
}

function draw() {
 
  if(cloud){
    updatePixels();
  }
  else{
    background('#020718');   
  }

  bg.show();


}