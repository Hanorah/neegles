import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/pages/PageHero";
import TLink from "@/components/site/TLink";
import ProcessTrack from "@/components/home/ProcessTrack";
import { industries } from "@/lib/content";

export const metadata: Metadata = { title: "Industries", description: "Custom software for logistics, real estate, professional services and construction." };

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        kicker="Industries"
        title="Built for how"
        dim="you work."
        intro="We build most often for four kinds of business. Each one has its own systems, its own bottlenecks, and its own idea of what good software looks like."
        meta={industries.map((i) => i.name)}
      />
      <section className="ind-list" data-thread="0.07">
        {industries.map((ind, i) => (
          <TLink key={ind.id} href={`/industries/${ind.id}`} className="ind-row" data-cursor="Explore">
            <span className="ind-n">0{i + 1}</span>
            <span className="ind-name" data-lean>
              {ind.name}
            </span>
            <span className="ind-head">{ind.headline}</span>
            <span className="ind-img" aria-hidden="true">
              <Image src={ind.image} alt="" fill sizes="30vw" style={{ objectFit: "cover" }} />
            </span>
          </TLink>
        ))}
      </section>
      <ProcessTrack label="Process" />
    </>
  );
}
