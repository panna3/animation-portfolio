let tcol = 0;
let angle = 0;
class Bg{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(){
    if(this.y<-150){
      this.y = height/2+150;
    }
  }
  show(){
    for(let i = height/2+149.5;i >=0;i-=0.1){
      let rc = map(tcol,0,550,50,tcol);
      let bcol = color(160+i/21+rc,180-i/39+rc,202+i/21);

      this.tcolor(tcol);
      strokeWeight(1);
      
      stroke(bcol);
      line(this.x,i,width,i);
    } 
    this.sun(this.y);
    this.y-=0.5;
    for(let i = height/2+150; i< height;i+=0.1){
      let rc = map(tcol,0,550,50,i*3);
      let bcol = color(160+i/21+rc,180-i/29+rc,202+i/21,33);

      this.tcolor(tcol);
      strokeWeight(1);
      stroke(bcol);
      line(this.x,i,width,i);
    }
  }
  tcolor(t){
    if(t > 100){
      tcol = 0;
    }
    tcol++;
  }
  sun(sunpos){
    fill(251,255,180);
    let radius = 110;
    beginShape();
    for(let i = 0;i<TWO_PI;i+=0.05){
      let r = radius+sin(i*5+angle);
      let x = r*cos(i);
      let y = r*sin(i);
      curveVertex(x+width/3.3+33,sunpos+y);
    }
    endShape();
    angle+=0.05;
  }
}