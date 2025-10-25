class Tree{
  constructor(x,y,type){
    this.x = x;
    this.y = y;
    this.alpha = 0;
    this.type = type;
  }
  show(){
    //noFill();

    if(this.type == 0){
    beginShape();
    vertex(this.x,this.y+180);
    bezierVertex(this.x+15,this.y+100,this.x+25,this.y+60,this.x,this.y+30);
    bezierVertex(this.x-15,this.y+20,this.x-20,this.y,this.x-65,this.y-20);
    bezierVertex(this.x-35,this.y-10,this.x-10,this.y,this.x+15,this.y+25);
    bezierVertex(this.x+20,this.y,this.x+15,this.y-60,this.x-10,this.y-90);
    bezierVertex(this.x+15,this.y-70,this.x+20,this.y-50,this.x+27,this.y-20);
    bezierVertex(this.x+25,this.y-50,this.x+27,this.y-80,this.x+32,this.y-120);
    bezierVertex(this.x+35,this.y-80,this.x+28,this.y-70,this.x+45,this.y-10);
    bezierVertex(this.x+55,this.y+5,this.x+65,this.y-35,this.x+120,this.y-20);
    bezierVertex(this.x+90,this.y-16,this.x+65,this.y-15,this.x+55,this.y+25);
    bezierVertex(this.x+40,this.y+65,this.x+65,this.y+140,this.x+70,this.y+180);
    endShape();
    }
    else{
    
    beginShape();
    vertex(this.x,this.y+180);
    bezierVertex(this.x+20,this.y+150,this.x+10,this.y+50,this.x,this.y+20);
    bezierVertex(this.x-35,this.y-13,this.x-55,this.y-15,this.x-95,this.y);
    bezierVertex(this.x-75,this.y-15,this.x-55,this.y-35,this.x,this.y);
    bezierVertex(this.x+5,this.y-15,this.x-10,this.y-65,this.x-55,this.y-60);
    bezierVertex(this.x-25,this.y-70,this.x-5,this.y-60,this.x+15,this.y-30);
    bezierVertex(this.x+10,this.y-50,this.x+15,this.y-70,this.x+20,this.y-115);
    bezierVertex(this.x+25,this.y-80,this.x+18,this.y-55,this.x+35,this.y-25);
    bezierVertex(this.x+45,this.y-10,this.x+75,this.y-50,this.x+95,this.y-40);
    bezierVertex(this.x+80,this.y-35,this.x+35,this.y-15,this.x+40,this.y+20);
    bezierVertex(this.x+38,this.y+50,this.x+45,this.y+120,this.x+70,this.y+180);
    endShape();
    }
  }
}