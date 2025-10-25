let r = 30;
let ctime = 0;
let increment = 0.01;
class Panna{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(){
    ctime+=increment;
    
    if(ctime >= 1 || ctime <= 0){
      increment*= -1;
    }
  }
  show(){


    noStroke();
    for(let i = 0;i<TWO_PI;i++){
      let radius = map(i,-1,1,0,1);
      let x = this.x + cos(radius)*r;
      let y = this.y + sin(-radius)*r;      
      
      this.setColor(i);
      circle(x-50,y,10);
    }
    
    for(let i = 0;i<TWO_PI;i++){
      let radius = map(i,-1,1,0,1);
      let x = this.x + -cos(radius)*r;
      let y = this.y + sin(-radius)*r;

      this.setColor(i);
      circle(x+50,y,10);
    }
    
    for(let i =0.18;i<TWO_PI;i+=0.5){
      let radius = map(i,0,TWO_PI*2,0,TWO_PI);
      let x = this.x + cos(radius)*r*2.4;
      let y = this.y + sin(radius)*r*2.1;
      
      this.setColor(i);
      circle(x,y+30,10); //face
    }
    
    circle(this.x-15,this.y+35,10);//left eye
    circle(this.x+15,this.y+35,10);//right eye
    circle(this.x,this.y+49,10);//mouth

    fill('aqua');
    circle(this.x-7,this.y-7,10);
    circle(this.x+7,this.y-7,10);
    
  }
  setColor(i){
    let c1 = color('aqua');
    let c2 = color('hotpink');
    
    let t = map(ctime*i*2, 0, TWO_PI, 0, 1);
    let c = lerpColor(c1, c2, t);
    fill(c);
  }
  setColorR(i){
    let c2 = color('aqua');
    let c1 = color('hotpink');
    
    let t = map(ctime*i*2, 0, TWO_PI, 0, 1);
    let c = lerpColor(c1, c2, t);
    fill(c);
  }
}