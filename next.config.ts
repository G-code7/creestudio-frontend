import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "**.creestudio.es", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "creestudio.es", pathname: "/wp-content/uploads/**" },
    ],
  },
};

export default nextConfig;