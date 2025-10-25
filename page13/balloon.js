class Balloon{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pos = createVector(x,y);
    this.vel = createVector();
  }
  update(){
    this.bob = createVector(this.x+random(2),this.y);
    this.acc = p5.Vector.sub(this.bob,this.pos);
    this.vel.add(this.acc);
    this.vel.limit(2);
    this.pos.add(this.vel);
  }
  show(){
    fill('pink');
    ellipse(this.pos.x+37,this.pos.y-93,30);
    noFill();
    beginShape();

    vertex(this.pos.x,this.pos.y-1);
    bezierVertex(this.pos.x+5,this.pos.y-15,this.pos.x+2,this.pos.y-20,this.pos.x+10,this.pos.y-30);
    bezierVertex(this.pos.x+15,this.pos.y-40,this.pos.x+25,this.pos.y-45,this.pos.x+30,this.pos.y-80);
    endShape();
    fill('pink');
    triangle(this.pos.x+25,this.pos.y-75,this.pos.x+30,this.pos.y-80,this.pos.x+33,this.pos.y-70);
  }
}