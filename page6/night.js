// night: once the sun has risen out of sight the sky turns to night for a while — stars twinkle,
// a crescent moon comes out and the cactus flowers glow softly — then morning comes and the sun rises again.
const NIGHT_FRAMES = 720;
const DAWN = 480;          // frames for night to turn into day (it was 150 — far too sudden)
const MOON_FADE = 420;     // frames the moon takes to fade out after night (stars and the blue go quicker)
class Night {
  constructor() {
    this.on = false;
    this.t = 0;
    this.after = 999;           // frames since the night ended (morning fades in)
    this.stars = [];
    for (let i = 0; i < 70; i++) {
      let x, y;
      do { x = random(width); y = random(height / 2 + 130); } while (abs(x - width / 2) < 260 && y > height / 2 - 140);
      this.stars.push({ x, y, r: random(1, 2.6), ph: random(TWO_PI), sp: random(0.03, 0.08) });
    }
  }
  start() { this.on = true; this.t = 0; desert.events.push(['night', frameCount]); }
  update() {
    if (this.on) { this.t++; if (this.t > NIGHT_FRAMES) { this.on = false; this.after = 0; desert.events.push(['morning', frameCount]); } }
    else this.after++;
  }
  amount() {
    if (this.on) return 1;                     // (the evening dimming has already reached full night by now — it used to restart from 0 here, flashing back to day)
    // evening: dim as the sun climbs out of the top of the picture
    const dusk = constrain(map(bg.y, 60, -150, 0, 1), 0, 1);
    const dawn = 1 - min(1, this.after / DAWN);          // morning comes slowly, as the sun rises out of the horizon
    return max(dusk, dawn);
  }
  // how far the parasol is folded: 0 = open, 1 = folded (closes as evening comes, opens at sunrise)
  fold() {
    const a = this.amount();
    return a * a * (3 - 2 * a);
  }
  // the moon lingers in the morning sky and fades away slowly (about 7 seconds)
  moonAmount() {
    if (this.on) return this.amount();
    return max(constrain(map(bg.y, 60, -150, 0, 1), 0, 1), 1 - min(1, this.after / MOON_FADE));
  }
  // the far cacti's flowers glow too, but drawn before the camel so its body covers them;
  // they get the night tint on top afterwards, so they are drawn a little stronger here
  farGlow() {
    const a = this.amount();
    if (a <= 0.01) return;
    noStroke();
    blendMode(ADD);
    for (const [x, y, k, far] of desert.flowerPos) {
      if (!far) continue;
      const p = 0.7 + 0.3 * sin(frameCount * 0.06 + x);
      fill(255, 60, 110, 120 * a * p); circle(x, y, 40 * k);      // (extra pink, as the blue night tint goes over it)
      fill(255, 130, 170, 200 * a * p); circle(x, y, 14 * k);
    }
    blendMode(BLEND);
  }
  show() {
    const a = this.amount(), ma = this.moonAmount();
    if (a <= 0.01 && ma <= 0.01) { return; }
    // tint everything towards a soft night blue
    noStroke();
    if (a > 0.01) {
      blendMode(MULTIPLY);
      fill(lerpColor(color(255), color(96, 104, 168), a));
      rect(0, 0, width, height);
      blendMode(BLEND);
    }
    // moon
    const mx = width * 0.78, my = height * 0.16, ctx = drawingContext;
    const glow = ctx.createRadialGradient(mx, my, 10, mx, my, 70);   // soft moonlight around it
    glow.addColorStop(0, `rgba(255,250,215,${0.35 * ma})`); glow.addColorStop(1, 'rgba(255,250,215,0)');
    ctx.fillStyle = glow; ctx.fillRect(mx - 70, my - 70, 140, 140);
    ctx.save();                                                       // a crescent: the moon with a bite taken out
    ctx.beginPath(); ctx.rect(0, 0, width, height); ctx.arc(mx + 14, my - 9, 25, 0, TWO_PI, true); ctx.clip();
    fill(255, 250, 215, 255 * ma); circle(mx, my, 56);
    ctx.restore();
    // stars
    for (const s of this.stars) {
      const tw = 0.5 + 0.5 * sin(frameCount * s.sp + s.ph);
      fill(255, 252, 230, 255 * a * (0.35 + 0.65 * tw));
      circle(s.x, s.y, s.r * (0.8 + 0.5 * tw));
    }
    // the cactus flowers glow
    blendMode(ADD);
    for (const [x, y, k, far] of desert.flowerPos) {
      if (far) continue;                                         // far ones glow behind the camel (farGlow)
      const p = 0.7 + 0.3 * sin(frameCount * 0.06 + x);
      fill(255, 120, 170, 46 * a * p); circle(x, y, 26 * k);
      fill(255, 200, 220, 70 * a * p); circle(x, y, 10 * k);
    }
    blendMode(BLEND);
  }
}
