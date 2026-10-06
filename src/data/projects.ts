import type { Locale, ServiceSlug } from "@/src/content/config";

export type Project = {
  /** Mismo slug que en creestudio.es para conservar el posicionamiento. */
  slug: string;
  title: string;
  year?: number;
  location?: string;
  services: ServiceSlug[];
  /** Resumen por idioma. null = sin resumen todavía. */
  summary: Record<Locale, string> | null;
  /**
   * URL de la portada. Vacío = placeholder de color.
   * Al pegar la URL real, añade su dominio en next.config.ts > images.remotePatterns.
   */
  cover: string;
  featured?: boolean;
};

/* Temporal: estos datos se reemplazarán por fetchProjects() desde WordPress. */
export const projects: Project[] = [
  {
    slug: "ladiescup-2026",
    title: "Ladies Cup",
    year: 2025,
    location: "Brooklyn, NY",
    services: ["identidad-visual", "branding"],
    summary: {
      es: "Identidad visual para un torneo de golf femenino en Brooklyn, con un lenguaje sofisticado a la altura del juego.",
      en: "Visual identity for a women’s golf tournament in Brooklyn, with a refined language that matches the game.",
    },
    cover: "",
    featured: true,
  },
  {
    slug: "healog-2",
    title: "Healog",
    year: 2024,
    location: "Brooklyn, NY",
    services: ["branding", "packaging"],
    summary: {
      es: "Branding estratégico y packaging para una marca de salud digestiva canina.",
      en: "Strategic branding and packaging for a canine digestive health brand.",
    },
    cover: "",
    featured: true,
  },
  {
    slug: "panca-2026",
    title: "Panca",
    year: 2025,
    location: "Brooklyn, NY",
    services: ["branding", "identidad-visual"],
    summary: {
      es: "Branding estratégico para una propuesta gastronómica de fusión peruano-mediterránea.",
      en: "Strategic branding for a Peruvian-Mediterranean fusion restaurant concept.",
    },
    cover: "",
    featured: true,
  },
  {
    slug: "ventu-branding",
    title: "VENTU",
    year: 2026,
    services: ["branding", "identidad-visual"],
    summary: {
      es: "Branding para una plataforma que digitaliza el turismo en Venezuela.",
      en: "Branding for a platform bringing Venezuelan tourism online.",
    },
    cover: "",
    featured: true,
  },
  {
    slug: "l-a-sistemas-produccion-20-aniversario",
    title: "L.A. Sistemas",
    services: ["identidad-visual"],
    summary: {
      es: "Identidad visual para la celebración de los 20 años de la compañía.",
      en: "Visual identity for the company’s 20th anniversary.",
    },
    cover: "",
    featured: true,
  },
  {
    slug: "delta-suply",
    title: "Delta Supply",
    services: ["identidad-visual"],
    summary: null,
    cover: "",
  },
  {
    slug: "psicopetoykids",
    title: "Psicopetoykids",
    services: ["branding"],
    summary: null,
    cover: "",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
