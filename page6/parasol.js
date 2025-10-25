let pangle = 0;
let pradius = 11;
let numFrames = 6;
class Parasol{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(){
    // drone movement
    let t = 1.0*(frameCount-1)/numFrames;
    let x = map(cos(this.x+t),random(width/2+250-1,width/2+250+1),width/2+450,width/2+250,width/2+350); 
    let y = map(sin(this.y+t),height/2+150,height/2+200,height/2+150,height/2+170);
  }
  show(){
    stroke('pink');
    strokeWeight(5);
    noFill();
    beginShape();
      vertex(this.x+5,this.y-35);
      bezierVertex(this.x,this.y-25,this.x-5,this.y-25,this.x-10,this.y-51);
    endShape();
    strokeWeight(1);   
    fill('lightblue');
    beginShape();
      vertex(this.x-15,this.y-77);
      bezierVertex(this.x-20,this.y-75,this.x-45,this.y-75,this.x-75,this.y-50);
      bezierVertex(this.x-70,this.y-55,this.x-60,this.y-55,this.x-50,this.y-50);
      bezierVertex(this.x-40,this.y-55,this.x-30,this.y-55,this.x-20,this.y-51);
      bezierVertex(this.x-10,this.y-55,this.x,this.y-56,this.x+10,this.y-52);
      bezierVertex(this.x+20,this.y-58,this.x+30,this.y-58,this.x+43,this.y-55);
      bezierVertex(this.x+20,this.y-73,this.x+8,this.y-73,this.x-15,this.y-77);
    endShape();
    // drone
    ellipse(this.x,this.y-25,39,8);
    strokeWeight(0.5);
    stroke(156,146,253,80);
    
    for(let i = 0; i < TWO_PI;i+=0.1){
      let x = pradius*cos(pangle*i);
      let y = pradius*sin(pangle*i);
      line(this.x-16,this.y-25,this.x-16+x,this.y-25+y);
      line(this.x+16,this.y-25,this.x+16+x,this.y-25+y);
    }
    pangle ++;
  }
}