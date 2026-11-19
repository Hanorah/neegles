import type { Metadata } from "next";
import PageHero from "@/components/pages/PageHero";
import HoverList from "@/components/pages/HoverList";
import { workItems } from "@/lib/content";

export const metadata: Metadata = { title: "Work", description: "Selected client work and Labs experiments from Neegles." };

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="Selected work"
        title="Work that"
        dim="ships."
        intro="Client platforms that run real businesses, and Labs experiments where we try ideas before they're asked for."
        meta={[`${workItems.filter((w) => w.kind === "Client work").length} client projects`, `${workItems.filter((w) => w.kind === "Labs").length} Labs experiments`, "Web · Mobile · AI"]}
      />
      <section className="work-index" data-thread="0.06">
        <HoverList items={workItems.map((w) => ({ key: w.slug, href: w.href, name: w.name, kind: w.kind, tags: w.tags, image: w.image, summary: w.summary }))} />
      </section>
    </>
  );
}
