class Ghost{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.alpha = 255;
  }
  update(){
    
  }
  show(){
    noStroke();
    fill(255,this.alpha);

    //ghost

    //body
    beginShape();
      vertex(this.x-15,this.y+8);
      bezierVertex(this.x-13,this.y-23,this.x+13,this.y-23,this.x+15,this.y+8);
      bezierVertex(this.x+13,this.y+10,this.x+11,this.y+10,this.x+9,this.y+5);
      bezierVertex(this.x+7,this.y+10,this.x+5,this.y+10,this.x+3,this.y+5);
      bezierVertex(this.x+1,this.y+10,this.x-1,this.y+10,this.x-3,this.y+5);
      bezierVertex(this.x-5,this.y+10,this.x-7,this.y+10,this.x-9,this.y+5);
      bezierVertex(this.x-11,this.y+10,this.x-13,this.y+10,this.x-15,this.y+8);
    endShape();
    
    //eye
     fill(0,this.alpha);
     circle(this.x-5,this.y-3,3);
     circle(this.x+5,this.y-3,3);
    
     if(this.alpha < 0){
       this.alpha = 255;
       this.x = random(100,width/2+300);
       this.y = random(100,height/2);
     }
     else{
       this.alpha -= 3;  
     }
  }
}