let balls = [];
let panna;
let grid = 50;
let canvas;
let ballColor;
let score = 0;
let level = 1;
let pointsToNextLevel = 100;
let levelUpText;
let showLevelUp = false;
let levelUpTimer = 0;
let cones = 1;
let gameOver = false;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  canvas.elt.tabIndex = "1"; 
  noStroke();
  
  panna = new Panna(width/2, height-grid, grid,height-grid);
  ballColor = [color('pink'),color('lightblue')]; //,color('blue'),color('purple')];
  
  // Create HTML text elements
  scoreText = createP("Score: 0");
  levelText = createP("Level: 1");
  scoreText.id("score-text");
  levelText.id("level-text");
  
  // Coness
  conesText = createP("Cones: 3");
  conesText.id("cones-text");
  
  // game over text
  gameOverText = createP("GAME OVER");
  gameOverText.id("game-over-text");
  gameOverText.position(canvas.position().x + 110, canvas.position().y + 150);
  gameOverText.hide();

  levelUpText = createP("LEVEL UP!");
  levelUpText.id("level-up-text");
  levelUpText.position(canvas.position().x + 130, canvas.position().y + 150);
  levelUpText.hide();
  
  // instructions
  instructionsText = createP(`
  How to play:<br>
  1. Move with ← / → keys<br>
  2. Catch & match 3 of the same color
 `);
  instructionsText.id("instructions-text");
  instructionsText.position(canvas.position().x+50, canvas.position().y + height + 10);
  
  setTimeout(() => {
  instructionsText.hide();
}, 5000);

}

function draw() {
  background(220);
  canvas.elt.focus();
  checkLifeLoss();
  conesText.html("Cones: " + "🍦".repeat(cones));
  if (gameOver) {
    background(0);
    gameOverText.show();
    noLoop();
    return;
  }
  // Update text content each frame
  scoreText.html("Score: " + score);
  levelText.html("Level: " + level);
  
  if (score >= level * pointsToNextLevel) {
    level++;
    showLevelUp = true;
    levelUpTimer = millis();
    levelUpText.show();
  }
  if (showLevelUp && millis() - levelUpTimer > 1000) {
    showLevelUp = false;
    levelUpText.hide();
  }
  
  if(balls.length <= 10 && (score <= level * pointsToNextLevel)){
    balls.push(new Ball(random(width), -random(height)));

  }

  panna.show();
  for (let b of balls) {
    if (!b.attached) {
      let d = dist(b.x, b.y, panna.x, panna.h);
      if (d < grid){
          panna.attach(b);
          panna.update(b);
          b.attached = true;
         if (panna.attachedBalls.length > 2) {
          let matched = panna.checkColor(b);
          if (matched) {
            panna.detach(matched);
          }
        }
      } else {
        b.update();
      }
    }
    
    b.show();
  }


  if(keyIsDown(LEFT_ARROW)) {
    panna.move(-1, 0);
  } else if (keyIsDown(RIGHT_ARROW)) {
    panna.move(1, 0);
  }
}
function checkLifeLoss() {
  for (let b of panna.attachedBalls) {
    if (b.y <= 0) {
      cones--;
      balls = [];
      panna.attachedBalls = [];
      panna.h = panna.y;     
      break;
    }
  }

  if (cones <= 0) {
    gameOver = true;
  }
}