class WobbleCircle{
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.stretchX = 0;
    this.stretchY = 0;
    this.center = createVector(x, y);
    this.stretch = createVector();
    this.v1 = createVector();
    this.v2 = createVector();
  }
  show(){
    
    noFill();
    fill(255,255,224,30);
    stroke(60,179,113,random(50));

    let stepW = PI/15;

    let my = map(sin(wobble), -1, 1, -PI/60, PI/60);
    let mx = map(cos(wobble), 1, -1, PI/60, -PI/60);
    let radius = map(angle,0,TWO_PI,PI,0);

    beginShape();
     for (let i= 0; i<TWO_PI+0.5;i+=stepW){
       let r = this.r + sin(wobble + i * 3) * 5;
       let tx = this.x + cos(angle+i)*(r+radius)*(1 + abs(this.stretch.x) / 50);
       let ty = this.y + sin(angle+i)*(r+radius)*(1 + abs(this.stretch.y) / 50);
             

       stroke('white');
       curveVertex(tx+mx,ty+my);
       circle(tx+mx, ty+my, random(15));
      }
    endShape();

    if(mouseIsPressed){
      this.v1.set(pmouseX,pmouseY);
      this.v2.set(mouseX,mouseY);
      let targetStretch = p5.Vector.sub(this.v2,this.v1).mult(3);
      this.stretch.lerp(targetStretch, 0.3);
      if (this.stretch.dist(targetStretch) < 0.5) {
        this.stretch = targetStretch.copy();
      }
    }else {
      this.stretch.lerp(createVector(0, 0), 0.1);
    }
  }
}