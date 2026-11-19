"use client";

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };

/** Catmull-Rom through the waypoints, as a cubic Bézier SVG path. */
function curve(p: Pt[]) {
  if (p.length < 2) return "";
  let d = `M${p[0].x},${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const t = 0.5;
    const c1 = { x: p1.x + ((p2.x - p0.x) / 6) * t * 2, y: p1.y + ((p2.y - p0.y) / 6) * t * 2 };
    const c2 = { x: p2.x - ((p3.x - p1.x) / 6) * t * 2, y: p2.y - ((p3.y - p1.y) / 6) * t * 2 };
    d += ` C${c1.x.toFixed(1)},${c1.y.toFixed(1)} ${c2.x.toFixed(1)},${c2.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

/** a small loop-the-loop inserted between two waypoints */
function loopAround(a: Pt, b: Pt, r: number): Pt[] {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dir = b.x > a.x ? 1 : -1;
  return [
    { x: mx - dir * r * 0.2, y: my - r * 0.9 },
    { x: mx + dir * r, y: my - r * 0.2 },
    { x: mx + dir * r * 0.3, y: my + r * 0.8 },
    { x: mx - dir * r * 0.7, y: my },
    { x: mx + dir * r * 0.6, y: my + r * 1.6 },
  ];
}

/**
 * The thread: a dotted flight path that runs the full length of the page. As you scroll it draws itself,
 * a paper plane rides the tip, and each section's checkpoint lights up as the plane passes it.
 */
export default function Thread() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = wrap.current!;
    const el = box.querySelector<SVGSVGElement>(".thread-svg")!;
    const page = box.parentElement as HTMLElement;
    const dots = el.querySelector<SVGPathElement>(".thread-dots")!;
    const plane = box.querySelector<HTMLElement>(".thread-plane")!;
    const marks = el.querySelector<SVGGElement>(".thread-marks")!;
    let H = 1;
    let total = 1;
    let samples: { l: number; x: number; y: number }[] = [];
    let checkpoints: { l: number; node: SVGCircleElement; on?: boolean }[] = [];
    let raf = 0;
    let shown = -1;
    const cur = { l: 0 };

    const build = () => {
      const W = page.clientWidth;
      H = page.scrollHeight;
      el.setAttribute("viewBox", `0 0 ${W} ${H}`);
      el.style.height = H + "px";
      box.style.height = H + "px";
      const secs = Array.from(page.querySelectorAll<HTMLElement>(":scope > main > section, :scope > main > div > section, :scope > footer, :scope > .site-foot"));
      const pts: Pt[] = [{ x: W * 0.62, y: -20 }];
      const cps: Pt[] = [];
      const pageTop = page.getBoundingClientRect().top + window.scrollY;
      const narrow = W < 760;
      secs.forEach((s, i) => {
        const r = s.getBoundingClientRect();
        const top = r.top + window.scrollY - pageTop;
        const pref = s.dataset.thread ? parseFloat(s.dataset.thread) : i % 2 ? 0.9 : 0.08;
        const x = W * (narrow ? (pref > 0.5 ? 0.94 : 0.06) : pref);
        const a = { x, y: top + Math.min(r.height * 0.18, 220) };
        const b = { x: W * (narrow ? 0.5 : 1 - pref * 0.8 - 0.1), y: top + r.height * 0.72 };
        if (s.dataset.threadLoop !== undefined && !narrow) pts.push(...loopAround(pts[pts.length - 1], a, 70));
        pts.push(a, b);
        cps.push(a);
      });
      pts.push({ x: W * 0.5, y: H - 40 });
      const d = curve(pts);
      dots.setAttribute("d", d);
      total = dots.getTotalLength();
      samples = [];
      const N = Math.max(200, Math.round(total / 12));
      for (let i = 0; i <= N; i++) {
        const l = (i / N) * total;
        const p = dots.getPointAtLength(l);
        samples.push({ l, x: p.x, y: p.y });
      }
      // checkpoints at each section entry
      marks.innerHTML = "";
      checkpoints = cps.map((p) => {
        let best = samples[0];
        for (const s of samples) if (Math.hypot(s.x - p.x, s.y - p.y) < Math.hypot(best.x - p.x, best.y - p.y)) best = s;
        const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", String(best.x));
        c.setAttribute("cy", String(best.y));
        c.setAttribute("r", "7");
        c.setAttribute("class", "thread-cp");
        marks.appendChild(c);
        return { l: best.l, node: c };
      });
      shown = -1;
    };

    /** path length whose point is at the given page y (the samples run downward overall) */
    const lengthAtY = (y: number) => {
      let best = 0;
      for (let i = 0; i < samples.length; i++) {
        if (samples[i].y <= y) best = samples[i].l;
        else if (samples[i].y > y + 400) break;
      }
      return best;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!samples.length) return;
      const pageTop = page.getBoundingClientRect().top;
      const tipY = -pageTop + window.innerHeight * 0.58;
      const target = lengthAtY(tipY);
      cur.l += (target - cur.l) * 0.12;
      if (Math.abs(cur.l - shown) < 0.3) return;
      shown = cur.l;
      const p = dots.getPointAtLength(cur.l);
      const q = dots.getPointAtLength(Math.min(total, cur.l + 6));
      const ang = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      // reveal by clipping the cached layer (no repaint of the long path), move the plane on the compositor
      el.style.clipPath = `inset(0 0 ${Math.max(0, H - p.y - 6).toFixed(0)}px 0)`;
      plane.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${ang.toFixed(1)}deg)`;
      for (const c of checkpoints) {
        const on = cur.l >= c.l - 2;
        if (c.on !== on) {
          c.on = on;
          c.node.classList.toggle("is-on", on);
        }
      }
    };

    build();
    // rebuilding the path is expensive: only when the page really changed size, and once it has settled
    let lastH = page.scrollHeight;
    let lastW = page.clientWidth;
    let rt = 0;
    const ro = new ResizeObserver(() => {
      const h = page.scrollHeight;
      const w = page.clientWidth;
      if (Math.abs(h - lastH) < 40 && w === lastW) return;
      lastH = h;
      lastW = w;
      clearTimeout(rt);
      rt = window.setTimeout(() => {
        cancelAnimationFrame(raf);
        build();
        raf = requestAnimationFrame(tick);
      }, 250);
    });
    ro.observe(page);
    raf = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      clearTimeout(rt);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrap} className="thread" aria-hidden="true">
      <svg className="thread-svg" preserveAspectRatio="none">
        <path className="thread-dots" fill="none" />
        <g className="thread-marks" />
      </svg>
      <div className="thread-plane">
        <svg viewBox="-16 -16 32 32" className="plane-body">
          {/* paper plane, nose along +x */}
          <path d="M14 0 L-10 -9 L-5 0 L-10 9 Z" className="plane-wing" />
          <path d="M14 0 L-5 0 L-8 5 Z" className="plane-fold" />
          <path d="M-5 0 L14 0" className="plane-crease" />
        </svg>
      </div>
    </div>
  );
}
