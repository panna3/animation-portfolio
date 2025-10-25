class Hearts{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.vel.mult(random(3));
  }
   update() {  
    
    this.middlepos = createVector(random(0,width), 0);
    this.acc = p5.Vector.sub(this.middlepos, this.pos);  

    this.acc.setMag(10);
    
    this.vel.add(this.acc); 
    this.vel.limit(2);

    this.pos.add(this.vel);
    
    if(this.pos.y < 50){
      // for(let i = 0.01; i<50;i++){
      let c = color(255, 0, 0, 54);
      fill(c);
      // }
    }
    if(this.pos.y < 0){
      bb = false;
    }

   }
  show(){
    beginShape();

    for(let a = 0; a < TWO_PI;a += 0.1){

    let baseSize = 0.8;
    let hr = baseSize;
    let x = hr*16 * pow(sin(a), 3);
    let y = -hr*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a));
    
    let r = map(sin(angle), -1, 1, baseSize, baseSize*2);
    vertex(this.pos.x+3.5+r*x, this.pos.y-3.5+r*y);  

    }

    endShape();
  }
}