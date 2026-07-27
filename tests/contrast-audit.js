/**
 * Contrast audit, run in the page via the browser devtools console or an
 * automation tool. Reports every text node whose colour fails WCAG AA against
 * its computed background.
 *
 * Handles Tailwind v4's oklab() output, which the naive rgb-only version missed.
 */
window.__contrastAudit = function () {
  const srgbToLin = (c) => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const lum = (r) => 0.2126 * srgbToLin(r[0]) + 0.7152 * srgbToLin(r[1]) + 0.0722 * srgbToLin(r[2]);

  function oklabToRgb(L, a, b) {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
    const lin = [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
    ];
    return lin.map((x) => {
      const v = x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(Math.max(x, 0), 1 / 2.4) - 0.055;
      return Math.max(0, Math.min(255, Math.round(v * 255)));
    });
  }

  function parse(s) {
    let m = s.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[\s,\/]+/).filter(Boolean).map(Number);
      return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1];
    }
    m = s.match(/oklab\(([^)]+)\)/);
    if (m) {
      const p = m[1].split(/[\s\/]+/).filter(Boolean);
      const L = parseFloat(p[0]), a = parseFloat(p[1]), b = parseFloat(p[2]);
      const alpha = p[3] !== undefined ? parseFloat(p[3]) : 1;
      return [...oklabToRgb(L, a, b), alpha];
    }
    return null;
  }

  const over = (f, b) => { const a = f[3]; return [0, 1, 2].map((i) => f[i] * a + b[i] * (1 - a)); };
  const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };

  function bgOf(el) {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = parse(getComputedStyle(n).backgroundColor);
      if (c && c[3] > 0.95) return [c[0], c[1], c[2]];
      if (c && c[3] > 0) return over(c, bgOf(n.parentElement || document.body));
      n = n.parentElement;
    }
    return [255, 255, 255];
  }

  const fails = [];
  document.querySelectorAll('body *').forEach((el) => {
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    if (!text) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || +cs.opacity === 0) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const fg = parse(cs.color);
    if (!fg) { fails.push(`UNPARSED ${cs.color} "${text.slice(0, 30)}"`); return; }
    const bg = bgOf(el);
    const c = ratio(over(fg, bg), bg);
    const size = parseFloat(cs.fontSize);
    const need = size >= 24 || (size >= 18.66 && +cs.fontWeight >= 700) ? 3 : 4.5;
    if (c < need) {
      fails.push(`${c.toFixed(2)}/${need} ${Math.round(size)}px "${text.slice(0, 32)}" fg=${cs.color.slice(0, 40)} bg=rgb(${bg.map(Math.round)})`);
    }
  });
  return fails;
};
