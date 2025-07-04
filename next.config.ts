import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://acrie.com.br/')],
  }
};

export default nextConfig;
