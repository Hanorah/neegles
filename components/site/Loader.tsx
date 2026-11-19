"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/** First-visit intro: a counter runs to 100, the name types, then the screen splits open. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const done = () => {
      document.documentElement.classList.add("is-loaded");
      window.dispatchEvent(new Event("neegles:loaded"));
      setShow(false);
    };
    let seen = false;
    try {
      seen = sessionStorage.getItem("neegles:intro") === "1";
      sessionStorage.setItem("neegles:intro", "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done();
      return;
    }
    const el = root.current!;
    const num = el.querySelector<HTMLElement>(".loader-num")!;
    const name = el.querySelector<HTMLElement>(".loader-name span")!;
    const word = "Neegles";
    const c = { v: 0, n: 0 };
    const tl = gsap.timeline({ onComplete: done });
    tl.to(c, { v: 100, duration: 1.6, ease: "power2.inOut", onUpdate: () => (num.textContent = String(Math.round(c.v)).padStart(3, "0")) }, 0);
    tl.to(c, { n: word.length, duration: 0.9, ease: "none", onUpdate: () => (name.textContent = word.slice(0, Math.round(c.n))) }, 0.3);
    tl.to(".loader-half-l", { xPercent: -100, duration: 1.0, ease: "expo.inOut" }, 1.85);
    tl.to(".loader-half-r", { xPercent: 100, duration: 1.0, ease: "expo.inOut" }, 1.85);
    tl.to(".loader-ui", { opacity: 0, duration: 0.3 }, 1.75);
    return () => {
      tl.kill();
    };
  }, []);

  if (!show) return null;
  return (
    <div ref={root} className="loader" aria-hidden="true">
      <div className="loader-half loader-half-l" />
      <div className="loader-half loader-half-r" />
      <div className="loader-ui">
        <p className="loader-name">
          <span />
          <i className="caret" />
        </p>
        <p className="loader-num">000</p>
        <p className="loader-tag">Software, built to ship.</p>
      </div>
    </div>
  );
}
