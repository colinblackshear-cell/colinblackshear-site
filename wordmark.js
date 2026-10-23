/* Colin's name as one neon pen line with spectrum echoes, the same mark as the TV room's title.
   Any <svg data-wordmark> on the page gets drawn; data-draw="0" skips the write-on. */
(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const GLYPHS = {
  C: { w: 74, d: 'M62 24 A34 34 0 1 0 62 76' },
  O: { w: 80, d: 'M6 50 A34 34 0 1 1 74 50 A34 34 0 1 1 6 50' },
  L: { w: 60, d: 'M8 4 V96 H56' },
  I: { w: 16, d: 'M8 4 V96' },
  N: { w: 70, d: 'M8 96 V4 L62 96 V4' },
  B: { w: 70, d: 'M8 96 V4 H36 A23 23 0 0 1 36 50 H8 M36 50 H42 A23 23 0 0 1 42 96 H8' },
  A: { w: 72, d: 'M4 96 L36 4 L68 96 M17 60 H55' },
  K: { w: 66, d: 'M8 4 V96 M60 4 L8 60 M27 41 L62 96' },
  S: { w: 68, d: 'M60 18 C50 4 10 2 10 27 C10 50 62 46 62 72 C62 99 16 101 6 82' },
  H: { w: 70, d: 'M8 4 V96 M62 4 V96 M8 50 H62' },
  E: { w: 60, d: 'M56 4 H8 V96 H56 M8 50 H46' },
  R: { w: 68, d: 'M8 96 V4 H38 A24 24 0 0 1 38 52 H8 M32 52 L62 96' },
};
function layout(text, gap = 16, space = 40) {
  const out = []; let x = 0;
  for (const ch of text) { if (ch === ' ') { x += space; continue; } out.push({ x, g: GLYPHS[ch] }); x += GLYPHS[ch].w + gap; }
  return { glyphs: out, width: x - gap };
}
const WORD = layout('COLIN BLACKSHEAR'), NS = 'http://www.w3.org/2000/svg';
document.querySelectorAll('svg[data-wordmark]').forEach((svg, idx) => {
  const pad = 26, id = s => `wm${idx}${s}`;
  const mk = (t, a, parent) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); parent.appendChild(e); return e; };
  svg.setAttribute('viewBox', `${-pad} ${-pad} ${WORD.width + pad * 2} ${100 + pad * 2}`);
  const defs = mk('defs', {}, svg);
  const spec = mk('linearGradient', { id: id('Spec'), gradientUnits: 'userSpaceOnUse', x1: 0, y1: 0, x2: WORD.width, y2: 0 }, defs);
  for (let i = 0; i <= 6; i++) mk('stop', { offset: i / 6, 'stop-color': `hsl(${i * 55},100%,62%)` }, spec);
  const sheen = mk('linearGradient', { id: id('Sheen'), gradientUnits: 'userSpaceOnUse', x1: -300, y1: 0, x2: 0, y2: 0 }, defs);
  [['0', '#fff3dc'], ['.45', '#fff3dc'], ['.5', '#ffffff'], ['.55', '#fff3dc'], ['1', '#fff3dc']].forEach(([o, c]) => mk('stop', { offset: o, 'stop-color': c }, sheen));
  mk('filter', { id: id('Blur'), x: '-20%', y: '-80%', width: '140%', height: '260%' }, defs).appendChild(document.createElementNS(NS, 'feGaussianBlur')).setAttribute('stdDeviation', 7);
  const group = attrs => { const g = mk('g', Object.assign({ fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, attrs), svg);
    const paths = WORD.glyphs.flatMap(({ x, g: gl }) => gl.d.split(/(?=M)/).map(d => mk('path', { d, transform: `translate(${x} 0)`, pathLength: 1, 'stroke-dasharray': 1 }, g)));
    paths.g = g; return paths; };
  const echoes = [5, 4, 3, 2, 1].map(k => ({ k, paths: group({ stroke: `hsl(${k * 52 + 10},100%,62%)`, 'stroke-width': 4.4, opacity: 1 - k * .12 }) }));
  const halo = group({ stroke: `url(#${id('Spec')})`, 'stroke-width': 12, filter: `url(#${id('Blur')})`, opacity: .45 });
  const line = group({ stroke: `url(#${id('Sheen')})`, 'stroke-width': 4.4 });
  const n = line.length, born = performance.now(), quick = svg.dataset.draw === '0';
  const DRAW = reduce || quick ? 0 : 2.2, DELAY = reduce || quick ? 0 : .3;
  const tick = now => {
    const t = (now - born) / 1000 - DELAY;
    for (let i = 0; i < n; i++) {
      const k = DRAW ? Math.min(1, Math.max(0, (t - i * (DRAW / n)) / .5)) : 1;
      line[i].style.strokeDashoffset = 1 - k; halo[i].style.strokeDashoffset = 1 - k;
      for (const e of echoes) { const ke = DRAW ? Math.min(1, Math.max(0, (t - e.k * .14 - i * (DRAW / n)) / .5)) : 1; e.paths[i].style.strokeDashoffset = 1 - ke; }
    }
    const a = reduce ? .8 : now / 1600;
    for (const e of echoes) e.paths.g.setAttribute('transform', `translate(${Math.cos(a + e.k * .2) * e.k * 7.5} ${Math.sin(a * 1.3 + e.k * .2) * e.k * 5.5})`);
    if (!reduce) {
      spec.setAttribute('gradientTransform', `translate(${Math.sin(now / 2400) * WORD.width * .35} 0)`);
      sheen.setAttribute('gradientTransform', `translate(${((now / 1000) % 8) / 1.6 * (WORD.width + 600)} 0)`);
    }
    if (!reduce || t < DRAW + 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
});
})();
