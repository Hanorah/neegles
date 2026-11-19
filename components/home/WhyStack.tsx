"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { whyNeegles } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Reasons as a deck of full-width cards that stack as you scroll; the card underneath sinks back. */
export default function WhyStack({ label = "(04) Why Neegles" }: { label?: string }) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".ws-card", root.current);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        cards.forEach((c, i) => {
          const next = cards[i + 1];
          if (next) {
            gsap.to(c.querySelector(".ws-in"), {
              scale: 0.9,
              opacity: 0.35,
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top 14%", scrub: true },
            });
          }
          gsap.fromTo(c.querySelector(".ws-img img"), { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "top 14%", scrub: true } });
          gsap.fromTo(c.querySelector(".ws-n"), { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: c, start: "top 85%", end: "top 30%", scrub: true } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="ws" data-thread="0.06">
      <div className="ws-head">
        <p className="label" data-type>
          {label}
        </p>
        <h2 className="ws-h" data-split>
          Why teams <em className="serif">choose us.</em>
        </h2>
      </div>
      <ol className="ws-list">
        {whyNeegles.map((w, i) => (
          <li key={w.n} className={`ws-card ws-${w.tone}`} style={{ top: `calc(12vh + ${i * 22}px)` }} data-theme={w.tone === "paper" ? undefined : "dark"}>
            <div className="ws-in">
              <span className="ws-n" aria-hidden="true">
                {w.n}
              </span>
              <div className="ws-copy">
                <p className="label">Reason {w.n}</p>
                <h3 className="ws-title">{w.title}</h3>
                <p className="ws-body">{w.body}</p>
              </div>
              <figure className="ws-img">
                <Image src={w.image} alt="" fill sizes="(max-width: 900px) 90vw, 40vw" style={{ objectFit: "cover" }} />
              </figure>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
