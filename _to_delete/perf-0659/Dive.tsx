"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { capabilities } from "@/lib/content";
import manifest from "@/lib/dive-manifest.json";

/** Where the 16:9 film frame sits on a cw×ch screen (CSS px). */
function filmRect(cw: number, ch: number) {
  const s = Math.max(cw / 1600, Math.min(ch / 900, (cw / 1600) * 2.0));
  const w = 1600 * s;
  const h = 900 * s;
  const y = h >= ch ? (ch - h) / 2 + ch * 0.05 : (ch - h) / 2;
  return { x: (cw - w) / 2, y, w, h };
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Manifest = { frames: number; cut: number; width: number; height: number; tiers: Record<string, string> };
const M = manifest as Manifest;

const pad = (n: number) => String(n).padStart(4, "0");

/** Pick the lightest frame set that still looks sharp on this screen. */
function pickTier() {
  const w = Math.min(window.innerWidth, 2560) * Math.min(window.devicePixelRatio || 1, 2);
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData || /2g/.test(conn?.effectiveType || "")) return "sm";
  if (w <= 900) return "sm";
  return "md";
}

/**
 * The opening: a pre-rendered (Blender / Mantaflow / Cycles) laptop-into-water sequence,
 * scrubbed by scroll on a canvas. Frames are painted, not seeked, so scrubbing is exact
 * in both directions on every browser.
 */
export default function Dive() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const current = useRef(-1);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(0);

  // Load frames: first frame immediately, then the rest in scrub order with limited concurrency.
  useEffect(() => {
    const tier = pickTier();
    const base = M.tiers[tier];
    const list: (HTMLImageElement | null)[] = new Array(M.frames).fill(null);
    frames.current = list;
    let alive = true;
    let count = 0;

    const load = (i: number) =>
      new Promise<void>((res) => {
        const img = new Image();
        img.decoding = "async";
        img.src = `${base}/${pad(i + 1)}.webp`;
        const done = () => {
          if (!alive) return res();
          list[i] = img;
          count++;
          setLoaded(count);
          if (i === Math.max(0, current.current) || i === 0) draw(Math.max(0, current.current));
          res();
        };
        img.onload = () => (img.decode ? img.decode().then(done, done) : done());
        img.onerror = () => res();
      });

    const start = async () => {
      await load(0);
      if (!alive) return;
      setReady(true);
      // coarse pass first (every 4th frame) so a fast scroller always sees motion, then fill in
      const order: number[] = [];
      for (let s of [8, 4, 2, 1]) for (let i = 0; i < M.frames; i += s) if (!order.includes(i)) order.push(i);
      let k = 0;
      const worker = async () => {
        while (alive && k < order.length) {
          const i = order[k++];
          if (!list[i]) await load(i);
        }
      };
      await Promise.all([worker(), worker(), worker(), worker()]);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { rootMargin: "250% 0px" },
    );
    if (root.current) io.observe(root.current);
    return () => {
      alive = false;
      io.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Nearest loaded frame to i (so scrubbing never shows a blank while loading).
  function nearest(i: number) {
    const f = frames.current;
    if (f[i]) return f[i];
    for (let d = 1; d < M.frames; d++) {
      if (f[i - d]) return f[i - d];
      if (f[i + d]) return f[i + d];
    }
    return null;
  }

  function draw(i: number) {
    const img = nearest(i);
    if (!img) return;
    paint(img, 0);
  }

  function paint(img: HTMLImageElement, shift: number) {
    const c = canvas.current;
    if (!c) return;
    if (!img) return;
    const ctx = c.getContext("2d", { alpha: false });
    if (!ctx) return;
    const cw = c.width;
    const ch = c.height;
    const dpr = cw / Math.max(1, c.clientWidth);
    const fr = filmRect(c.clientWidth, c.clientHeight);
    const w = fr.w * dpr;
    const h = fr.h * dpr;
    const y = fr.y * dpr + shift * dpr;
    // sample the frame's own top/bottom colour so letterboxing on tall screens is invisible
    const probe = probeCtx();
    let top = "rgb(40,70,160)", bot = "rgb(10,30,90)";
    if (probe) {
      probe.drawImage(img, 0, 0, 1, 16);
      const d = probe.getImageData(0, 0, 1, 16).data; // row 0 = frame top, row 15 = frame bottom
      top = `rgb(${d[0]},${d[1]},${d[2]})`;
      bot = `rgb(${d[60]},${d[61]},${d[62]})`;
    }
    ctx.fillStyle = top;
    ctx.fillRect(0, 0, cw, ch / 2);
    ctx.fillStyle = bot;
    ctx.fillRect(0, ch / 2, cw, ch / 2);
    ctx.drawImage(img, (cw - w) / 2, y, w, h);
    if (shift > 0) {
      // above the tank: the backdrop just carries on upward
      const g0 = ctx.createLinearGradient(0, Math.max(0, y - 2), 0, y + h * 0.2);
      ctx.fillStyle = top;
      ctx.fillRect(0, 0, cw, Math.max(0, y));
      g0.addColorStop(0, top);
      g0.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g0;
      ctx.fillRect(0, y - 1, cw, h * 0.2);
    }
    if (y > 1 && shift === 0) {
      const f = h * 0.25;
      let g = ctx.createLinearGradient(0, y, 0, y + f);
      g.addColorStop(0, top);
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, y - 1, cw, f + 1);
      g = ctx.createLinearGradient(0, y + h - f, 0, y + h);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, bot);
      ctx.fillStyle = g;
      ctx.fillRect(0, y + h - f, cw, f + 1);
    }
  }

  const probeRef = useRef<CanvasRenderingContext2D | null>(null);
  function probeCtx() {
    if (!probeRef.current) {
      const c = document.createElement("canvas");
      c.width = 1;
      c.height = 16;
      probeRef.current = c.getContext("2d", { willReadFrequently: true });
    }
    return probeRef.current;
  }

  // Size the canvas to the screen.
  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
      draw(Math.max(0, current.current));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        const FALL = 0;
        const FILM = 92;
        tl.eventCallback("onUpdate", () => {
          const T = tl.time();
          const i = Math.min(M.frames - 1, Math.max(0, Math.round(((T - FALL) / FILM) * (M.frames - 1))));
          if (i !== current.current) {
            current.current = i;
            draw(i);
          }
        });
        tl.to({}, { duration: FALL + FILM }, 0);

        // giant line drifts up and fades as we go under
        tl.fromTo(".dive-giant", { yPercent: 0, opacity: 1 }, { yPercent: -18, opacity: 0.0, duration: 60, ease: "power1.in" }, 10);
        tl.to(".dive-kicker", { opacity: 0, duration: 6 }, 4);

        // capability panels, one at a time, alternating sides (like a spec sheet surfacing)
        const panels = gsap.utils.toArray<HTMLElement>(".dive-panel");
        const span = 74 / panels.length;
        panels.forEach((el, i) => {
          const at = 12 + i * span;
          tl.fromTo(el, { opacity: 0, y: 30, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: span * 0.3, ease: "power2.out" }, at);
          tl.to(el, { opacity: 0, y: -20, filter: "blur(6px)", duration: span * 0.25, ease: "power2.in" }, at + span * 0.75);
        });

        // depth gauge
        tl.fromTo(".dive-depth-fill", { scaleY: 0 }, { scaleY: 1, duration: 92 }, 0);

        // surface into the paper site
        tl.fromTo(".dive-veil", { opacity: 0 }, { opacity: 1, duration: 8, ease: "power1.in" }, 92);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // a single still that tells the story; all copy visible
        current.current = Math.round(M.frames * 0.4);
        draw(current.current);
      });
    },
    { scope: root },
  );

  const pct = Math.round((loaded / M.frames) * 100);

  return (
    <section ref={root} className="dive" id="dive" aria-labelledby="dive-title" data-thread="0.5">
      <div className="dive-stage">
        {/* the first frame doubles as the poster (and the LCP image) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="dive-poster" src={`${M.tiers.md}/0001.webp`} alt="" aria-hidden="true" loading="lazy" style={{ opacity: ready ? 0 : 1 }} />
        <canvas ref={canvas} className="dive-canvas" aria-hidden="true" />
        <div className="dive-grain" aria-hidden="true" />

        <p className="caps dive-kicker">Web · Mobile · Enterprise software</p>
        <h2 id="dive-title" className="dive-giant">
          Software, built to ship<span className="dive-tm">.</span>
        </h2>

        {capabilities.map((c, i) => (
          <article key={c.id} className={`dive-panel ${i % 2 ? "is-right" : "is-left"}`}>
            <p className="dive-panel-n caps">0{i + 1} / {c.title}</p>
            <h3>{c.kicker}</h3>
            <p className="caps">{c.body}</p>
          </article>
        ))}

        <div className="dive-depth caps" aria-hidden="true">
          <span>0 m</span>
          <span className="dive-depth-track">
            <span className="dive-depth-fill" />
          </span>
          <span>{pct < 100 ? `${pct}%` : "deep"}</span>
        </div>

        <div className="dive-veil" aria-hidden="true" />
      </div>
    </section>
  );
}
