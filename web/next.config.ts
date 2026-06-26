import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Required for static export with trailingSlash
  trailingSlash: true,
};

export default nextConfig;
