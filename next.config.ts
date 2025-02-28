import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // This will allow production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent the client bundle from trying to resolve "inspector"
      config.resolve.fallback = {
        ...config.resolve.fallback,
        inspector: false,
      };
    }
    return config;
  },
};

export default nextConfig;
