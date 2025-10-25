let step = 0;
let inc2 = 0.003;
class Panna{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(){
    step+=inc2;
    if(step >= 1 || step <=0){
      inc2*=-1;
    }
  }
  show(){
    let c1 = color('pink');
    let c2 = color('lightblue');
    let c = lerpColor(c1,c2,step);

    stroke('pink');
    fill(c);
    //behind front leg
    beginShape();
      vertex(this.x,this.y+11);
      bezierVertex(this.x-5,this.y+15,this.x+11,this.y+18,this.x+5,this.y+21);
      bezierVertex(this.x-10,this.y+23,this.x-10,this.y+13,this.x-10,this.y+12);
    endShape();

    //body&head
    beginShape();
      vertex(this.x-39,this.y+15);
      bezierVertex(this.x-43,this.y,this.x-38,this.y-10,this.x-10,this.y-15);
      bezierVertex(this.x-20,this.y-33,this.x+10,this.y-33,this.x,this.y-15);
      bezierVertex(this.x,this.y-20,this.x+10,this.y-23,this.x+13,this.y-18);
      bezierVertex(this.x+3,this.y-29,this.x+26,this.y-33,this.x+20,this.y-16);
      bezierVertex(this.x+25,this.y-5,this.x+18,this.y+5,this.x+10,this.y+3);
      bezierVertex(this.x+10,this.y+10,this.x+9,this.y+12,this.x+6,this.y+15);
      bezierVertex(this.x+8,this.y+21,this.x+13,this.y+18,this.x+10,this.y+25);
      bezierVertex(this.x+1,this.y+25,this.x,this.y+18,this.x,this.y+15);//front leg
      bezierVertex(this.x-5,this.y+16,this.x-7,this.y+18,this.x-9,this.y+17);//stomach
      bezierVertex(this.x-11,this.y+26,this.x,this.y+17,this.x-1,this.y+25);
      bezierVertex(this.x-15,this.y+29,this.x-15,this.y+28,this.x-17,this.y+18);
      bezierVertex(this.x-21,this.y+19,this.x-23,this.y+20,this.x-27,this.y+19);
      bezierVertex(this.x-29,this.y+29,this.x-15,this.y+21,this.x-18,this.y+28);
      bezierVertex(this.x-33,this.y+33,this.x-32,this.y+25,this.x-33,this.y+21);
    endShape(CLOSE);

    //tail
    for(let i = 5; i < width/5;i++){
      let r = map(i,0,TWO_PI,0,PI);
      let x = this.x-31 + cos(r+i)*r/6;
      let y = this.y+3 + sin(r+i)*r/6;

      let t = map(step*i/10, 0, TWO_PI, 0, PI);
      let tailc = lerpColor(c1, c2, t);
      stroke(tailc);
      fill(tailc);
      circle(x,y,1);
    }
    fill('brown');
    noStroke();
    circle(this.x+5,this.y-10,3);//left eye
    circle(this.x+13,this.y-11,3);//right eye
    circle(this.x+9,this.y-7,3);//nose
  }
}