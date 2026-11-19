"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import TLink from "@/components/site/TLink";

export type LabTile = { src: string; name: string; tag: string; body: string; href?: string; w: number; h: number };

const COLS = 5;
const ROWS = 4;

/**
 * An endless canvas of work. Drag, swipe or scroll in any direction; it wraps forever.
 * Click a piece to open it.
 */
export default function LabCanvas({ tiles }: { tiles: LabTile[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const slots = Array.from({ length: COLS * ROWS }, (_, k) => k % tiles.length);

  useEffect(() => {
    const el = root.current!;
    const items = Array.from(el.querySelectorAll<HTMLElement>(".lc-tile"));
    window.__lenis?.stop();
    document.documentElement.classList.add("is-canvas");
    let cw = 0;
    let ch = 0;
    const size = () => {
      const mobile = innerWidth < 760;
      cw = mobile ? innerWidth * 0.8 : Math.max(380, innerWidth * 0.36);
      ch = mobile ? innerHeight * 0.48 : Math.max(340, innerHeight * 0.62);
      el.style.setProperty("--cw", cw + "px");
      el.style.setProperty("--ch", ch + "px");
    };
    size();
    // jitter so the grid feels placed by hand
    const jit = items.map((_, k) => ({ x: ((k * 37) % 11) / 11 - 0.5, y: ((k * 53) % 13) / 13 - 0.5 }));
    let ox = 0;
    let oy = 0;
    let vx = -0.25;
    let vy = -0.12;
    let tx = 0;
    let ty = 0;
    let drag = false;
    let moved = 0;
    let px = 0;
    let py = 0;
    const wrap = (v: number, m: number) => ((v % m) + m) % m;
    const render = () => {
      const PW = cw * COLS;
      const PH = ch * ROWS;
      const sk = gsap.utils.clamp(-8, 8, vx * 0.35);
      items.forEach((it, k) => {
        const c = k % COLS;
        const r = Math.floor(k / COLS);
        const x = wrap(c * cw + ox + (r % 2 ? cw / 2 : 0), PW) - cw;
        const y = wrap(r * ch + oy, PH) - ch;
        it.style.transform = `translate3d(${x + jit[k].x * cw * 0.3}px, ${y + jit[k].y * ch * 0.28}px, 0) skewX(${sk}deg)`;
      });
    };
    const tick = () => {
      if (!drag) {
        tx += vx;
        ty += vy;
        vx *= 0.94;
        vy *= 0.94;
        if (Math.abs(vx) < 0.25 && Math.abs(vy) < 0.25 && open === null) {
          vx += (-0.25 - vx) * 0.02;
          vy += (-0.12 - vy) * 0.02;
        }
      }
      ox += (tx - ox) * 0.14;
      oy += (ty - oy) * 0.14;
      render();
    };
    gsap.ticker.add(tick);
    const down = (e: PointerEvent) => {
      drag = true;
      moved = 0;
      px = e.clientX;
      py = e.clientY;
      el.classList.add("is-drag");
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - px;
      const dy = e.clientY - py;
      px = e.clientX;
      py = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      tx += dx * 1.4;
      ty += dy * 1.4;
      vx = dx * 1.2;
      vy = dy * 1.2;
    };
    const up = () => {
      drag = false;
      el.classList.remove("is-drag");
    };
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      vx -= (e.shiftKey ? e.deltaY : e.deltaX) * 0.08;
      vy -= (e.shiftKey ? 0 : e.deltaY) * 0.08;
    };
    const click = (e: MouseEvent) => {
      if (moved > 8) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const t = (e.target as HTMLElement).closest<HTMLElement>(".lc-tile");
      if (t) setOpen(Number(t.dataset.i));
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      const s = 40;
      if (e.key === "ArrowLeft") vx += s * 0.3;
      if (e.key === "ArrowRight") vx -= s * 0.3;
      if (e.key === "ArrowUp") vy += s * 0.3;
      if (e.key === "ArrowDown") vy -= s * 0.3;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    el.addEventListener("wheel", wheel, { passive: false });
    el.addEventListener("click", click, true);
    window.addEventListener("keydown", key);
    window.addEventListener("resize", size);
    gsap.fromTo(items, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out", stagger: { each: 0.03, from: "center" }, delay: 0.3 });
    return () => {
      gsap.ticker.remove(tick);
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      el.removeEventListener("wheel", wheel);
      el.removeEventListener("click", click, true);
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", size);
      document.documentElement.classList.remove("is-canvas");
      window.__lenis?.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open === null) return;
    gsap.fromTo(".lc-modal", { clipPath: "inset(50% 50% 50% 50%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.inOut" });
    gsap.fromTo(".lc-modal-copy > *", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.06, delay: 0.45 });
  }, [open]);

  const t = open !== null ? tiles[open] : null;
  return (
    <section className="lc" aria-label="Labs canvas">
      <div ref={root} className="lc-field" data-cursor="Drag">
        {slots.map((ti, k) => {
          const tile = tiles[ti];
          const ar = tile.w / tile.h;
          const scale = [0.62, 0.42, 0.78, 0.5, 0.36, 0.7, 0.46, 0.56][k % 8];
          // landscape pieces size by width, portrait pieces by height, so nothing is forced into one frame
          const style = ar >= 1 ? { width: `${scale * 100}%`, aspectRatio: `${ar}` } : { height: `${Math.min(0.9, scale * 1.35) * 100}%`, aspectRatio: `${ar}` };
          return (
            <button key={k} className="lc-tile" data-i={ti} aria-label={`Open ${tile.name}`} tabIndex={k < tiles.length ? 0 : -1}>
              <span className="lc-wrap" style={style}>
                <span className="lc-img">
                <Image src={tile.src} alt="" fill sizes="(max-width: 760px) 50vw, 22vw" style={{ objectFit: "cover" }} draggable={false} />
                </span>
                <span className="lc-cap">
                  <b>{tile.name}</b> <span>{tile.tag}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <h1 className="sr-only">Neegles Labs: UI studies, product surfaces and visual R&amp;D. Drag or scroll to explore, click a piece to open it.</h1>
      {t && (
        <div className="lc-modal" role="dialog" aria-modal="true" aria-label={t.name} onClick={() => setOpen(null)}>
          <figure className="lc-modal-img" onClick={(e) => e.stopPropagation()}>
            <Image src={t.src} alt={`${t.name}: ${t.body}`} fill sizes="70vw" style={{ objectFit: "contain" }} />
          </figure>
          <div className="lc-modal-copy" onClick={(e) => e.stopPropagation()}>
            <p className="label">{t.tag}</p>
            <h2>{t.name}</h2>
            <p>{t.body}</p>
            {t.href && (
              <TLink href={t.href} className="btn btn-blue">
                See the project <span aria-hidden="true">↗</span>
              </TLink>
            )}
            <button className="btn btn-ghost" onClick={() => setOpen(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
