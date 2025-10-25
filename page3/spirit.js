class Spirit{
  constructor(x,y,c,s){
    this.x = x;
    this.y = y;
  //  this.targetX = x;
   // this.targetY = y;
    this.baseY = y;      // center Y position
    this.baseX = x;
    this.angle = random(TWO_PI);
    this.c = c;
    this.size = s;
  }
  show(){
    noStroke();
  //  fill(255, 215, 0, 35);
    fill(this.c)
    circle(this.x,this.y,this.size);
    
    push();
    translate(this.x, this.y);
    
    strokeWeight(2);
   // stroke(255, 215, 0, 30); // soft golden glow
    stroke(this.c);
    let radius = 2;
    let numPoints = 25;
    let angleIncrement = TWO_PI / numPoints;
//     let c1 = color(255, 160, 0);   // deep amber gold
//     let c2 = color(255, 255, 180); // light shimmering gold
  

    for (let i = 0; i < numPoints; i++) {
      let xx = cos(i * angleIncrement) * radius;
      let yy = sin(i * angleIncrement) * radius;
      let sx = xx * 8;
      let sy = yy * 8;
      
      // for (let j = 0; j < 1; j += 0.01) {
      //   let interColor = lerpColor(c1, c2, j);
      //   stroke(interColor);
      //   let x1 = xx;
      //   let y1 = yy;
      //   let x2 = xx + sx * j;
      //   let y2 = yy + sy * j;
      //   line(x1, y1, x2, y2);
      // }
      
      line(xx, yy, xx + sx, yy + sy);

    }
    
    pop();
    
  }
  update(){
    
   // this.targetX = this.x + random(-35, 35);
  //  this.targetY = this.y + random(-135, 135);

    // move slowly toward the target
  //  this.x = lerp(this.x, this.targetX, 0.01); // 0.05 = smooth speed
//    this.y = lerp(this.y, this.targetY, 0.01);
    this.angle += 0.01;                  // speed of movement
    this.y = this.baseY + sin(this.angle) * 50;
    this.x = this.baseX + cos(this.angle)* 10;
  }
}