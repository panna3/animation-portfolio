class Particle {

  constructor(x,y,xx) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-3.5, -1);
    this.alpha = 255;
  }

  finished() {
    return this.alpha < 0;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 7;
  }

  show() {
    noStroke();
    fill(235,8,249, this.alpha);
    ellipse(this.x, this.y, 16);
  }
}