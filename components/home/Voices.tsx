"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TLink from "@/components/site/TLink";
import { voices } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Client names, big. The row crossing the middle of the screen opens to show what they said. */
export default function Voices() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".vc-row", root.current);
      rows.forEach((r) => {
        ScrollTrigger.create({ trigger: r, start: "top 58%", end: "bottom 42%", toggleClass: "is-on" });
      });
    },
    { scope: root },
  );
  return (
    <section ref={root} className="vc" data-thread="0.94">
      <div className="vc-head">
        <p className="label" data-type>
          (06) Clients
        </p>
        <h2 className="vc-h" data-split>
          In their <em className="serif">words.</em>
        </h2>
        <TLink href="/contact" className="btn btn-dark" data-magnetic>
          Be next <span aria-hidden="true">↗</span>
        </TLink>
      </div>
      <ol className="vc-list">
        {voices.map((v) => {
          const co = v.role.split(", ").slice(1).join(", ") || v.role;
          return (
            <li key={v.name} className="vc-row" tabIndex={0}>
              <p className="vc-co">{co}</p>
              <div className="vc-body">
                <div>
                  <blockquote className="serif">“{v.quote}”</blockquote>
                  <p className="label">
                    {v.name} · {v.role.split(", ")[0]}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
