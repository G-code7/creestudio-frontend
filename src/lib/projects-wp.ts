import { wpClient } from "./wordpress";
import { galleryIds, type GalleryImage } from "./gallery";
import type { Locale, ServiceSlug } from "@/src/content/config";

/** ES por defecto; EN con fallback al ES si la traducción viene vacía. */
function byLocale(es: string | null | undefined, en: string | null | undefined, locale: Locale): string {
  if (locale === "en") return (en && en.trim()) || es || "";
  return es || "";
}

/*  Lista: índice, destacados del home, servicios, sitemap */

export type ProjectCard = {
  slug: string;
  title: string;
  services: ServiceSlug[];
  year?: number;
  cover?: string;
  featured: boolean;
};

type WpListItem = {
  slug: string;
  title: string;
  featuredImage: { node: { sourceUrl: string } } | null;
  servicios: { nodes: { slug: string }[] };
  datosDelProyecto: { tituloEn: string | null; anio: number | null; destacado: boolean | null } | null;
};

const LIST_QUERY = /* GraphQL */ `
  query ProjectsList {
    proyectos(first: 100) {
      nodes {
        slug
        title
        featuredImage { node { sourceUrl } }
        servicios { nodes { slug } }
        datosDelProyecto { tituloEn anio destacado }
      }
    }
  }
`;

/** Todos los proyectos publicados, en el orden del CMS. Si WordPress falla, lista vacía. */
export async function fetchProjects(locale: Locale): Promise<ProjectCard[]> {
  try {
    const data = await wpClient.request<{ proyectos: { nodes: WpListItem[] } }>(LIST_QUERY);
    return data.proyectos.nodes.map((p) => ({
      slug: p.slug,
      title: byLocale(p.title, p.datosDelProyecto?.tituloEn, locale) || p.title,
      services: p.servicios.nodes.map((n) => n.slug as ServiceSlug),
      year: p.datosDelProyecto?.anio ?? undefined,
      cover: p.featuredImage?.node.sourceUrl,
      featured: Boolean(p.datosDelProyecto?.destacado),
    }));
  } catch {
    return [];
  }
}

/* Proyectos con "Destacado en el home" */
export async function fetchFeaturedProjects(locale: Locale, limit = 5): Promise<ProjectCard[]> {
  return (await fetchProjects(locale)).filter((p) => p.featured).slice(0, limit);
}

/* ── Detalle ────────────────────────────────────────────────────────── */

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

type WpMedia = {
  databaseId: number;
  sourceUrl: string;
  large: string | null;
  altText: string | null;
  mediaDetails: { width: number; height: number } | null;
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

const MEDIA_QUERY = /* GraphQL */ `
  query GalleryMedia($ids: [ID]) {
    mediaItems(where: { in: $ids }, first: 100) {
      nodes { databaseId sourceUrl large: sourceUrl(size: LARGE) altText mediaDetails { width height } }
    }
  }
`;

/**
 * Galería a partir de los adjuntos que cita el contenido, consultados a la
 * biblioteca de medios. Un adjunto borrado no vuelve en la consulta y
 * simplemente no se pinta, en lugar de quedar como imagen rota.
 */
async function fetchGallery(content: string | null): Promise<GalleryImage[]> {
  const ids = galleryIds(content);
  if (ids.length === 0) return [];

  const data = await wpClient.request<{ mediaItems: { nodes: WpMedia[] } }>(MEDIA_QUERY, { ids });
  const byId = new Map(data.mediaItems.nodes.map((m) => [m.databaseId, m]));

  return ids.flatMap((id) => {
    const m = byId.get(id);
    if (!m) return [];
    return [{
      src: m.large || m.sourceUrl,
      width: m.mediaDetails?.width ?? 0,
      height: m.mediaDetails?.height ?? 0,
      alt: m.altText ?? "",
    }];
  });
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
    images: await fetchGallery(p.content),
  };
}
