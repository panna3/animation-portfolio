let wave;
let tx,ty;
let panna;
let bg;
let camel;
let parasol;
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  wave = new Wave(random(10, 11), random(3, 5), random(10,13));
  bg = new Bg(0,height/2+150);
  camel = new Camel(width/2+30,height/2);
  parasol = new Parasol(width/2,height/2-30);
}
function draw() {
  background('#795548');
  bg.update();
  bg.show();
  
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

}

