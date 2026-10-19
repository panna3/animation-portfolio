// version 2 only: the camel lifts its neck and head up to the parasol's shower, mouth opening and closing,
// then lowers it again. Same drawing as camel.js — the neck and head are just turned up around the base
// of the neck by this.lift (0 = normal, 1 = head up). camel.js itself is left as it is.
const NECK_PIVOT = [-112, 56];          // base of the neck, relative to (lx, ly)
const NECK_TURN = 0.55;                 // how far the head tips up (radians) at full lift
Camel.prototype.show = function (lx, ly) {
  const lift = this.lift || 0;
  // before the camel is drawn, keep a copy of what is behind its mouth (sky, far things) — shown through the gap between its lips
  const d0 = pixelDensity(), MB = { x: (lx - 196) * d0, y: (ly + 14) * d0, w: 22 * d0, h: 22 * d0 };
  if (!this.mouthBg) this.mouthBg = document.createElement('canvas');
  this.mouthBg.width = MB.w; this.mouthBg.height = MB.h;
  this.mouthBg.getContext('2d').drawImage(drawingContext.canvas, MB.x, MB.y, MB.w, MB.h, 0, 0, MB.w, MB.h);
  let rleg = map(rlegs,0,10,lx+7,lx+10);
  let lleg = map(llegs,0,10,lx+10,lx+7);
  let tail = map(mtail,0,10,lx,lx+0.3);
  let necky = map(mnecky,0,10,ly,ly-0.3);
  let neckx = map(mneckx,0,10,lx,lx-0.3);
  if(rlegs > 100){ rlegs=0; llegs = 0; mtail = 0; mnecky = 0; mneckx = 0; }
  else{ rlegs++; llegs++; mtail++; mnecky++; mneckx++; }
  const px = lx + NECK_PIVOT[0], py = ly + NECK_PIVOT[1];
  const turned = f => { push(); translate(px, py); rotate(NECK_TURN * lift); translate(-px, -py); f(); pop(); };
  // legs
  strokeWeight(13); stroke('#FDE3BC'); noFill();
  beginShape(); vertex(lx-80,ly+90); bezierVertex(lx-83,ly+100,lx-85,ly+125,rleg-110,ly+150); endShape();
  beginShape(); vertex(lx-90,ly+75); bezierVertex(lx-93,ly+100,lx-90,ly+125,lleg-85,ly+150); endShape();
  beginShape(); vertex(lx+20,ly+80); bezierVertex(lx+23,ly+100,lx+25,ly+125,lleg+30,ly+150); endShape();
  beginShape(); vertex(lx+33,ly+70); bezierVertex(lx+33,ly+100,lx+35,ly+125,rleg+5,ly+150); endShape();
  fill('#FDE3BC');
  beginShape(); vertex(lx+40,ly+60); bezierVertex(lx+55,ly+95,lx-60,ly+125,lx-110,ly+60); endShape();   // bottom body
  turned(() => {
    fill('#FDE3BC'); stroke('#FDE3BC'); strokeWeight(13);
    beginShape(); vertex(lx-110,ly+60); bezierVertex(lx-130,necky+80,lx-150,necky+80,lx-165,ly+30); endShape();   // neck
    beginShape(); vertex(lx-185,necky+25); bezierVertex(lx-175,necky+30,lx-160,necky+30,lx-150,necky+20); endShape();
    beginShape(); vertex(neckx-180,ly+22); bezierVertex(lx-175,necky,lx-160,necky-25,lx-110,ly+62); endShape();
  });
  beginShape(); vertex(lx-120,ly+60); bezierVertex(lx-95,ly+10,lx+45,ly+10,lx+40,ly+60); endShape();   // top body
  turned(() => {
    fill('#FDE3BC'); stroke('#FDE3BC'); strokeWeight(13);
    beginShape(); vertex(lx-127,ly+35); bezierVertex(lx-115,ly+45,lx-110,ly+45,lx-105,ly+43); endShape();
  });
  noFill(); strokeWeight(8);
  beginShape(); vertex(lx+45,ly+55); bezierVertex(lx+55,ly+40,lx+65,ly+65,tail+60,ly+80); endShape();   // tail
  turned(() => {
    strokeWeight(1);
    if (this.drinking) {
      // happy closed eye, and the mouth opening and closing at the drops
      noFill(); stroke('pink'); strokeWeight(1.6);
      arc(lx-165, necky+15, 8, 6, PI + 0.3, TWO_PI - 0.3);
      const open = floor(frameCount / 6) % 2 === 0;
      noStroke(); fill(150, 90, 100);
      ellipse(lx-186, ly+26, open ? 7 : 4, open ? 4.5 : 1.6);
      strokeWeight(1);
    } else {
      fill('pink'); stroke('#FDE3BC');
      ellipse(lx-165,necky+13,7,5);                       // eye
    }
    if (!this.drinking && lift < 0.02) {
      // the gap between the lips shows what is behind the camel (the sky), not the face colour
      const c = drawingContext;
      c.save();
      c.beginPath(); c.moveTo(lx-191, necky+29); c.bezierCurveTo(lx-185, necky+29, lx-183, necky+26, lx-180, ly+23); c.lineTo(lx-191, ly+26); c.closePath();
      c.clip();
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.drawImage(this.mouthBg, MB.x, MB.y);
      c.restore();
    }
    stroke('pink'); noFill(); strokeWeight(1);
    beginShape(); vertex(lx-155,ly+3); bezierVertex(lx-150,necky+3,lx-150,necky+4,lx-153,ly+8); endShape();   // ear
    beginShape(); vertex(lx-191,necky+29); bezierVertex(lx-185,necky+29,lx-183,necky+26,lx-180,ly+23); vertex(lx-191,ly+26); endShape();   // mouth
    line(lx-161,necky-3,lx-152,necky-7); line(lx-163,necky-3,lx-156,necky-9); line(lx-165,necky-3,lx-160,necky-10);   // head hair
    line(lx-166,necky-3,lx-164,necky-10); line(lx-167,necky-3,lx-160,necky-10);
  });
  stroke('pink'); strokeWeight(1);
  line(tail+58,ly+78,tail+54,ly+88); line(tail+59,ly+78,tail+56,ly+88); line(tail+60,ly+78,tail+58,ly+88);   // tail hair
  line(tail+61,ly+78,tail+60,ly+88); line(tail+62,ly+78,tail+62,ly+88); line(tail+63,ly+78,tail+64,ly+88);
  fill('rgb(255,197,207)'); stroke('rgb(255,197,207)'); strokeWeight(1);
  arc(rleg-110,ly+150,12,12,0,PI,CHORD); arc(lleg-85,ly+150,12,12,0,PI,CHORD);   // feet
  arc(lleg+30,ly+150,12,12,0,PI,CHORD); arc(rleg+5,ly+150,12,12,0,PI,CHORD);
};
// where the camel's mouth is right now (for aiming the shower drops), following the lifted head
Camel.prototype.mouthAt = function (lx, ly) {
  const px = lx + NECK_PIVOT[0], py = ly + NECK_PIVOT[1], a = NECK_TURN * (this.lift || 0);
  const dx = -186 - NECK_PIVOT[0], dy = 26 - NECK_PIVOT[1];
  return { x: px + dx * cos(a) - dy * sin(a), y: py + dx * sin(a) + dy * cos(a) };
};
