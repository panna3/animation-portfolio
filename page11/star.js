class Star{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pos = createVector(x,y);
    this.vel = createVector();
    this.vel.mult(random(3));
  }
  update(){
    this.mousepos = createVector(random(this.x-50,this.x+50),0);
    this.acc = p5.Vector.sub(this.mousepos,this.pos);
    
    this.acc.setMag(5);
    
    this.vel.add(this.acc);
    this.vel.limit(2);
    
    this.pos.add(this.vel);
    
    if(this.pos.y < height/2-200){

      this.pos.y = height/2+110;
    }
  }
  show(){
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let randomColor = color(r, g, b);

  fill(randomColor);
  beginShape();
  for (let i = 0; i < numPoints * 2; i++) {
    let radius = i % 2 === 0 ? outerRadius : innerRadius;
    let xx = this.pos.x + cos(i * angle) * radius;
    let yy = this.pos.y + sin(i * angle) * radius;
    vertex(xx, yy);
  }
  endShape(CLOSE);
  
    angle+=0.05;
    len++;

  }

}