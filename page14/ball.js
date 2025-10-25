class Ball{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.attached = false;
    //this.color = random(ballColor);
    let index = floor(random(ballColor.length));
    this.color = ballColor[index];
    this.colorIndex = index;
  }
  update(){
    if(this.y > height){
      this.y = 0;
    }
    this.y++;
  }
  show(){
    noStroke();
    fill(this.color);
    circle(this.x,this.y,50);
  }
}