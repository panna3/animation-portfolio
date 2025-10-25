class Panna{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.vel.mult(random(3));
  }
  update(){
    this.stick = createVector(random(this.x-18,this.x+18),0);
    this.acc = p5.Vector.sub(this.stick,this.pos);
    this.acc.setMag(10);
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);

  }
  show(){
    strokeWeight(1.5);
     stroke('black');   
    //cloak
    fill('black');
    beginShape();
    vertex(this.x-15,this.y+25);
    bezierVertex(this.x-15,this.y+25,this.x-25,this.y+55,this.x-50,this.y+70);
    bezierVertex(this.x-5,this.y+68,this.x+15,this.y+68,this.x+45,this.y+65);
    bezierVertex(this.x+45,this.y+65,this.x+25,this.y+55,this.x+15,this.y+25);
    endShape();
    
    fill('white');
    //noFill();
    ellipse(this.x,this.y+55,60,70);//body
    

    bezier(this.x-21,this.y+80,this.x-17,this.y+98,this.x-10,this.y+98,this.x-5,this.y+89);//left leg
    bezier(this.x+21,this.y+80,this.x+17,this.y+98,this.x+10,this.y+98,this.x+5,this.y+89);//right leg
    
    ellipse(this.x,this.y,80,60);//face
    fill('black');
    curve(this.x+100,this.y+50,this.x+50,this.y-10,this.x-50,this.y-10,this.x-100,this.y+50);//a part of hat

    beginShape();//hat
    vertex(this.x+38,this.y-10);
    bezierVertex(this.x+35,this.y-130,this.x-60,this.y-80,this.x-50,this.y-60);
    bezierVertex(this.x,this.y-75,this.x-20,this.y-10,this.x-55,this.y-10);
    endShape();
    
    //belt on hat
    stroke('red');
    rect(this.x-5,this.y-30,15,13);

    stroke('black');
    circle(this.x-9.5,this.y,6);//left eye
    circle(this.x+9.5,this.y,6);//right eye
    circle(this.x,this.y+5,6);//nose
    
    curve(this.x,this.y+5,this.x-2,this.y+8,this.x-10,this.y+7,this.x-15,this.y+5);//left mouth
    curve(this.x,this.y+5,this.x+2,this.y+8,this.x+10,this.y+7,this.x+15,this.y+5);//right mouth
    fill('red');
    
    curve(this.x+15,this.y+5,this.x+4.5,this.y+9,this.x-4.5,this.y+9,this.x-15,this.y+5);//a part of mouth
    circle(this.x,this.y+10,6);//tongue

    
    fill('white');
    bezier(this.pos.x-10,this.y+40,this.pos.x,this.y+50,this.pos.x-12,this.y+55,this.pos.x-15,this.y+46);//left arm
   // bezier(this.pos.x+10,this.y+40,this.pos.x+5,this.y+50,this.pos.x+15,this.y+55,this.pos.x+20,this.y+38);//right arm
     bezier(this.pos.x+5,this.y+40,this.pos.x+3,this.y+50,this.pos.x+11,this.y+55,this.pos.x+15,this.y+38);//right arm
    
    //pot
    fill('#550909');
    ellipse(this.x,this.y+220,300,250);
    ellipse(this.x,this.y+145,305,90);
    fill('red');
    ellipse(this.x,this.y+140,310,90);
    fill('purple');
    ellipse(this.x,this.y+140,300,80);//bottom part of pot
        
    //stick
    fill('brown');
    beginShape();
    vertex(this.pos.x-15,this.y+140);
    //bezierVertex(this.x+11,this.y+43,this.x+5,this.y+35,this.x,this.y+40);
    bezierVertex(this.pos.x-7,this.y+5,this.pos.x+11,this.y+5,this.pos.x+5,this.y+140);
    endShape(); 

  }
}
