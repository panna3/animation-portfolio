let radius = 0;
let inc = 0.01;
let lc;
let cc = 0;
let increment = 0.003;
class Stars{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(){
    radius += inc;
    if(radius >= 5 || radius <= 0){
      inc*=-1;
    }
    cc += increment;
    if(cc >= 1 || cc <= 0){
      increment *= -1;
    }
  }
  show(){
    let c1 = color(111,216,230);
    let c2 = color(227,234,112);
    lc = lerpColor(c1,c2,cc);

    let r = map(radius, 0, 3, 3, 0);
    stroke('pink');

    fill(lc);
    let innerRadius = 3;
    let numPoints = 4;
    let outerRadius = 8;
    beginShape();
    for (let i = 0; i < numPoints * 2; i++) {
      let rad = i % 2 === 0 ? outerRadius : innerRadius;
      let x = this.x + cos((i+0.058)*4/0.3+15) * (rad+r);
      let y = this.y + sin((i+0.058)*4/0.3+15) * (rad+r);
      vertex(x,y);

    }
    endShape(CLOSE);

  }
}