import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Don't run TypeScript during build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;