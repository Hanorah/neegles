"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TLink from "@/components/site/TLink";
import { capabilities } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pics = ["/renders/footera.webp", "/renders/kike.webp", "/renders/prism.webp", "/renders/idara.webp", "/renders/profix.webp"];

/** Five practices as giant rows. Each fills with ink as it scrolls in; hover floods it blue and floats a picture under the cursor. */
export default function ServicesList() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const sec = root.current!;
      sec.querySelectorAll<HTMLElement>(".sl-title").forEach((t) => {
        gsap.fromTo(t, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", ease: "none", scrollTrigger: { trigger: t, start: "top 88%", end: "top 45%", scrub: true } });
      });
      const float = sec.querySelector<HTMLElement>(".sl-float")!;
      const imgs = gsap.utils.toArray<HTMLElement>(".sl-float-img", sec);
      const xTo = gsap.quickTo(float, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(float, "y", { duration: 0.6, ease: "power3" });
      const rTo = gsap.quickTo(float, "rotation", { duration: 0.8, ease: "power3" });
      let lx = 0;
      const move = (e: PointerEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-12, 12, (e.clientX - lx) * 0.6));
        lx = e.clientX;
      };
      window.addEventListener("pointermove", move);
      sec.querySelectorAll<HTMLElement>(".sl-row").forEach((row, i) => {
        row.addEventListener("pointerenter", () => {
          float.classList.add("is-on");
          imgs.forEach((im, k) => im.classList.toggle("is-on", k === i));
        });
        row.addEventListener("pointerleave", () => float.classList.remove("is-on"));
      });
      return () => window.removeEventListener("pointermove", move);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="sl" id="services" data-thread="0.92">
      <div className="sl-head">
        <p className="label" data-type>
          (03) What we do
        </p>
        <h2 className="sl-h" data-split>
          Five practices. <em className="serif">One team.</em>
        </h2>
      </div>
      <ol className="sl-list">
        {capabilities.map((c, i) => (
          <li key={c.id}>
            <TLink href={`/services#${c.id}`} className="sl-row" data-cursor="Explore">
              <span className="sl-n label">0{i + 1}</span>
              <span className="sl-title" data-text={c.title}>
                {c.title}
              </span>
              <span className="sl-kicker serif">{c.kicker}</span>
              <span className="sl-tags">
                {c.includes.slice(0, 3).map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </span>
              <span className="sl-arrow" aria-hidden="true">
                ↗
              </span>
            </TLink>
          </li>
        ))}
      </ol>
      <div className="sl-float" aria-hidden="true">
        {pics.map((p) => (
          <span key={p} className="sl-float-img">
            <Image src={p} alt="" fill sizes="340px" style={{ objectFit: "cover" }} />
          </span>
        ))}
      </div>
    </section>
  );
}
