let rr=0;
let angle =0;
let heart;
let hearts =[];
let panna;
let meat;
let bb = false;

function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  panna = new Panna(width/1.5,height/2);
  heart = new Heart(width/1.5,height/2);
  hearts.push(new Hearts(random(panna.mypos().x-50,panna.mypos().x+50),random(panna.mypos().y-50,panna.mypos().y+50)));
  meat = new Meat(mouseX,mouseY);
}
function mousePressed(){
  
  bb =true;
  if(hearts.length >=5){hearts=[];}
  for(let i =0;i<6;i++){
    hearts.push(new Hearts(random(panna.mypos().x-50,panna.mypos().x+50),random(panna.mypos().y-50,panna.mypos().y+50)));
  }
}
function draw() {
  background(0);

  if(bb){

    for(let j = 0; j < hearts.length-1;j++){
      hearts[j].update();
      hearts[j].show();
    }
  }
  panna.update();
  panna.show();
  heart.update();
  heart.show();
  meat.show();
  
  angle += 0.02;
}