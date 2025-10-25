let rainbows =[];
function setup() {
  createCanvas(windowWidth, windowHeight).parent('sketch-container');
  for(let i = 0; i < 20; i++){
    rainbows.push(new Rainbow(random(width),random(height), random(100), random(0.003), random(3)));
  }
}

function draw() {
  background("#f0ebff");

  for(let rainbow of rainbows){
    rainbow.update();
    rainbow.show();
  }
}
function mousePressed() {
  let clicked = false;

  // check if clicked inside any rainbow
  for (let i = rainbows.length - 1; i >= 0; i--) {
    let r = rainbows[i];
    let d = dist(mouseX, mouseY, r.x, r.y);
    if (d < r.size) {
      rainbows.splice(i, 1); // remove clicked rainbow
      clicked = true;
    // console.log('Removed rainbow at:', r.getPos());
      break; // stop after removing one
    }
  }

  // if clicked outside all, create a new rainbow
  if (!clicked) {
    rainbows.push(new Rainbow(
      mouseX,
      mouseY,
      random(50, 150),    // size
      random(0.003, 0.01),// speed
      random(1, 3)        // fweight
    ));
  //  console.log('Created new rainbow at:', [mouseX, mouseY]);
  }
}
