let innerRadius = 5;// Radius of the inner points
let outerRadius = 13;// Radius of the outer points
let numPoints = 5; // Number of points in the star
let angle;
let stars = [];
let len =10;
let panna;
let bubble = [];
const particles = [];
let ghost = [];

let frog;
let spider;
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  panna = new Panna(width/2-80,height/2-30);
   for(let i =0;i<5;i++){
     bubble.push(new Bubble(random(width/2-200,width/2+50),random(height/2,height/2+130)));
   }

  angle = TWO_PI / numPoints;
  
  for(let i = 0; i < 7;i++){
    stars.push(new Star(random(width/2-200,width/2+50),random(height/2,height/2+130)));
  }
  
  frog = new Frog(random(width/2-200,width/2+50), height/2+100);
  
  for(let i=0;i<3;i++){
    ghost.push(new Ghost(random(100,width/2+300),random(100,height/2)));
  }
  spider = new Spider(width/2+250,0);
}
function draw() {
  background(225);
  
  for(let i = 0; i<bubble.length;i++){
    bubble[i].update();
    bubble[i].show(); 
  }

  panna.update();
  panna.show();

  spider.update();
  spider.show();
  
  frog.update();
  frog.show();
  
  for (let i = 0; i < 5; i++) {
    let p = new Particle(random(width/2-200,width/2+50),random(height/2,height/2+130));
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
  for(let i = 0; i < stars.length;i++){
    stars[i].update();
    stars[i].show(); 
  }
  for(let i=0;i<ghost.length;i++){
  ghost[i].update();
  ghost[i].show();
  }

 // saveFrames('panna','png',1,25);
}