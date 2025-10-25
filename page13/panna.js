
class Panna{
  constructor(x,y,s){
    this.x = x;
    this.y = y;
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.s = s;
  }
  update(){
    //move a car with the map / vector
    this.bob = createVector(0,height);
    this.acc = p5.Vector.sub(this.bob,this.pos);
    //this.acc.mult(3);
    //this.acc.setMag(random(10));
    this.vel.add(this.acc);
   
    this.vel.limit(2);
    this.pos.add(this.vel);
    
    let minX = width + 20;
    let maxX = width + 100;
    if(this.pos.y>height || this.pos.x<0){
      this.pos.y = random(height/2, height/2 + 50);
      this.pos.x = random(random(minX),random(maxX));
    }
    
  }
  neck(){
      //neck
      fill('white');
      beginShape();
      vertex(this.pos.x+26,this.pos.y+25);
      bezierVertex(this.pos.x+25,this.pos.y+2,this.pos.x+5,this.pos.y+2,this.pos.x-9,this.pos.y+15);
      endShape();
  }
  face(candy){
      
      //face
      fill('white');
      stroke(0);
      beginShape();
      vertex(this.pos.x,this.pos.y-15);
      bezierVertex(this.pos.x+8,this.pos.y-25,this.pos.x+15,this.pos.y-20,this.pos.x+9,this.pos.y-13);//left ear
      bezierVertex(this.pos.x+20,this.pos.y-18,this.pos.x+25,this.pos.y-11,this.pos.x+25,this.pos.y-8);//head
      bezierVertex(this.pos.x+36,this.pos.y-15,this.pos.x+47,this.pos.y-15,this.pos.x+35,this.pos.y);//right ear
      bezierVertex(this.pos.x+40,this.pos.y+15,this.pos.x+10,this.pos.y+20,this.pos.x,this.pos.y+10);//face right side
      bezierVertex(this.pos.x-10,this.pos.y,this.pos.x-6,this.pos.y-9,this.pos.x,this.pos.y-15);//face left side
      endShape();

      //eyes
      fill('black');
      circle(this.pos.x+9,this.pos.y-3,3);
      circle(this.pos.x+18,this.pos.y-1,3);
      //nose
      circle(this.pos.x+12,this.pos.y,3);
      //mouth
      fill('red');
      circle(this.pos.x+11,this.pos.y+3,3);
      fill(255);
    if(candy){
      //candy
      fill('#00d2ff');
      ellipse(this.pos.x+11,this.pos.y+10,3,10);
      fill("#F815F9");
      circle(this.pos.x+11,this.pos.y+7,10);     
    }
  }
  bottompart(){
    fill('white');
    circle(this.pos.x-16,this.pos.y+27,10);
    circle(this.pos.x+5,this.pos.y+33,11);
    //handle
    fill('black');
    circle(this.pos.x-8,this.pos.y+32,15);
    fill('white');
    circle(this.pos.x-8,this.pos.y+32,10);
    //car
    fill('red');
    beginShape();
    vertex(this.pos.x-27,this.pos.y+28);
    bezierVertex(this.pos.x-45,this.pos.y+50,this.pos.x+28,this.pos.y+48,this.pos.x+13,this.pos.y+38);
    bezierVertex(this.pos.x+8,this.pos.y+33,this.pos.x-15,this.pos.y+28,this.pos.x-29,this.pos.y+27);
    bezierVertex(this.pos.x-30,this.pos.y+33,this.pos.x-32,this.pos.y+45,this.pos.x-30,this.pos.y+50);
    bezierVertex(this.pos.x-18,this.pos.y+57,this.pos.x-5,this.pos.y+58,this.pos.x+15,this.pos.y+51);
    vertex(this.pos.x+15,this.pos.y+40);
    endShape();
    
    beginShape();
    vertex(this.pos.x+13,this.pos.y+36);
    vertex(this.pos.x+32,this.pos.y+27);
    bezierVertex(this.pos.x+37,this.pos.y+30,this.pos.x+33,this.pos.y+37,this.pos.x+32,this.pos.y+38);
    vertex(this.pos.x+15,this.pos.y+48);
    endShape();

    //tires
    fill('black');
    beginShape();
    vertex(this.pos.x+15,this.pos.y+48);
    bezierVertex(this.pos.x+17,this.pos.y+38,this.pos.x+21,this.pos.y+37,this.pos.x+21,this.pos.y+44);
    bezierVertex(this.pos.x+20,this.pos.y+50,this.pos.x+18,this.pos.y+54,this.pos.x+15,this.pos.y+52);
    endShape();
    beginShape();
    vertex(this.pos.x+27,this.pos.y+43);
    bezierVertex(this.pos.x+29,this.pos.y+33,this.pos.x+33,this.pos.y+32,this.pos.x+33,this.pos.y+39);
    bezierVertex(this.pos.x+31,this.pos.y+45,this.pos.x+29,this.pos.y+47,this.pos.x+27,this.pos.y+45);
    endShape();
    
    //plate
    fill('#d1d1d1');
    beginShape();
    vertex(this.pos.x-26,this.pos.y+43);
    vertex(this.pos.x-11,this.pos.y+47);
    vertex(this.pos.x-11,this.pos.y+55);
    vertex(this.pos.x-26,this.pos.y+51);
    endShape();
  }
  clothcap(){
    fill('#b17eff');
    beginShape();
    vertex(this.pos.x+9,this.pos.y-11);
    bezierVertex(this.pos.x+13,this.pos.y-20,this.pos.x+28,this.pos.y-21,this.pos.x+25,this.pos.y-5);
    vertex(this.pos.x+9,this.pos.y-11);
    endShape();
    fill('#0afb21');
    beginShape();
    vertex(this.pos.x+9,this.pos.y-11);
    bezierVertex(this.pos.x+3,this.pos.y-9,this.pos.x+12,this.pos.y,this.pos.x+25,this.pos.y-5);
    endShape();
    //cloth
    beginShape();
    vertex(this.pos.x-2,this.pos.y+8);
    bezierVertex(this.pos.x,this.pos.y+15,this.pos.x+8,this.pos.y+17,this.pos.x+20,this.pos.y+15);
    bezierVertex(this.pos.x+8,this.pos.y+25,this.pos.x,this.pos.y+23,this.pos.x-2,this.pos.y+8);
    endShape();
  }
  chick(){
    fill('yellow');
    ellipse(this.pos.x+20,this.pos.y-15,10,10);//body
    ellipse(this.pos.x+16,this.pos.y-15,3,5);//left arm
    ellipse(this.pos.x+23,this.pos.y-15,3,5);//right arm
    ellipse(this.pos.x+20,this.pos.y-20,8,8);//head
    fill('red');
    ellipse(this.pos.x+20,this.pos.y-19,3,2);//mouth
    fill('black');
    circle(this.pos.x+18,this.pos.y-22,1);//lefteye
    circle(this.pos.x+21,this.pos.y-22,1);//right eye
  }
  goggles(){
    let randomColor = color(random(255),random(255),random(255));
    fill(randomColor);
    // circle(this.pos.x+9,this.pos.y-10,8);    
    // line(this.pos.x+15,this.pos.y-10,this.pos.x+18,this.pos.y-7);
    // circle(this.pos.x+20,this.pos.y-7,8);
    //goggles
    circle(this.pos.x+8,this.pos.y-5,8);
    line(this.pos.x+13,this.pos.y-4,this.pos.x+15,this.pos.y-3);
    circle(this.pos.x+19,this.pos.y-2,8);
  }
  backpartofcar(){
    //part of car
    stroke(0);
    fill('red');
    beginShape();
    vertex(this.pos.x+32,this.pos.y+27);
    vertex(this.pos.x+5,this.pos.y+22);
    vertex(this.pos.x-10,this.pos.y+28);
    endShape();
    fill('#ebab2f');
    beginShape();
    vertex(this.pos.x+25,this.pos.y+35);
    bezierVertex(this.pos.x+30,this.pos.y+28,this.pos.x+40,this.pos.y+15,this.pos.x+25,this.pos.y+5);
    vertex(this.pos.x+5,this.pos.y+1);
    bezierVertex(this.pos.x-5,this.pos.y+2,this.pos.x-13,this.pos.y+16,this.pos.x-6,this.pos.y+25);
    endShape();
  }
  balloon(){   
    balloon = new Balloon(this.pos.x-15,this.pos.y+15);
  }
  body(type){
    switch(type){
      case 1:
        //arm & body left side -- arm behind face
        fill('white');
        strokeWeight(1);
        stroke(0);
        beginShape();
        vertex(this.pos.x-5,this.pos.y+13);
        bezierVertex(this.pos.x-10,this.pos.y+10,this.pos.x-13,this.pos.y,this.pos.x-6,this.pos.y-5);
        bezierVertex(this.pos.x+5,this.pos.y-9,this.pos.x+7,this.pos.y+5,this.pos.x+5,this.pos.y+10);
        bezierVertex(this.pos.x+2,this.pos.y+13,this.pos.x+1,this.pos.y+15,this.pos.x-5,this.pos.y+13);
        endShape();
        beginShape();
        vertex(this.pos.x+35,this.pos.y+5);
        bezierVertex(this.pos.x+40,this.pos.y+2,this.pos.x+45,this.pos.y+13,this.pos.x+25,this.pos.y+21);
        bezierVertex(this.pos.x+27,this.pos.y+27,this.pos.x+20,this.pos.y+33,this.pos.x+10,this.pos.y+37);
        bezierVertex(this.pos.x+5,this.pos.y+41,this.pos.x-5,this.pos.y+41,this.pos.x-15,this.pos.y+31);
        bezierVertex(this.pos.x-17,this.pos.y+25,this.pos.x-15,this.pos.y+15,this.pos.x-5,this.pos.y+13);  
        endShape();
        break;
      case 2:
        //arm & body left side -- with balloon
        fill('white');
        strokeWeight(1);
        stroke(0);
        
        //left arm
        beginShape();
        vertex(this.pos.x-5,this.pos.y+13);
        bezierVertex(this.pos.x-20,this.pos.y+5,this.pos.x-20,this.pos.y-5,this.pos.x,this.pos.y+10);    
       // bezierVertex(this.pos.x+2,this.pos.y+13,this.pos.x+1,this.pos.y+15,this.pos.x-5,this.pos.y+13);
        endShape();
        
        beginShape();
        vertex(this.pos.x+23,this.pos.y+25);    bezierVertex(this.pos.x+25,this.pos.y+30,this.pos.x+10,this.pos.y+41,this.pos.x,this.pos.y+33);//right butt
        bezierVertex(this.pos.x-17,this.pos.y+25,this.pos.x-15,this.pos.y+15,this.pos.x-5,this.pos.y+13);//bottom butt
        endShape();
        
        //right arm
        beginShape();
        vertex(this.pos.x+26,this.pos.y+25);        bezierVertex(this.pos.x+28,this.pos.y+31,this.pos.x+20,this.pos.y+28,this.pos.x+18,this.pos.y+20);
        endShape();      

        //balloon
        
        break;
      case 3:
        //arm & body right side -- holding candy
        fill('white');
        beginShape();
          vertex(this.pos.x+18,this.pos.y+21);
        bezierVertex(this.pos.x+17,this.pos.y+22,this.pos.x+13,this.pos.y+23,this.pos.x+8,this.pos.y+18);
              bezierVertex(this.pos.x+11,this.pos.y+5,this.pos.x+35,this.pos.y+25,this.pos.x+21,this.pos.y+28);
                bezierVertex(this.pos.x+25,this.pos.y+30,this.pos.x+10,this.pos.y+41,this.pos.x,this.pos.y+33);//right butt
        bezierVertex(this.pos.x+5,this.pos.y+41,this.pos.x-5,this.pos.y+41,this.pos.x-5,this.pos.y+31);
        bezierVertex(this.pos.x-15,this.pos.y+25,this.pos.x-10,this.pos.y+15,this.pos.x-5,this.pos.y+13);  
        endShape();
        
        //arm & body left side
        fill('white');
        strokeWeight(1);
        stroke(0);
        beginShape();
        vertex(this.pos.x-1,this.pos.y+16);

        bezierVertex(this.pos.x-5,this.pos.y+25,this.pos.x-15,this.pos.y+23,this.pos.x-5,this.pos.y+11);//left arm

        endShape();
        break;
    }
  }
  show(){
    strokeWeight(1);
    this.backpartofcar();

    switch(this.s){
      case 1: //goggles
        this.body(1);
        this.face(false);
        this.bottompart(); 
        this.goggles();
        break;
      case 2://balloon
        this.neck();
        this.face(false);
        this.body(2);
        this.bottompart(); 
        this.clothcap();  
        this.balloon();
        balloon.update();
        balloon.show();
        break;
      case 3: //chick
        this.neck();
        this.face(true);
        this.body(3);
        this.bottompart();
        this.chick();       
        break;
        default:break;
    }  

  }
}