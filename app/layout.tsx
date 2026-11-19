import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { company } from "@/lib/content";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Shell from "@/components/site/Shell";
import "./globals.css";

// Self-hosted (Fontsource, OFL): no third-party font requests at runtime.
const sans = localFont({ src: "./fonts/inter-tight-latin-wght-normal.woff2", variable: "--font-sans", weight: "100 900", display: "swap" });
const serif = localFont({ src: "./fonts/instrument-serif-latin-400-italic.woff2", variable: "--font-serif", weight: "400", style: "italic", display: "swap" });
const label = localFont({ src: "./fonts/courier-prime-latin-400-normal.woff2", variable: "--font-label", weight: "400", display: "swap" });

const title = "Neegles: Software, built to ship";
const description =
  "Neegles is a technology company building web, mobile and enterprise software, cloud infrastructure, AI and automation for businesses that need technology to do real work.";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: { default: title, template: "%s · Neegles" },
  description,
  applicationName: "Neegles",
  keywords: ["Neegles", "software development", "web development", "mobile apps", "enterprise software", "UI/UX design", "cloud", "DevOps", "AI", "automation", "Nigeria"],
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

export const viewport: Viewport = { themeColor: "#f1efe9", width: "device-width", initialScale: 1 };

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
    <html lang="en" className={`${sans.variable} ${serif.variable} ${label.variable}`}>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <Shell>
          <main id="main">{children}</main>
          <Footer />
        </Shell>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
