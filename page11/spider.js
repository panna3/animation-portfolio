class Spider{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.gravity = createVector(0, 0.1);
  }
  update(){
    this.f = createVector(this.x,height/8);
    this.acc = p5.Vector.sub(this.f,this.pos);
    this.acc.setMag(0.5);
    this.vel.add(this.acc);
    this.vel.add(this.gravity);
    this.vel.mult(0.99);
    this.pos.add(this.vel);
  }
  show(){
    strokeWeight(1);
    noFill();
    line(this.x-80,1,this.x+80,1);
    line(this.x,1,this.x-60,this.y+25);
    line(this.x,1,this.x-35,this.y+46);
    line(this.x,1,this.x+35,this.y+46);
    line(this.x,1,this.x+60,this.y+25);
    beginShape();
    vertex(this.x-40,1);
    bezierVertex(this.x-30,this.y+1,this.x-28,this.y+3,this.x-25,this.y+10);//left top
    bezierVertex(this.x-25,this.y+10,this.x-13.5,this.y+10,this.x-15,this.y+19);
    bezierVertex(this.x-15,this.y+19,this.x-6,this.y+18,this.x,this.y+25); 
    endShape();
    beginShape();
    vertex(this.x-60,1);
    bezierVertex(this.x-50,this.y,this.x-45,this.y+1,this.x-38,this.y+15);//left bottom
    bezierVertex(this.x-38,this.y+15,this.x-25,this.y+15,this.x-21,this.y+28);
    bezierVertex(this.x-21,this.y+28,this.x-6,this.y+25,this.x,this.y+35); 
    endShape();
    beginShape();
    vertex(this.x+40,1);
    bezierVertex(this.x+30,this.y+1,this.x+28,this.y+3,this.x+25,this.y+10);//right top
    bezierVertex(this.x+25,this.y+10,this.x+13.5,this.y+10,this.x+15,this.y+19);
    bezierVertex(this.x+15,this.y+19,this.x+6,this.y+18,this.x,this.y+25); 
    endShape();
        beginShape();
    vertex(this.x+60,1);
    bezierVertex(this.x+50,this.y,this.x+45,this.y+1,this.x+38,this.y+15);//right bottom
    bezierVertex(this.x+38,this.y+15,this.x+25,this.y+15,this.x+21,this.y+28);
    bezierVertex(this.x+21,this.y+28,this.x+6,this.y+25,this.x,this.y+35); 
    endShape();
    
    curve(this.pos.x,this.pos.y,this.pos.x-5,this.pos.y-5,this.pos.x-30,this.pos.y-10,this.pos.x-100,this.pos.y+100);//left top leg
    curve(this.pos.x,this.pos.y+5,this.pos.x-5,this.pos.y+5,this.pos.x-30,this.pos.y+5,this.pos.x-100,this.pos.y+90);//left middle leg
    curve(this.pos.x,this.pos.y,this.pos.x-5,this.pos.y+5,this.pos.x-10,this.pos.y+20,this.pos.x+60,this.pos.y+100);//left bottom
    curve(this.pos.x,this.pos.y,this.pos.x+5,this.pos.y-5,this.pos.x+30,this.pos.y-10,this.pos.x+100,this.pos.y+100);//right top leg
    curve(this.pos.x,this.pos.y+5,this.pos.x+5,this.pos.y+5,this.pos.x+30,this.pos.y+5,this.pos.x+100,this.pos.y+90);//right middle leg
    curve(this.pos.x,this.pos.y,this.pos.x-5,this.pos.y+5,this.pos.x+10,this.pos.y+20,this.pos.x-60,this.pos.y+100);//right bottom
    fill('black');
    stroke('black');
    line(this.pos.x,this.pos.y,this.pos.x,0);
    circle(this.pos.x,this.pos.y,20);//body

    fill('red');
    circle(this.pos.x-5,this.pos.y+3,5);//left eye
    circle(this.pos.x+5,this.pos.y+3,5);//right eye
  }
}