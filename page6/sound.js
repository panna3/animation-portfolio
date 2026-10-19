// sound for version 2: a gentle music-box tune that loops, plus soft sound effects that follow what happens
// (footsteps, hops, the shower, hearts, the sandstorm wind and tornado, the drone, night and morning, crickets).
// Browsers only allow sound after a tap, so a small ♪ button turns it on and off.
class Sound {
  constructor() {
    this.on = false; this.ctx = null; this.seen = 0; this.prev = {};
    const b = document.createElement('button');
    b.textContent = '♪ 音を出す';
    Object.assign(b.style, { position: 'fixed', top: '10px', right: '10px', zIndex: 10, padding: '6px 12px', border: 'none',
      borderRadius: '16px', background: 'rgba(255,255,255,0.75)', color: '#7a6a9a', font: '14px sans-serif', cursor: 'pointer' });
    b.onclick = () => this.toggle(b);
    document.body.appendChild(b);
  }
  toggle(b) {
    if (!this.ctx) this.start();
    this.on = !this.on;
    this.master.gain.setTargetAtTime(this.on ? 0.9 : 0, this.ctx.currentTime, 0.1);
    b.textContent = this.on ? '♪ 音を消す' : '♪ 音を出す';
  }
  start() {
    const c = this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.master = c.createGain(); this.master.gain.value = 0; this.master.connect(c.destination);
    this.musicBus = c.createGain(); this.musicBus.gain.value = 0.55; this.musicBus.connect(this.master);
    this.fxBus = c.createGain(); this.fxBus.gain.value = 0.8; this.fxBus.connect(this.master);
    // a looping noise buffer for the wind and the shower
    const len = c.sampleRate * 2, buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this.noiseBuf = buf;
    this.wind = this.loopNoise(500, 0.7, 0);              // sandstorm wind (its volume follows the storm)
    this.crick = { next: 0 };
    this.nextBar = c.currentTime + 0.2; this.bar = 0;
  }
  loopNoise(freq, q, vol) {
    const c = this.ctx, src = c.createBufferSource(); src.buffer = this.noiseBuf; src.loop = true;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    const g = c.createGain(); g.gain.value = vol;
    src.connect(f); f.connect(g); g.connect(this.fxBus); src.start();
    return { f, g };
  }
  // a music-box note: a few partials with a quick attack and a long soft fade
  note(midi, when, vel = 0.2, dur = 2.2, bus = this.musicBus) {
    const c = this.ctx, f = 440 * Math.pow(2, (midi - 69) / 12);
    const g = c.createGain(); g.connect(bus);
    g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(vel, when + 0.004); g.gain.exponentialRampToValueAtTime(0.0008, when + dur);
    for (const [m, a] of [[1, 1], [2, 0.3], [3.01, 0.12], [4.17, 0.06]]) {
      const o = c.createOscillator(), og = c.createGain(); o.frequency.value = f * m; og.gain.value = a;
      o.connect(og); og.connect(g); o.start(when); o.stop(when + dur + 0.05);
    }
  }
  burst(freq, q, vol, dur, when = this.ctx.currentTime) {            // a short filtered noise sound (splash, rustle, whoosh)
    const c = this.ctx, src = c.createBufferSource(); src.buffer = this.noiseBuf;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q;
    const g = c.createGain(); g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(vol, when + 0.01); g.gain.exponentialRampToValueAtTime(0.0008, when + dur);
    src.connect(f); f.connect(g); g.connect(this.fxBus); src.start(when, Math.random()); src.stop(when + dur + 0.05);
  }
  blip(f0, f1, dur, vol, when = this.ctx.currentTime, type = 'sine') {   // a little pitch sweep: "pyon", "boing"
    const c = this.ctx, o = c.createOscillator(), g = c.createGain(); o.type = type;
    o.frequency.setValueAtTime(f0, when); o.frequency.exponentialRampToValueAtTime(f1, when + dur);
    g.gain.setValueAtTime(0, when); g.gain.linearRampToValueAtTime(vol, when + 0.01); g.gain.exponentialRampToValueAtTime(0.0008, when + dur);
    o.connect(g); g.connect(this.fxBus); o.start(when); o.stop(when + dur + 0.02);
  }
  // the tune: 8 bars of 4/4 in C major pentatonic, a soft rolling arpeggio under a simple melody, looping
  scheduleMusic() {
    const c = this.ctx, beat = 0.62, bar = beat * 4;
    const chords = [[48, 55, 64], [45, 52, 60], [41, 48, 57], [43, 50, 59]];
    const mel = [[[0, 72], [2, 76], [3, 79]], [[0, 76], [3, 74]], [[0, 72], [2, 69]], [[0, 74]],
                 [[0, 76], [1, 79], [2, 81]], [[0, 79], [2, 76]], [[0, 74], [1, 72], [2, 69]], [[0, 67]]];
    while (this.nextBar < c.currentTime + 1.5) {
      const b = this.bar % 8, ch = chords[b % 4], t0 = this.nextBar;
      [ch[0], ch[1], ch[2], ch[1] + 12, ch[2], ch[1]].forEach((m, k) => this.note(m, t0 + k * bar / 6, k ? 0.07 : 0.1, 1.8));
      for (const [bt, m] of mel[b]) this.note(m, t0 + bt * beat, 0.16, 2.6);
      this.nextBar += bar; this.bar++;
    }
  }
  // called every frame: play the effects for whatever just happened
  update() {
    if (!this.ctx || !this.on) { if (typeof desert !== 'undefined') this.seen = desert.events.length; return; }
    const c = this.ctx, now = c.currentTime;
    this.scheduleMusic();
    // things the scene announces (footsteps, the tumbleweed, night, morning, storm, rescue)
    for (; this.seen < desert.events.length; this.seen++) {
      const [kind] = desert.events[this.seen];
      if (kind === 'step') { this.burst(300, 1.2, 0.05, 0.12); this.blip(120, 90, 0.08, 0.03); }
      else if (kind === 'weed') { for (let i = 0; i < 6; i++) this.burst(3000, 2, 0.025, 0.2, now + 0.3 + i * 0.55); }
      else if (kind === 'night') { [96, 91, 88, 84].forEach((m, i) => this.note(m, now + i * 0.16, 0.05, 1.4, this.fxBus)); }
      else if (kind === 'morning') { [84, 88, 91, 96].forEach((m, i) => this.note(m, now + i * 0.12, 0.05, 1.4, this.fxBus)); }
      else if (kind === 'whirl') {                                   // whirled up by the tornado: a rising "hyuuun" (Non a little higher)
        const len = desert.events[this.seen][2] / 60;
        this.blip(330, 990, len, 0.025, now); this.blip(440, 1320, len, 0.02, now);
      }
      else if (kind === 'fall') {                                    // flung out and falling: a falling "hyuu" lasting as long as the fall
        const [, , k, fr] = desert.events[this.seen], len = fr / 60;  // heavy Ino lower and shorter, light Non higher and longer
        this.blip(k ? 900 : 1300, k ? 380 : 620, len, 0.025, now);
      }
      else if (kind === 'boing') { const k = desert.events[this.seen][2]; this.blip(k ? 240 : 320, k ? 620 : 800, 0.32, 0.05, now, 'triangle'); }   // landing on the parasol: boing! (Ino lower)
      else if (kind === 'rescue') { this.blip(300, 600, 0.4, 0.03, now, 'triangle'); }
    }
    // the dogs' hops: a soft "pyon" when one leaves the hump
    for (const d of [ino, non]) {
      const k = d.name, up = d.off < 0;
      if (up && !this.prev[k]) this.blip(d === non ? 760 : 560, d === non ? 1300 : 980, 0.12, 0.05);
      this.prev[k] = up;
    }
    // hearts: a gentle "pwan" for each
    if (pomHearts.length > (this.prev.hearts || 0)) this.blip(1046, 1175, 0.3, 0.03);
    this.prev.hearts = pomHearts.length;
    // the shower: "shaa"
    if (shower.startedAt !== this.prev.shower && frameCount - shower.startedAt < 3) this.burst(5000, 0.8, 0.12, 0.8);
    this.prev.shower = shower.startedAt;
    // the sandstorm's wind rises and falls with the storm; the tornado adds a low whoosh while it is near
    const e = storm.env();
    const near = storm.t >= TOR.show[0] && storm.t <= TOR.show[1] ? 1 - min(1, abs(storm.funnelX() - width / 2) / (width * 0.6)) : 0;
    this.wind.g.gain.setTargetAtTime(0.18 * e + 0.12 * near, now, 0.15);
    this.wind.f.frequency.setTargetAtTime(380 + 500 * e + 300 * near * (1 + 0.3 * Math.sin(frameCount * 0.1)), now, 0.1);
    // crickets at night
    if (night.amount() > 0.8 && now > this.crick.next) {
      for (let i = 0; i < 3; i++) this.blip(4300, 4200, 0.04, 0.012, now + i * 0.07);
      this.crick.next = now + 0.5 + Math.random() * 0.8;
    }
  }
}
