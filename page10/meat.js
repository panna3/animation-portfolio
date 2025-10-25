class Meat{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  show(){
    translate(mouseX,mouseY);
    push();
    fill('white');
    stroke('white');
    circle(this.x,this.y,10);
    circle(this.x,this.y+10,10);
    circle(this.x+32,this.y,10);
    circle(this.x+32,this.y+10,10);
    ellipse(this.x+16,this.y+5,this.x+30,10);

    pop();
    push();
    noStroke();
    fill('brown');
    ellipse(this.x+16,this.y+5,this.x+18,21);
    pop();

  }
}