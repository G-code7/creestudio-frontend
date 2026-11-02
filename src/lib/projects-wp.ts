import { wpClient } from "./wordpress";
import { galleryRefs, isSameFile, type GalleryImage } from "./gallery";
import type { Locale, ServiceSlug } from "@/src/content/config";

/** ES por defecto; EN con fallback al ES si la traducción viene vacía. */
function byLocale(es: string | null | undefined, en: string | null | undefined, locale: Locale): string {
  if (locale === "en") return (en && en.trim()) || es || "";
  return es || "";
}

/* ── Lista: índice, destacados del home, servicios, sitemap ─────────── */

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

const MEDIA_FIELDS = "databaseId sourceUrl large: sourceUrl(size: LARGE) altText mediaDetails { width height }";

const MEDIA_BY_ID_QUERY = /* GraphQL */ `
  query GalleryMedia($ids: [ID]) {
    mediaItems(where: { in: $ids }, first: 100) { nodes { ${MEDIA_FIELDS} } }
  }
`;

/** Una búsqueda por nombre por cada imagen cuyo adjunto ya no existe, en una sola petición. */
function mediaByNameQuery(count: number): string {
  const vars = Array.from({ length: count }, (_, i) => `$s${i}: String`).join(", ");
  const fields = Array.from(
    { length: count },
    (_, i) => `m${i}: mediaItems(first: 10, where: { search: $s${i} }) { nodes { ${MEDIA_FIELDS} } }`
  ).join("\n");
  return `query GalleryMediaByName(${vars}) {\n${fields}\n}`;
}

/**
 * Galería del proyecto, en el orden del contenido:
 *   1. por ID de adjunto;
 *   2. si ese adjunto se borró, por nombre de archivo en la biblioteca
 *      (la misma imagen resubida; si hay varias, la más reciente);
 *   3. si no aparece de ninguna forma, se omite en vez de quedar rota.
 */
async function fetchGallery(content: string | null): Promise<GalleryImage[]> {
  const refs = galleryRefs(content);
  if (refs.length === 0) return [];

  const ids = refs.flatMap((r) => (r.id ? [r.id] : []));
  const byId = new Map<number, WpMedia>();
  if (ids.length > 0) {
    const data = await wpClient.request<{ mediaItems: { nodes: WpMedia[] } }>(MEDIA_BY_ID_QUERY, { ids });
    for (const m of data.mediaItems.nodes) byId.set(m.databaseId, m);
  }

  const missing = refs.filter((r) => !(r.id && byId.has(r.id)));
  const byName = new Map<string, WpMedia>();
  if (missing.length > 0) {
    const vars = Object.fromEntries(missing.map((r, i) => [`s${i}`, r.search]));
    const data = await wpClient.request<Record<string, { nodes: WpMedia[] }>>(mediaByNameQuery(missing.length), vars);
    missing.forEach((r, i) => {
      const match = (data[`m${i}`]?.nodes ?? [])
        .filter((m) => isSameFile(m.sourceUrl, r.name))
        .sort((a, b) => b.databaseId - a.databaseId)[0];
      if (match) byName.set(r.name, match);
    });
  }

  const used = new Set<number>();
  return refs.flatMap((r) => {
    const m = (r.id ? byId.get(r.id) : undefined) ?? byName.get(r.name);
    if (!m || used.has(m.databaseId)) return [];
    used.add(m.databaseId);
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
  const title = byLocale(p.title, acf?.tituloEn, locale) || p.title;

  // Alt de la biblioteca de medios; si está vacío, "Título, imagen 2 de 5".
  const gallery = await fetchGallery(p.content);
  const word = locale === "en" ? "image" : "imagen";
  const of = locale === "en" ? "of" : "de";
  const images = gallery.map((im, i) => ({
    ...im,
    alt: im.alt || `${title}, ${word} ${i + 1} ${of} ${gallery.length}`,
  }));

  return {
    slug: p.slug,
    title,
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
    images,
  };
}
