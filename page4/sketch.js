let stars=[];
let panna;
let mov = 0;
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  
  for(let i = 0; i< 7;i++){
    stars.push(new Stars(random(0,width),random(0,height)));
  }
}

function draw() {
  //background('rgb(5,5,71)');
  background(220);
  for(let i = 0; i< stars.length;i++){
    stars[i].update();
    stars[i].show();
  }
  for(let i = 0; i < TWO_PI;i+=1.3){
    //let r = map(i,0,TWO_PI*20,TWO_PI*20,0);
    r = 250;
    let x = width/2+15 + cos(mov+i)*r;
    let y = height/2-10 + sin(mov+i)*r;
    
    star = new Star(x,y);
    star.update();
    star.show();
    panna = new Panna(x,y);
    panna.update();
    panna.show();
  }
  mov+=0.005;
}