// Ino-kun (the big white Pomeranian) and Non-chan (the small cream one) — the same fluffy Pomeranians as
// in the moonlit-river picture (pom_images.js) — each sitting on one of the camel's humps. When their hump starts to rise they bounce: pyon-pyon.
const TURN_FRAMES = 16;   // a quick twirl in the air during a hop (about 1/4 s)
let pomHearts = [];       // little hearts that pop up when a dog twirls in a hop
class Pom {
  constructor(name, img, sleepImg, s, sideImg, backImg) {
    this.name = name; this.img = img; this.sleepImg = sleepImg; this.s = s;
    this.sideImg = sideImg; this.backImg = backImg;
    this.turnT = -1;          // now and then in the daytime, a hop comes with a twirl in the air
    this.off = 0; this.v = 0;     // hop: height above the hump and its speed
    this.prevHump = null;
  }
  // humpY: the hump's current height (smaller = higher); called every frame.
  // One hop each time the hump pushes up — launched as the hump passes the middle of its rise.
  update(humpY) {
    this.lo = this.lo === undefined ? humpY : max(this.lo, humpY);   // lowest and highest the hump goes
    this.hi = this.hi === undefined ? humpY : min(this.hi, humpY);
    const mid = (this.lo + this.hi) / 2;
    if (!this.lift && this.prevHump !== null && this.prevHump > mid && humpY <= mid && this.off === 0 && this.lo - this.hi > 4) {
      this.v = -2.6;                                                   // pyon!
      const awake = typeof night === 'undefined' || night.fold() < 0.05;
      const showering = (typeof shower !== 'undefined' && shower.showering(40)) || (typeof storm !== 'undefined' && storm.active());   // (and none of the usual twirls in a sandstorm)   // no twirling while the shower is on or they are still drinking
      if (awake && !showering && this.celebrate) { this.turnT = 0; this.heartDue = true; this.celebrate = false; }   // after the shower: a happy twirl with hearts
      else if (awake && !showering && random() < 0.45) this.turnT = 0;                                               // other twirls: no hearts
    }
    this.prevHump = humpY;
    // when the shower (and their drink) is over, the next hop comes with a happy twirl and hearts
    const drinkingNow = typeof shower !== 'undefined' && shower.drinking();
    if (this.wasDrinking && !drinkingNow) this.celebrate = true;
    this.wasDrinking = drinkingNow;
    if (this.turnT >= 0) { this.turnT++; if (this.turnT > TURN_FRAMES) this.turnT = -1; }
    if (this.lift && this.lift.whirl && this.turnT < 0) this.turnT = 0;   // whirled up by the tornado: twirl and twirl
    if (this.v !== 0 || this.off < 0) {
      this.v += 0.26; this.off += this.v;
      if (this.off >= 0) { this.off = 0; this.v = 0; }
    }
  }
  // sitting on the hump, facing left like the camel (sx, sy = where its bottom rests on the hump).
  // At night they fall asleep (eyes closed, little z's float up) — and still bounce with the hump.
  show(sx, sy) {
    if (this.lift) { sx += this.lift.dx; sy += this.lift.dy; }
    const s = this.s, sl = typeof night === 'undefined' ? 0 : night.fold();
    const w = this.img.width * s, h = this.img.height * s;               // sitting up
    const x0 = sx - w * 0.5, y0 = sy - h + 3 + this.off;
    const w2 = this.sleepImg.width * s, h2 = this.sleepImg.height * s;   // lying down asleep (a bit longer, lower)
    const x2 = sx - w2 * 0.5, y2 = sy - h2 + 3 + this.off;
    push();
    imageMode(CORNER);
    // switch straight from sitting to lying down (no see-through cross-fade of the two bodies)
    if (this.heartDue) {
      this.heartDue = false;
      const n = random() < 0.5 ? 2 : 3;                                 // 2 or 3 little hearts, a moment apart
      for (let i = 0; i < n; i++) {
        pomHearts.push({ x: sx + (i - (n - 1) / 2) * 9 + random(-3, 3), y: (sl >= 0.5 ? y2 : y0) + 4 + i * 3, vy: -random(0.6, 0.85),
                         ph: random(TWO_PI), size: random(6, 9), age: -i * 6, life: 80 });
      }
    }
    if (sl >= 0.5) {
      push();
      if (this.lift && this.lift.rot) { translate(sx, y2 + h2 / 2); rotate(this.lift.rot); translate(-sx, -(y2 + h2 / 2)); }
      image(this.sleepImg, x2, y2, w2, h2);
      pop();
    }
    else if (this.turnT < 0) {
      // while the parasol showers (and a moment after), they lap up the drops: happy eyes, tongue going in and out
      const drinking = this.drinkImgs && typeof shower !== 'undefined' && shower.drinking();
      const img = drinking ? this.drinkImgs[floor(frameCount / 6) % 2] : this.img;
      image(img, sx - img.width * s * 0.5, sy - img.height * s + 3 + this.off, img.width * s, img.height * s);
    }
    else {
      // a twirl on the spot: front → side → back → other side → front, each view its own picture
      const e = this.turnT / TURN_FRAMES;                // even speed, so the side and back views each show long enough to see
      const ang = e * TWO_PI, idx = ((round(ang / HALF_PI) % 4) + 4) % 4;
      const img = idx === 0 ? this.img : idx === 2 ? this.backImg : this.sideImg;
      const iw = img.width * s, ih = img.height * s;
      const squash = 0.82 + 0.18 * abs(cos(2 * ang));
      push();
      translate(sx, sy + 3 + this.off);
      scale(squash * (idx === 3 ? -1 : 1), 1);          // the side picture faces left; mirrored for the other side
      image(img, -iw * 0.5, -ih, iw, ih);
      pop();
    }
    pop();
    this.zPos = sl > 0.5 ? [x2 + w2 * 0.1, y2 + h2 * 0.15, (sl - 0.5) * 2] : null;
  }
  // the z's are drawn after the night tint, so they stay bright
  showZ() { if (this.zPos) this.zzz(...this.zPos); }
  zzz(x, y, a) {
    push();
    noStroke(); textStyle(BOLD); textAlign(CENTER, CENTER);
    for (let k = 0; k < 3; k++) {
      const t = ((frameCount * 0.01 + k / 3 + (this.name === 'Non' ? 0.5 : 0)) % 1);   // each z drifts up and fades
      fill(255, 255, 255, 230 * a * sin(PI * t));
      textSize((7 + 6 * t) * this.s * 2.2);
      text('z', x - 6 * t * 10 * this.s, y - 40 * t * this.s * 2);
    }
    pop();
  }
}

// the hop hearts: float up, sway a little and fade (drawn after the night tint so they stay pink)
function showPomHearts() {
  for (const h of pomHearts) {
    h.age++;
    if (h.age < 0) continue;                    // not out yet (they come out one after another)
    h.y += h.vy;
    const k = h.age / h.life, a = min(1, k / 0.15) * min(1, (1 - k) / 0.4);
    const x = h.x + sin(h.age * 0.08 + h.ph) * 3, sz = h.size * (0.6 + 0.4 * min(1, k / 0.15));
    push();
    translate(x, h.y); scale(sz / 20);
    noStroke(); fill(255, 128, 160, 230 * a);
    beginShape();
    vertex(0, 6); bezierVertex(-2, 4, -12, -1, -10, -7); bezierVertex(-8, -13, -1, -12, 0, -6);
    bezierVertex(1, -12, 8, -13, 10, -7); bezierVertex(12, -1, 2, 4, 0, 6);
    endShape(CLOSE);
    fill(255, 235, 242, 200 * a); ellipse(-5, -6.5, 3.5, 2.2);
    pop();
  }
  pomHearts = pomHearts.filter(h => h.age < h.life);
}
