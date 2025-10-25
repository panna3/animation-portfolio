let sushi;
let angle = 0;
let radiusx = 150;
let radiusy = 60;
let panna;
let table;
let topping = false;
let button;
let ypos;
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container'); 
  
  if(topping){
    // Panna
    panna = new Panna(width/2,height/2+33);
    table = new Table(width/2,height/2+33); 
  }
  else{
    // Sushi 
    panna = new Panna(width/2,height/2+33);
    table = new Table(width/2,height/2+33); 
  } 
  ypos = height/2+110;
  button = createButton('Eat');
  button.size(70,30);
  button.position(width/2-35, height/2+315);
  button.mousePressed(change);
}
function change(){
  topping = !topping;
  if (!topping) {// Sushi
    panna.update(width/2,height/2+33);
    ypos = height/2+110;
    button.html('Eat');
  } else { // Panna
    ypos = height/2+110;
    button.html('Done');
  }
}
function draw() {
  background(220);
  
  angleMode(DEGREES);
  let m = 230;  
  panna.show();
  table.show();

 
  for(let i = 0;i<m;i+=10){   
    let x = width/2 + map(radiusx*cos(angle+i*2),0,180,0,180);
    let y = ypos + map(radiusy*sin(angle+i*2),0,180,0,180);
    
   if(topping){    
      if(i<1){
        // When Panna eats most of the sushi, she is on top of the table.
        y= y-30;
        panna.update(x,y);
        panna.show();
      }
      else{
        if(i>200){
          // Leftover sushi
          ypos = height/2+110;
          sushi = new Sushi(x,y);
          sushi.show();
        }
      }
    }
    else{
      // When Panna is sitting outside the table.
      sushi = new Sushi(x,y);
      sushi.show();
    }
  }
  angle+=0.3;
}