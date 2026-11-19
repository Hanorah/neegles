"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** A black band of headline words that slides with the scroll, faster when you scroll faster. */
export default function Band({ words = ["Always", "Shipping", "Software"] }: { words?: string[] }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const track = root.current!.querySelector<HTMLElement>(".bd-track")!;
      let x = 0;
      let v = 0;
      const tick = (_t: number, dt: number) => {
        const w = track.scrollWidth / 2;
        x -= (0.06 + v) * dt;
        v *= 0.92;
        if (x < -w) x += w;
        if (x > 0) x -= w;
        gsap.set(track, { x });
      };
      gsap.ticker.add(tick);
      const st = ScrollTrigger.create({ trigger: root.current, start: "top bottom", end: "bottom top", onUpdate: (s) => (v = gsap.utils.clamp(-3, 3, s.getVelocity() / 900)) });
      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root },
  );
  const row = [...words, ...words, ...words];
  return (
    <section ref={root} className="bd" data-theme="dark" aria-label={words.join(" ")}>
      <div className="bd-track" aria-hidden="true">
        {[...row, ...row].map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </section>
  );
}
