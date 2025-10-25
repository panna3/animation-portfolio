class Panna{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.speed = 0.8;
    this.direction = 1;
    this.lastTime = 0;
    this.pauseTime = 700;
  }
  show(){
    
    push();
    stroke('pink');
    fill('white');
    translate(this.x+5, this.y-3);
    ellipseMode(CENTER);
    // tail
    beginShape();
      vertex(13,39);
      bezierVertex(30,35,0,18,26,29);
      bezierVertex(35,45,0,45,13,39);
    endShape();
    // body
    beginShape();
      vertex(-18, 21);
      bezierVertex(-39,59,33,59,10,21);
    endShape();

    beginShape(); // left front leg
      vertex(-11,45);
      bezierVertex(-8,55,-17,55,-15,39);
    endShape();
    beginShape(); // right front leg
      vertex(0,39);
      bezierVertex(5,56,-7,56,-3,45);
    endShape();
    beginShape(); // back right leg
      vertex(10,45);
      bezierVertex(3,55,5,43,7,43);
    endShape();
    pop();
    
    push();
    translate(this.x, this.y);
    ellipseMode(CENTER);
   rotate(radians(-this.angle));
    
    fill('white');
    // face
    stroke('pink');
    beginShape();
      vertex(-29,-5);
      bezierVertex(-39,-29,-10,-29,-18,-10); // left ear
      bezierVertex(-10,-18,0,-18,10,-10); // top head
      bezierVertex(0,-29,35,-29,18,-5); // right ear
      bezierVertex(29,33,-35,33,-29,-5); // face
    endShape();
    noStroke();
    fill('lightblue');
    circle(3,1,5); // right eye
    circle(-13,1,5); // left eye
    circle(-5,7,5); // nose
    pop();

    
  }
  update(){
    if (millis() - this.lastTime >= this.pauseTime) {
      this.angle += this.speed * this.direction;
    
      if(this.angle >= 30 || this.angle <= 0){
         this.direction*=-1;
        this.lastTime = millis();
      }
    }
  }
}