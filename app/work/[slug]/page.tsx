import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import TLink from "@/components/site/TLink";
import { projects } from "@/lib/content";

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
  const [lead, ...rest] = p.gallery;
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
        </ul>
      </section>

      <section className="case-lead" data-thread="0.1">
        <figure className="case-lead-img" data-reveal>
          <Image src={lead.src} alt={lead.alt} fill sizes="100vw" priority style={{ objectFit: "cover", objectPosition: "50% 0%" }} />
        </figure>
      </section>

      <section className="case-body" data-thread="0.9">
        <div className="case-col">
          <p className="kicker">The challenge</p>
          <p className="case-big" data-split>
            {p.challenge}
          </p>
        </div>
        <div className="case-col">
          <p className="kicker">What we built</p>
          <ol className="case-built" data-stagger>
            {p.built.map((b, k) => (
              <li key={b}>
                <span>0{k + 1}</span>
                {b}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {rest.length > 0 && (
        <section className="case-gallery" data-thread="0.12">
          {rest.map((g) => (
            <figure key={g.src} className="case-shot" data-reveal style={{ aspectRatio: `${g.w} / ${Math.min(g.h, g.w * 1.25)}` }}>
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
