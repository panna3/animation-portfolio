let wave;
let tx,ty;
let panna;
let bg;
let camel;
let parasol;
let desert;
let night;
function setup() {
  if (window.REC) {   // recording a video (record.html): fixed tall canvas, drawn at 2x, frame by frame
    createCanvas(REC.w, REC.h).parent('sketch-container'); pixelDensity(2); randomSeed(REC.seed); noLoop();
  } else {
    createCanvas(windowWidth, windowHeight).parent('sketch-container');
  }
  wave = new Wave(random(10, 11), random(3, 5), random(10,13));
  bg = new Bg(0,height/2+150);
  camel = new Camel(width/2+30,height/2);
  parasol = new Parasol(width/2,height/2-30);
  desert = new Desert();
  night = new Night();
}
function draw() {
  background('#795548');
  bg.update();
  bg.show();
  desert.update();
  desert.showFar();   // cacti on the horizon, behind the camel
  // (heat shimmer taken out: it dented the sun as it came up, and the sun already shimmers)
  desert.camelShadow(); // the camel's shadow on the sand
  desert.showPrints();
  night.farGlow();    // far cactus flowers glow at night, behind the camel
  
   for (let i = 0; i < PI/2; i++) {
    let y = 0;
    let secondHump = i % 2;

    y += wave.evaluateY(i);
    if(secondHump == 1){
      tx = width/2-35+i;
      ty = y - 15;
    }
    else{
      tx = width/2+15+i;
      ty = y;
    }
    camel.hump(tx,ty+ height/2);
  }
  
  wave.update();
  
  camel.show(width/2+30,height/2);

  parasol.update();
  parasol.show();

  panna = new Panna(tx,ty+ height/2);
  panna.show();

  desert.showNear();  // nearer cacti, rocks and a tumbleweed pass in front

  night.update();
  night.show();

}

