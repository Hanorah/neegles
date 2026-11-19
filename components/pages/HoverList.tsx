"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import TLink from "@/components/site/TLink";

export type HoverItem = { key: string; href: string; name: string; kind: string; tags: string[]; image: string; summary: string };

/** Big typographic index. The hovered row's screenshot floats with the cursor, tilting with its speed. */
export default function HoverList({ items, filters = true }: { items: HoverItem[]; filters?: boolean }) {
  const [filter, setFilter] = useState("All");
  const [hover, setHover] = useState<number | null>(null);
  const float = useRef<HTMLDivElement>(null);
  const kinds = ["All", ...Array.from(new Set(items.map((i) => i.kind)))];
  const shown = items.filter((i) => filter === "All" || i.kind === filter);

  useEffect(() => {
    const el = float.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    const qx = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const qy = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
    const qr = gsap.quickTo(el, "rotate", { duration: 0.8, ease: "power3" });
    let lx = 0;
    const on = (e: PointerEvent) => {
      qx(e.clientX);
      qy(e.clientY);
      qr(gsap.utils.clamp(-12, 12, (e.clientX - lx) * 0.6));
      lx = e.clientX;
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);

  return (
    <div className="hlist">
      {filters && (
        <div className="hl-filters" role="group" aria-label="Filter">
          {kinds.map((k) => (
            <button key={k} className={k === filter ? "is-on" : ""} aria-pressed={k === filter} onClick={() => setFilter(k)} data-magnetic>
              {k}
              <sup>{k === "All" ? items.length : items.filter((i) => i.kind === k).length}</sup>
            </button>
          ))}
        </div>
      )}
      <ol className="hl-list" onPointerLeave={() => setHover(null)}>
        {shown.map((it, i) => (
          <li key={it.key} onPointerEnter={() => setHover(items.indexOf(it))}>
            <TLink href={it.href} className="hl-row" data-cursor="View">
              <span className="hl-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="hl-name">{it.name}</span>
              <span className="hl-kind">{it.kind}</span>
              <span className="hl-tags">{it.tags.join(" · ")}</span>
              <span className="hl-arrow" aria-hidden="true">
                ↗
              </span>
              <span className="hl-thumb" aria-hidden="true">
                <Image src={it.image} alt="" fill sizes="40vw" style={{ objectFit: "cover", objectPosition: "50% 0%" }} />
              </span>
            </TLink>
          </li>
        ))}
      </ol>
      <div ref={float} className={`hl-float ${hover !== null ? "is-on" : ""}`} aria-hidden="true">
        {items.map((it, k) => (
          <div key={it.key} className={`hl-float-img ${k === hover ? "is-on" : ""}`}>
            <Image src={it.image} alt="" fill sizes="420px" style={{ objectFit: "cover", objectPosition: "50% 0%" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
