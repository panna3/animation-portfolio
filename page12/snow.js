class Snow{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pos = createVector(x,y);
    this.vel = createVector();
//    this.vel.mult(random(3));
    this.alpha = 255;
  }
  update(){
    this.m = createVector(random(-400,width/2),height);
    this.r = p5.Vector.random2D();
    this.r.mult(5);
    this.acc = p5.Vector.sub(this.m,this.pos);
    this.acc.setMag(10);
    this.vel.add(this.r);
    
    this.vel.add(this.acc);
    this.vel.add(this.gravity);
    this.vel.mult(3);
    this.vel.limit(10);
    this.pos.add(this.vel);
    
    if(this.pos.y > height){
      this.acc.mult(0);
      this.pos.x = random(0,width+400);//this.x-width/2+400;
      this.pos.y = 0;
      this.alpha = 255;
    }
  }
  show(){

    fill(255,this.alpha);
    stroke(255,this.alpha);
    noStroke(0);   

    circle(this.pos.x,this.pos.y,5);
    
    this.alpha-=2;
  }
}