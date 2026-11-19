"use client";

import { useEffect, useRef } from "react";

/**
 * Infinite marquee. Speeds up with scroll velocity and reverses with scroll direction.
 * Pauses entirely for reduced motion.
 */
export default function Marquee({
  items,
  repeat = 4,
  className = "",
  speed = 60,
  sep = "",
}: {
  items: string[];
  repeat?: number;
  className?: string;
  speed?: number;
  sep?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0;
    let dir = 1;
    let boost = 0;
    let last = performance.now();
    let lastY = window.scrollY;
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (dy !== 0) dir = dy > 0 ? 1 : -1;
      boost += (Math.min(Math.abs(dy) * 0.6, 14) - boost) * 0.08;
      if (visible) {
        const half = el.scrollWidth / 2;
        x -= dir * (speed + boost * speed * 0.35) * dt;
        if (x <= -half) x += half;
        if (x > 0) x -= half;
        el.style.transform = `translate3d(${x}px,0,0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [speed]);

  const seq = Array.from({ length: repeat }, () => items).flat();
  return (
    <div className={`marquee ${className}`}>
      <p className="sr-only">{items.join(" ")}</p>
      <div ref={track} className="marquee-track" aria-hidden="true">
        {[0, 1].map((k) => (
          <div className="marquee-seq" key={k}>
            {seq.map((s, i) => (
              <span key={i} className="marquee-item">
                {s}
                {sep && <span className="marquee-sep">{sep}</span>}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
