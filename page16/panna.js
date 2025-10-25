class Panna{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  show(){

      stroke('beige');
      circle(this.x-8,this.y-11,7);//left ear
      circle(this.x+8,this.y-11,7);//right ear
      circle(this.x,this.y,25);//face
      fill('black');
      circle(this.x-5,this.y,3);//left eye
      circle(this.x+5,this.y,3);//right eye
      circle(this.x,this.y+5,3);//mouth
  }
}