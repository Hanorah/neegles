"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import TLink from "./TLink";
import Logo from "./Logo";
import Image from "next/image";
import { company, pages, industries } from "@/lib/content";


/** Blend-mode header (reads on light and dark), full-screen typed menu. */
export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [path]);

  const [dark, setDark] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const probe = document.elementsFromPoint(window.innerWidth / 2, 36).find((e) => e.closest("[data-theme]") && !e.closest(".hd"));
      setDark(probe?.closest<HTMLElement>("[data-theme]")?.dataset.theme === "dark");
      const y = window.scrollY;
      setHidden(y > 200 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    const t = setInterval(on, 600);
    return () => {
      window.removeEventListener("scroll", on);
      clearInterval(t);
    };
  }, []);

  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    document.documentElement.classList.toggle("menu-open", open);
    if (open) {
      window.__lenis?.stop();
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power2.out" });
      // the panel grows out of the Menu pill
      gsap.fromTo(
        el.querySelector(".menu-glass"),
        { clipPath: "inset(0% 38% 94% 38% round 999px)", y: -6 },
        { clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, duration: 0.85, ease: "expo.out" },
      );
      gsap.fromTo(el.querySelectorAll(".menu-link, .menu-ind, .menu-cta, .menu-foot"), { y: 22, opacity: 0, filter: "blur(6px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, ease: "expo.out", stagger: 0.035, delay: 0.15 });
    } else {
      window.__lenis?.start();
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const isOn = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <>
      <header className={`hd ${hidden && !open ? "is-hidden" : ""} ${dark && !open ? "is-dark" : ""}`}>
        <TLink href="/" className="hd-logo" aria-label="Neegles home" data-magnetic>
          <Logo className="hd-mark" />
        </TLink>
        <button className={`hd-menu ${open ? "is-open" : ""}`} aria-expanded={open} aria-controls="menu" onClick={() => setOpen((o) => !o)} data-magnetic>
          <span className="hd-menu-txt">
            <span data-text={open ? "Close" : "Menu"}>{open ? "Close" : "Menu"}</span>
          </span>
          <i className="hd-menu-ico" aria-hidden="true">
            <b />
            <b />
          </i>
        </button>
        <TLink href="/contact" className="hd-cta btn btn-blue" data-magnetic>
          Start a project <span aria-hidden="true">↗</span>
        </TLink>
      </header>

      <div id="menu" ref={menu} className="menu" hidden={!open} role="dialog" aria-modal="true" aria-label="Menu" onClick={() => setOpen(false)}>
        <div className="menu-glass" onClick={(e) => e.stopPropagation()}>
          <ol className="menu-list">
            {[{ label: "Home", href: "/" }, ...pages].map((p, i) => (
              <li key={p.href}>
                <TLink href={p.href} className={`menu-link ${isOn(p.href) && p.href !== "/" ? "is-on" : ""}`} onClick={() => setOpen(false)}>
                  <span className="menu-n">0{i + 1}</span>
                  {p.label}
                </TLink>
              </li>
            ))}
          </ol>
          <div className="menu-inds">
            <p className="label">Industries</p>
            <div className="menu-inds-grid">
              {industries.map((ind) => (
                <TLink key={ind.id} href={`/industries/${ind.id}`} className="menu-ind" onClick={() => setOpen(false)}>
                  <span className="menu-ind-img">
                    <Image src={ind.image} alt="" fill sizes="120px" style={{ objectFit: "cover" }} />
                  </span>
                  <span>{ind.name}</span>
                </TLink>
              ))}
            </div>
          </div>
          <TLink href="/contact" className="btn btn-light menu-cta" onClick={() => setOpen(false)}>
            Start a project <span aria-hidden="true">↗</span>
          </TLink>
          <div className="menu-foot">
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
