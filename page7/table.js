class Table{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  show(){
    // table
    fill('#FCECE6');
    beginShape();     
      vertex(this.x-160,this.y+80);
      vertex(this.x-160,this.y+133);
      bezierVertex(this.x-100,this.y+200,this.x+100,this.y+200,this.x+160,this.y+133);
      vertex(this.x+160,this.y+80);
    endShape();
    fill('beige');
    ellipse(this.x,this.y+80,320,133);
    fill('#EAF9FD');
    ellipse(this.x,this.y+80,270,103);
    fill(225);
    beginShape();
      vertex(this.x+123,this.y+100);
      bezierVertex(this.x+100,this.y+50,this.x-100,this.y+50,this.x-123,this.y+100);
      bezierVertex(this.x-89,this.y+141,this.x+89,this.y+141,this.x+123,this.y+100);
    endShape();
  }
}