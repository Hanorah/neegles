"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TLink from "@/components/site/TLink";
import { approach } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** The Neegles N, from the brand mark (viewBox 0 0 18 20). */
export const N_PATH =
  "M14.808 20H11.064C7.512 20 7.448 2.784 3.288 1.28L6.872 20H0.6V0.287998H4.056C8.056 0.287998 11.128 13.312 14.136 16.512L11.064 0.287998H17.368V20H14.808Z";
const MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 20'><path d='${N_PATH}'/></svg>`,
)}")`;
/** A point in the middle of the N's left stem; the mask grows around it until the stem covers the screen. */
const ANCHOR = { x: 2.78 / 18, y: 0.5 };
const STEM = 4.3 / 18;

/**
 * The N draws itself, fills with the work, then opens until the work is the whole screen.
 * Then the showreel plays full-bleed.
 */
export default function NReveal() {
  const root = useRef<HTMLElement>(null);
  const [muted, setMuted] = useState(true);
  useEffect(() => {
    const v = root.current?.querySelector<HTMLVideoElement>(".nr-video");
    if (!v) return;
    v.muted = muted;
    if (!muted) v.play().catch(() => {});
  }, [muted]);

  useGSAP(
    () => {
      const sec = root.current!;
      const media = sec.querySelector<HTMLElement>(".nr-media")!;
      const outline = sec.querySelector<SVGSVGElement>(".nr-outline")!;
      const video = sec.querySelector<HTMLVideoElement>(".nr-video")!;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const st = { p: 0 };
      const geo = { W0: 0, H0: 0, x0: 0, y0: 0, vw: 0, vh: 0, smax: 1 };
      const measure = () => {
        geo.vw = sec.clientWidth;
        geo.vh = window.innerHeight;
        geo.H0 = Math.min(geo.vh * 0.56, (geo.vw * 0.62 * 20) / 18);
        geo.W0 = (geo.H0 * 18) / 20;
        geo.x0 = (geo.vw - geo.W0) / 2;
        geo.y0 = geo.vh * 0.58 - geo.H0 / 2;
        const unit = geo.W0;
        geo.smax = Math.max((geo.vw * 1.25) / (STEM * unit), (geo.vh * 1.3) / geo.H0) + 0.5;
        Object.assign(outline.style, { left: geo.x0 + "px", top: geo.y0 + "px", width: geo.W0 + "px", height: geo.H0 + "px" });
        paint();
      };
      const paint = () => {
        const p = st.p;
        const e = p * p * (3 - 2 * p);
        const s = 1 + (geo.smax - 1) * Math.pow(p, 2.2);
        const ax = geo.x0 + ANCHOR.x * geo.W0;
        const ay = geo.y0 + ANCHOR.y * geo.H0;
        const sx = ax + (geo.vw / 2 - ax) * e;
        const sy = ay + (geo.vh / 2 - ay) * e;
        const w = geo.W0 * s;
        const h = geo.H0 * s;
        const mx = sx - ANCHOR.x * w;
        const my = sy - ANCHOR.y * h;
        const v = p >= 0.999 ? "none" : MASK;
        media.style.maskImage = v;
        media.style.webkitMaskImage = v;
        media.style.maskSize = `${w}px ${h}px`;
        media.style.webkitMaskSize = `${w}px ${h}px`;
        media.style.maskPosition = `${mx}px ${my}px`;
        media.style.webkitMaskPosition = `${mx}px ${my}px`;
      };
      measure();

      if (reduce) {
        st.p = 1;
        paint();
        gsap.set([media, ".nr-ui"], { opacity: 1 });
        return;
      }

      // play only while the section is on screen
      const io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) video.play().catch(() => {});
        else video.pause();
      });
      io.observe(sec);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.4}`,
          pin: ".nr-stage",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefresh: measure,
        },
      });
      // the pen: the outline draws with the scroll, a dot riding the tip
      const path = sec.querySelector<SVGPathElement>(".nr-outline path")!;
      const pen = sec.querySelector<SVGCircleElement>(".nr-pen")!;
      const total = path.getTotalLength();
      const draw = { d: 0 };
      const ink = () => {
        path.style.strokeDashoffset = String(1 - draw.d);
        const pt = path.getPointAtLength(total * draw.d);
        pen.setAttribute("cx", String(pt.x));
        pen.setAttribute("cy", String(pt.y));
        pen.style.opacity = draw.d > 0.002 && draw.d < 0.995 ? "1" : "0";
      };
      ink();
      tl.to(draw, { d: 1, duration: 1.8, ease: "none", onUpdate: ink }, 0)
        .fromTo(".nr-intro", { opacity: 1, y: 0 }, { opacity: 0, y: -40, duration: 0.6 }, 1.5)
        .fromTo(media, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.85)
        .fromTo(video, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: "power1.out" }, 1.85)
        .to(".nr-outline", { opacity: 0, duration: 0.3 }, 2.2)
        .to(st, { p: 1, duration: 1.3, ease: "power1.in", onUpdate: paint }, 2.25)
        .fromTo(".nr-ui", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 3.4);
      tl.to({}, { duration: 0.3 });
      window.addEventListener("resize", measure);
      return () => {
        window.removeEventListener("resize", measure);
        io.disconnect();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="nr" aria-label="Showreel" data-thread="0.5">
      <div className="nr-stage">
        <div className="nr-intro">
          <p className="nr-intro-copy serif">{approach.statement}</p>
          <TLink href="/about" className="btn btn-ghost btn-sm" data-magnetic>
            About us <span aria-hidden="true">→</span>
          </TLink>
        </div>

        <svg className="nr-outline" viewBox="0 0 18 20" aria-hidden="true">
          <path d={N_PATH} pathLength="1" />
          <circle className="nr-pen" r="0.22" cx="0" cy="0" />
        </svg>

        <div className="nr-media" data-theme="dark">
          <video className="nr-video" src="/reel/showreel.mp4" poster="/reel/poster.jpg" muted={muted} loop playsInline preload="metadata" aria-label="Neegles showreel" />
          <span className="nr-shade" />
          <div className="nr-ui">
            <TLink href="/work" className="nr-all label">
              All work <span aria-hidden="true">→</span>
            </TLink>
            <button className="nr-sound label" onClick={() => setMuted((m) => !m)} aria-pressed={!muted}>
              <i className={muted ? "" : "is-on"} aria-hidden="true">
                <b />
                <b />
                <b />
                <b />
              </i>
              Sound {muted ? "off" : "on"}
            </button>
            <TLink href="/contact" className="btn btn-light btn-sm" data-magnetic>
              Start a project <span aria-hidden="true">↗</span>
            </TLink>
          </div>
        </div>
      </div>
    </section>
  );
}
