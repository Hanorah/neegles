import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import TLink from "@/components/site/TLink";
import ProcessTrack from "@/components/home/ProcessTrack";
import { industries, company } from "@/lib/content";
import { industryContent, isConstruction } from "@/lib/industryContent";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = industryContent[slug];
  return c ? { title: c.meta.title.replace(/\s*[-|]\s*Neegles.*$/, ""), description: c.meta.description, keywords: c.meta.keywords } : {};
}

const n2 = (n: number) => String(n).padStart(2, "0");

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industries.findIndex((x) => x.id === slug);
  const c = industryContent[slug];
  if (i < 0 || !c) notFound();
  const ind = industries[i];
  const next = industries[(i + 1) % industries.length];
  const pics = [{ image: c.hero.image, imageAlt: c.hero.imageAlt, objectPosition: "50% 50%" }, ...(c.hero.additionalImages ?? [])];
  const con = isConstruction(c) ? c : null;

  return (
    <>
      {/* hero */}
      <section className="ih" data-theme="dark" data-thread="0.85">
        <div className="ih-media" aria-hidden="true">
          {pics.map((p, k) => (
            <figure key={k} className={`ih-pic ${pics.length > 1 ? "ih-cycle" : ""}`} style={{ animationDelay: `${k * 6}s` }}>
              <Image src={p.image as string} alt="" fill priority={k === 0} sizes="100vw" style={{ objectFit: "cover", objectPosition: p.objectPosition ?? "50% 50%" }} data-parallax="12" />
            </figure>
          ))}
          <span className="ih-shade" />
        </div>
        <div className="ih-in">
          <p className="label">
            Industries · {n2(i + 1)} — {ind.name}
          </p>
          <h1 className="ih-title" data-split data-split-now>
            {c.hero.headlineBefore}
            <em className="serif">{c.hero.headlineAccent}</em>
            {c.hero.headlineAfter ?? ""}
          </h1>
          <div className="ih-foot">
            <p className="ih-desc" data-fade="0.4">
              {c.hero.description}
            </p>
            <div className="ih-ctas" data-fade="0.6">
              <TLink href="/contact" className="btn btn-light btn-lg" data-magnetic>
                {con ? con.heroCtas.primary : "Start a project"} <span aria-hidden="true">↗</span>
              </TLink>
              <a href="#solutions" className="btn btn-ghost-light btn-lg">
                {con ? con.heroCtas.secondary : "Explore solutions"}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* problems: each one gets struck through as you read on */}
      <section className="pb" data-thread="0.08">
        <div className="pb-side">
          <p className="label" data-type>
            {c.problems.eyebrow}
          </p>
          <h2 className="pb-h" data-split>
            {c.problems.headlineBefore}
            <em className="serif">{c.problems.headlineAccent}</em>
            {c.problems.headlineAfter}
          </h2>
          <p className="pb-intro" data-fade>
            {c.problems.intro}
          </p>
        </div>
        <ol className="pb-list">
          {c.problems.items.map((p, k) => (
            <li key={p.title} className="pb-row" data-strike>
              <span className="pb-n label">{n2(k + 1)}</span>
              <h3 className="pb-t">
                {p.title}
                <span className="strike" aria-hidden="true" />
              </h3>
              <p className="pb-d">{p.description}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* solutions */}
      <section className="so" id="solutions" data-theme="dark" data-thread="0.9">
        <div className="so-head">
          <p className="label" data-type>
            {c.solutions.eyebrow}
          </p>
          <h2 className="so-h" data-split>
            {c.solutions.headlineBefore}
            <em className="serif">{c.solutions.headlineMuted}</em>
            {c.solutions.headlineAfter}
          </h2>
        </div>
        <ol className="so-list">
          {c.solutions.items.map((s) => (
            <li key={s.title} className="so-row" data-focus tabIndex={0}>
              <span className="so-n">{n2(s.number)}</span>
              <h3 className="so-t">{s.title}</h3>
              <div className="so-body">
                <div>
                  <p className="so-d">{s.description}</p>
                  <ul className="so-f">
                    {s.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <TLink href="/contact" className="btn btn-light btn-lg so-cta" data-magnetic>
          {c.solutions.cta} <span aria-hidden="true">↗</span>
        </TLink>
      </section>

      {con && (
        <>
          <section className="bn" data-thread="0.1">
            <div className="bn-head">
              <p className="label" data-type>
                {con.benefits.eyebrow}
              </p>
              <h2 className="bn-h" data-split>
                {con.benefits.headline}
              </h2>
              <p className="bn-intro" data-fade>
                {con.benefits.intro}
              </p>
            </div>
            <ol className="bn-grid" data-stagger>
              {con.benefits.items.map((b, k) => (
                <li key={b.title} className="bn-card">
                  <span className="bn-n">{n2(k + 1)}</span>
                  <h3>{b.title}</h3>
                  <p>{b.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="sg" data-thread="0.9">
            <figure className="sg-img" data-reveal>
              <Image src={con.segments.image} alt={con.segments.imageAlt} fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: "cover" }} data-parallax="10" />
            </figure>
            <div className="sg-copy">
              <p className="label" data-type>
                {con.segments.eyebrow}
              </p>
              <h2 className="sg-h" data-split>
                {con.segments.headline}
              </h2>
              <p className="sg-intro" data-fade>
                {con.segments.intro}
              </p>
              <ul className="sg-list">
                {con.segments.items.map((s) => (
                  <li key={s.title} data-fade>
                    <strong>{s.title}</strong>
                    <span>{s.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      <ProcessTrack
        label={c.process.eyebrow ?? "Our process"}
        before={`${c.process.headlineBefore}${c.process.headlineAccent}`}
        accent={c.process.headlineAfter.trim() || "Step by step."}
        steps={c.process.steps}
      />

      {con && (
        <>
          <section className="wy" data-theme="dark" data-thread="0.1">
            <div className="wy-copy">
              <p className="label" data-type>
                {con.whyNeegles.eyebrow}
              </p>
              <h2 className="wy-h" data-split>
                {con.whyNeegles.headline}
              </h2>
              <ol className="wy-list">
                {con.whyNeegles.items.map((w, k) => (
                  <li key={w.title} data-fade>
                    <span className="label">{n2(k + 1)}</span>
                    <div>
                      <h3>{w.title}</h3>
                      <p>{w.description}</p>
                      {w.link && (
                        <TLink href={w.link.href} className="link-arrow">
                          {w.link.label} →
                        </TLink>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <figure className="wy-img" data-reveal>
              <Image src={con.whyNeegles.image} alt={con.whyNeegles.imageAlt} fill sizes="(max-width: 900px) 100vw, 45vw" style={{ objectFit: "cover" }} data-parallax="10" />
            </figure>
          </section>

          <section className="fq" data-thread="0.9">
            <div className="fq-head">
              <p className="label" data-type>
                {con.faq.eyebrow}
              </p>
              <h2 className="fq-h" data-split>
                {con.faq.headline}
              </h2>
            </div>
            <div className="fq-list">
              {con.faq.items.map((q) => (
                <details key={q.question} className="fq-item">
                  <summary>
                    <span>{q.question}</span>
                    <i aria-hidden="true" />
                  </summary>
                  <div className="fq-a">
                    <p>{q.answer}</p>
                    {q.link && (
                      <TLink href={q.link.href} className="link-arrow">
                        {q.link.label} →
                      </TLink>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="ic" data-theme="dark" data-thread="0.5">
        <p className="label">{con ? con.leadForm.eyebrow : "Get started"}</p>
        <h2 className="ic-h" data-split>
          {con ? con.leadForm.headline : `Ready to build for ${ind.name.toLowerCase()}?`}
        </h2>
        <p className="ic-d">{con ? con.leadForm.description : "Tell us how your business runs today and what you need. We will come back with ideas and a clear next step."}</p>
        <div className="ic-ctas">
          <TLink href="/contact" className="btn btn-light btn-lg" data-magnetic>
            {con ? con.leadForm.submitLabel : "Start a project"} <span aria-hidden="true">↗</span>
          </TLink>
          <a href={company.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost-light btn-lg">
            {con ? con.leadForm.whatsappCta : "Talk to us on WhatsApp"}
          </a>
        </div>
        <TLink href={`/industries/${next.id}`} className="ic-next" data-cursor="Next">
          <span className="label">Next industry</span>
          <span className="ic-next-name">
            {next.name} <span aria-hidden="true">→</span>
          </span>
        </TLink>
      </section>
    </>
  );
}
