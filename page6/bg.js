const STILL_STRIPES = true;    // true: stripes drift slowly (STRIPE_DRIFT); false: they jump every frame like the original
const STRIPE_DRIFT = 0;        // how fast the stripes creep (0 = still: the striped layer is drawn once, so nothing stutters)
const SUN_SHIMMER_R = 190;     // only around the sun, the stripes keep slowly shimmering (the heat), fading out at this radius
const SMOOTH_BG = false;  // true: smooth sky and sand with no stripes
const STRIPE_SOFT = 0.3;  // the stripes in the sky: 1 = as in the original, smaller = softer (kept faint so they do not tire the eyes)
const SKY_SMOOTH = true;        // the sky without stripes (the sand keeps its faint stripes)
const GROUND_SMOOTH = false;    // the sand without stripes (same colour as the original on average)
const STRIPE_SOFT_GROUND = 0.5;   // the sand stripes: 1 = as strong as the original, smaller = fainter
const SUN_BELOW = 120;   // how far below the horizon the sun starts, so it rises out of it after the night
let tcol = 0;
let SKY_RC = 0; for (let t = 0; t <= 100; t++) SKY_RC += 50 + (t - 50) * t / 550; SKY_RC /= 101;
let angle = 0;
class Bg{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  update(){
    if(this.y<-150){
      this.y = height/2+150+SUN_BELOW;   // starts hidden below the horizon and rises out of it
      night.start();          // after the sun has gone, a starry night before it rises again
    }
  }
  show(){
    // the original stripes, but drifting slowly and smoothly instead of jumping about each frame (that flicker tired the eyes)
    if (STILL_STRIPES) tcol = floor(frameCount * STRIPE_DRIFT) % 101;
    // the striped sky and sand take thousands of lines to draw, so they are drawn onto a layer and only redrawn
    // when the stripes have actually moved on (every few frames) — this keeps everything else running smoothly
    const key = STILL_STRIPES ? tcol + ':' + width + 'x' + height : null;
    if (!STILL_STRIPES || key !== this.layerKey) {
      if (!this.layer || this.layer.width !== width || this.layer.height !== height) this.layer = createGraphics(width, height);
      this.drawStripes(this.layer);
      this.layerKey = key;
    }
    image(this.layer, 0, 0, width, height);
    if (!night.on) {
      this.sunShimmer(this.y);
      this.dawnGlow(this.y);
      // the sun only shows above the horizon (it used to show through the see-through ground)
      drawingContext.save();
      drawingContext.beginPath(); drawingContext.rect(0, 0, width, height/2+150); drawingContext.clip();
      this.sun(this.y);
      drawingContext.restore();
      this.y-=0.5;
    }
    if (!night.on) this.sunReflection(this.y);
  }
  // the sky and the sand, line by line, exactly as the original drew them (onto layer g)
  drawStripes(g){
    g.background('#795548');
    g.strokeWeight(1);
    for(let i = height/2+149.5;i >=0;i-=0.1){
      let bcol;
      if (SKY_SMOOTH) {
        bcol = color(160+i/21+SKY_RC, 180-i/39+SKY_RC, 202+i/21);
      } else {
        let rc = map(50 + (tcol - 50) * STRIPE_SOFT,0,550,50,50 + (tcol - 50) * STRIPE_SOFT);
        bcol = color(160+i/21+rc,180-i/39+rc,202+i/21);
      }
      this.tcolor(tcol);
      g.stroke(bcol);
      g.line(this.x,i,width,i);
    }
    if (GROUND_SMOOTH) {
      g.noStroke();
      for (let i = height/2+150; i < height; i += 1) { g.fill(this.groundAvg(i)); g.rect(this.x, i, width, 1.2); }
    } else {
      for(let i = height/2+150; i< height;i+=0.1){
        let rc = map(50 + (tcol - 50) * STRIPE_SOFT_GROUND,0,550,50,i*3);
        this.tcolor(tcol);
        g.stroke(color(160+i/21+rc,180-i/29+rc,202+i/21,33));
        g.line(this.x,i,width,i);
      }
    }
  }
  // while the sun is low, it is reflected on the sand below it: an upside-down, squashed, faded sun
  // broken into soft wavy bands (like a mirage), fading out downwards; it fades away as the sun climbs
  sunReflection(sunpos){
    const hz = height/2+150, above = hz - sunpos;            // how high the sun's centre is above the horizon
    const g = constrain(map(above, -110, 0, 0, 1), 0, 1) * constrain(map(above, 60, 260, 1, 0), 0, 1);
    if (g <= 0.01) return;
    const ctx = drawingContext, x = width/3.3+33, R = 110;
    const my = hz + above * 0.55;                            // mirrored (and squashed) centre below the horizon
    ctx.save();
    ctx.beginPath(); ctx.rect(0, hz, width, height - hz); ctx.clip();
    for (let y = hz; y < min(height, my + R * 0.55); y += 3) {
      const dy = (y - my) / (R * 0.55);                      // the squashed circle's half-width at this row
      if (abs(dy) >= 1) continue;
      const half = R * sqrt(1 - dy * dy);
      const fade = 1 - (y - hz) / (R * 1.4);                 // dimmer further from the horizon
      if (fade <= 0) break;
      const wob = sin(y * 0.25 + frameCount * 0.06) * 5;     // a gentle shimmer
      ctx.fillStyle = `rgba(251,255,180,${0.55 * g * fade})`;
      ctx.fillRect(x - half + wob, y, half * 2, 2);
    }
    ctx.restore();
  }
  // the original sand colour for row i, averaged over all the stripe steps (0–100), so the sand keeps the
  // original's tone but without stripes (remembered per row, since it never changes)
  groundAvg(i){
    if (!this.gcache) this.gcache = {};
    const key = round(i);
    let c = this.gcache[key];
    if (!c) {
      // averaged over the stripe steps, and also over nearby rows (±60px) so there is no visible step anywhere
      let r = 0, g = 0, b = 0, n = 0;
      for (let d = -60; d <= 60; d += 6) {
        const ii = i + d;
        for (let t = 0; t <= 100; t += 4) {
          const rc = map(t, 0, 550, 50, ii * 3);
          r += constrain(160 + ii/21 + rc, 0, 255); g += constrain(180 - ii/29 + rc, 0, 255); b += constrain(202 + ii/21, 0, 255); n++;
        }
      }
      // ten layers of 33/255 over the brown background (#795548), as the original drew it
      const keep = 0.26;                // how much brown background still shows (matched to the original's colour on screen)
      c = this.gcache[key] = color(r / n * (1 - keep) + 121 * keep, g / n * (1 - keep) + 85 * keep, b / n * (1 - keep) + 72 * keep);
    }
    return c;
  }
  // around the sun only: a soft warm glow that swells and wavers gently — the heat — with no lines
  sunShimmer(sunpos){
    const x = width/3.3+33, hz = height/2+150;
    if (sunpos + 220 < 0 || sunpos - 220 > hz) return;
    const ctx = drawingContext;
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, width, hz); ctx.clip();
    for (let k = 0; k < 3; k++) {                      // three soft layers breathing at slightly different speeds
      const r = 150 + k * 28 + sin(frameCount * (0.03 + k * 0.013) + k * 2) * 10;
      const a = 0.16 - k * 0.04 + sin(frameCount * (0.05 + k * 0.02) + k) * 0.04;
      const ox = sin(frameCount * 0.021 + k * 1.7) * 4, oy = cos(frameCount * 0.017 + k) * 3;
      const grad = ctx.createRadialGradient(x + ox, sunpos + oy, 100, x + ox, sunpos + oy, r);
      grad.addColorStop(0, `rgba(255,246,190,${max(0, a)})`);
      grad.addColorStop(1, 'rgba(255,246,190,0)');
      ctx.fillStyle = grad; ctx.fillRect(x - r - 10, sunpos - r - 10, r * 2 + 20, r * 2 + 20);
    }
    ctx.restore();
  }
  // before the sun comes up, the sky just above the horizon glows a soft orange where it will rise
  dawnGlow(sunpos){
    const d = sunpos - (height/2+150);                 // how far the sun's centre is below the horizon
    const g = constrain(map(d, SUN_BELOW + 40, 40, 0, 1), 0, 1) * constrain(map(d, 0, -160, 1, 0), 0, 1);
    if (g <= 0.01) return;
    const ctx = drawingContext, x = width/3.3+33, y = height/2+150;
    ctx.save();
    ctx.beginPath(); ctx.rect(0, 0, width, y); ctx.clip();
    const grad = ctx.createRadialGradient(x, y, 10, x, y, 260);
    grad.addColorStop(0, `rgba(255,196,140,${0.75 * g})`);
    grad.addColorStop(0.45, `rgba(255,214,170,${0.35 * g})`);
    grad.addColorStop(1, 'rgba(255,220,180,0)');
    ctx.fillStyle = grad; ctx.fillRect(x - 260, y - 260, 520, 260);
    ctx.restore();
  }
  tcolor(t){
    if (SMOOTH_BG) { tcol = 50; return; }   // hold the colour steady: a smooth gradient instead of stripes
    if(t > 100){
      tcol = 0;
    }
    tcol++;
  }
  sun(sunpos){
    fill(251,255,180);
    let radius = 110;
    beginShape();
    for(let i = 0;i<TWO_PI;i+=0.05){
      let r = radius+sin(i*5+angle);
      let x = r*cos(i);
      let y = r*sin(i);
      curveVertex(x+width/3.3+33,sunpos+y);
    }
    endShape();
    angle+=0.05;
  }
}