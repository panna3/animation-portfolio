// at night, while they sleep, a hump bounces one of the dogs too high: it tumbles off the camel,
// the parasol drone dives down, catches it by its scarf, flies it back and sets it down on its hump —
// and the dog sleeps through the whole thing. (Each night both: Non-chan first, then Ino-kun.)
class Rescue {
  constructor() { this.t = -1; this.nights = 0; this.armed = false; }
  // seats: where each dog sits ([0] Ino, [1] Non); home: where the parasol normally hangs
  update(seats, home) {
    if (!night.on) { this.armed = true; }
    // every night both of them get bounced off, one after the other: Non-chan first, then a little later Ino-kun
    const turn = night.on && this.t < 0 ? (night.t === 200 ? non : night.t === 450 ? ino : null) : null;
    if (turn) {
      this.armed = false;
      if (this.dog && this.dog !== turn) this.dog.lift = null;
      this.dog = turn; this.nights++;
      this.side = this.dog === non ? -1 : 1;          // Non falls off the front (left), Ino off the back (right)
      this.t = 0;
      desert.events.push(['rescue', frameCount]);
    }
    const d = this.dog;
    if (this.t < 0) { if (d) d.lift = null; return; }
    const seat = this.dog === ino ? seats[0] : seats[1];
    const t = this.t++;
    let dx = 0, dy = 0, rot = 0;
    let drone = { x: home.x, y: home.y };              // where the parasol hangs this frame
    const ease = q => q < 0.5 ? 2 * q * q : 1 - pow(-2 * q + 2, 2) / 2;
    // timeline (frames): bounced up and over the side 0–55, caught in mid-air at 55 (well above the ground),
    // carried back 55–165 and lowered onto the hump, let go at 165, the drone flies home 165–235
    const CATCH = 55, DROP = 165;
    const catchAt = { x: seat.x + this.side * 56, y: seat.y + 60 };
    if (t < CATCH) {
      const q = t / CATCH;
      dx = this.side * 56 * q;
      dy = q < 0.4 ? -30 * sin(HALF_PI * q / 0.4) : -30 + 90 * pow((q - 0.4) / 0.6, 2);   // up, then falling
      rot = this.side * 1.4 * q;
    }
    if (t >= 20 && t < CATCH) {                      // the drone dives to meet it
      const q = ease((t - 20) / (CATCH - 20));
      drone = { x: lerp(home.x, catchAt.x, q), y: lerp(home.y, catchAt.y - 52, q) };
    }
    if (t >= CATCH && t < DROP) {                    // caught: carried back up and over the hump
      const q = ease(min(1, (t - CATCH) / 85));
      drone = { x: lerp(catchAt.x, seat.x, q), y: lerp(catchAt.y - 52, seat.y - 70, q) + sin(t * 0.3) * 1.5 };
      if (t >= DROP - 25) drone.y = lerp(seat.y - 70, seat.y - 52, ease((t - (DROP - 25)) / 25));   // lowered gently
      dx = drone.x - seat.x; dy = drone.y + 52 - seat.y;
      rot = this.side * 1.4 * max(0, 1 - (t - CATCH) / 60);
    }
    if (t >= DROP) {                                 // let go; the drone flies home
      const q = ease(min(1, (t - DROP) / 70));
      drone = { x: lerp(seat.x, home.x, q), y: lerp(seat.y - 52, home.y, q) };
      if (t >= DROP + 70) { this.t = -1; parasol.x = home.x; parasol.y = home.y; d.lift = null; return; }
    }
    d.lift = { dx, dy, rot, held: t >= CATCH && t < DROP, drone };
    parasol.x = drone.x; parasol.y = drone.y;          // the parasol (with its drone) moves along
  }
  // the little line from the drone down to the dog's scarf while it is being carried
  showLine(seats) {
    const d = this.dog;
    if (!d || !d.lift || !d.lift.held || d.lift.byStorm) return;   // only the night rescue uses the string (the tornado rescue has robot arms)
    const seat = d === ino ? seats[0] : seats[1];
    // tied to the middle of the dog's back (drawn before the dog, so the line runs right into its fur — no gap)
    const h2 = d.sleepImg.height * d.s;
    stroke(205, 195, 245); strokeWeight(1.3);
    line(parasol.x, parasol.y - 21, seat.x + d.lift.dx, seat.y + d.lift.dy + 3 - h2 * 0.5);
  }
}
