class Panna{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  show(){
   fill(255);
   stroke(230,230,250);
   let radius = 200;
    //tail
    for(let i = 5; i < radius;i++){
      let r = map(i,0,radius,0,radius*2)*0.6;
      let x = this.x+55 + cos(r+i)*r/12;
      let y = this.y+72 + sin(r+i)*r/12;
      circle(x,y,3);
    }
    //face
    beginShape();
      vertex(this.x,this.y);
      bezierVertex(this.x-10, this.y-30, this.x-20, this.y-20, this.x-25,this.y+5);//left ear
      bezierVertex(this.x-65, this.y+70, this.x+80, this.y+70, this.x+45,this.y+5);
      bezierVertex(this.x+30, this.y-30, this.x+30, this.y-20, this.x+20,this.y);//right ear
      bezierVertex(this.x+15,this.y-3,this.x+12,this.y-3,this.x,this.y);
    endShape(); 
    //left face hair
    beginShape();
      vertex(this.x-31,this.y+20);
      bezierVertex(this.x-40,this.y+40,this.x-38,this.y+38,this.x-30,this.y+30);
      bezierVertex(this.x-38,this.y+50,this.x-38,this.y+50,this.x-25,this.y+40);
    endShape();
    //right face hair
    beginShape();
      vertex(this.x+50,this.y+20);
      bezierVertex(this.x+57,this.y+40,this.x+57,this.y+38,this.x+48,this.y+30);
      bezierVertex(this.x+56,this.y+50,this.x+56,this.y+50,this.x+43,this.y+40);
    endShape();
    //right leg
    beginShape();
      vertex(this.x+30, this.y+80);
      bezierVertex(this.x,this.y+90,this.x,this.y+110,this.x+40,this.y+85);
    endShape();
    //body
    beginShape();
      vertex(this.x-10, this.y+52);
      bezierVertex(this.x-80, this.y+115, this.x+150, this.y+110, this.x+30,this.y+50);
    endShape();
    //right hand
    beginShape();
      vertex(this.x, this.y+80);
      bezierVertex(this.x-20, this.y+110, this.x+10,this.y+110, this.x+10,this.y+80);
    endShape();
    //left hand
    beginShape();
      vertex(this.x-20, this.y+80);
      bezierVertex(this.x-40, this.y+110, this.x-20,this.y+110, this.x-5,this.y+80);
    endShape();
    //left leg
    beginShape();
      vertex(this.x+50, this.y+85);
      bezierVertex(this.x+20,this.y+95,this.x+20,this.y+120,this.x+65,this.y+85);
    endShape();

    fill('black');
    circle(this.x-7,this.y+21,5);//left eye
    circle(this.x+13,this.y+21,5);//right eye
    circle(this.x+3,this.y+30,5);//nose
  }
  update(){
    
  }
}