class Panna{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);
    this.vel = createVector();
    
    this.vel.mult(random(3));
  }
    update() {  
    
    this.middlepos = createVector(mouseX, mouseY);
    this.acc = p5.Vector.sub(this.middlepos, this.pos);  

    this.acc.setMag(10);
    
    this.vel.add(this.acc); 
    this.vel.limit(2);

    this.pos.add(this.vel);
    
     if(this.pos.y > height){this.pos.y = height;}
     if(this.pos.x > width){this.pos.x = width;}
     if(this.pos.x < 0 || this.pos.y < 0){
    
        this.acc.mult(0);
     }
  }
  show(){
       
   // noFill();
    fill(255);
    stroke(255);
    push();

    circle(this.pos.x,this.pos.y-32, 45);//face
    
    push();
    
    stroke('black');
    fill('black');
    circle(this.pos.x,this.pos.y-32,5);//nose
    
    noStroke();
    circle(this.pos.x-7,this.pos.y-35,5);//left eye
    circle(this.pos.x+7,this.pos.y-35,5);//right eye
    pop();
   
    
    push();
    stroke('black');
    curve(this.pos.x+3,this.pos.y-32,this.pos.x-2,this.pos.y-30,this.pos.x-5,this.pos.y-30,this.pos.x-7,this.pos.y-32);//left mouse
    curve(this.pos.x-3,this.pos.y-32,this.pos.x+2,this.pos.y-30,this.pos.x+5,this.pos.y-30,this.pos.x+7,this.pos.y-32);//right mouse

    fill('red');
    stroke('red');
    circle(this.pos.x,this.pos.y-29,3);//mouse
	curve(this.pos.x,this.pos.y-30,this.pos.x-3,this.pos.y-29,this.pos.x+3,this.pos.y-29,this.pos.x,this.pos.y-30);//mouth middle
    pop();
    
    circle(this.pos.x-15,this.pos.y-50,15);//left ear
    circle(this.pos.x+15,this.pos.y-50,15);//right ear
    push();
    fill('lightgray');

    for(let i = 0; i<PI;i+=0.05){
    let lalegx = map(sin(this.pos.x),-0.5,0,-0.5, 1);
    let lalegy = map(cos(this.pos.y),-0.5,0,-0.5, 1);
       ellipse(this.pos.x-5+lalegx, this.pos.y+15, 13, 23);//left leg
       ellipse(this.pos.x+5+lalegy, this.pos.y+15, 13, 23);//right leg
    }

    pop();
    ellipse(this.pos.x, this.pos.y, 45, 45);//body
    push();
    fill('lightgray');

    ellipse(this.pos.x-15, this.pos.y, 11, 21);//left arm    
    ellipse(this.pos.x+15, this.pos.y, 11, 21);//right arm
    pop();
    pop();
    
   // saveFrames('panna','png',1,25);
    
  }
  mypos(){
    return this.pos;
  }
}