import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { company } from "@/lib/content";
import "./globals.css";

// Self-hosted (Fontsource, OFL): no third-party font requests at runtime.
const display = localFont({
  src: "./fonts/archivo-latin-wdth-normal.woff2",
  variable: "--font-display",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});
const text = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-text", weight: "100 900", display: "swap" });
const mono = localFont({ src: "./fonts/jetbrains-mono-latin-wght-normal.woff2", variable: "--font-mono", weight: "100 800", display: "swap" });

const title = "Neegles: Software, built to ship";
const description =
  "Neegles is a technology company building web, mobile and enterprise software, cloud infrastructure, AI and automation for businesses that need technology to do real work.";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: title, template: "%s · Neegles" },
  description,
  applicationName: "Neegles",
  keywords: ["Neegles", "software development", "web development", "mobile apps", "enterprise software", "UI/UX design", "cloud", "DevOps", "AI", "automation", "Nigeria"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: company.url,
    siteName: "Neegles",
    title,
    description,
    locale: "en_US",
    images: [{ url: "/brand/og.webp", width: 2000, height: 600, alt: "Neegles: Building software, empowering vision" }],
  },
  twitter: { card: "summary_large_image", title, description, site: "@Neeglesng", images: ["/brand/og.webp"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f3f1ec", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  alternateName: company.name,
  url: company.url,
  logo: `${company.url}/brand/neegles-wordmark.webp`,
  email: company.email,
  description: company.description,
  sameAs: company.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${mono.variable}`}>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
