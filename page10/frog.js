class Frog{
  constructor(x,y){
    this.x = x;
    this.y = y;
    
    this.bob = createVector(this.x, this.y);
    this.anchor = createVector(random(width/2-150,width/2), 0);
    this.vel = createVector(0, 0);
    this.gravity = createVector(0, 0.1);
  }
  update(){
    
    let restLength = 450;
    let k = 0.05;
    let force = p5.Vector.sub(this.bob, this.anchor);
    let xx = force.mag() - restLength;
    force.normalize();
    force.mult(-1 * k * xx);

    // Force = Acc
    this.vel.add(force);
    this.vel.add(this.gravity);
    this.bob.add(this.vel);
    this.vel.mult(0.99);
   
//     if (mouseIsPressed) {
//     this.bob.x = mouseX;
//     this.bob.y = mouseY;
//     this.vel.set(0, 0);
//     }
  }
  show(){
    //frog
    strokeWeight(2);
    stroke('#32d70c');    
    fill('#32d70c');
    circle(this.bob.x,this.bob.y,35);//body
    
    strokeWeight(3);
    fill('black');
    circle(this.bob.x-15,this.bob.y-15,7);//left eye
    circle(this.bob.x+15,this.bob.y-15,7);//right eye
    
    fill('#32d70c');
    circle(this.bob.x-18,this.bob.y+2,5);//left arm
    circle(this.bob.x+18,this.bob.y+2,5);//right arm
    
    circle(this.bob.x-15,this.bob.y+15,5);//left leg
    circle(this.bob.x+15,this.bob.y+15,5);//right leg
  }
}