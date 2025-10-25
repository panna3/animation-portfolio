let innerRadius =5;
let numPoints = 5;
let angle2=0;

class Star{
  constructor(x,y,s){
    this.x = x;
    this.y = y;
    this.outerRadius = s;
  }
  show(vx,vy){
    //fill(random(255),random(255),random(255),this.alpha);
    
    noStroke();
    beginShape();
    for (let i = 0; i < numPoints * 2; i++) {
      let radius = i % 2 === 0 ? this.outerRadius : innerRadius;
      let xx = vx+cos(i*5) * radius;
      let yy = vy+sin(i*5) * radius;
      vertex(xx, yy);
    }
    endShape(CLOSE);
  
    angle2+=0.05;

  }  
}