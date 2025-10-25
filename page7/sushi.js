class Sushi{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  show(){
    fill('white');
    ellipse(this.x,this.y,20,11);
    fill('#DA400E');
    ellipse(this.x,this.y-2,21,6);
  }
}