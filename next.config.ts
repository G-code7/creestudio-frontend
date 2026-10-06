import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Las URLs de creestudio.es terminan en "/". Las mantenemos para no perder posicionamiento.
  trailingSlash: true,

  images: {
    remotePatterns: [
      // Cuando subas las imágenes al backend headless, descomenta y ajusta el host:
      // { protocol: "https", hostname: "cms.creestudio.es", pathname: "/wp-content/uploads/**" },
    ],
  },

  // 301 de las URLs del WordPress actual hacia la nueva arquitectura.
  async redirects() {
    return [
      { source: "/branding", destination: "/servicios/branding/", permanent: true },
      { source: "/branding-2024", destination: "/servicios/branding/", permanent: true },
      { source: "/diseno-web", destination: "/servicios/diseno-web/", permanent: true },
      { source: "/our-services", destination: "/servicios/", permanent: true },
      { source: "/our-projects", destination: "/proyectos/", permanent: true },
      { source: "/about-us", destination: "/", permanent: true },
      // Duplicados antiguos de un mismo proyecto
      { source: "/identidad-visual/ladies-cup", destination: "/proyectos/ladiescup-2026/", permanent: true },
      { source: "/identidad-visual/panca-bk", destination: "/proyectos/panca-2026/", permanent: true },
      {
        source: "/identidad-visual/panca-branding-estrategico-para-una-propuesta-de-fusion-peruano-mediterranea",
        destination: "/proyectos/panca-2026/",
        permanent: true,
      },
      { source: "/proyectos/ladies-cup", destination: "/proyectos/ladiescup-2026/", permanent: true },
      // Regla general: los casos viven ahora en /proyectos/
      { source: "/identidad-visual/:slug", destination: "/proyectos/:slug/", permanent: true },
      { source: "/category/:path*", destination: "/proyectos/", permanent: true },
      { source: "/author/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
