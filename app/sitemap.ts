import type { MetadataRoute } from "next";
import { company, pages, projects, industries } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: company.url, lastModified: now, priority: 1 },
    ...pages.map((p) => ({ url: company.url + p.href, lastModified: now, priority: 0.8 })),
    ...projects.map((p) => ({ url: `${company.url}/work/${p.id}`, lastModified: now, priority: 0.6 })),
    ...industries.map((i) => ({ url: `${company.url}/industries/${i.id}`, lastModified: now, priority: 0.6 })),
  ];
}
