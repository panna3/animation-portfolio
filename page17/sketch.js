let triangles = [];
let sqW = 50;
let triCol = [];
let currentSquareIndex = 0;
let dirIndex = 0;
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  triCol =  [color('pink'),color('lightblue'), color('lightgreen'),color('lavender')]; 
  
  for(let j = 0; j < height; j += sqW){  
    for(let i = 0; i < width; i += sqW){
      triangles.push(new Triangle(i,j,0,triCol[0]));
      triangles.push(new Triangle(i,j,1,triCol[1]));
      triangles.push(new Triangle(i,j,2,triCol[2]));
      triangles.push(new Triangle(i,j,3,triCol[3]));
    }
  }
}

function draw() {
  background(220);

  noStroke();
  let totalTriangles = triangles.length / 4 * 4; // total triangle slots
  let durationPerStep = 300; // ms
  let totalSteps = totalTriangles; // every square has 4 steps

  // Total animation time = total steps × step duration
  let totalTime = totalSteps * durationPerStep;

  // Get current position in cycle (loops)
  let t = millis() % totalTime;

  // Map time to current step
  let currentStep = Math.floor(map(t, 0, totalTime, 0, totalSteps));

  // Extract square and direction index from step
  currentSquareIndex = Math.floor(currentStep / 4);
  dirIndex = currentStep % 4;

  let currentDir = [0, 3, 1, 2][dirIndex]; // top, right, bottom, left

  for (let i = 0; i < triangles.length; i++) {
    let squareIndex = Math.floor(i / 4);
    let t = triangles[i];

    let isActive = (squareIndex === currentSquareIndex && t.di === currentDir);
    t.update(isActive);
    t.show();
  }
}