import Image from "next/image";
import TLink from "@/components/site/TLink";
import { industries } from "@/lib/content";

/** Where we work: a row per industry, with the systems we build there. */
export default function IndustryRows() {
  return (
    <section className="inds" id="industries" data-thread="0.92">
      <div className="sec-head sec-center">
        <p className="label" data-type>
          (07) Industries
        </p>
        <h2 className="h-xl" data-split>
          Where ideas <em className="serif">go to work.</em>
        </h2>
      </div>
      <ol className="ir-list">
        {industries.map((ind, i) => (
          <li key={ind.id} className="ir" data-fade>
            <div className="ir-l">
              <p className="ir-name">
                <span className="label">0{i + 1}.</span> {ind.name}
              </p>
              <p className="ir-line">{ind.headline}</p>
              <TLink href={`/industries/${ind.id}`} className="link-arrow">
                <span aria-hidden="true">↳</span> View industry
              </TLink>
            </div>
            <ul className="ir-mods">
              {ind.modules.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <TLink href={`/industries/${ind.id}`} className="ir-img" data-cursor="Explore" aria-label={`${ind.name} industry`}>
              <Image src={ind.image} alt={ind.imageAlt} fill sizes="(max-width: 900px) 90vw, 28vw" style={{ objectFit: "cover" }} />
            </TLink>
          </li>
        ))}
      </ol>
    </section>
  );
}
