/* The trip, as on the TV room's wall: a Moorish star lattice that slowly turns, tips, swells and changes colour,
   laid faintly over the page's backdrop and behind everything on it. The lattice tile is drawn once; a tiny
   112-pixel-wide colour field decides where it glows, remade a few times a second; each frame only moves the sheet. */
(() => {
if (window.top !== window || document.body.classList.contains('embed')) return;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, PHONE = matchMedia('(pointer: coarse)').matches;
const cv = document.createElement('canvas'); cv.className = 'tripwall'; cv.setAttribute('aria-hidden', 'true');
document.body.prepend(cv);
const ctx = cv.getContext('2d'), field = document.createElement('canvas'), fctx = field.getContext('2d'), FW = 112;
const lay = document.createElement('canvas'), lctx = lay.getContext('2d');
let W = 0, H = 0, img = null, fieldAt = -1e9, lattice = null, last = 0;
function makeLattice(S) {
  const c = document.createElement('canvas'); c.width = c.height = S;
  const x = c.getContext('2d'), m = S / 2, R = S * .3, r = R * .62;
  x.strokeStyle = '#fff'; x.lineWidth = Math.max(1, S / 56); x.lineJoin = 'miter';
  const pt = (a, d, ox = m, oy = m) => [ox + Math.cos(a) * d, oy + Math.sin(a) * d];
  x.beginPath();
  for (let k = 0; k < 16; k++) { const [px, py] = pt(k * Math.PI / 8 - Math.PI / 2, k % 2 ? r : R); x[k ? 'lineTo' : 'moveTo'](px, py); }
  x.closePath(); x.stroke();
  x.beginPath(); for (let k = 0; k < 8; k++) { const [px, py] = pt(k * Math.PI / 4 - Math.PI / 2 + Math.PI / 8, r * .62); x[k ? 'lineTo' : 'moveTo'](px, py); } x.closePath(); x.stroke();
  x.beginPath();
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; const [ax, ay] = pt(a, R), [bx, by] = pt(a, m); x.moveTo(ax, ay); x.lineTo(bx, by); }
  for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2 + Math.PI / 4; const [ax, ay] = pt(a, R), [bx, by] = pt(a, m * Math.SQRT2 - S * .12); x.moveTo(ax, ay); x.lineTo(bx, by); }
  x.stroke();
  for (const [cx, cy] of [[0, 0], [S, 0], [0, S], [S, S]]) {
    x.beginPath(); for (let k = 0; k < 4; k++) { const [px, py] = pt(k * Math.PI / 2, S * .12, cx, cy); x[k ? 'lineTo' : 'moveTo'](px, py); } x.closePath(); x.stroke();
  }
  return c;
}
function size() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  const lw = Math.ceil(W * .75), lh = Math.ceil(H * .75), th = Math.max(24, Math.round(FW * lh / lw));
  lay.width = lw; lay.height = lh; field.width = FW; field.height = th; img = fctx.createImageData(FW, th);
  lattice = lctx.createPattern(makeLattice(Math.round(Math.max(36, Math.min(W, H) / 14))), 'repeat'); fieldAt = -1e9;
}
function remake(now) {
  const th = field.height, t = now / 1000 * .3, d = img.data, hueBase = t * 12, cxm = FW / 2, cym = th / 2;
  for (let y = 0, i = 0; y < th; y++) for (let x = 0; x < FW; x++, i += 4) {
    const dx = x - cxm, dy = y - cym, r = Math.sqrt(dx * dx + dy * dy);
    const w = Math.sin(x * .07 + t * .35) + Math.sin(y * .08 - t * .27 + Math.sin(x * .04 + t * .2) * 2) + Math.sin(r * .12 - t * .5);
    const band = .5 + .5 * Math.sin(w * 1.6 + t * .3);
    const h = (hueBase + w * 30 + r * .8) % 360 / 60, k = h | 0, f = h - k;
    const q = 1 - f, rgb = [[1, f, 0], [q, 1, 0], [0, 1, f], [0, q, 1], [f, 0, 1], [1, 0, q]][k % 6];
    d[i] = 90 + rgb[0] * 165; d[i + 1] = 90 + rgb[1] * 165; d[i + 2] = 90 + rgb[2] * 165; d[i + 3] = band * band * 255;
  }
  fctx.putImageData(img, 0, 0);
  lctx.globalCompositeOperation = 'source-over'; lctx.clearRect(0, 0, lay.width, lay.height);
  lctx.fillStyle = lattice; lctx.fillRect(0, 0, lay.width, lay.height);
  lctx.globalCompositeOperation = 'source-in'; lctx.drawImage(field, 0, 0, lay.width, lay.height); lctx.globalCompositeOperation = 'source-over';
}
function frame(now) {
  // a page with an instrument on it needs its strength: the wall moves at about 30 frames a second, which is plenty this slow
  if (now - last > (window.TRIP_MS || 32)) {
    last = now;
    if (now - fieldAt > 220) { fieldAt = now; remake(now); }
    const t = now / 1000, cx = W / 2, cy = H * .45;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
    for (const k of [0, 1]) {
      const dir = k ? -1 : 1, ph = k * 2.1;
      const grow = 1 + .14 * Math.sin(t * .05 + ph) + .05 * Math.sin(t * .13 + ph * 1.7);
      const rot = dir * t * .008 + .18 * Math.sin(t * .021 + ph);
      const tipX = Math.cos(.32 * Math.sin(t * .031 + ph)), tipY = Math.cos(.32 * Math.sin(t * .027 + ph + 1));
      const skew = .1 * Math.sin(t * .037 + ph);
      ctx.setTransform(1, 0, 0, 1, cx + 30 * Math.sin(t * .02 + ph), cy + 20 * Math.cos(t * .017 + ph));
      ctx.rotate(rot); ctx.transform(grow * tipX * (k ? 1.27 : 1), 0, skew, grow * tipY * (k ? 1.27 : 1), 0, 0);
      ctx.globalAlpha = (PHONE ? .22 : .2) * (k ? .55 : 1);
      ctx.drawImage(lay, -W * .75, -H * .75, W * 1.5, H * 1.5);
    }
  }
  if (!reduce) requestAnimationFrame(frame);
}
size(); addEventListener('resize', size);
requestAnimationFrame(frame);
})();
