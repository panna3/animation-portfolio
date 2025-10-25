let yleg = 0;
let xleg = 0;
let bxleg = 0;
class Panna{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  show(){
    let legy = map(yleg,0,10,this.y,this.y-1);
    let legx = map(xleg,0,10,this.x-1,this.x);
    let blegx = map(bxleg,0,10,this.x,this.x-1);
    if(yleg > 21){
      yleg = 0;
      xleg = 0;
      bxleg = 0;
    }
    else{
      yleg++;
      xleg++;
      bxleg++;
    }
    fill('white');
    strokeWeight(1);
    stroke('pink');

    beginShape();
      vertex(this.x,this.y);
      bezierVertex(this.x+5,this.y-5,this.x+7,this.y-5,this.x+9,this.y);// left ear
      bezierVertex(this.x+11,this.y-1,this.x+13,this.y-1,this.x+15,this.y+1);// head
      bezierVertex(this.x+18,this.y-6,this.x+22,this.y-7,this.x+24,this.y);// right ear
      bezierVertex(this.x+29,this.y+21,this.x-16,this.y+18,this.x,this.y);// face
    endShape();
    beginShape();
      vertex(this.x,this.y+13);
      bezierVertex(this.x-15,legy+23,this.x-15,legy+24,this.x+6,this.y+15);// left arm     
    endShape();
    beginShape();
      vertex(this.x-2,this.y+13);
      bezierVertex(this.x,this.y+25,this.x+15,this.y+21,this.x+18,this.y+13);// top body     
    endShape();
    beginShape();
      vertex(this.x+11,this.y+21);
      bezierVertex(this.x+55,this.y+29,this.x+45,this.y+11,this.x+11,this.y+13);// main body
    endShape();
        beginShape();
      vertex(this.x+11,this.y+17);
      bezierVertex(legx+5,this.y+39,legx+13,this.y+27,this.x+17,this.y+18);// right arm     
    endShape();
    beginShape();
      vertex(this.x+33,this.y+23);
      bezierVertex(legx+50,this.y+33,legx+50,this.y+29,this.x+39,this.y+21);// right leg
    endShape();
    beginShape();
      vertex(this.x+29,this.y+23);
      bezierVertex(blegx+38,this.y+33,blegx+38,this.y+25,this.x+29,this.y+21);// left leg
    endShape();
    beginShape();
      vertex(this.x+39,this.y+18);
      bezierVertex(this.x+45,this.y+17,this.x+45,this.y+11,this.x+35,this.y+15);// tail
    endShape();
    fill('black');
    strokeWeight(1);
    stroke('black');
    circle(this.x+5,this.y+5,2);// left eye
    circle(this.x+12,this.y+5,2);// right eye
    circle(this.x+8,this.y+8,2);// nose
    
  }
}