"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import TLink from "./TLink";
import Logo from "./Logo";
import Image from "next/image";
import { company, industries } from "@/lib/content";

const MENU = [
  { label: "Home", href: "/", img: "/renders/nmark.webp", note: "Start here" },
  { label: "Work", href: "/work", img: "/renders/profix.webp", note: "Client work and Labs" },
  { label: "Services", href: "/services", img: "/renders/footera.webp", note: "Five practices, one team" },
  { label: "Industries", href: "/industries", img: "/industries/gen-construction.webp", note: "Logistics · Real estate · Professional services · Construction" },
  { label: "Labs", href: "/labs", img: "/renders/prism.webp", note: "Experiments that ship" },
  { label: "About", href: "/about", img: "/industries/gen-professional-services.webp", note: "Who we are" },
  { label: "Careers", href: "/careers", img: "/renders/kike.webp", note: "Build with us" },
  { label: "Contact", href: "/contact", img: "/industries/gen-real-estate.webp", note: "Tell us what you are building" },
];


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

  // full-screen black menu: columns drop from the top to open, then pull back up to close
  const tl = useRef<gsap.core.Timeline | null>(null);
  const first = useRef(true);
  useEffect(() => {
    const el = menu.current;
    if (!el) return;
    if (first.current) {
      first.current = false;
      return;
    }
    const cols = el.querySelectorAll(".menu-col");
    const links = el.querySelectorAll(".menu-link .menu-txt");
    const bits = el.querySelectorAll(".menu-fade");
    tl.current?.kill();
    if (open) {
      tl.current = gsap
        .timeline({ delay: 0.02 })
        .set(el, { visibility: "visible", pointerEvents: "auto" })
        .fromTo(cols, { scaleY: 0, transformOrigin: "50% 0%" }, { scaleY: 1, duration: 0.75, ease: "expo.inOut", stagger: { each: 0.05, from: "start" } })
        .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.05 }, 0.45)
        .fromTo(bits, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "expo.out", stagger: 0.04 }, 0.6);
    } else {
      tl.current = gsap
        .timeline()
        .to(links, { yPercent: -110, duration: 0.45, ease: "power3.in", stagger: 0.025 })
        .to(bits, { opacity: 0, duration: 0.3 }, 0)
        .to(cols, { scaleY: 0, transformOrigin: "50% 0%", duration: 0.7, ease: "expo.inOut", stagger: { each: 0.05, from: "end" } }, 0.25)
        .set(el, { visibility: "hidden", pointerEvents: "none" });
    }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("keydown", esc);
    if (open) {
      el.addEventListener("wheel", block, { passive: false });
      el.addEventListener("touchmove", block, { passive: false });
    }
    return () => {
      window.removeEventListener("keydown", esc);
      el.removeEventListener("wheel", block);
      el.removeEventListener("touchmove", block);
    };
  }, [open]);
  const [peek, setPeek] = useState(0);

  const isOn = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <>
      <header className={`hd ${hidden && !open ? "is-hidden" : ""} ${dark || open ? "is-dark" : ""}`}>
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

      <div id="menu" ref={menu} className="menu" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!open}>
        <div className="menu-cols" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, k) => (
            <i key={k} className="menu-col" />
          ))}
        </div>
        <div className="menu-in">
          <aside className="menu-side menu-fade">
            <p className="label">Get in touch</p>
            <a href={`mailto:${company.email}`}>{company.email}</a>
            <a href={company.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
            <p className="label">Follow</p>
            {company.socials.map((sc) => (
              <a key={sc.label} href={sc.href} target="_blank" rel="noreferrer">
                {sc.label}
              </a>
            ))}
          </aside>
          <ol className="menu-list">
            {MENU.map((p, i) => (
              <li key={p.href}>
                <TLink
                  href={p.href}
                  className={`menu-link ${isOn(p.href) && p.href !== "/" ? "is-on" : ""} ${peek === i ? "is-peek" : ""}`}
                  onClick={() => setOpen(false)}
                  onPointerEnter={() => setPeek(i)}
                  onFocus={() => setPeek(i)}
                  tabIndex={open ? 0 : -1}
                >
                  <span className="menu-n">0{i + 1}</span>
                  <span className="menu-mask">
                    <span className="menu-txt" data-text={p.label}>
                      {p.label}
                    </span>
                  </span>
                </TLink>
              </li>
            ))}
          </ol>
          <div className="menu-peek menu-fade" aria-hidden="true">
            {MENU.map((p, i) => (
              <span key={p.href} className={`menu-peek-img ${peek === i ? "is-on" : ""}`}>
                <Image src={p.img} alt="" fill sizes="(max-width: 900px) 1px, 30vw" loading="eager" decoding="async" style={{ objectFit: "cover" }} />
              </span>
            ))}
            <p className="menu-peek-cap label">{MENU[peek].note}</p>
          </div>
          <div className="menu-bottom menu-fade">
            <div className="menu-inds">
              {industries.map((ind) => (
                <TLink key={ind.id} href={`/industries/${ind.id}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  {ind.name}
                </TLink>
              ))}
            </div>
            <TLink href="/contact" className="btn btn-blue" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              Start a project <span aria-hidden="true">↗</span>
            </TLink>
          </div>
        </div>
      </div>
    </>
  );
}
