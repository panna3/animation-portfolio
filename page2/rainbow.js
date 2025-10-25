let r2 = 100;
let ctime2 = 0;
let increment2 = 0.01;
let inc = 0.03;
let a = 15; // Amplitude
let n = 7;   // Number of petals
let angleStep = 0.05;
let gr = 0;
class Rainbow{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(){
    ctime2+=increment2;
    gr+=inc;
    
    if(ctime2 >= 1 || ctime2 <= 0){
      increment2*= -1;
      inc*= -1;
    }
  }
  show(){

    let t = "Panna";
    let tmpi = 0.1;
    for(let i = 0;i<TWO_PI;i+=0.3){
      let radius = map(i,-TWO_PI-(PI+3),PI/3,-3,1);
      let x = this.x + cos(radius)*r2*1.6;
      let y = this.y + sin(-radius)*r2*1.3;      

      panna.setColor(i);
      circle(x-3,y+20,i);
      
    }
    for(let i = 0;i<t.length;i++){
      let radius = map(i,TWO_PI*1.5,PI,-2,1);
      let x = this.x + cos(radius)*r2*1.8;
      let y = this.y + sin(-radius)*r2*1.3;      

      panna.setColorR(i);

      textSize(29);
      textStyle(BOLD);
      text(t[i],x-10,y);

    }
    
    // r = a*cos(n*angle), n = 7
    //rose
    beginShape();
    for (let angle = 0; angle < TWO_PI; angle += angleStep) {
      let r = a * cos(n * angle);
      let x = this.x+30 + cos(angle*1.5+gr)*r;
      let y = this.y + sin(angle*1.5+gr)*r;
      vertex(x, y);
    }
    endShape(CLOSE);

  }
}