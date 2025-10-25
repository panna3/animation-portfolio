let shaderProgram;
let panna;
let timer = 0;
let img;
let img2;
let fogOffset = 0.0;
function preload() {

  shaderProgram = loadShader('assets/vertex.vert', 'assets/fragment.frag');
  img = loadImage('assets/bgtr.png');
  img2 = loadImage('assets/bgpink.png');
  panna = new Panna(width/2,height/2);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL).parent('sketch-container');
  noStroke();

}

function draw() {
  
//  background(100, 41, 75, 21);
  background(100, 1, 5, 33);
  
  texture(img);
  plane(windowWidth, windowHeight);
  // Draw the background image
 // image(img, -width / 2, -height / 2);

  // Handle the custom animation using your Panna class
  //scale(1.5);
  panna.update();
  panna.show();
  
  fogOffset -= 0.001; // Adjust this value to control speed
  if (fogOffset < -1.0) fogOffset = 1.0; // Reset the offset for looping effect

  // Use the shader
  shader(shaderProgram);
  shaderProgram.setUniform('u_time', millis() / 1000.0);
  shaderProgram.setUniform('u_texture', img2); // Pass fog texture to the shader
  shaderProgram.setUniform('u_fogOffset', fogOffset); // Pass the fog offset

  // Draw a rectangle covering the entire canvas to apply the shader
  rect(-width / 2, -height / 2, width, height);

  resetShader();
  // Update timer
  timer += 0.005;
}