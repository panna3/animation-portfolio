class Panna {
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.attachedBalls = [];
    this.w = w;
    this.h = h;
  }
  attach(ball){
    if (!ball.attached) {
      ball.attached = true;
      this.attachedBalls.push(ball);
    }
  }
  detach(matchedBalls) {
    for (let ball of matchedBalls) {
      ball.attached = false;
      let index = this.attachedBalls.indexOf(ball);
      if (index > -1) {
        this.attachedBalls.splice(index, 1);
      }
      balls = balls.filter(b => b !== ball); // remove from global list
    }
    this.h = this.y - this.attachedBalls.length * grid;
    score += matchedBalls.length * 10;

  }
  update(ball){
    this.h -= grid;
    ball.y = this.h;
  }
  checkColor(ball) {
    for (let i = this.attachedBalls.length - 1; i >= 2; i--) {
      let b1 = this.attachedBalls[i];
      let b2 = this.attachedBalls[i - 1];
      let b3 = this.attachedBalls[i - 2];
      if (
        b1.color.toString() === ball.color.toString() &&
        b2.color.toString() === ball.color.toString() &&
        b3.color.toString() === ball.color.toString()
      ) {
        return [b1, b2, b3];  // return the 3 matching balls
      }
    }
    return null;
  }

  show(){
    noStroke();
    fill('white');
    circle(this.x,this.y,50);
    fill('black');
    circle(this.x-7,this.y-3,6);
    circle(this.x+7,this.y-3,6);
    circle(this.x,this.y+3,6);
    // cone
    fill('papayawhip');
    triangle(this.x-24, this.y+10,this.x,this.y+50,this.x+24,this.y+10);
    strokeWeight(0.3);
    stroke('brown');
    line(this.x-21, this.y+16, this.x+21,this.y+16);
    line(this.x-16, this.y+23, this.x+16,this.y+23);
    line(this.x-11, this.y+31, this.x+11,this.y+31);
    line(this.x-6, this.y+39, this.x+6,this.y+39);
  }
  move(lr){
   if (this.x + lr * this.w/10 >= 0 && this.x + lr * this.w/10 <= width) {
      this.x += lr*this.w/10;
      for(let b of this.attachedBalls){
        b.x += lr * this.w/10;
      }
    }
  }
}