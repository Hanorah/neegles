import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import TLink from "@/components/site/TLink";
import { projects, renders } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.id === slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.id === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const leadSrc = renders[p.id] ?? p.gallery[0].src;
  const rest = renders[p.id] ? p.gallery : p.gallery.slice(1);
  const story = [
    { k: "The challenge", v: p.challenge },
    { k: "What we did", v: p.solution },
    { k: "The outcome", v: p.outcome },
  ].filter((x) => x.v);
  return (
    <>
      <section className="case-hero" data-thread="0.86" style={{ ["--accent" as string]: p.accent }}>
        <p className="kicker">Case study · {p.industry}</p>
        <h1 className="case-title" data-split data-split-now>
          {p.name}
        </h1>
        <p className="case-sum" data-fade="0.4">
          {p.summary}
        </p>
        <ul className="case-facts" data-stagger>
          <li>
            <span>Client</span>
            {p.name}
          </li>
          <li>
            <span>Industry</span>
            {p.industry}
          </li>
          <li>
            <span>Scope</span>
            {p.built.length} modules
          </li>
          {p.url && (
            <li>
              <span>Live</span>
              <a href={p.url} target="_blank" rel="noreferrer" className="link-arrow">
                {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
              </a>
            </li>
          )}
        </ul>
      </section>

      <section className="case-lead" data-thread="0.1">
        <figure className="case-lead-img" data-reveal>
          <Image src={leadSrc} alt={`${p.name} on laptop and phone`} fill sizes="100vw" priority style={{ objectFit: "cover", objectPosition: "50% 50%" }} data-parallax="8" />
        </figure>
      </section>

      <section className="case-story" data-thread="0.9">
        {story.map((x, k) => (
          <div key={x.k} className="cs-row" data-focus>
            <p className="cs-k">
              <span className="label">0{k + 1}</span> {x.k}
            </p>
            <p className="cs-v" data-split>
              {x.v}
            </p>
          </div>
        ))}
      </section>

      <section className="case-built-wrap" data-thread="0.1">
        <p className="kicker">What we built</p>
        <ol className="case-built" data-stagger>
          {p.built.map((b, k) => (
            <li key={b}>
              <span>0{k + 1}</span>
              {b}
            </li>
          ))}
        </ol>
        {p.url && (
          <a href={p.url} target="_blank" rel="noreferrer" className="btn btn-dark btn-lg" data-magnetic>
            Visit the live site <span aria-hidden="true">↗</span>
          </a>
        )}
      </section>

      {rest.length > 0 && (
        <section className="case-gallery" data-thread="0.12">
          {rest.map((g) => (
            <figure key={g.src} className={`case-shot ${g.h > g.w * 1.3 ? "is-tall" : ""}`} data-reveal style={{ aspectRatio: `${g.w} / ${Math.min(g.h, g.w * 1.1)}` }} data-cursor={g.h > g.w * 1.3 ? "Scroll" : undefined}>
              <span className="case-bar" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <Image src={g.src} alt={g.alt} fill sizes="(max-width: 760px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: "50% 0%" }} />
            </figure>
          ))}
        </section>
      )}

      <section className="case-next" data-thread="0.5">
        <p className="kicker">Next project</p>
        <TLink href={`/work/${next.id}`} className="case-next-link" data-cursor="Next" data-lean>
          {next.name} <span aria-hidden="true">→</span>
        </TLink>
      </section>
    </>
  );
}
