"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { pages } from "@/lib/content";

const labelFor = (href: string) => {
  const base = "/" + (href.split("#")[0].split("/")[1] ?? "");
  if (base === "/") return "Home";
  return pages.find((p) => p.href === base)?.label ?? "Neegles";
};

/** Route curtain: an ink panel rises, the destination types itself, the panel lifts away on the new page. */
export default function Transition() {
  const router = useRouter();
  const path = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const covering = useRef(false);
  const typed = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onGo = (e: Event) => {
      const href = (e as CustomEvent<string>).detail;
      const text = labelFor(href);
      setLabel(text);
      covering.current = true;
      const el = panel.current!;
      gsap.killTweensOf(el);
      gsap.set(el, { display: "flex", yPercent: 100, borderRadius: "50% 50% 0 0 / 12% 12% 0 0" });
      const tl = gsap.timeline({ onComplete: () => router.push(href) });
      tl.to(el, { yPercent: 0, borderRadius: "0% 0% 0 0 / 0% 0% 0 0", duration: 0.75, ease: "expo.inOut" });
      // typewriter the destination
      const t = typed.current;
      if (t) {
        t.textContent = "";
        const chars = { n: 0 };
        tl.to(chars, { n: text.length, duration: 0.35, ease: "none", onUpdate: () => (t.textContent = text.slice(0, Math.round(chars.n))) }, 0.35);
      }
    };
    window.addEventListener("neegles:go", onGo);
    return () => window.removeEventListener("neegles:go", onGo);
  }, [router]);

  useEffect(() => {
    if (!covering.current) return;
    covering.current = false;
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const el = panel.current!;
    gsap.to(el, {
      yPercent: -100,
      borderRadius: "0 0 50% 50% / 0 0 12% 12%",
      duration: 0.9,
      delay: 0.15,
      ease: "expo.inOut",
      onComplete: () => {
        gsap.set(el, { display: "none" });
      },
    });
  }, [path]);

  return (
    <div ref={panel} className="curtain" aria-hidden="true" style={{ display: "none" }}>
      <p className="curtain-label">
        <span ref={typed}>{label}</span>
        <i className="caret" />
      </p>
      <p className="curtain-meta">Neegles® — software, built to ship</p>
    </div>
  );
}
