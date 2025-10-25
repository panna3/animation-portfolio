
class Bg{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.alpha = 0;
  }
  show(){

    
    lightning.update();
    lightning.show();
    
    //land
    noStroke();
    fill('#222223');
    rect(0,this.y+130,width,height);
    
    //house
    //chimney
    stroke(0);
    fill('#2b2923');
    rect(this.x-120,this.y-270,85,100);
    fill('black');
    rect(this.x-120,this.y-260,85,3);//shadow
    fill('#898989');
    rect(this.x-130,this.y-280,100,20);//top
    stroke(0);
    strokeWeight(1);
    line(this.x-110,this.y-260,this.x-110,this.y-280);//vertical line
    line(this.x-90,this.y-260,this.x-90,this.y-280);
    line(this.x-70,this.y-260,this.x-70,this.y-280);
    line(this.x-50,this.y-260,this.x-50,this.y-280);
    
    //left top roof
    fill('#898989');
    beginShape();
    vertex(this.x-200,this.y-250);
    bezierVertex(this.x-180,this.y-280,this.x-170,this.y-400,this.x-155,this.y-430);
    bezierVertex(this.x-140,this.y-430,this.x-130,this.y-280,this.x-110,this.y-250);
    vertex(this.x-200,this.y-250);
    endShape();
    //left top pillar
    fill('#2b2923');
    rect(this.x-190,this.y-250,70,200);
    fill('black');
    rect(this.x-190,this.y-250,70,3);//shadow
    fill('#898989');
    beginShape();//middle roof
    vertex(this.x-200,this.y-90);
    vertex(this.x-150,this.y-210);
    vertex(this.x+150,this.y-210);
    vertex(this.x+200,this.y-90);
    vertex(this.x-200,this.y-90);
    endShape();
    line(this.x-180,this.y-90,this.x-138,this.y-190);//detail on the roof
    line(this.x-138,this.y-190,this.x+138,this.y-190);//horizontal line
    line(this.x+180,this.y-90,this.x+138,this.y-190);
    line(this.x-145,this.y-170,this.x+145,this.y-170);//horizontal line
    line(this.x-155,this.y-150,this.x+155,this.y-150);
    line(this.x-163,this.y-130,this.x+163,this.y-130);
    line(this.x-171,this.y-110,this.x+171,this.y-110);
    line(this.x-170,this.y-110,this.x-170,this.y-90);//vertical line 1
    line(this.x-150,this.y-110,this.x-150,this.y-90);
    line(this.x-130,this.y-110,this.x-130,this.y-90);
    line(this.x-110,this.y-110,this.x-110,this.y-90);    
    line(this.x-90,this.y-110,this.x-90,this.y-90);//bottom
    line(this.x-70,this.y-110,this.x-70,this.y-90);
    line(this.x-50,this.y-110,this.x-50,this.y-90);
    line(this.x-30,this.y-110,this.x-30,this.y-90);
    line(this.x-10,this.y-110,this.x-10,this.y-90);
    line(this.x+10,this.y-110,this.x+10,this.y-90);
    line(this.x-167,this.y-110,this.x-167,this.y-118);//vertical line 2
    line(this.x-147,this.y-110,this.x-147,this.y-130);
    line(this.x-127,this.y-110,this.x-127,this.y-130);
    line(this.x-107,this.y-110,this.x-107,this.y-130);
    line(this.x-87,this.y-110,this.x-87,this.y-130);
    line(this.x-67,this.y-110,this.x-67,this.y-130);//second bottom
    line(this.x-47,this.y-110,this.x-47,this.y-130);
    line(this.x-27,this.y-110,this.x-27,this.y-130);
    line(this.x-7,this.y-110,this.x-7,this.y-130);
    line(this.x+13,this.y-110,this.x+13,this.y-130);
 
    line(this.x-144,this.y-130,this.x-144,this.y-150);//vertical line 3
    line(this.x-124,this.y-130,this.x-124,this.y-150);
    line(this.x-104,this.y-130,this.x-104,this.y-150);
    line(this.x-84,this.y-130,this.x-84,this.y-150);
    line(this.x-64,this.y-130,this.x-64,this.y-150);//3rd bottom
    line(this.x-44,this.y-130,this.x-44,this.y-150);
    line(this.x-24,this.y-130,this.x-24,this.y-150);
    line(this.x-4,this.y-130,this.x-4,this.y-150);
    line(this.x+16,this.y-130,this.x+16,this.y-150);
    
    line(this.x-141,this.y-150,this.x-141,this.y-170);//vertical line 4
    line(this.x-121,this.y-150,this.x-121,this.y-170);
    line(this.x-101,this.y-150,this.x-101,this.y-170);
    line(this.x-81,this.y-150,this.x-81,this.y-170);
    line(this.x-61,this.y-150,this.x-61,this.y-170);//4th bottom
    line(this.x-41,this.y-150,this.x-41,this.y-170);
    line(this.x-21,this.y-150,this.x-21,this.y-170);
    line(this.x-1,this.y-150,this.x-1,this.y-170);
    line(this.x+19,this.y-150,this.x+19,this.y-170);   

    line(this.x-137,this.y-170,this.x-137,this.y-190);//vertical line 5
    line(this.x-117,this.y-170,this.x-117,this.y-190);
    line(this.x-97,this.y-170,this.x-97,this.y-190);
    line(this.x-77,this.y-170,this.x-77,this.y-190);//5th bottom
    line(this.x-57,this.y-170,this.x-57,this.y-190);
    line(this.x-37,this.y-170,this.x-37,this.y-190);
    line(this.x-17,this.y-170,this.x-17,this.y-190);
    line(this.x+3,this.y-170,this.x+3,this.y-190);
    line(this.x+23,this.y-170,this.x+23,this.y-190);
    
    //roof detail continued...diagonal&straight lines
    line(this.x-170,this.y-110,this.x-187,this.y-119);//diagonal line
    line(this.x-160,this.y-140,this.x-175,this.y-148);
    line(this.x-147,this.y-170,this.x-162,this.y-178);
    line(this.x-137,this.y-190,this.x-150,this.y-209);
    line(this.x-110,this.y-190,this.x-110,this.y-210);//vertical line
    line(this.x-75,this.y-190,this.x-75,this.y-210);
    line(this.x-40,this.y-190,this.x-40,this.y-210);
    line(this.x-5,this.y-190,this.x-5,this.y-210);
    line(this.x+30,this.y-190,this.x+30,this.y-210);
    
    
    //behind house
    fill('#2b2923');

    rect(this.x-180,this.y-90,360,300);
    fill(0);
    rect(this.x-180,this.y-90,360,3);//shadow
    //left roof
    fill('#898989');
    triangle(this.x-300,this.y-110,this.x-225,this.y-260,this.x-150,this.y-110);
    //lines on roof
    line(this.x-225,this.y-260,this.x-270,this.y-110);
    line(this.x-225,this.y-260,this.x-240,this.y-110);
    line(this.x-225,this.y-260,this.x-210,this.y-110);
    line(this.x-225,this.y-260,this.x-180,this.y-110);
    

    fill('#2b2923');
    rect(this.x-280,this.y-110,110,340);//left pillar
    fill('black');
    rect(this.x-280,this.y-110,110,3);
    //left window
    fill('#898989');
    rect(this.x-260,this.y-100,50,80,5,5);
    fill('#fcff00');
    rect(this.x-255,this.y-95,40,70,5,5);
    line(this.x-215,this.y-80,this.x-255,this.y-80);//horizontal line
    line(this.x-215,this.y-61,this.x-255,this.y-61);
    line(this.x-215,this.y-41,this.x-255,this.y-41);
    line(this.x-235,this.y-95,this.x-235,this.y-25);//vertical line
    
    //right behind roof
    fill('#898989');
    triangle(this.x+250,this.y-130,this.x+120,this.y-310,this.x,this.y-130);
    
    //fill('#d1c5ad');
    line(this.x+25,this.y-130,this.x+120,this.y-270);//roof detail
    line(this.x+120,this.y-270,this.x+225,this.y-130);

    line(this.x+40,this.y-150,this.x+210,this.y-150);//horizontal line
    line(this.x+53,this.y-170,this.x+195,this.y-170);
    line(this.x+66,this.y-190,this.x+180,this.y-190);
    line(this.x+80,this.y-210,this.x+165,this.y-210);
    line(this.x+94,this.y-230,this.x+150,this.y-230);
    line(this.x+107,this.y-250,this.x+135,this.y-250);
    line(this.x+39,this.y-130,this.x+39,this.y-150);//vertical line
    line(this.x+59,this.y-130,this.x+59,this.y-150);
    line(this.x+79,this.y-130,this.x+79,this.y-150);
    line(this.x+99,this.y-130,this.x+99,this.y-150);
    line(this.x+119,this.y-130,this.x+119,this.y-150);
    line(this.x+139,this.y-130,this.x+139,this.y-150);
    line(this.x+159,this.y-130,this.x+159,this.y-150);
    line(this.x+179,this.y-130,this.x+179,this.y-150);
    line(this.x+199,this.y-130,this.x+199,this.y-150);
    line(this.x+219,this.y-130,this.x+219,this.y-138);
    line(this.x+43,this.y-150,this.x+43,this.y-155);//vertical 2nd(from bottom)
    line(this.x+63,this.y-150,this.x+63,this.y-170);
    line(this.x+83,this.y-150,this.x+83,this.y-170);
    line(this.x+103,this.y-150,this.x+103,this.y-170);
    line(this.x+123,this.y-150,this.x+123,this.y-170);
    line(this.x+143,this.y-150,this.x+143,this.y-170);
    line(this.x+163,this.y-150,this.x+163,this.y-170);
    line(this.x+183,this.y-150,this.x+183,this.y-170);
    line(this.x+203,this.y-150,this.x+203,this.y-158);
    line(this.x+67,this.y-170,this.x+67,this.y-188);//vertical 3rd
    line(this.x+87,this.y-170,this.x+87,this.y-188);
    line(this.x+107,this.y-170,this.x+107,this.y-189);
    line(this.x+127,this.y-170,this.x+127,this.y-189);
    line(this.x+147,this.y-170,this.x+147,this.y-189);
    line(this.x+167,this.y-170,this.x+167,this.y-189);
    line(this.x+187,this.y-170,this.x+187,this.y-180);
    line(this.x+73,this.y-190,this.x+73,this.y-200);//vertical 4th
    line(this.x+93,this.y-190,this.x+93,this.y-209);
    line(this.x+113,this.y-190,this.x+113,this.y-209);
    line(this.x+133,this.y-190,this.x+133,this.y-209);
    line(this.x+153,this.y-190,this.x+153,this.y-209);
    line(this.x+173,this.y-190,this.x+173,this.y-200);
    line(this.x+98,this.y-211,this.x+98,this.y-230);//vertical 5th
    line(this.x+118,this.y-211,this.x+118,this.y-230);
    line(this.x+138,this.y-211,this.x+138,this.y-230);
    line(this.x+158,this.y-211,this.x+158,this.y-219);
    line(this.x+105,this.y-230,this.x+105,this.y-248);//vertical 6th
    line(this.x+125,this.y-230,this.x+125,this.y-250);
    line(this.x+145,this.y-230,this.x+145,this.y-235);
    
    line(this.x+40,this.y-150,this.x+20,this.y-160);//diagonal line
    line(this.x+59,this.y-180,this.x+40,this.y-191);
    line(this.x+79,this.y-210,this.x+60,this.y-222);
    line(this.x+98,this.y-240,this.x+80,this.y-251);
    line(this.x+119,this.y-270,this.x+101,this.y-282);
    line(this.x+120,this.y-270,this.x+120,this.y-310);//straight line
    line(this.x+118,this.y-268,this.x+139,this.y-282);//right diagonal
    line(this.x+145,this.y-239,this.x+164,this.y-251);
    line(this.x+164,this.y-209,this.x+183,this.y-222);
    line(this.x+187,this.y-179,this.x+206,this.y-190);
 
    fill('#2b2923');
    rect(this.x+25,this.y-130,200,340);//right behind pillar
    fill('black');
    rect(this.x+25,this.y-130,200,3);//shadow
    //right behind window
    fill('#898989');
    rect(this.x+80,this.y-110,80,110,5,5);
    fill('#fea202');
    rect(this.x+85,this.y-105,70,100,5,5);
    line(this.x+85,this.y-85,this.x+155,this.y-85);//horizontal line
    line(this.x+85,this.y-65,this.x+155,this.y-65);
    line(this.x+85,this.y-45,this.x+155,this.y-45);
    line(this.x+85,this.y-25,this.x+155,this.y-25);
    line(this.x+107,this.y-105,this.x+107,this.y-5);//vertical line
    line(this.x+133,this.y-105,this.x+133,this.y-5);
    
    //right roof
    fill('#898989');
    triangle(this.x+300,this.y-110,this.x+225,this.y-260,this.x+150,this.y-110);
    //lines on roof
    line(this.x+225,this.y-260,this.x+270,this.y-110);
    line(this.x+225,this.y-260,this.x+240,this.y-110);
    line(this.x+225,this.y-260,this.x+210,this.y-110);
    line(this.x+225,this.y-260,this.x+180,this.y-110);
    
    fill('#2b2923');
    //fill('#d1c5ad');
    rect(this.x+170,this.y-110,110,340);//right pillar
    fill('black');
    rect(this.x+170,this.y-110,110,3);//shadow
    //right window
    fill('#898989');
    rect(this.x+210,this.y-100,50,80,5,5);
    fill('#ffd800');
    rect(this.x+215,this.y-95,40,70,5,5);
    line(this.x+215,this.y-80,this.x+255,this.y-80);//horizontal line
    line(this.x+215,this.y-61,this.x+255,this.y-61);
    line(this.x+215,this.y-41,this.x+255,this.y-41);
    line(this.x+235,this.y-95,this.x+235,this.y-25);//vertical line
    
    //door
    fill('#898989');
    rect(this.x-150,this.y+190,130,20);
    //curve(this.x-145,this.y+190,this.x-130,this.y,this.x-10,this.y,this.x-25,this.y+190);
    
    beginShape();
    vertex(this.x-145,this.y+190);
    vertex(this.x-145,this.y+70);
    bezierVertex(this.x-140,this.y,this.x-32,this.y,this.x-25,this.y+70);
    vertex(this.x-25,this.y+190);
    endShape();
    fill('#4d0202');
    beginShape();
    vertex(this.x-135,this.y+190);
    vertex(this.x-135,this.y+70);
    bezierVertex(this.x-130,this.y+10,this.x-42,this.y+10,this.x-35,this.y+70);
    vertex(this.x-35,this.y+190);
    endShape();
    //door knob
    fill('black');
    circle(this.x-125,this.y+110,5);
    circle(this.x-125,this.y+130,5);
    rect(this.x-126.5,this.y+110,3,20);
    
    tree[0].show();
    tree[1].show();
    owl.show(); 
    fill(255,this.alpha);
    rect(0,0,width,height);

    if(cloud){
      this.alpha = 121;
      for(let i = 0;i<10;i++){
        snow[i].update();
        snow[i].show();

      } 
    }
    else{
      this.alpha = 0;
      for(let i = 0;i<star.length;i++){
       star[i].show();
      }
      
    }
 
  }
}