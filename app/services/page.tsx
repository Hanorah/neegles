import type { Metadata } from "next";
import PageHero from "@/components/pages/PageHero";
import TLink from "@/components/site/TLink";
import ProcessTrack from "@/components/home/ProcessTrack";
import { capabilities } from "@/lib/content";

export const metadata: Metadata = { title: "Services", description: "Software engineering, product development, cloud infrastructure, AI and business automation from Neegles." };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="What we"
        dim="build."
        intro="Five practices, one team. The people who design how your product looks and works are the people who engineer how it runs."
        meta={capabilities.map((c) => c.title)}
      />
      {capabilities.map((c, i) => (
        <section key={c.id} id={c.id} className={`svc ${i % 2 ? "svc-dark" : ""}`} data-thread={i % 2 ? "0.9" : "0.08"}>
          <div className="svc-side">
            <span className="svc-n" data-count={i + 1} data-pad="2">
              0{i + 1}
            </span>
            <p className="kicker">{c.kicker}</p>
          </div>
          <div className="svc-main">
            <h2 className="svc-title" data-split>
              {c.title}
            </h2>
            <p className="svc-body" data-fade>
              {c.body}
            </p>
            <ul className="svc-inc" data-stagger>
              {c.includes.map((x) => (
                <li key={x}>
                  <span aria-hidden="true">✦</span>
                  {x}
                </li>
              ))}
            </ul>
            <TLink href="/contact" className="pill pill-line" data-magnetic>
              Talk about {c.title.toLowerCase()} <span aria-hidden="true">→</span>
            </TLink>
          </div>
        </section>
      ))}
      <ProcessTrack label="Process" />
    </>
  );
}
