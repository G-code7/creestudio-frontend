import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  // Naming e Identidad visual ahora son parte de Branding.
  async redirects() {
    return [
      { source: "/servicios/:old(naming|identidad-visual)", destination: "/servicios/branding/", permanent: true },
      { source: "/en/servicios/:old(naming|identidad-visual)", destination: "/en/servicios/branding/", permanent: true },
    ];
  },

  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      { protocol: "https", hostname: "**.creestudio.es", pathname: "/wp-content/uploads/**" },
      { protocol: "https", hostname: "creestudio.es", pathname: "/wp-content/uploads/**" },
    ],
  },
};

export default nextConfig;