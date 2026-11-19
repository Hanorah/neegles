"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { approach } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Step = { title: string; body?: string; description?: string };

/**
 * The process as a row of cards that slides sideways while you scroll.
 * A line runs along the top and fills stage by stage; the card in focus turns blue.
 */
export default function ProcessTrack({
  label = "(05) Process",
  before = "Start to finish,",
  accent = "in six stages.",
  steps = approach.steps,
}: {
  label?: string;
  before?: string;
  accent?: string;
  steps?: Step[];
}) {
  const root = useRef<HTMLElement>(null);
  const n = steps.length;

  useGSAP(
    () => {
      const sec = root.current!;
      const track = sec.querySelector<HTMLElement>(".pt-track")!;
      const cards = gsap.utils.toArray<HTMLElement>(".pt-card", sec);
      const fill = sec.querySelector<HTMLElement>(".pt-fill")!;
      const count = sec.querySelector<HTMLElement>(".pt-count b");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        let cur = -1;
        const dist = () => Math.max(0, track.scrollWidth - sec.clientWidth + sec.clientWidth * 0.06);
        const skew = gsap.quickTo(cards, "skewX", { duration: 0.5, ease: "power3" });
        gsap.to(track, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => `+=${dist()}`,
            pin: ".pt-stage",
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (s) => {
              fill.style.transform = `scaleX(${s.progress})`;
              skew(gsap.utils.clamp(-6, 6, s.getVelocity() / -400));
              const i = Math.min(n - 1, Math.floor(s.progress * n * 0.999));
              if (i !== cur) {
                cur = i;
                cards.forEach((c, k) => {
                  c.classList.toggle("is-on", k === i);
                  c.classList.toggle("is-done", k < i);
                });
                if (count) count.textContent = String(i + 1).padStart(2, "0");
              }
            },
          },
        });
        cards[0].classList.add("is-on");
      });
      mm.add("(max-width: 900px), (prefers-reduced-motion: reduce)", () => {
        cards.forEach((c) => ScrollTrigger.create({ trigger: c, start: "top 65%", end: "bottom 35%", toggleClass: "is-on" }));
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="pt" id="process" data-thread="0.94">
      <div className="pt-stage">
        <div className="pt-head">
          <p className="label" data-type>
            {label}
          </p>
          <h2 className="pt-h" data-split>
            {before} <em className="serif">{accent}</em>
          </h2>
          <p className="pt-count label">
            <b>01</b> / {String(n).padStart(2, "0")}
          </p>
        </div>
        <div className="pt-rail" aria-hidden="true">
          <span className="pt-fill" />
        </div>
        <ol className="pt-track">
          {steps.map((s, i) => (
            <li key={s.title} className="pt-card">
              <span className="pt-dot" aria-hidden="true" />
              <span className="pt-n" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="pt-copy">
                <p className="label">Stage {String(i + 1).padStart(2, "0")}</p>
                <h3>{s.title}</h3>
                <p>{s.body ?? s.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
