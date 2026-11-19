import type { Metadata } from "next";
import PageHero from "@/components/pages/PageHero";
import { careers, company, approach } from "@/lib/content";

export const metadata: Metadata = { title: "Careers", description: careers.intro };

export default function CareersPage() {
  return (
    <>
      <PageHero kicker="Careers" title="Build what people" dim="depend on." intro={careers.intro} tone="paper" />
      <section className="princ" data-thread="0.9">
        <div className="sec-head sec-head-dark">
          <p className="kicker">How we work</p>
          <h2 className="h-xl" data-split>
            What you&apos;d <em className="serif">sign up for.</em>
          </h2>
        </div>
        <ol className="rs rs-dark" data-stagger>
          {careers.principles.map((p, i) => (
            <li key={p.title} className="rs-card">
              <span className="rs-n">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="roles" data-thread="0.08">
        <div className="sec-head">
          <p className="kicker">Open roles</p>
          <h2 className="h-xl" data-split>
            On the <em className="serif">board.</em>
          </h2>
        </div>
        {careers.openRoles.length ? (
          <ol className="roles-list" data-stagger>
            {careers.openRoles.map((r) => (
              <li key={r.title}>
                <span>{r.title}</span>
                <span>{r.type}</span>
                <span>{r.location}</span>
                <a href={`mailto:${company.email}?subject=${encodeURIComponent("Application: " + r.title)}`}>Apply →</a>
              </li>
            ))}
          </ol>
        ) : (
          <div className="roles-empty" data-fade>
            <p className="roles-empty-big">No roles are listed right now.</p>
            <p>
              We still like hearing from engineers and designers who care about shipping. Send your work and a short note to{" "}
              <a href={`mailto:${company.email}?subject=${encodeURIComponent("Open application")}`}>{company.email}</a>.
            </p>
          </div>
        )}
      </section>
      <section className="stages" data-thread="0.9">
        <div className="sec-head sec-head-dark">
          <p className="kicker">The work itself</p>
          <h2 className="h-xl" data-split>
            Six stages, <em className="serif">every project.</em>
          </h2>
        </div>
        <ol className="stg" data-stagger>
          {approach.steps.map((s, i) => (
            <li key={s.title}>
              <span>0{i + 1}</span>
              <strong>{s.title}</strong>
              <em>{s.body}</em>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
