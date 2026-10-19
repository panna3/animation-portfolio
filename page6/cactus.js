// desert things: cacti (tall saguaro, round barrel, prickly pear) with little pink flowers,
// small rocks, and now and then a tumbleweed bouncing by.
// The camel faces left and walks on the spot, so everything slides slowly to the right.
// Far things (on the horizon, small and pale) move slowly and are drawn behind the camel;
// near things (lower down, bigger) move faster and are drawn in front.
const CACTUS_GREEN = '#A8D8B9';
const CACTUS_LINE = '#86C29F';
const CACTUS_FLOWER = '#FFB3C6';
const PRINT_LIFE = 240;   // frames a footprint stays before it fades away
class Desert {
  constructor() {
    this.far = [];
    this.near = [];
    const kinds = ['saguaro', 'barrel', 'pear'];
    // far row on the horizon
    for (let i = 0; i < 6; i++) {
      this.far.push({ x: random(width), kind: random(kinds), s: random(0.35, 0.5), dy: random(-2, 4), ph: random(TWO_PI) });
    }
    // near row, lower down and bigger
    for (let i = 0; i < 4; i++) {
      this.near.push({ x: (i + random(0.1, 0.6)) * width / 4, kind: random(kinds), s: random(0.8, 1.15), dy: random(40, height / 2 - 170), ph: random(TWO_PI) });
    }
    this.rocks = [];
    for (let i = 0; i < 10; i++) this.rocks.push({ x: random(width), dy: random(8, height / 2 - 160), r: random(4, 9) });
    this.weed = null;
    this.nextWeed = 240;
    this.prints = [];         // the camel's footprints in the sand
    this.flowerPos = [];      // where the flowers are this frame (so they can glow at night)
    this.events = [];         // things that happen (for the sound track when recording)
  }
  update() {
    const wrap = (o, sp) => { o.x += sp; if (o.x > width + 120) { o.x = -120; } };
    for (const c of this.far) wrap(c, 0.3);
    for (const c of this.near) wrap(c, 0.9 + (c.s - 0.8) * 0.6);
    for (const r of this.rocks) wrap(r, 0.4 + r.dy / (height / 2) * 0.8);
    // a tumbleweed bounces across now and then
    if (!this.weed && frameCount > this.nextWeed) {
      this.weed = { x: -60, dy: random(30, height / 2 - 180), rot: 0, t: 0 };
    }
    // footprints: each time the camel's feet are planted, leave prints that slide away with the ground
    if (rlegs === 1 || rlegs === 51) {
      const lx = width / 2 + 30, g = this.ground();
      // just one print per step (front foot, then back foot), so the trail stays light
      this.prints.push({ x: rlegs === 1 ? lx - 103 : lx + 10, y: g + 3, age: 0 });
      this.events.push(['step', frameCount]);
    }
    for (const p of this.prints) { p.x += 0.3; p.age++; }
    this.prints = this.prints.filter(p => p.age < PRINT_LIFE && p.x < width + 20);
    if (this.weed && this.weed.x === -60) this.events.push(['weed', frameCount]);
    if (this.weed) {
      this.weed.x += 2.2; this.weed.rot += 0.06; this.weed.t += 0.09;
      if (this.weed.x > width + 60) { this.weed = null; this.nextWeed = frameCount + random(400, 800); }
    }
  }
  ground() { return height / 2 + 150; }
  // the camel's soft shadow on the sand: the sun is to the left, so it falls a little to the right —
  // long and faint while the sun is low, shorter and darker as it climbs; none at night
  camelShadow() {
    const g = this.ground(), lx = width / 2 + 30;
    const sunUp = constrain(map(bg.y, g, -150, 0, 1), 0, 1);      // 0 = sun on the horizon, 1 = high up
    const a = (typeof night === 'undefined' ? 1 : 1 - night.amount()) * (50 + 40 * sunUp);
    if (a <= 1) return;
    const len = lerp(200, 120, sunUp), shift = lerp(70, 18, sunUp);
    noStroke();
    for (let k = 0; k < 4; k++) {                                   // a few layered ellipses = a soft edge
      fill(170, 145, 120, a / 4);
      ellipse(lx - 40 + shift, g + 4, len * (1 - k * 0.08), 16 * (1 - k * 0.15));
    }
  }
  // the heat: soft wavy shimmer lines rising off the hot sand in the daytime (strongest when the sun is high).
  // They are just faint lines drawn over the scene, so nothing gets bent or dented.
  heat() {
    const day = typeof night === 'undefined' ? 1 : 1 - night.amount();
    const sunUp = constrain(map(bg.y, this.ground(), 0, 0, 1), 0, 1);
    const a = day * (0.35 + 0.65 * sunUp);
    if (a <= 0.02) return;
    const g = this.ground();
    noFill();
    for (let k = 0; k < 14; k++) {
      const life = 200, t = (frameCount + k * (life / 14)) % life, q = t / life;   // each line rises and fades, then starts again
      const y = g + 60 - q * 110 - (k % 3) * 14;
      const x0 = ((k * 137) % width) - 60, len = 120 + (k % 4) * 40;
      stroke(255, 252, 240, 150 * a * sin(PI * q));
      strokeWeight(2);
      beginShape();
      for (let x = x0; x <= x0 + len; x += 6) curveVertex(x, y + sin(x * 0.06 + frameCount * 0.09 + k) * 3);
      endShape();
    }
    noStroke();
  }
  showPrints() {
    noStroke();
    for (const p of this.prints) {
      const a = 110 * (1 - p.age / PRINT_LIFE) * (1 - night.amount());   // fade away, and not shown at night
      fill(196, 172, 140, a);
      ellipse(p.x, p.y, 11, 4);
      fill(180, 156, 124, a * 0.8);
      ellipse(p.x - 2, p.y - 0.5, 4, 2); ellipse(p.x + 2.5, p.y - 0.5, 4, 2);   // two toes
    }
  }
  // heat shimmer just above the horizon: thin strips of the picture wobble sideways
  mirage() {
    const g = this.ground();
    for (let y = g - 30; y < g + 4; y += 2) {
      const k = 1 - abs(y - (g - 12)) / 20;
      if (k <= 0) continue;
      const off = sin(y * 0.35 + frameCount * 0.09) * 2.2 * k;
      copy(0, y, width, 2, off, y, width, 2);
    }
    noStroke();
    fill(255, 255, 255, 14 + 8 * sin(frameCount * 0.04));
    rect(0, g - 10, width, 8);
  }
  showFar() {
    this.flowerPos = [];
    this.drawingFar = true;
    for (const c of this.far) this.cactus(c.x, this.ground() + c.dy, c.s, c.kind, c.ph, 150);
  }
  showNear() {
    for (const r of this.rocks) {
      noStroke(); fill(214, 196, 170);
      ellipse(r.x, this.ground() + r.dy, r.r * 2, r.r * 1.1);
      fill(232, 218, 196);
      ellipse(r.x - r.r * 0.3, this.ground() + r.dy - r.r * 0.2, r.r * 0.9, r.r * 0.45);
    }
    this.drawingFar = false;
    const sorted = [...this.near].sort((a, b) => a.dy - b.dy);
    for (const c of sorted) this.cactus(c.x, this.ground() + c.dy, c.s, c.kind, c.ph, 255);
    if (this.weed) this.tumbleweed(this.weed);
  }
  cactus(x, y, s, kind, ph, a) {
    push();
    translate(x, y);
    scale(s);
    // a soft shadow on the sand (gone at night — no sun)
    const sunlit = typeof night === 'undefined' ? 1 : 1 - night.amount();
    noStroke(); fill(190, 170, 140, a * 0.35 * sunlit);
    ellipse(6, 0, kind === 'saguaro' ? 70 : 60, 10);
    const green = color(CACTUS_GREEN); green.setAlpha(a);
    const line_ = color(CACTUS_LINE); line_.setAlpha(a);
    const flower = color(CACTUS_FLOWER); flower.setAlpha(a);
    const bob = sin(frameCount * 0.05 + ph) * 1.2;   // flowers nod a little
    if (kind === 'saguaro') {
      strokeCap(ROUND);
      stroke(green); strokeWeight(16); noFill();
      beginShape(); vertex(-8, -40); bezierVertex(-30, -40, -30, -55, -30, -75); endShape();   // left arm
      beginShape(); vertex(8, -55); bezierVertex(28, -55, 28, -70, 28, -95); endShape();       // right arm
      noStroke(); fill(green);
      rect(-13, -120, 26, 120, 13, 13, 2, 2);                                                  // trunk
      stroke(line_); strokeWeight(1.5);
      line(-4, -110, -4, -6); line(5, -110, 5, -6);                                            // ribs
      line(-30, -70, -30, -48); line(28, -90, 28, -62);
      this.flower(0, -121 + bob, flower);
      this.flower(28, -101 + bob, flower, 0.7);
    } else if (kind === 'barrel') {
      noStroke(); fill(green);
      ellipse(0, -24, 52, 50);
      stroke(line_); strokeWeight(1.5); noFill();
      for (const k of [-14, 0, 14]) { beginShape(); vertex(k * 0.6, -48); bezierVertex(k * 1.3, -36, k * 1.3, -14, k * 0.7, -1); endShape(); }
      this.flower(-8, -50 + bob, flower, 0.8);
      this.flower(8, -49 + bob, flower, 0.8);
    } else {
      // prickly pear: flat round pads stacked
      noStroke(); fill(green);
      ellipse(0, -22, 36, 44);
      ellipse(-16, -58, 28, 34);
      ellipse(16, -54, 26, 32);
      stroke(line_); strokeWeight(1.2);
      for (const [px, py] of [[-6, -30], [6, -18], [-2, -10], [-18, -62], [-12, -50], [14, -60], [20, -48]]) point(px, py);
      this.flower(-16, -76 + bob, flower, 0.75);
      this.flower(18, -71 + bob, flower, 0.65);
    }
    pop();
  }
  flower(x, y, c, k = 1) {
    const m = drawingContext.getTransform(), d = pixelDensity();   // remember where it is on screen for the night glow
    this.flowerPos.push([(m.a * x + m.c * y + m.e) / d, (m.b * x + m.d * y + m.f) / d, abs(m.a) / d * k, this.drawingFar]);
    push();
    translate(x, y); scale(k);
    noStroke(); fill(c);
    for (let i = 0; i < 5; i++) { const an = i / 5 * TWO_PI - HALF_PI; ellipse(cos(an) * 4, sin(an) * 4, 7, 7); }
    fill(255, 236, 160, alpha(c));
    circle(0, 0, 4);
    pop();
  }
  tumbleweed(w) {
    const y = this.ground() + w.dy - abs(sin(w.t)) * 18;   // bounces as it rolls
    push();
    translate(w.x, y); rotate(w.rot);
    noFill(); stroke(200, 170, 120); strokeWeight(1.5);
    for (let i = 0; i < 9; i++) { const an = i * 0.7; ellipse(0, 0, 30 + sin(i) * 6, 22 + cos(i * 1.3) * 6); rotate(an); }
    pop();
    noStroke(); fill(190, 170, 140, 60 * (typeof night === 'undefined' ? 1 : 1 - night.amount()));
    ellipse(w.x, this.ground() + w.dy + 10, 26, 5);
  }
}
