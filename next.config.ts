import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow both localhost and 127.0.0.1 — without this, opening via
  // http://127.0.0.1:3847 blocks client/HMR assets and the mock loader never resolves.
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "graduates-cannon-programmers-returned.trycloudflare.com",
  ],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
