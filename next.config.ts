import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: ['*'],
  images: {
    unoptimized: true,
  },
  devIndicators: false,
};

export default nextConfig;
