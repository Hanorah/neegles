"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { approach } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Six stages on a dial. Scroll turns the ring so the current stage sits at the top,
 * the arc fills, and the stage rolls in at the centre.
 */
export default function ProcessDial({ label = "(05) Process" }: { label?: string }) {
  const root = useRef<HTMLElement>(null);
  const steps = approach.steps;
  const n = steps.length;

  useGSAP(
    () => {
      const sec = root.current!;
      const ring = sec.querySelector<SVGGElement>(".pd-ring")!;
      const arc = sec.querySelector<SVGCircleElement>(".pd-arc")!;
      const nodes = gsap.utils.toArray<SVGGElement>(".pd-node", sec);
      const panes = gsap.utils.toArray<HTMLElement>(".pd-pane", sec);
      const lis = gsap.utils.toArray<HTMLElement>(".pd-steps li", sec);
      const digits = sec.querySelector<HTMLElement>(".pd-digits")!;
      const labels = gsap.utils.toArray<SVGGElement>(".pd-label", sec);
      let cur = -1;
      const set = (i: number) => {
        if (i === cur) return;
        const dir = i > cur ? 1 : -1;
        const prev = cur;
        cur = i;
        nodes.forEach((nd, k) => nd.classList.toggle("is-on", k <= i));
        lis.forEach((l, k) => l.classList.toggle("is-on", k === i));
        gsap.to(digits, { yPercent: (-100 * i) / n, duration: 0.9, ease: "expo.out" });
        if (prev >= 0) gsap.to(panes[prev], { yPercent: -40 * dir, opacity: 0, filter: "blur(8px)", duration: 0.5, ease: "power2.in" });
        gsap.fromTo(panes[i], { yPercent: 40 * dir, opacity: 0, filter: "blur(8px)" }, { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, delay: prev >= 0 ? 0.25 : 0, ease: "expo.out" });
      };
      gsap.set(panes, { opacity: 0 });
      set(0);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { p: 0 };
        gsap.to(st, {
          p: 1,
          ease: "none",
          onUpdate: () => {
            const p = st.p;
            gsap.set(ring, { rotation: -p * (360 - 360 / n), svgOrigin: "500 500" });
            gsap.set(labels, { rotation: p * (360 - 360 / n), svgOrigin: "0 0" });
            arc.style.strokeDashoffset = String(1 - (p * (n - 1)) / n - 0.0001);
            set(Math.min(n - 1, Math.round(p * (n - 1))));
          },
          scrollTrigger: { trigger: sec, start: "top top", end: () => `+=${window.innerHeight * 0.45 * n}`, pin: ".pd-stage", scrub: 0.6 },
        });
      });
    },
    { scope: root },
  );

  const R = 400;
  return (
    <section ref={root} className="pd" id="process" data-theme="dark" data-thread="0.9">
      <div className="pd-stage">
        <div className="pd-side">
          <p className="label" data-type>
            {label}
          </p>
          <h2 className="pd-h" data-split>
            Start to finish, <em className="serif">in six stages.</em>
          </h2>
          <ol className="pd-steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span>0{i + 1}</span> {s.title}
              </li>
            ))}
          </ol>
        </div>
        <div className="pd-dial">
          <svg viewBox="0 0 1000 1000" aria-hidden="true">
            <circle cx="500" cy="500" r={R} className="pd-track" />
            <circle cx="500" cy="500" r={R} className="pd-arc" pathLength="1" transform="rotate(-90 500 500)" />
            <g className="pd-ring">
              {Array.from({ length: 72 }).map((_, k) => {
                const a = (k / 72) * Math.PI * 2;
                const r1 = R + 26;
                const r2 = R + (k % 12 === 0 ? 48 : 36);
                return <line key={k} x1={500 + Math.sin(a) * r1} y1={500 - Math.cos(a) * r1} x2={500 + Math.sin(a) * r2} y2={500 - Math.cos(a) * r2} className="pd-tick" />;
              })}
              {steps.map((s, i) => {
                const a = (i / n) * Math.PI * 2;
                const x = 500 + Math.sin(a) * R;
                const y = 500 - Math.cos(a) * R;
                return (
                  <g key={s.title} className="pd-node" transform={`translate(${x} ${y})`}>
                    <circle r="15" />
                    <g className="pd-label">
                      <text y="-34" textAnchor="middle">
                        0{i + 1}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
          <div className="pd-center">
            <div className="pd-count" aria-hidden="true">
              <div className="pd-digits">
                {steps.map((_, i) => (
                  <span key={i}>0{i + 1}</span>
                ))}
              </div>
            </div>
            <div className="pd-panes">
              {steps.map((s) => (
                <div key={s.title} className="pd-pane">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
