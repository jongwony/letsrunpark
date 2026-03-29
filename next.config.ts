import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (skip in dev to allow dynamic routes)
  ...(process.env.NODE_ENV === "production" && { output: "export" as const }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
