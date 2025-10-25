class Heart{
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
  fill('red');
  noStroke();

  //heart  
  beginShape();

    for(let a = 0; a < TWO_PI;a += 0.1){
  
    let baseSize = 0.8;
    rr = baseSize;
    let x = rr*16 * pow(sin(a), 3);
    let y = -rr*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a));
    
    let r = map(sin(angle), -1, 1, baseSize, baseSize*2);
      
    vertex(this.pos.x+3.5+r*x, this.pos.y-3.5+r*y);

    }

  endShape();  

  }
}