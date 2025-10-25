let innerRadius =5;// Radius of the inner points
let numPoints = 5; // Number of points in the star
let angle=0;
class Star{
  constructor(x,y,s,c){
    this.x = x;
    this.y = y;
    this.outerRadius = s;
    this.myColor = c;
  }
   show(){

    switch(this.myColor){
      case 0:
        fill(255,0,0,this.alpha);//red
        break;
      case 1:
        fill(252,255,0,this.alpha);//yellow
        break;
      case 2:
        fill(0,255,252,this.alpha);//blue
        break;
    }
    
    noStroke();
    beginShape();
    for (let i = 0; i < numPoints * 2; i++) {
      let radius = i % 2 === 0 ? this.outerRadius : innerRadius;
      let xx = this.x+cos(i*5) * radius;
      let yy = this.y+sin(i*5) * radius;
      vertex(xx, yy);
    }
    endShape(CLOSE);
  
    angle+=0.05;
    
  }  
}