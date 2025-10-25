let rlegs = 0;
let llegs = 0;
let mtail = 0;
let mnecky = 0;
let mneckx = 0;
class Camel{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  show(lx,ly){
    let rleg = map(rlegs,0,10,lx+7,lx+10);
    let lleg = map(llegs,0,10,lx+10,lx+7);
    let tail = map(mtail,0,10,lx,lx+0.3);
    let necky = map(mnecky,0,10,ly,ly-0.3);
    let neckx = map(mneckx,0,10,lx,lx-0.3);
    if(rlegs > 100){
      rlegs=0;
      llegs = 0;
      mtail = 0;
      mnecky = 0;
      mneckx = 0;
    }
    else{
      rlegs++;
      llegs++;
      mtail++;
      mnecky++;
      mneckx++;
    }
    // camel
    strokeWeight(13);
    stroke('#FDE3BC');
    noFill();
    beginShape();
      vertex(lx-80,ly+90);
      bezierVertex(lx-83,ly+100,lx-85,ly+125,rleg-110,ly+150);// right leg
    endShape();
    beginShape();
      vertex(lx-90,ly+75);
      bezierVertex(lx-93,ly+100,lx-90,ly+125,lleg-85,ly+150);// left leg
    endShape();
    beginShape();
      vertex(lx+20,ly+80);
      bezierVertex(lx+23,ly+100,lx+25,ly+125,lleg+30,ly+150);// left behind leg
    endShape();
    beginShape();
      vertex(lx+33,ly+70);
      bezierVertex(lx+33,ly+100,lx+35,ly+125,rleg+5,ly+150);// right behind leg
    endShape();
    fill('#FDE3BC');
    beginShape();
      vertex(lx+40,ly+60);
      bezierVertex(lx+55,ly+95,lx-60,ly+125,lx-110,ly+60);// bottom body
    endShape();
    beginShape();
      vertex(lx-110,ly+60);
      bezierVertex(lx-130,necky+80,lx-150,necky+80,lx-165,ly+30); // neck
    endShape(); 
    beginShape();
      vertex(lx-185,necky+25);
      bezierVertex(lx-175,necky+30,lx-160,necky+30,lx-150,necky+20);
    endShape();
    beginShape();
      vertex(neckx-180,ly+22);
      bezierVertex(lx-175,necky,lx-160,necky-25,lx-110,ly+62);
    endShape();
    beginShape();
      vertex(lx-120,ly+60);
      bezierVertex(lx-95,ly+10,lx+45,ly+10,lx+40,ly+60); //top body
    endShape();

    beginShape();
      vertex(lx-127,ly+35);
      bezierVertex(lx-115,ly+45,lx-110,ly+45,lx-105,ly+43);
    endShape();
    noFill();
    strokeWeight(8);
    beginShape();
      vertex(lx+45,ly+55);
      bezierVertex(lx+55,ly+40,lx+65,ly+65,tail+60,ly+80);// tail
    endShape();
    // eye
    strokeWeight(1);
    fill('pink');
    ellipse(lx-165,necky+13,7,5);
    // ear
    stroke('pink');
    noFill();
    beginShape();
      vertex(lx-155,ly+3);
      bezierVertex(lx-150,necky+3,lx-150,necky+4,lx-153,ly+8);
    endShape();
    // mouth
    beginShape();
      vertex(lx-191,necky+29);
      bezierVertex(lx-185,necky+29,lx-183,necky+26,lx-180,ly+23);
      vertex(lx-191,ly+26);
    endShape();
    // tail hair
    line(tail+58,ly+78,tail+54,ly+88);
    line(tail+59,ly+78,tail+56,ly+88);
    line(tail+60,ly+78,tail+58,ly+88);
    line(tail+61,ly+78,tail+60,ly+88);
    line(tail+62,ly+78,tail+62,ly+88);
    line(tail+63,ly+78,tail+64,ly+88);
    // head hair
    line(lx-161,necky-3,lx-152,necky-7);
    line(lx-163,necky-3,lx-156,necky-9);
    line(lx-165,necky-3,lx-160,necky-10);
    line(lx-166,necky-3,lx-164,necky-10);
    line(lx-167,necky-3,lx-160,necky-10);
    // feet
    fill('rgb(255,197,207)');
    stroke('rgb(255,197,207)');
    strokeWeight(1);
    arc(rleg-110,ly+150,12,12,0,PI,CHORD);// right leg
    arc(lleg-85,ly+150,12,12,0,PI,CHORD);// left leg
    arc(lleg+30,ly+150,12,12,0,PI,CHORD);// left behind leg
    arc(rleg+5,ly+150,12,12,0,PI,CHORD);// right behind leg
  }
  hump(x,y){
    strokeWeight(15);
    noStroke();
    fill('#FDE3BC');
    stroke('#FDE3BC');

    beginShape();
      vertex(x,y+50);
      bezierVertex(x+15,y+10,x+25,y+10,x+35,y+50);
    endShape();
  }
}