"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Wrap every character of an element's text nodes in a span, keeping inline markup (em, span.dim, br). */
function charify(el: HTMLElement) {
  if (el.dataset.charified) return Array.from(el.querySelectorAll<HTMLElement>(".tc"));
  el.dataset.charified = "1";
  const out: HTMLElement[] = [];
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        for (const ch of child.textContent ?? "") {
          const s = document.createElement("span");
          s.className = "tc";
          s.textContent = ch;
          frag.appendChild(s);
          out.push(s);
        }
        child.replaceWith(frag);
      } else if (child.nodeType === 1 && (child as HTMLElement).tagName !== "BR") walk(child);
    }
  };
  walk(el);
  return out;
}

/** Typewriter: characters appear one by one behind a blinking caret. */
export function typeIn(el: HTMLElement, opts: { speed?: number; delay?: number; max?: number } = {}) {
  const chars = charify(el);
  const caret = document.createElement("i");
  caret.className = "caret";
  const per = Math.min(opts.speed ?? 0.032, (opts.max ?? 2.2) / Math.max(1, chars.length));
  gsap.set(chars, { opacity: 0 });
  const state = { n: 0 };
  let last = -1;
  return gsap.to(state, {
    n: chars.length,
    duration: per * chars.length,
    delay: opts.delay ?? 0,
    ease: "none",
    onStart: () => el.classList.add("is-typing"),
    onUpdate: () => {
      const n = Math.floor(state.n);
      if (n === last) return;
      for (let i = Math.max(0, last); i < n; i++) chars[i].style.opacity = "1";
      last = n;
      const at = chars[Math.max(0, n - 1)];
      at?.after(caret);
    },
    onComplete: () => {
      chars.forEach((c) => (c.style.opacity = "1"));
      el.classList.remove("is-typing");
      if (!el.hasAttribute("data-type-keep")) setTimeout(() => caret.remove(), 1400);
    },
  });
}

/**
 * Page-level choreography from data attributes (re-run on every route):
 *  [data-type]      typewriter on enter (data-type-delay="0.3")
 *  [data-split]     words rise out of a line mask
 *  [data-fade]      fade, rise and un-blur
 *  [data-reveal]    image unmasks upward
 *  [data-parallax]  drifts on scroll (value = yPercent range)
 *  [data-stagger]   children cascade in
 *  [data-count]     numbers count up
 */
export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      document.documentElement.classList.add("motion");
      const page = document.querySelector(".page") ?? document;

      page.querySelectorAll<HTMLElement>("[data-type]").forEach((el) => {
        const delay = parseFloat(el.dataset.typeDelay || "0");
        const immediate = el.hasAttribute("data-type-now");
        const run = () => typeIn(el, { delay, max: parseFloat(el.dataset.typeMax || "2.2") });
        charify(el).forEach((c) => (c.style.opacity = "0"));
        if (immediate) {
          const go = () => run();
          if (document.documentElement.classList.contains("is-loaded")) go();
          else window.addEventListener("neegles:loaded", go, { once: true });
        } else ScrollTrigger.create({ trigger: el, start: "top 86%", once: true, onEnter: run });
      });

      page.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const now = el.hasAttribute("data-split-now");
        SplitText.create(el, {
          type: "lines,words",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.words, {
              yPercent: 115,
              filter: "blur(10px)",
              duration: 1.3,
              delay: now ? 0.35 : 0,
              ease: "expo.out",
              stagger: 0.05,
              scrollTrigger: now ? undefined : { trigger: el, start: "top 88%" },
            }),
        });
      });

      // big words that drift sideways with the scroll
      page.querySelectorAll<HTMLElement>("[data-drift]").forEach((el) => {
        const amt = parseFloat(el.dataset.drift || "-15");
        gsap.fromTo(el, { xPercent: 0 }, { xPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } });
      });

      // headings come into focus as they reach the top (blur sticky feel)
      page.querySelectorAll<HTMLElement>(".h-xl, .phero-title").forEach((el) => {
        if (el.closest(".wk-stage, [data-noblur]")) return;
        gsap.to(el, { filter: "blur(6px)", opacity: 0.5, ease: "none", scrollTrigger: { trigger: el, start: "top 12%", end: "bottom -20%", scrub: true } });
      });

      page.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.from(el, {
          y: 44,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.2,
          delay: parseFloat(el.dataset.fade || "0") || 0,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
      });

      page.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%" } },
        );
        const img = el.querySelector("img");
        if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });

      page.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "12");
        gsap.fromTo(
          el,
          { yPercent: -amt / 2 },
          { yPercent: amt / 2, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });

      page.querySelectorAll<HTMLElement>("[data-stagger]").forEach((list) => {
        gsap.from(list.children, {
          y: 60,
          rotateX: -28,
          opacity: 0,
          transformPerspective: 900,
          transformOrigin: "50% 0%",
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.07,
          scrollTrigger: { trigger: list, start: "top 86%" },
        });
      });

      page.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const to = parseFloat(el.dataset.count || "0");
        const o = { v: 0 };
        gsap.to(o, {
          v: to,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = String(Math.round(o.v)).padStart(el.dataset.pad ? +el.dataset.pad : 0, "0")),
        });
      });

      // a line strikes through as it scrolls past ([data-strike] holds a .strike child)
      page.querySelectorAll<HTMLElement>("[data-strike]").forEach((el) => {
        const line = el.querySelector(".strike");
        if (line) gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 72%", end: "top 38%", scrub: true } });
      });
      // rows open while they cross the middle of the screen
      page.querySelectorAll<HTMLElement>("[data-focus]").forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 40%", toggleClass: "is-on" });
      });

      // big type leans into fast scrolling, then settles
      const leaners = gsap.utils.toArray<HTMLElement>("[data-lean]");
      const setters = leaners.map((el) => gsap.quickTo(el, "skewY", { duration: 0.5, ease: "power3" }));
      let skew = 0;
      const st = ScrollTrigger.create({ onUpdate: (s) => (skew = gsap.utils.clamp(-5, 5, s.getVelocity() / -400)) });
      const decay = () => {
        skew *= 0.88;
        if (Math.abs(skew) < 0.01) skew = 0;
        setters.forEach((s) => s(skew));
      };
      gsap.ticker.add(decay);

      requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        gsap.ticker.remove(decay);
        st.kill();
        document.documentElement.classList.remove("motion");
      };
    });
  });

  return null;
}
