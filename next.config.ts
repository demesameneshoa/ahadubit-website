import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Put the (small) stylesheet straight into the HTML: one less request
    // before first paint.
    inlineCss: true,
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Bundle all shared client code into a single "app" chunk instead of many
      // small ones. Fewer script requests = faster first load on slow links
      // (and a better grade in YSlow-style tools such as Pingdom).
      config.optimization.splitChunks = {
        chunks: (chunk: { name?: string | null }) => !/^(polyfills|main|pages\/_app)$/.test(chunk.name ?? ""),
        cacheGroups: {
          default: false,
          defaultVendors: false,
          app: {
            name: "app",
            test: /[\\/]/,
            chunks: (chunk: { name?: string | null }) => !/^(polyfills|main|pages\/_app)$/.test(chunk.name ?? ""),
            enforce: true,
            priority: 50,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
