import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/blog",
  images: {
    unoptimized: true,
  },
  assetPrefix: "/blog",
};

export default nextConfig;
