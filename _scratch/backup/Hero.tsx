import Image from "next/image";
import FitText from "./FitText";
import Marquee from "./Marquee";

/** Luma-style hero: full-width wordmark, short statement, two work frames, blue band. */
export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        Neegles: we build web, mobile and enterprise software that solves real problems.
      </h1>
      <FitText text="NEEGLES" className="hero-mark" />

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="caps hero-lede" data-fade>
            <span>We build web, mobile</span>
            <span>and enterprise software</span>
            <span>that solves real problems</span>
            <span>for growing businesses.</span>
          </p>
          <a href="#about" className="round-btn" aria-label="Scroll to about Neegles" data-fade>
            ↓
          </a>
        </div>

        <div className="hero-meta caps" data-fade>
          <span>/**</span>
          <span>(Selected work)</span>
          <span>(01 — 02)</span>
        </div>

        <figure className="hero-frame hero-frame-a" data-clip>
          <Image
            src="/work/kike-home.webp"
            alt="Kiké, an African fashion marketplace built by Neegles"
            fill
            sizes="(max-width: 820px) 50vw, 26vw"
            priority
            style={{ objectFit: "cover", objectPosition: "50% 12%" }}
          />
          <figcaption className="caps">Kiké · E-commerce</figcaption>
        </figure>
        <figure className="hero-frame hero-frame-b" data-clip>
          <Image
            src="/work/profix-features.webp"
            alt="ProFix Desk, a repair management platform built by Neegles"
            fill
            sizes="(max-width: 820px) 50vw, 26vw"
            priority
            style={{ objectFit: "cover", objectPosition: "50% 0%" }}
          />
          <figcaption className="caps">ProFix Desk · SaaS</figcaption>
        </figure>
      </div>

      <Marquee className="band" items={["Let's build what's next."]} repeat={8} />
    </section>
  );
}
