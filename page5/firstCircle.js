let angle = 0;
let cc = 0;
let increment = 0.01;
class FirstCircle{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(){
    cc += increment;
  
    if(cc >= 1 || cc <= 0){
      increment *= -1;
    }
  }
  show(){
    let c1 = color(111,216,230);
    let c2 = color(227,234,112);
    let c3 = color(255,192,203);
    let lc = lerpColor(c1,c2,cc);
    let lc2 = lerpColor(lc,c3,cc);
    fill(lc);
    circle(this.x,this.y,300);
    let radius = 133;
    //let c = 0.95*dist(this.x,this.y,width,height);
    for(let i =0;i<TWO_PI;i+=0.9){
      let x = this.x + cos(angle+i)*radius;//c/2;
      let y = this.y + sin(angle+i)*radius;//c/2;
      fill(lc2);
      //fill('aqua');
      circle(x-6,y-8,5);//left ear
      circle(x+6,y-8,5);//right ear      
      circle(x,y,18);//face
      fill('black');
      circle(x-5,y,3);//left eye
      circle(x+5,y,3);//right eye
      circle(x,y+5,3);//mouth
    }
    angle+=0.01;
  }
}