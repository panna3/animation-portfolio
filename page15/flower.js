class Flower{
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
    stroke('green');
    translate(this.x+5, this.y-3);
    ellipseMode(CENTER);
    // body
    fill('lightblue');
    beginShape();
      vertex(0, 0);
      vertex(0, 50);
      bezierVertex(20,29,30,45,0,50);
      bezierVertex(-20,29,-30,45,0,50);
    endShape();

    // face
    stroke('lightblue');
    beginShape();
    ellipseMode(CENTER);
    rotate(radians(-this.angle));
    let w = 30;
    let h = 20;
    let x = 0;
    let y = 0;

    fill('white');
    for(let i = 0; i< TWO_PI;i+=0.3){
      x = cos(i)*w;
      y = sin(i)*h;

      vertex(x,y);
      let r = map(i,1,TWO_PI,TWO_PI,1);
      let ix = x + cos(i)*r/10;
      let iy = y + sin(i)*r/10;

      push();
      fill('pink');
      circle(ix,iy,15);
      pop();
    }
    endShape(CLOSE);
  
    fill('lightblue');
    circle(-6,0,5);
    circle(6,0,5);
    // mouse
    fill('red');
    beginShape();
      vertex(-8, 5);
      bezierVertex(-5,10,0,20,8,5);
    endShape();
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