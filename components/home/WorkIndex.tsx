"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TLink from "@/components/site/TLink";
import { workItems, renders } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** A stack of giant project names. Scroll walks the list; the active name burns through the image behind it. */
export default function WorkIndex() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const sec = root.current!;
      const items = gsap.utils.toArray<HTMLElement>(".wi-view .wi-item", sec);
      const dupItems = gsap.utils.toArray<HTMLElement>(".wi-dup .wi-item", sec);
      const shotsBox = sec.querySelector<HTMLElement>(".wi-shots")!;
      const dupWrap = sec.querySelector<HTMLElement>(".wi-dup")!;
      const dup = dupWrap.querySelector<HTMLElement>(".wi-list")!;
      const align = () => {
        // put the duplicate list exactly over the real one, in the shots box's coordinates
        dupWrap.style.left = -shotsBox.offsetLeft + shotsBox.offsetWidth / 2 + "px";
        dupWrap.style.top = -shotsBox.offsetTop + shotsBox.offsetHeight / 2 + "px";
        dupWrap.style.width = sec.clientWidth + "px";
        dupWrap.style.height = window.innerHeight + "px";
      };
      align();
      window.addEventListener("resize", align);
      const shots = gsap.utils.toArray<HTMLElement>(".wi-shot", sec);
      const list = sec.querySelector<HTMLElement>(".wi-view .wi-list")!;
      const num = sec.querySelector<HTMLElement>(".wi-num b");
      const n = items.length;
      let cur = -1;
      const yTo1 = gsap.quickTo(list, "y", { duration: 0.9, ease: "expo.out" });
      const yTo2 = gsap.quickTo(dup, "y", { duration: 0.9, ease: "expo.out" });
      const yTo = (v: number) => {
        yTo1(v);
        yTo2(v);
      };
      const set = (i: number) => {
        if (i === cur) return;
        const prev = cur;
        cur = i;
        items.forEach((el, k) => el.classList.toggle("is-on", k === i));
        dupItems.forEach((el, k) => el.classList.toggle("is-on", k === i));
        const it = items[i];
        yTo(-(it.offsetTop + it.offsetHeight / 2));
        if (num) num.textContent = String(i + 1).padStart(2, "0");
        shots.forEach((s, k) => {
          if (k === i) gsap.fromTo(s, { clipPath: prev < i ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)", zIndex: 3 }, { clipPath: "inset(0% 0 0% 0)", duration: 0.9, ease: "expo.inOut" });
          else gsap.set(s, { zIndex: k === prev ? 2 : 1 });
        });
        if (prev >= 0) gsap.fromTo(shots[i].querySelector("img"), { scale: 1.2 }, { scale: 1, duration: 1.2, ease: "expo.out" });
      };
      set(0);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: () => `+=${window.innerHeight * 0.4 * n}`,
          pin: ".wi-stage",
          onUpdate: (s) => set(Math.min(n - 1, Math.floor(s.progress * n * 0.999))),
          onRefresh: () => {
            const it = items[Math.max(cur, 0)];
            align();
            gsap.set([list, dup], { y: -(it.offsetTop + it.offsetHeight / 2) });
          },
        });
      });
      items.forEach((el, k) => el.addEventListener("pointerenter", () => window.matchMedia("(hover: hover)").matches && set(k)));
    },
    { scope: root },
  );

  return (
    <section ref={root} className="wi" id="work" aria-label="Selected work" data-thread="0.08">
      <div className="wi-stage">
        <p className="wi-label label">(02) Selected work</p>
        <div className="wi-shots" aria-hidden="true">
          {workItems.map((w) => (
            <figure key={w.slug} className="wi-shot">
              <Image src={renders[w.slug] ?? w.image} alt="" fill sizes="(max-width: 760px) 60vw, 26vw" style={{ objectFit: "cover" }} />
            </figure>
          ))}
          <div className="wi-dup">
            <ol className="wi-list">
              {workItems.map((w, i) => (
                <li key={w.slug} className="wi-item">
                  <span className="wi-link">
                    <span className="wi-n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="wi-name">{w.name}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="wi-view">
          <ol className="wi-list">
            {workItems.map((w, i) => (
              <li key={w.slug} className="wi-item">
                <TLink href={w.href} className="wi-link" data-cursor="View">
                  <span className="wi-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="wi-name">{w.name}</span>
                  <span className="sr-only">: {w.summary}</span>
                </TLink>
              </li>
            ))}
          </ol>
        </div>
        <p className="wi-num label">
          <b>01</b> / {String(workItems.length).padStart(2, "0")}
        </p>
        <TLink href="/work" className="wi-all label">
          All work <span aria-hidden="true">→</span>
        </TLink>
      </div>
    </section>
  );
}
