angle2 = 0;
class SecondCircle{
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
    let lc = lerpColor(c2,c3,cc);
    fill(lc);
    circle(this.x,this.y,230);
   // let c = 0.68*dist(this.x,this.y,width,height);
   let radius = 95;
    for(let i =0.5;i<TWO_PI;i+=0.9){
      let x = this.x + cos(angle2+i)*radius;//c/2;
      let y = this.y + sin(angle2+i)*radius;//c/2;
      fill(255,0,119);
      circle(x-6,y-8,5);//left ear
      circle(x+6,y-8,5);//right ear      
      circle(x,y,18);//face
      fill('black');
      circle(x-5,y,3);//left eye
      circle(x+5,y,3);//right eye
      circle(x,y+5,3);//mouth
    }
    angle2+=0.01;
  }
}