import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // the current neegles.com industry URLs keep working
  async redirects() {
    return ["logistics", "real-estate", "professional-services", "construction"].map((s) => ({
      source: `/${s}`,
      destination: `/industries/${s}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
