// now and then in the daytime the parasol gives a little cooling shower: drops fall from its rim
// for a couple of seconds, with a few sparkles
class Shower {
  constructor() { this.drops = []; this.until = -999; this.startedAt = -999; this.next = 300; }   // (nothing yet: no drinking at the very start)
  active() { return frameCount < this.until; }
  // the dogs drink once the first drops reach them (a little after the shower starts) until just after it stops;
  // the camel's arcing drops take longer to arrive, so it starts (and stops) later
  drinking(delay = 10) { return frameCount > this.startedAt + delay && frameCount < this.until + 20 + delay; }
  showering(extra = 0) { return frameCount >= this.startedAt && frameCount < this.until + extra; }
  update(p) {
    // daytime — and not straight away at sunrise: the morning gets going for a few seconds first
    const day = typeof night === 'undefined' || (night.amount() < 0.05 && night.after > DAWN + 150);
    const twirling = typeof ino !== 'undefined' && (ino.turnT >= 0 || non.turnT >= 0 || ino.off < 0 || non.off < 0);   // wait until both are sitting still
    const stormy = typeof storm !== 'undefined' && storm.active();
    if (day && !twirling && !stormy && frameCount > this.next && frameCount > this.until) {   // never while a dog is twirling or in a sandstorm
      this.until = frameCount + 42;                        // a quick burst: "shaa!" (0.7 s)
      this.startedAt = frameCount;
      this.next = 1e9;                                     // the next shower is set after the sandstorm that follows this one
      if (typeof desert !== 'undefined') desert.events.push(['shower', frameCount]);
    }
    if (frameCount < this.until && day) {
      // drops spray outwards from under the parasol like a shower head, fanning out wide as they fall
      const cx = p.x - 16;
      if (this.mouth && frameCount % 4 === 0) {            // now and then a drop arcs over to the camel's mouth, so it gets a drink too
        const x = p.x - 70 + random(-4, 4), y = p.y - 50, T = random(24, 34);
        const tx = this.mouth.x + random(-7, 7), ty = this.mouth.y + random(-6, 6);
        this.drops.push({ x, y, vx: (tx - x) / T, vy: (ty - y) / T - 0.07 * T / 2, age: 0, life: T + 2 });
      }
      for (let i = 0; i < 4; i++) {                        // a strong spray, fanning out fast
        const x = cx + random(-40, 40);
        this.drops.push({ x, y: p.y - 50 + random(-2, 4), vy: random(2.2, 3.6), vx: (x - cx) / 8 + random(-1.4, 1.4), age: 0, life: random(28, 42) });   // fanning out wide to the sides
      }
    }
    for (const d of this.drops) { d.vy += 0.07; d.y += d.vy; d.x += d.vx; d.vx *= 0.995; d.age++; }
    this.drops = this.drops.filter(d => d.age < d.life);
  }
  show() {
    strokeCap(ROUND);
    for (const d of this.drops) {
      const a = 255 * min(1, 1.6 * (1 - d.age / d.life));
      stroke(150, 205, 245, a * 0.75); strokeWeight(1.1);   // soft fine spray: short faint streaks with a round drop at the front
      line(d.x, d.y, d.x - d.vx * 1.3, d.y - d.vy * 1.3);
      stroke(225, 242, 255, a); strokeWeight(1.8);
      point(d.x, d.y);
    }
    noStroke();
  }
}
