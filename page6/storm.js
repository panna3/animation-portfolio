// now and then in the daytime a little sandstorm blows through: sand streams across, the air turns sandy,
// the parasol spins round and round and the dogs twirl and twirl — then it passes and all is calm again
let STORM_FRAMES = 450;            // set when each storm starts (long enough for the tornado to cross the whole picture)
const TOR_SPEED = 2;               // the tornado drifts steadily across at this many pixels a frame — no rushing in and stopping
// in the middle of the storm a little tornado comes travelling across from the right (with the wind); as it passes the camel
// it whirls both dogs up into the air (twirling round and round). The parasol drone comes to wait low, just above
// the humps; the dogs drop out of the sky onto the open parasol — boing, boing! — then hop off onto their humps,
// and the tornado moves on and away to the left. Timeline in storm frames:
let TOR = { show: [20, 380], arrive: 150, lift: [160, 260], fly: 215, land: 300, bounce: 42, hop: [350, 372], home: 440 };
// work out the timeline for this storm: the tornado enters at the right edge and reaches the dogs' humps at
// frame L, whirls them up while it keeps moving, and leaves off the left edge
function planTornado() {
  const near = (lastSeatPts[0].x + lastSeatPts[1].x) / 2 || width / 2, show0 = 20;
  const L = round(show0 + (width + 120 - near) / TOR_SPEED - 20);
  const showEnd = round(show0 + (width + 280) / TOR_SPEED);
  // after the tornado flings them out (L + 100) the drone has to chase and pick up each dog: roughly 100 and 175
  // frames later, then it brings them home
  TOR = { show: [show0, showEnd], arrive: L, lift: [L, L + 100], fly: L + 100, land: L + 200, bounce: 42, hop: [L + 360, L + 382], home: L + 450 };
  STORM_FRAMES = max(showEnd, TOR.home) + 20;
}
class Storm {
  constructor() { this.t = -1; this.next = 0;   /* (storms now follow the showers) */ this.grains = []; this.spin = 0; this.count = 0; this.victim = null; }
  active() { return this.t >= 0; }
  env() { return this.t < 0 ? 0 : pow(sin(PI * this.t / STORM_FRAMES), 0.6); }   // builds up, then dies away
  update() {
    const day = night.amount() < 0.05;
    const busy = shower.showering(40) || rescue.t >= 0;
    // the story goes: shower → a drink and a happy twirl with hearts → then the sandstorm and tornado blow in
    const afterShower = shower.startedAt > 0 && shower.startedAt !== this.lastShower && frameCount > shower.until + 170;
    if (this.t < 0 && afterShower && !day) { this.lastShower = shower.startedAt; shower.next = frameCount + 600; }   // night fell first: no storm, showers carry on
    if (this.t < 0 && day && !busy && afterShower) {
      this.lastShower = shower.startedAt;
      this.t = 0; desert.events.push(['storm', frameCount]);
      planTornado();
    }
    if (this.t >= 0) {
      this.t++;
      if (this.t > STORM_FRAMES) { this.t = -1; shower.next = frameCount + random(420, 660); }   // calm again; the next shower in 7–11 s
    }
    const e = this.env();
    for (let i = 0; i < 6 * e; i++) {                      // sand blowing in from the left
      this.grains.push({ x: width + 20, y: random(height * 0.15, height), v: -random(6, 12), w: random(0.6, 1.8), ph: random(TWO_PI), age: 0 });   // blowing from the right
    }
    for (const g of this.grains) { g.x += g.v; g.y += sin(g.age * 0.2 + g.ph) * 0.6; g.age++; }
    this.grains = this.grains.filter(g => g.x > -30);
    // the parasol only gets spun round when the tornado comes close (not all through the storm)
    if (this.t >= TOR.arrive - 25 && this.t < TOR.fly - 10) this.spin += 0.3;      // the parasol spins faster as the wind gets up (until it flies off to help)
    this.tornado();
  }
  // the tornado lifting both dogs, and the parasol catching them
  tornado() {
    const t = this.t, dogs = [non, ino];
    if (t < 0 || t < TOR.lift[0] || t >= TOR.home) {
      for (const d of dogs) if (d.lift && d.lift.byStorm) d.lift = null;
      if (this.wasHelping) { parasol.x = PARASOL_HOME().x; parasol.y = PARASOL_HOME().y; this.wasHelping = false; }
      return;
    }
    const home = PARASOL_HOME(), ease = q => q < 0.5 ? 2 * q * q : 1 - pow(-2 * q + 2, 2) / 2;
    const seatOf = d => d === ino ? lastSeatPts[0] : lastSeatPts[1];
    const liftX = this.funnelX(TOR.lift[0]);                 // where the tornado was when it picked them up
    // whirled up round the funnel (k: 0 = Non, 1 = Ino — on opposite sides)
    const whirl = (k, q) => {
      const seat = seatOf(dogs[k]), ang = q * 5 * PI + k * PI, r = 16 + 12 * q, fx = this.funnelX(TOR.lift[0] + q * (TOR.lift[1] - TOR.lift[0]));
      // little light Non-chan is blown higher; big heavy Ino-kun doesn't get carried up quite as far (measured to the middle of each dog)
      const d = dogs[k], h = d.img.height * d.s, topY = min(seatOf(non).y, seatOf(ino).y) - (k === 0 ? 238 : 226) + h / 2;
      return { x: lerp(seat.x, fx, ease(min(1, q * 2.2))) + cos(ang) * r, y: lerp(seat.y, topY, ease(q)) + sin(ang) * 4 };
    };
    const top = [whirl(0, 1), whirl(1, 1)];
    // the parasol's canopy top is about 72 above parasol.y; the dogs sit on it, Non to the left, Ino to the right
    const onCanopy = (px, py, k) => ({ x: px + (k === 0 ? -36 : 8), y: py - 70 });
    const above = { x: (seatOf(non).x + seatOf(ino).x) / 2 + 14, y: min(seatOf(non).y, seatOf(ino).y) - 30 };   // just above the humps
    // flung out of the top of the tornado, each dog sails off its own way and falls (not aiming anywhere)
    const G = 0.04, L1 = TOR.lift[1];
    const catchY = min(seatOf(non).y, seatOf(ino).y) - 40;           // they have fallen quite low by the time the drone gets there
    // both are flung out to the left. Heavy Ino-kun drops faster (stronger pull, thrown up less);
    // light Non-chan floats down more slowly — so Ino lands on the parasol first and Non a little after
    const GK = [0.047, 0.053], V0 = [{ x: -0.8, y: -1.15 }, { x: 0, y: -1.0 }];
    const landAfter = k => (-V0[k].y + sqrt(V0[k].y * V0[k].y + 2 * GK[k] * (catchY - top[k].y))) / GK[k];
    const sC = [landAfter(0), landAfter(1)];
    const nonX = top[0].x + V0[0].x * sC[0];                         // where Non comes down; the drone catches her there
    V0[1].x = ((nonX + 36 + 8) - top[1].x) / sC[1];                    // and Ino comes down on the right half of the same canopy
    const fall = (k, s3) => ({ x: top[k].x + V0[k].x * s3, y: top[k].y + V0[k].y * s3 + 0.5 * GK[k] * s3 * s3 });
    const tA = L1 + sC[0], tB = L1 + sC[1], tFirst = min(tA, tB), tLast = max(tA, tB);   // tA: Non caught, tB: Ino caught
    // sounds: carried up ("hyuuun"), flung out and falling ("hyuu…", each as long as its own fall), landing ("boing")
    if (t === TOR.lift[0]) desert.events.push(['whirl', frameCount, L1 - TOR.lift[0]]);
    if (t === L1) for (const k of [0, 1]) desert.events.push(['fall', frameCount, k, sC[k]]);
    for (const [k, tc] of [[0, tA], [1, tB]]) if (t >= tc && t - 1 < tc) desert.events.push(['boing', frameCount, k]);
    const A = { x: nonX + 36, y: catchY + 70 }, B = A;
    // boing, boing — after landing on the canopy (the same springy bounce for both, Ino a moment after Non)
    const boingAt = (since, k) => {
      const bounces = [[0, 18, 26], [18, 13, 12], [31, 9, 4]];
      let up = 0; for (const [b0, len, hgt] of bounces) if (since >= b0 && since < b0 + len) up = sin(PI * (since - b0) / len) * hgt;
      return up;
    };
    // over the humps the dogs slip off the canopy onto ropes and the drone lowers them gently onto their humps
    const tStay = tLast + 46;                                            // the drone holds still while they bounce
    const tHome0 = tStay + 70, tSlip = [tHome0 + 6, tHome0 + 20], tHop = [tHome0 + 20, tHome0 + 75], tGone = tHome0 + 150;
    const seatMid = { x: (seatOf(non).x + seatOf(ino).x) / 2, y: min(seatOf(non).y, seatOf(ino).y) };
    const hangOff = k => seatOf(dogs[k]).x - seatMid.x;               // each hangs straight above its own hump
    const HANG = 36;                                                  // how far below the drone the dogs hang (short arms)
    const lowerFrom = { x: seatMid.x, y: seatMid.y - HANG - 70 }, lowerTo = { x: seatMid.x, y: seatMid.y - HANG };
    let drone = { x: home.x, y: home.y }, pos, whirling = false;
    // where the drone is: waits, chases to catch Non, then Ino, then brings them over the humps, then home
    const tGo = L1 + 6;                                               // it dashes off after them the moment they are flung out
    if (t < tGo) drone = { x: home.x, y: home.y };
    else if (t < tFirst) { const f = ease((t - tGo) / (tFirst - tGo)); drone = { x: lerp(home.x, A.x, f), y: lerp(home.y, A.y, f) }; }
    else if (t < tStay) drone = { x: B.x, y: B.y };
    else if (t < tHome0) { const f = ease((t - tStay) / (tHome0 - tStay)); drone = { x: lerp(B.x, above.x, f), y: lerp(B.y, above.y, f) }; }
    else if (t < tSlip[1]) { const f = ease((t - tHome0) / (tSlip[1] - tHome0)); drone = { x: lerp(above.x, lowerFrom.x, f), y: lerp(above.y, lowerFrom.y, f) }; }   // rises a little
    else if (t < tHop[1]) { const f = ease((t - tHop[0]) / (tHop[1] - tHop[0])); drone = { x: lowerFrom.x, y: lerp(lowerFrom.y, lowerTo.y, f) }; }   // lowering them
    else { const f = ease(min(1, (t - tHop[1]) / (tGone - tHop[1]))); drone = { x: lerp(lowerTo.x, home.x, f), y: lerp(lowerTo.y, home.y, f) }; }
    const dipAt = (since, len = 8) => since >= 0 && since < len ? sin(PI * since / len) * 6 : 0;
    drone.y += dipAt(t - tA, 8) * 1.2 + dipAt(t - tB, 8) * 1.2;      // the parasol gives a little as each one lands
    if (t < L1) {
      pos = [whirl(0, (t - TOR.lift[0]) / (TOR.lift[1] - TOR.lift[0])), whirl(1, (t - TOR.lift[0]) / (TOR.lift[1] - TOR.lift[0]))];
      whirling = true;
    } else {
      pos = [0, 1].map(k => {
        const tc = k === 0 ? tA : tB;
        if (t < tc) return fall(k, t - L1);                          // still falling
        const hang = { x: drone.x + hangOff(k), y: drone.y + HANG + (seatOf(dogs[k]).y - seatMid.y) };   // held by the arm so it comes down right onto its own hump (Ino's hump sits lower)
        if (t < tSlip[0]) { const c = onCanopy(drone.x, drone.y, k); return { x: c.x, y: c.y - boingAt(t - tc, k) }; }   // riding the parasol
        if (t < tSlip[1]) { const q = (t - tSlip[0]) / (tSlip[1] - tSlip[0]), c = onCanopy(drone.x, drone.y, k);    // slipping off the edge onto the rope
                            return { x: lerp(c.x, hang.x, q), y: lerp(c.y, hang.y, q * q) - sin(PI * q) * 10 }; }
        if (t < tHop[1]) return hang;                                // lowered down onto the hump
        return seatOf(dogs[k]);
      });
    }
    // safely back on their humps: a few little hearts pop up from each of them
    if (!this.heartsDone && t >= tHop[1]) {
      this.heartsDone = true;
      dogs.forEach((d, k) => {
        const s2 = seatOf(d), h = d.img.height * d.s;
        for (let i = 0; i < 3; i++) pomHearts.push({ x: s2.x + (i - 1) * 9 + random(-3, 3), y: s2.y - h + 6 + i * 3, vy: -random(0.6, 0.85),
                                                     ph: random(TWO_PI), size: random(6, 9), age: -i * 6 - k * 4, life: 80 });
      });
    }
    if (t < TOR.lift[0] + 5) this.heartsDone = false;
    if (t >= tGone) { for (const d of dogs) if (d.lift && d.lift.byStorm) d.lift = null; parasol.x = home.x; parasol.y = home.y; this.wasHelping = false; return; }
    const roped = t >= tSlip[0] && t < tHop[1];
    dogs.forEach((d, k) => { d.lift = { dx: pos[k].x - seatOf(d).x, dy: pos[k].y - seatOf(d).y, rot: 0, whirl: whirling, byStorm: true, held: roped }; });
    if (t >= L1) { parasol.x = drone.x; parasol.y = drone.y; this.wasHelping = true; }
  }
  funnelX(t = this.t) {
    return width + 120 - TOR_SPEED * (t - TOR.show[0]);   // steadily from the right edge to the left, at an even pace
  }

  // two little robot arms reach down from the drone, each holding a dog by its back, while the drone lowers
  // them onto their humps: two segments with a bendy elbow, round joints and a small gripper
  // the drone's two little robot arms. They are folded away inside it: each one telescopes out of the drone's belly
  // to grab its dog, holds it while it is lowered onto its hump, then shrinks back in again
  showLine(seats) {
    if (this.t < 0) { this.arms = {}; return; }
    this.arms = this.arms || {};
    const base = { x: parasol.x, y: parasol.y - 22 }, OUT = 10, IN = 14;     // frames to reach out / to fold back in
    for (const d of [non, ino]) {
      const st = this.arms[d.name] = this.arms[d.name] || { out: 0, back: -1, off: null };
      let hand = null, ext = 0;
      if (d.lift && d.lift.held) {
        const seat = d === ino ? seats[0] : seats[1], h = d.img.height * d.s;
        const h2 = { x: seat.x + d.lift.dx, y: seat.y + d.lift.dy + 3 - h * 0.62 };   // gripping the middle of its back
        if (h2.y >= base.y + 14) {                                  // (not while the dog is still up on the canopy — it would poke through)
          st.out++; st.back = -1; st.off = { x: h2.x - base.x, y: h2.y - base.y };
          ext = min(1, st.out / OUT); hand = h2;
        }
      } else if (st.off) {                                          // let go: fold back into the drone
        if (st.back < 0) st.back = 0;
        st.back++; ext = 1 - st.back / IN;
        if (ext <= 0) { st.off = null; st.out = 0; st.back = -1; continue; }
      }
      if (!st.off) continue;
      const e = ext * ext * (3 - 2 * ext);                          // smooth
      const tip = { x: base.x + st.off.x * e, y: base.y + st.off.y * e };
      const side = d === ino ? -1 : 1;                              // each arm's elbow bends outwards
      const dx = tip.x - base.x, dy = tip.y - base.y, dist = Math.hypot(dx, dy), L = max(3, dist * 0.6);
      const mid = { x: base.x + dx / 2, y: base.y + dy / 2 }, off = sqrt(max(0, L * L - (dist / 2) * (dist / 2)));
      const nx = -dy / (dist || 1), ny = dx / (dist || 1);
      const elbow = { x: mid.x + nx * off * side, y: mid.y + ny * off * side };
      const ARM = [190, 184, 222], SLEEVE = [176, 169, 212];       // soft lavender, lighter than the drone's propellers
      strokeCap(ROUND);
      // each segment: a short wider sleeve with a thin rod sliding out of it (so it looks like it telescopes)
      for (const [p, q] of [[base, elbow], [elbow, tip]]) {
        stroke(...ARM); strokeWeight(2.4); line(p.x, p.y, q.x, q.y);
        stroke(...SLEEVE); strokeWeight(3.4); line(p.x, p.y, lerp(p.x, q.x, 0.4), lerp(p.y, q.y, 0.4));
      }
      noStroke(); fill(...SLEEVE);
      circle(base.x, base.y, 4.5); circle(elbow.x, elbow.y, 4);                                     // joints
      stroke(...SLEEVE); strokeWeight(1.5); noFill();
      const g = 0.5 + 0.5 * e;                                                                       // the little gripper opens out as it arrives
      arc(tip.x - 2.2 * g, tip.y, 5 * g, 6 * g, HALF_PI, PI + HALF_PI); arc(tip.x + 2.2 * g, tip.y, 5 * g, 6 * g, -HALF_PI, HALF_PI);
    }
    noStroke();
  }
  // the little tornado: a twisting funnel of sand from the ground up
  showTornado() {
    const t = this.t;
    if (t < TOR.show[0] || t > TOR.show[1]) return;
    const a = min(1, (t - TOR.show[0]) / 30, (TOR.show[1] - t) / 30);
    const x0 = this.funnelX(), g = height / 2 + 150;
    noFill();
    for (let k = 0; k < 22; k++) {
      const q = k / 21, y = g - q * 300;
      const w = 10 + q * q * 90, wob = sin(frameCount * 0.12 + k * 0.5) * (4 + q * 10);
      noStroke(); fill(214, 186, 140, 34 * a);              // a soft sandy body, so the funnel reads as a shape
      ellipse(x0 + wob, y, w * 2, 10 + q * 16);
      noFill();
      stroke(196, 164, 118, 95 * a * (0.5 + 0.5 * q));      // gentle rings swirling round it
      strokeWeight(1.5);
      ellipse(x0 + wob, y, w * 2, 8 + q * 14);
      stroke(250, 236, 205, 110 * a);                      // a light streak spinning round it
      strokeWeight(1);
      const s = frameCount * 0.25 + k * 0.9;
      arc(x0 + wob, y, w * 2, 8 + q * 14, s, s + 1.2);
    }
    noStroke();
  }
  // the parasol, spun round its middle while the storm blows
  showParasol() {
    if ((this.t < 0 || this.t >= TOR.fly - 10) && this.spin > 0) {   // storm over (or off to help): come round upright, then stop
      const target = ceil(this.spin / TWO_PI - 1e-6) * TWO_PI;
      this.spin = min(target, this.spin + 0.15);
      if (this.spin >= target - 1e-3) this.spin = 0;
    }
    if (this.spin === 0) { parasol.show(); return; }
    const cx = parasol.x - 15, cy = parasol.y - 45;       // turn round the middle of the parasol
    push(); translate(cx, cy); rotate(this.spin); translate(-cx, -cy); parasol.show(); pop();
  }
  show() {
    const e = this.env();
    if (e > 0.01) { noStroke(); fill(222, 196, 150, 45 * e); rect(0, 0, width, height); }   // sandy air (light, so you can still see everything)
    // fine grains of sand, thin and short — all drawn in one go (one path), which is much lighter than one by one
    const ctx = drawingContext;
    ctx.save();
    ctx.strokeStyle = 'rgba(205,175,130,0.5)'; ctx.lineWidth = 0.6; ctx.lineCap = 'round';
    ctx.beginPath();
    for (const g of this.grains) { ctx.moveTo(g.x, g.y); ctx.lineTo(g.x - g.v * 1.2, g.y); }
    ctx.stroke();
    ctx.restore();
    noStroke();
  }
}
