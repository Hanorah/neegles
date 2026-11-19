import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/pages/PageHero";
import ProcessTrack from "@/components/home/ProcessTrack";
import WhyStack from "@/components/home/WhyStack";
import { company } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: company.description };

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About Neegles" title="We build" dim="with intent." intro={company.description} meta={["Web", "Mobile", "Enterprise", "Cloud", "AI", "Automation"]} />
      <section className="manifest" data-thread="0.9">
        <div className="mf-row">
          <p className="kicker">Mission</p>
          <p className="mf-big" data-split>
            {company.mission}
          </p>
        </div>
        <div className="mf-row">
          <p className="kicker">Vision</p>
          <p className="mf-big" data-split>
            {company.vision}
          </p>
        </div>
      </section>
      <section className="about-img" data-thread="0.12">
        <figure data-reveal>
          <Image src="/industries/gen-professional-services.webp" alt="A team reviewing dashboards together" fill sizes="100vw" style={{ objectFit: "cover" }} data-parallax="16" />
        </figure>
        <p className="about-cap" data-fade>
          Ideas without engineering are just slides.
        </p>
      </section>
      <WhyStack label="Why Neegles" />
      <ProcessTrack label="Process" />
    </>
  );
}
