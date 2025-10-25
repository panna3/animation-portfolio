class Star{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(){

  }
  show(){
    stroke('pink');

    fill(lc);
    let innerRadius = 3.5;
    let numPoints = 4;
    let outerRadius = 7;
    let br = 7;
    beginShape();
    for (let i = 0; i < numPoints * 2; i++) {
      let rad = i % 2 === 0 ? outerRadius : innerRadius;
      let ag = TWO_PI / (numPoints * 2) * i;
      let x = this.x-15 + cos(ag) * rad*br;
      let y = this.y+25 + 1/2*sin(ag) * rad*br;
    vertex(x,y);

    }
    endShape(CLOSE);

  }
}