let cnt = 0;
class Panna{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(x,y){
      this.x = x;
      this.y = y;
  }
  show(){

    //body
    fill('white');
    beginShape();
      vertex(this.x-15,this.y+15);
      bezierVertex(this.x-35,this.y+50,this.x+35,this.y+50,this.x+15,this.y+15);
    endShape();
    //legs
    circle(this.x-8,this.y+38,8);
    circle(this.x+8,this.y+38,8);
    circle(this.x-7,this.y+37,1);
    circle(this.x-9,this.y+37,1);
    circle(this.x+7,this.y+37,1);
    circle(this.x+9,this.y+37,1);
    
    // face
    beginShape();
      vertex(this.x-17,this.y-17);
      bezierVertex(this.x-15,this.y-21,this.x-10,this.y-21,this.x-5,this.y-16);
      bezierVertex(this.x,this.y-17,this.x+2,this.y-17,this.x+4,this.y-16);
      bezierVertex(this.x+9,this.y-21,this.x+14,this.y-21,this.x+16,this.y-17);
      bezierVertex(this.x+39,this.y+31,this.x-39,this.y+31,this.x-17,this.y-17);
    endShape();
    
    //eyes
    fill('black');
    circle(this.x-6,this.y-3,5);
    circle(this.x+6,this.y-3,5);
    //mouth
    circle(this.x,this.y+3,5);
    
    noFill();
    //left side mouth
    beginShape();
      vertex(this.x,this.y);
      bezierVertex(this.x-3,this.y+6,this.x-6,this.y+6,this.x-9,this.y+5);
    endShape();
    //right side mouth
    beginShape();
      vertex(this.x,this.y);
      bezierVertex(this.x+3,this.y+6,this.x+6,this.y+6,this.x+9,this.y+5);
    endShape();
    
    //smile mouth
    let mclose = this.y + map(cnt,0,TWO_PI,0,0);
    let mopen = this.y + map(cnt,0,TWO_PI,0,0.5);
    
    fill('#FF5722');
    beginShape();
      vertex(this.x-5,mclose+5);
      bezierVertex(this.x-2,mopen+6,this.x+3,mopen+6,this.x+5,mclose+5);
    endShape();
    
    beginShape();
      vertex(this.x,mclose+5);
      vertex(this.x,mopen+1);
    endShape();
    
    if(cnt > 100){
      cnt = 0;
    }
    if(topping){
      this.sushi();
      cnt+=0.5;
    }
    else{
      cnt++;
    }
    //ice cream
    // fill('pink');
    // circle(this.x+5,this.y+15,13);
    // fill('#FCF5BB');
    // beginShape();
    //   vertex(this.x,this.y+20);
    //   bezierVertex(this.x+3,this.y+21,this.x+8,this.y+23,this.x+11,this.y+18);
    //   bezierVertex(this.x+8,this.y+38,this.x+9,this.y+39,this.x,this.y+20);
    // endShape();
    //hands
    
    fill('white');
    //left hand
    beginShape();
      vertex(this.x-5,this.y+23);
      bezierVertex(this.x,this.y+25,this.x+3,this.y+25,this.x+4,this.y+23);
      bezierVertex(this.x+6,this.y+24,this.x+6,this.y+25,this.x+5,this.y+27);
      bezierVertex(this.x+3,this.y+31,this.x,this.y+29,this.x-5,this.y+28);
    endShape();
    //right hand
    beginShape();
      vertex(this.x+13,this.y+22);
      bezierVertex(this.x+7,this.y+23,this.x+7,this.y+31,this.x+13,this.y+27);
    endShape();
  }
  sushi(){
    fill('#DA400E');
    beginShape();
      vertex(this.x+8,this.y+23);
      bezierVertex(this.x+11,this.y+15,this.x+6,this.y+12,this.x,this.y+13);
    endShape(CLOSE);
    fill('white');
    beginShape();
      vertex(this.x+8,this.y+23);
      bezierVertex(this.x-5,this.y+21,this.x-3,this.y+15,this.x,this.y+13);
    endShape();
  }
}