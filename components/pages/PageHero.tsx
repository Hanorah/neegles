/** Inner-page opener: kicker, typed title, an intro line and an optional meta row. */
export default function PageHero({
  kicker,
  title,
  dim,
  intro,
  meta,
  tone = "dark",
}: {
  kicker: string;
  title: string;
  dim?: string;
  intro?: string;
  meta?: string[];
  tone?: "dark" | "paper";
}) {
  return (
    <section className={`phero phero-${tone}`} data-thread="0.82">
      <p className="kicker">{kicker}</p>
      <h1 className="phero-title" data-split data-split-now>
        {title} {dim && <em className="serif">{dim}</em>}
      </h1>
      {intro && (
        <p className="phero-intro" data-fade="0.5">
          {intro}
        </p>
      )}
      {meta && (
        <ul className="phero-meta" data-stagger>
          {meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
      )}
      <span className="phero-scroll" aria-hidden="true">
        ↓
      </span>
    </section>
  );
}
