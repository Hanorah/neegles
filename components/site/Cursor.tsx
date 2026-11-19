"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/** Dot + ring cursor in difference blend. Elements with data-cursor="Label" grow the ring and show the label. */
export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    const label = document.createElement("span");
    ring.appendChild(label);
    document.body.append(ring, dot);
    const dx = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power3" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power3" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = e.target as HTMLElement | null;
      const lab = t?.closest<HTMLElement>("[data-cursor]");
      const hot = !!t?.closest("a, button, [role=button], label, input, textarea");
      ring.classList.toggle("is-label", !!lab);
      ring.classList.toggle("is-hot", hot && !lab);
      label.textContent = lab?.dataset.cursor ?? "";
    };
    const down = () => ring.classList.add("is-down");
    const up = () => ring.classList.remove("is-down");
    const leave = () => ring.classList.add("is-gone");
    const enter = () => ring.classList.remove("is-gone");
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);

    // magnetic buttons (re-bound as pages change)
    const bound = new WeakSet<Element>();
    const bind = () => {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        if (bound.has(el)) return;
        bound.add(el);
        const mx = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const my = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        el.addEventListener("pointermove", (e) => {
          const r = el.getBoundingClientRect();
          mx((e.clientX - (r.left + r.width / 2)) * 0.32);
          my((e.clientY - (r.top + r.height / 2)) * 0.42);
        });
        el.addEventListener("pointerleave", () => {
          mx(0);
          my(0);
        });
      });
    };
    bind();
    const mo = new MutationObserver(bind);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      root.classList.remove("has-cursor");
      dot.remove();
      ring.remove();
      mo.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, []);
  return null;
}
