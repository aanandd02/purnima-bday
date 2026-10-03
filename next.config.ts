import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",           // Static HTML export for GitHub Pages
  basePath: isProd ? "/purnima-bday" : "",
  images: {
    unoptimized: true,        // Required for static export
  },
  // Ensure framer-motion resolves correctly
  transpilePackages: [],
};

export default nextConfig;
