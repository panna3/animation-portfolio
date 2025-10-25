let r = 33;
let ag = 0;
class CenterPanna{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
   show(){
//     push();
//     translate(-39,45);
//     rotate(50);
//     noFill();
//     rect(this.x-37,this.y-37,93,30,5,5,5,5);
    
//     fill('black');
//     textSize(11);
//     text('Happy Birthday!\n Panna', this.x-35,this.y-25);
//     pop();
    
     fill('pink');
     circle(this.x-8,this.y-11,7);//left ear
     circle(this.x+8,this.y-11,7);//right ear      
     circle(this.x,this.y,25);//face
     fill('black');
     circle(this.x-5,this.y,3);//left eye
     circle(this.x+5,this.y,3);//right eye
     circle(this.x,this.y+5,3);//mouth
    
     let s = 'Happy Birthday! Panna ';
     fill('brown');
     for(let i =0;i<s.length;i++){
       let a = map(i, 0, s.length, 0, TWO_PI);
       let x = this.x + cos(ag+a)*r;
       let y = this.y + sin(ag+a)*r;
       text(s[i],x,y);
       //console.log(s[i]);
     }
     ag+=0.01;
  }
}