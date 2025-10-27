class Square{
  constructor(x, y){
    this.x = x;
    this.y = y;

  }
  update(){
    
  }
  show(){
    //triangle(this.x, this.y, this.x + triW/2, this.y + triW/2, this.x + triW, this.y);
    square(this.x,this.y,sqW);
  }
}