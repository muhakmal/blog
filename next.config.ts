import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/site";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  // Emit <page>/index.html so both /blog/x and /blog/x/ resolve on GitHub Pages.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
