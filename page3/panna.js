// Panna, drawn by the user in MS Paint (panna_drawn.png), used exactly as drawn: only the background was
// made transparent (cutout_panna.py). Shown at the size she was drawn, so every line stays as it is.
// She blinks now and then: for a moment white lids come down over her two drawn eyes, leaving a little
// closed-eye line in the same light blue.
// (x, y) is the middle of her paws on the ground.
class Panna{
  // where her eyes are in the picture (measured from panna_drawn.png): [left, top, right, bottom]
  static EYES = [[42, 64, 57, 77], [75, 64, 92, 78]];
  constructor(x,y,img){
    this.x = x;
    this.y = y;
    this.img = img;
    this.t = 0;
    this.blinkAt = -9;
    this.nextBlink = 2;
    this.twice = false;
  }
  // how far the lids are closed: down in 0.08 s, shut for 0.06 s, up in 0.1 s
  lid() {
    const d = this.t - this.blinkAt;
    if (d < 0) return 0;
    if (d < 0.08) return d / 0.08;
    if (d < 0.14) return 1;
    if (d < 0.24) return 1 - (d - 0.14) / 0.1;
    return 0;
  }
  show(){
    const ix = round(this.x - this.img.width / 2), iy = round(this.y - this.img.height);
    push();
    noSmooth();                                   // keep the drawn pixels crisp
    image(this.img, ix, iy);
    const c = this.lid();
    if (c > 0) {
      noStroke();
      for (const [l, t, r, b] of Panna.EYES) {
        fill(255);
        rect(ix + l, iy + t, r - l, ceil((b - t) * c) + 1);     // the lid coming down
        if (c > 0.6) {                                          // shut: a small curved line where the eye was
          noFill(); stroke(153, 217, 234); strokeWeight(2.5);
          arc(ix + (l + r) / 2, iy + b - 5, r - l - 2, 7, 0.1 * PI, 0.9 * PI);
          noStroke();
        }
      }
    }
    pop();
  }
  update(){
    this.t += deltaTime / 1000;
    if (this.t > this.nextBlink) {                // every 3-5 s, and now and then a double blink
      this.blinkAt = this.t;
      this.twice = !this.twice && random() < 0.3;   // (never three in a row)
      this.nextBlink = this.t + (this.twice ? 0.32 : 3 + random(2));
    }
  }
}
