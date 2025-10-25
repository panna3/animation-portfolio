let ctime = 0;
class Rainbow{
  constructor(x, y, size, speed, fweight){
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.fweight = fweight;
    this.a = 255;
    this.fadeSpeed = 2;
    this.switchb = false;
  }
  update(){
    ctime+=this.speed;
    if(ctime >1 || ctime <= 0){
      this.speed *= -1;
    }
    // fade alpha
    this.a -= this.fadeSpeed;

    if(this.a <= 0){
      this.a = 0;
      this.fadeSpeed *= -1;
      this.switchb = !this.switchb;
    } else if(this.a >= 255){
      this.a = 255;
      this.fadeSpeed *= -1;
    }
  }
  setColor(i){
    let c1,c2;
    if(this.switchb){
      //gold
      c1 = color(255,192,203,this.a);
      c2 = color(255,255,1, this.a); 
    }
    else{
      c1 = color(255,192,203,this.a);
      c2 = color(0,255,255, this.a);      
    }

    let t = map(i*ctime, 0, TWO_PI, 0, 1);
    let lc = lerpColor(c1, c2, t);
    strokeWeight(this.fweight);
    stroke(lc);
    fill(lc);
  }
  show(){

    for(let i = 0; i < TWO_PI; i+=0.03){
      let angle = map(i, 0, TWO_PI, 0, TWO_PI);
      let x = this.x + cos(angle*i)*this.size;
      let y = this.y + sin(angle*i)*this.size;
      this.setColor(i);
      point(x,y);
    }
  }
}