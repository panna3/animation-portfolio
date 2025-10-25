class Bubble{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.vel.mult(random(3));
  }
  update(){
    this.bubble = createVector(random(this.x-50,this.x+50),0);
    this.acc = p5.Vector.sub(this.bubble,this.pos);
    this.acc.setMag(10);
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);

    if(this.pos.y < height/2-200){
      // let c = color(234, 233, 195, this.alpha);
      // fill(c);
      this.pos.y = height/2+140;
    }
  }
  show(){
    fill('yellow');
    circle(this.pos.x,this.pos.y,5);
  }
}