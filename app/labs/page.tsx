import type { Metadata } from "next";
import LabCanvas, { type LabTile } from "@/components/pages/LabCanvas";
import { labs, projects } from "@/lib/content";

export const metadata: Metadata = { title: "Labs", description: labs.sub };

const renderTiles: LabTile[] = [
  { src: "/renders/profix.webp", name: "ProFix Desk", tag: "Studio render", body: projects[0].summary, href: "/work/profix-desk", w: 1800, h: 1125 },
  { src: "/renders/kike.webp", name: "Kiké", tag: "Studio render", body: projects[1]?.summary ?? "", href: "/work/kike", w: 1500, h: 1800 },
  { src: "/renders/oio.webp", name: "oio", tag: "Studio render", body: labs.items[1].body, w: 1500, h: 1800 },
  { src: "/renders/prism.webp", name: "Prism", tag: "Studio render", body: labs.items[0].body, w: 1800, h: 1125 },
  { src: "/renders/nmark.webp", name: "The N", tag: "Brand · 3D", body: "The Neegles mark, extruded and lit in Blender for the site.", w: 1800, h: 1125 },
  { src: "/renders/idara.webp", name: "iDara", tag: "Studio render", body: labs.items[2].body, w: 1800, h: 1125 },
  { src: "/renders/footera.webp", name: "Footera", tag: "Studio render", body: labs.items[3].body, w: 1800, h: 1125 },
  { src: "/renders/kikelap.webp", name: "Kiké", tag: "Studio render", body: projects[1]?.summary ?? "", href: "/work/kike", w: 1800, h: 1125 },
];

const tiles: LabTile[] = [
  ...labs.items.map((l) => ({ src: l.image, name: l.name, tag: l.tag, body: l.body, w: l.w, h: l.h })),
  ...renderTiles,
  ...projects.flatMap((p) => p.gallery.map((g) => ({ src: g.src, name: p.name, tag: p.industry, body: p.summary, href: `/work/${p.id}`, w: g.w, h: g.h }))),
  { src: "/labs/oio-vendors.webp", name: "oio", tag: "Marketplace · Vendors", body: labs.items[1].body, w: 1059, h: 1704 },
].filter((t, i, a) => a.findIndex((u) => u.src === t.src) === i);

export default function LabsPage() {
  return <LabCanvas tiles={tiles} />;
}
