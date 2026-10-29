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
   * URL de la portada o GIF. 
   * Si type es "carousel", puedes poner varias URLs separadas por coma (ej: "url1.jpg, url2.jpg, url3.jpg").
   */
  cover: string;
  /** URL de la imagen estática de pre-carga (poster) mientras carga el contenido principal. */
  poster?: string;
  /** Tipo de visualización: "standard" (por defecto, una sola imagen/gif) o "carousel" (múltiples imágenes). */
  type?: "standard" | "carousel";
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
    cover: "https://creestudio.es/wp-content/uploads/2025/12/GIF4-1.gif",
    poster: "https://creestudio.es/wp-content/uploads/2026/04/Mesa-de-trabajo-1-copia-7@2x-80.jpg",
    type: "standard", // Por defecto
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
    cover: "https://creestudio.es/wp-content/uploads/2026/09/BEHANCE-PROYECTO-PAN-Y-PIZZA-13.jpg",
    type: "standard",
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
    // Ejemplo de un proyecto con tipo "carousel" separando varias URLs con comas:
    cover: "https://creestudio.es/wp-content/uploads/2025/12/Gemini_Generated_Image_89ndtj89ndtj89nd-scaled-1-1.jpg",
    type: "carousel",
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
    cover: "https://creestudio.es/wp-content/uploads/2025/12/PORTAFOLO-BUENAVENTURA_Mesa-de-trabajo-1-copia-17-1.jpg",
    type: "standard",
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
    cover: "https://creestudio.es/wp-content/uploads/2025/09/BP2_Mesa-de-trabajo-1-copia-18.jpg",
    type: "standard",
    featured: true,
  },
  {
    slug: "delta-suply",
    title: "Delta Supply",
    services: ["identidad-visual"],
    summary: null,
    cover: "https://creestudio.es/wp-content/uploads/2026/09/PORTAFOLIO-TUTAXI-2026-07.jpg",
    type: "standard",
  },
  {
    slug: "psicopetoykids",
    title: "Psicopetoykids",
    services: ["branding"],
    summary: null,
    cover: "https://creestudio.es/wp-content/uploads/2026/03/isotipo1.gif",
    type: "standard",
  },

  {
    slug: "psicopetoykids",
    title: "Psicopetoykids",
    services: ["branding"],
    summary: null,
    cover: "https://creestudio.es/wp-content/uploads/2025/12/ONCE-UNO.jpg",
    type: "standard",
  },


  {
    slug: "psicopetoykids",
    title: "Psicopetoykids",
    services: ["branding"],
    summary: null,
    cover: "https://creestudio.es/wp-content/uploads/2026/09/02.png",
    type: "standard",
  },














];




export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}