"use client";

import { useEffect, useRef, useState } from "react";
import { company, nav, startProjectHref } from "@/lib/content";
import Wordmark from "./Wordmark";

function useLagosTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos" });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/** Luma-style top header, plus a compact pill bar that slides in once you scroll. */
export default function Header() {
  const time = useLagosTime();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      document.documentElement.style.overflow = "";
      menuBtn.current?.focus();
    };
  }, [open]);

  const links = (
    <>
      {nav.map((n) => (
        <a key={n.href} href={n.href}>
          {n.label}
        </a>
      ))}
    </>
  );

  return (
    <>
      <header className="top">
        <a href="#top" className="top-logo" aria-label="Neegles home">
          <Wordmark />
        </a>
        <p className="top-tag caps">
          <span>Software</span>
          <span>For ambitious</span>
          <span>engineering</span>
          <span>businesses.</span>
        </p>
        <nav aria-label="Primary" className="pill-nav">
          {links}
        </nav>
        <p className="top-time caps">
          {time || " "}
          <span>(GMT+1)</span>
        </p>
        <p className="top-avail caps">
          Available for projects
          <a href={startProjectHref}>Start a conversation →</a>
        </p>
        <button
          ref={menuBtn}
          className="menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </header>

      <div className={`bar ${scrolled && !open ? "bar-in" : ""}`} aria-hidden={!scrolled}>
        <a href="#top" className="bar-logo" aria-label="Neegles home" tabIndex={scrolled ? 0 : -1}>
          <Wordmark />
        </a>
        <nav aria-label="Sticky" className="pill-nav pill-nav-dark">
          {nav.map((n) => (
            <a key={n.href} href={n.href} tabIndex={scrolled ? 0 : -1}>
              {n.label}
            </a>
          ))}
        </nav>
        <a href={startProjectHref} className="btn btn-blue btn-sm" tabIndex={scrolled ? 0 : -1}>
          Start a project <span aria-hidden="true">→</span>
        </a>
        <button className="menu-btn menu-btn-bar" aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(true)} tabIndex={scrolled ? 0 : -1}>
          <span className="sr-only">Open menu</span>
          <span className="burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="site-menu" ref={panel} className="menu" role="dialog" aria-modal="true" aria-label="Site menu" hidden={!open}>
        <div className="menu-head">
          <Wordmark />
          <button className="menu-close caps" onClick={() => setOpen(false)}>
            Close ✕
          </button>
        </div>
        <nav aria-label="Menu">
          <ol className="menu-list">
            {[...nav, { label: "Contact", href: "#contact" }].map((n, i) => (
              <li key={n.href} style={{ animationDelay: `${i * 0.05}s` }}>
                <a href={n.href} onClick={() => setOpen(false)}>
                  <span className="caps">(0{i + 1})</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-foot caps">
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp ↗
          </a>
        </div>
      </div>
    </>
  );
}
