// Background for Panna on the cloud: high up in the sky, above a sea of clouds. Far away a stout white
// tower like a minaret (a balcony, a rounded bulb dome with a thin spire) rises out of the cloud sea, softened
// by haze; thin mist drifts slowly in front of it, so it fades in and out.
class Fog {
  constructor() {
    this.makeSky();
    this.back = this.makeMist(0.35, 11);     // thin haze behind the tower
    this.front = this.makeMist(0.45, 23);    // the drifting veil in front of it
    this.t = 0;
  }
  // sky: soft periwinkle at the top, paler toward the cloud sea
  makeSky() {
    const g = this.sky = createGraphics(width, height);
    const top = color(203, 212, 244), mid = color(228, 233, 250), low = color(244, 242, 252);
    for (let y = 0; y < height; y++) {
      const k = y / height;
      g.stroke(k < 0.55 ? lerpColor(top, mid, k / 0.55) : lerpColor(mid, low, (k - 0.55) / 0.45));
      g.line(0, y, width, y);
    }
  }
  // a wide strip of mist, mostly low down over the cloud sea (drawn small and scaled up, so it is soft);
  // it tiles left-right
  makeMist(alpha, seed) {
    noiseSeed(seed); randomSeed(seed);
    const s = 0.25, w = ceil(width * s), h = ceil(height * s);
    const g = createGraphics(w, h);
    g.noStroke();
    for (let i = 0; i < 220; i++) {
      const x = random(w), y = h * (0.45 + 0.55 * pow(random(), 0.7));
      const r = random(18, 60) * s * 4;
      g.fill(255, 255, 255, 14 * alpha * (0.4 + noise(x * 0.02, y * 0.03)));
      for (const dx of [-w, 0, w]) g.ellipse(x + dx, y, r * 2.4, r);
    }
    return g;
  }
  // a stout little minaret: a short, wide shaft that narrows a little, one balcony, and a rounded bulb dome
  // with a small spire
  drawTower(x, base, h) {
    const bw = h * 0.12, tw = h * 0.095, top = base - h;
    const white = [252, 252, 255], shade = [206, 204, 232];
    noStroke();
    fill(...white);
    beginShape(); vertex(x - bw, base); vertex(x - tw, top + h * 0.24); vertex(x + tw, top + h * 0.24); vertex(x + bw, base); endShape(CLOSE);
    fill(...shade, 140);                                                           // shade down the right side
    beginShape(); vertex(x + bw * 0.3, base); vertex(x + tw * 0.25, top + h * 0.24); vertex(x + tw, top + h * 0.24); vertex(x + bw, base); endShape(CLOSE);
    for (const [k, wdt] of [[0.3, 1.3]]) {                                         // balcony
      const by = top + h * k, sw = tw + (bw - tw) * ((k - 0.24) / 0.76);
      fill(...white); rect(x - sw * wdt, by, sw * wdt * 2, h * 0.03, 3);
      fill(...shade, 120); rect(x - sw * wdt, by + h * 0.03, sw * wdt * 2, h * 0.012, 3);
    }
    fill(...white); rect(x - tw * 0.8, top + h * 0.15, tw * 1.6, h * 0.09);         // the slim top part
    const dy = top + h * 0.15, dr = tw * 0.95;                                     // bulb dome
    beginShape();
    vertex(x - dr * 0.75, dy);
    bezierVertex(x - dr * 1.25, dy - dr * 0.9, x - dr * 0.25, dy - dr * 1.6, x, dy - dr * 2.1);
    bezierVertex(x + dr * 0.25, dy - dr * 1.6, x + dr * 1.25, dy - dr * 0.9, x + dr * 0.75, dy);
    endShape(CLOSE);
    stroke(...white); strokeWeight(max(1.5, h * 0.006));                           // thin spire with a little ball
    line(x, dy - dr * 2.1, x, dy - dr * 2.1 - h * 0.04);
    noStroke(); circle(x, dy - dr * 2.1 - h * 0.018, h * 0.018);
    fill(...shade, 120);                                                           // small arched windows
    for (const k of [0.45, 0.68]) rect(x - tw * 0.2, top + h * k, tw * 0.4, h * 0.07, 8, 8, 0, 0);
  }
  // a thin, low wisp of mist drifting across in front of Panna's paws, so they sink a little into the clouds
  feetMist(y) {
    noStroke();
    for (let i = 0; i < 7; i++) {
      const x = ((this.t * 10 + i * 190) % (width + 300)) - 150;
      fill(255, 255, 255, 34);
      ellipse(x, y + 6 + (i % 3) * 5, 260, 26);
    }
    fill(255, 255, 255, 30);
    rect(0, y + 10, width, height - y);
  }
  show() {
    this.t += deltaTime / 1000;
    image(this.sky, 0, 0);
    const drift = (img, speed, a) => {
      const off = (this.t * speed) % width;
      tint(255, 255 * a);
      image(img, off - width, 0, width, height);
      image(img, off, 0, width, height);
      noTint();
    };
    drift(this.back, 6, 1);
    // far off near the middle, just behind Panna, rising out of the cloud sea; it breathes in and out of the haze
    push(); drawingContext.save();             // (p5's pop() does not restore globalAlpha, so save/restore it)
    drawingContext.globalAlpha = 0.68 + 0.17 * sin(this.t * 0.25);
    this.drawTower(width * 0.5 - 60, height * 0.72, min(height * 0.3, 250));
    drawingContext.restore(); pop();
    drift(this.front, 14, 0.9);
    // the cloud sea along the bottom, where the tower's foot disappears
    noStroke();
    for (let i = 0; i < 6; i++) {
      fill(255, 255, 255, 18);
      ellipse(width * 0.5, height * 0.74 + i * 14, width * (1.4 - i * 0.08), 90 + i * 36);
    }
  }
}
