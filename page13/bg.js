
let r = 255;
class Bg{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.xx = 0;
    this.yy = 0;
  }
  show(){
     
    this.gradation();
    rainbow.show();
    this.bgrect();
    this.road();
    this.sun();
    this.shine();
  }
  bgrect(){
    noStroke();
    //fill("#b496fb");
    fill('gray');
    rect(-10,this.y,width+20,height);
  }
  sun(){
    stroke(255,162,0,20);
    fill('#fcffa7')
    circle(70,-21,100);
    strokeWeight(10);
    stroke(246,255,0,20);
    let radius = 50;
    let numPoints = 150;

    let angleIncrement = TWO_PI / numPoints;

    // Loop through the points on the circle and draw them
    for (let i = 0; i < numPoints; i++) {
      this.xx = 70 + cos(i * angleIncrement) * radius;
      this.yy = -21 + sin(i * angleIncrement) * radius;
      let sx = this.xx-70;
      let sy = this.yy+21;
      line(this.xx,this.yy,this.xx+sx*13,this.yy+sy*11);
    }
  }
  shine(){
    strokeWeight(1.5);
    for(let i= height;i>=this.y;i-=5){
      for(let j = 0;j<width;j+=random(333)){
        stroke('yellow');
        point(j,i);
      }
    }
  }
  gradation(){
    for (let i = this.y; i >= 0; i--) {
      r=i;
      stroke(r,231,253);      
      line(0,this.y-i,width,this.y-i);
    }
  }
  road(){
    strokeWeight(1);
    for(let i= height;i>=this.y;i-=5){
      stroke('pink');
      line(0,i,width,i);
    }
  }
}