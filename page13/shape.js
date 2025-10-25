let numFrames = 60;
class Shape{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  show(){
    let t = 1.0*(frameCount-1)/numFrames;
    
    stroke(255,255,0,20);

    let radius = 50;
    let numPoints = 50;

    let angleIncrement = TWO_PI / numPoints-0.002;

    // Loop through the points on the circle and draw them
    
    for (let i = 0; i <= numPoints; i++) {
      for(let j = 0;j<radius;j++){
     // let r = map(radius,0,1,1,TWO_PI);
      let xx = this.x+map(cos(i * angleIncrement) * j,0,numPoints,0,150);
      let yy = this.y+map(sin(i * angleIncrement) * j,0,numPoints,0,150);
      let size = this.periodicFunction(t-this.offset(xx,yy));
      
      strokeWeight(size);
      circle(xx,yy,size*1/8);
      }
    }
  }
  offset(x,y){
    //return 0.005*(x+2*y);
    return 0.01*dist(x,y,80,-50);
  }
  periodicFunction(p){
   return map(sin(TWO_PI*p),-1,1,2,8);
  }
}