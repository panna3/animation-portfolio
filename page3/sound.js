// Sound for Panna on cloud: a slow, dreamy music loop (music.mp3, made by music.py; it loops seamlessly).
// Browsers only allow sound after a tap, so a small ♪ button turns it on and off.
(() => {
  const music = new Audio('music.mp3');
  music.loop = true; music.volume = 0.8;
  const b = document.createElement('button');
  b.textContent = '♪ 音を出す';
  Object.assign(b.style, { position: 'fixed', top: '10px', right: '10px', zIndex: 10, padding: '6px 12px', border: 'none',
    borderRadius: '16px', background: 'rgba(255,255,255,0.75)', color: '#7a6a9a', font: '14px sans-serif', cursor: 'pointer' });
  b.onclick = () => {
    if (music.paused) { music.play().catch(() => {}); b.textContent = '♪ 音を消す'; }
    else { music.pause(); b.textContent = '♪ 音を出す'; }
  };
  addEventListener('DOMContentLoaded', () => document.body.appendChild(b));
  if (document.readyState !== 'loading') document.body.appendChild(b);
})();
