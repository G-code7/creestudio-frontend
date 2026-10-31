import { wpClient } from "./wordpress";
import { parseGalleryImages, type GalleryImage } from "./gallery";
import type { Locale, ServiceSlug } from "@/src/content/config";

/*
 * Capa de datos de proyectos desde WordPress headless (api.creestudio.es).
 * De momento alimenta solo la página de proyecto individual; el resto del
 * sitio sigue en src/data/projects.ts hasta que migremos lo demás.
 *
 * Bilingüe: el texto se resuelve por idioma (campo original = ES, variante
 * _en = EN con fallback al ES). Las imágenes se comparten entre idiomas.
 */

export type ProjectDetail = {
  slug: string;
  title: string;
  services: ServiceSlug[];
  year?: number;
  cover?: { src: string; width: number; height: number; alt: string };
  summary?: string;
  images: GalleryImage[];
};

type WpProject = {
  slug: string;
  title: string;
  content: string | null;
  featuredImage: {
    node: { sourceUrl: string; altText: string; mediaDetails: { width: number; height: number } | null };
  } | null;
  servicios: { nodes: { slug: string }[] };
  datosDelProyecto: {
    tituloEn: string | null;
    descripcionCorta: string | null;
    descripcionCortaEn: string | null;
    anio: number | null;
  } | null;
};

const PROJECT_QUERY = /* GraphQL */ `
  query ProjectBySlug($slug: ID!) {
    proyecto(id: $slug, idType: SLUG) {
      slug
      title
      content
      featuredImage {
        node { sourceUrl altText mediaDetails { width height } }
      }
      servicios { nodes { slug } }
      datosDelProyecto { tituloEn descripcionCorta descripcionCortaEn anio }
    }
  }
`;

const INDEX_QUERY = /* GraphQL */ `
  query ProjectsIndex {
    proyectos(first: 100) {
      nodes { slug title }
    }
  }
`;

/** ES por defecto; EN con fallback al ES si la traducción viene vacía. */
function byLocale(es: string | null | undefined, en: string | null | undefined, locale: Locale): string {
  if (locale === "en") return (en && en.trim()) || es || "";
  return es || "";
}

/** Lista ligera para generateStaticParams y la navegación "siguiente proyecto". */
export async function fetchProjectSlugs(): Promise<{ slug: string; title: string }[]> {
  try {
    const data = await wpClient.request<{ proyectos: { nodes: { slug: string; title: string }[] } }>(INDEX_QUERY);
    return data.proyectos.nodes;
  } catch {
    return [];
  }
}

export async function fetchProjectBySlug(slug: string, locale: Locale): Promise<ProjectDetail | null> {
  const data = await wpClient.request<{ proyecto: WpProject | null }>(PROJECT_QUERY, { slug });
  const p = data.proyecto;
  if (!p) return null;

  const acf = p.datosDelProyecto;
  const node = p.featuredImage?.node;

  return {
    slug: p.slug,
    title: byLocale(p.title, acf?.tituloEn, locale) || p.title,
    services: p.servicios.nodes.map((n) => n.slug as ServiceSlug),
    year: acf?.anio ?? undefined,
    cover: node
      ? {
          src: node.sourceUrl,
          width: node.mediaDetails?.width ?? 1600,
          height: node.mediaDetails?.height ?? 900,
          alt: node.altText ?? "",
        }
      : undefined,
    summary: byLocale(acf?.descripcionCorta, acf?.descripcionCortaEn, locale) || undefined,
    images: parseGalleryImages(p.content),
  };
}
