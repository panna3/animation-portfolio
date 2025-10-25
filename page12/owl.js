class Owl{
  constructor(x,y){
    this.x = x;
    this.y = y;
    
  }
  show(){

      //face
      noStroke();
      fill('#835432');
      ellipse(this.x,this.y+8,25,21);//body
      triangle(this.x+2,this.y+18,this.x+12,this.y+10,this.x+13,this.y+20);
      fill('#9a8577');
      stroke('#9a8577');
      ellipse(this.x,this.y,23,18);//face
      
      noStroke();
      fill('#f50c59');
      //heart  
      beginShape();
        for(let a = 0; a < TWO_PI;a += 0.1){
          let rr = height/2100;
          let xx = rr*16 * pow(sin(a), 3);
          let yy = -rr*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a));
        vertex(this.x+xx, this.y+yy);
        }
      endShape(); 
      
      //eyes
      fill(0);
      circle(this.x-4,this.y+1,5);
      circle(this.x+4,this.y+1,5);
      //nose
      stroke('yellow');
      fill('yellow');
      ellipse(this.x,this.y+3,2,2);
      //legs
      stroke('#9a8577');
      fill('#9a8577');
      line(this.x-3,this.y+18,this.x-3,this.y+20);
      line(this.x+3,this.y+18,this.x+3,this.y+20); 

  }
}