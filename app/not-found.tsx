import TLink from "@/components/site/TLink";

export default function NotFound() {
  return (
    <section className="nf" data-thread="0.5">
      <p className="kicker">404</p>
      <h1 className="phero-title" data-split data-split-now>
        This page didn&apos;t <em className="serif">ship.</em>
      </h1>
      <TLink href="/" className="pill pill-paper" data-magnetic>
        Back home <span aria-hidden="true">→</span>
      </TLink>
    </section>
  );
}
