let a = 80;
class Rainbow{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.rc = [color(255,0,0,a),color(255,150,0,a),color(255,240,0,a),color(0,255,0,a),color(0,0,255,a),color(150,0,255,a)];

  }
  show(){
   //rainbow  
    let cnt = 0;
    strokeWeight(5);

    //5 curve lines
    for(let i = 62;i>50;i-=2){
     // stroke(this.rc[cnt]);
      stroke(this.lColor(this.rc[cnt],this.rc[0]));
      this.rainbow(i,150);
      cnt++;   
    }
  }
  lColor(a,b){
     return lerpColor(a,b,0.3);  
  }
 rainbow(r,np){
    //draw arc
    let ang = PI / np;
    for (let i = 0; i < np; i++) {
      
      this.xx = this.x + cos(i * ang) * r*3.6;
      this.yy = this.y + sin(i * ang) * r*2;
      let sx = lerp(this.xx,this.x,3);
      let sy = lerp(this.yy,this.y,3);
      point(sx,sy);
    }
  }
}