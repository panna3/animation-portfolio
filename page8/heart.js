let rr=0;
//let angle1 =0;
class Heart{
  constructor(x,y){
    this.x = x;
    this.y = y;

  }

  show(vx,vy){
  //fill('red');
  noStroke();

  //heart  
  beginShape();

    for(let a = 0; a < TWO_PI;a += 0.1){
  
    rr = height/1000;
    let xx = vx+rr*16 * pow(sin(a), 3);
    let yy = vy+-rr*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a));
    
    //let r = map(sin(angle), -1, 1, height/150, height/500);
      
    vertex(xx, yy);

    }

  endShape();  
  //angle1 += 0.02;
  }

}