import TLink from "./TLink";
import Logo from "./Logo";
import { company, pages, startProjectHref, industries } from "@/lib/content";

/** Closing ask, a marquee band, and the footer with the giant wordmark. Shared by every page. */
export default function Footer() {
  const band = Array.from({ length: 6 });
  return (
    <footer className="site-foot" data-thread="0.2">
      <div className="ask" data-theme="dark">
        <div className="ask-in">
          <p className="label" data-type>
            Have something in mind?
          </p>
          <h2 className="ask-title" data-split>
            Let&apos;s build <em className="serif">what&apos;s next.</em>
          </h2>
          <div className="ask-row">
            <p className="ask-copy" data-fade>
              Tell us about the business and what it needs. We&apos;ll come back with ideas and a clear next step.
            </p>
            <div className="ask-btns">
              <a className="btn btn-blue btn-lg" href={startProjectHref} data-magnetic>
                Start a project <span aria-hidden="true">↗</span>
              </a>
              <a className="btn btn-light btn-lg" href={company.whatsapp} target="_blank" rel="noreferrer" data-magnetic>
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="band" aria-hidden="true">
        <div className="band-track">
          {band.map((_, i) => (
            <span key={i}>
              Let&apos;s build what&apos;s next <i>✦</i> <em className="serif">Neegles</em> <i>✦</i>
            </span>
          ))}
        </div>
      </div>

      <div className="foot">
        <div className="foot-grid">
          <div className="foot-l">
            <p className="foot-line">Web, mobile and enterprise software for businesses that need technology to do real work.</p>
            <a className="foot-mail" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </div>
          <nav aria-label="Footer">
            <p className="label">Navigation</p>
            {pages.slice(0, 4).map((p) => (
              <TLink key={p.href} href={p.href}>
                {p.label}
              </TLink>
            ))}
          </nav>
          <nav aria-label="Industries">
            <p className="label">Industries</p>
            {industries.map((ind) => (
              <TLink key={ind.id} href={`/industries/${ind.id}`}>
                {ind.name}
              </TLink>
            ))}
          </nav>
          <nav aria-label="Company">
            <p className="label">Company</p>
            {pages.slice(4).map((p) => (
              <TLink key={p.href} href={p.href}>
                {p.label}
              </TLink>
            ))}
          </nav>
          <div>
            <p className="label">Social</p>
            {company.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="foot-base">
          <span>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </span>
          <span>Built for Africa, made for anywhere.</span>
        </div>
        <div className="foot-mark" aria-hidden="true" data-reveal>
          <Logo className="foot-logo" />
        </div>
      </div>
    </footer>
  );
}
