import { wpClient } from "./wordpress";

/*
 * Blog: entradas nativas de WordPress (Entradas), vía WPGraphQL.
 * Por ahora se escriben solo en español; la versión en inglés muestra el mismo
 * artículo (marcado con lang="es"). Si WordPress falla, lista vacía / null.
 */

export type PostCard = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover?: { src: string; width: number; height: number; alt: string };
  categories: { slug: string; name: string }[];
  /** Minutos de lectura estimados. */
  readingTime: number;
};

export type PostDetail = PostCard & { content: string };

type WpPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string | null;
  content?: string | null;
  featuredImage: {
    node: { sourceUrl: string; altText: string | null; mediaDetails: { width: number; height: number } | null };
  } | null;
  categories: { nodes: { slug: string; name: string }[] } | null;
};

const POST_FIELDS = /* GraphQL */ `
  slug
  title
  date
  excerpt
  featuredImage { node { sourceUrl altText mediaDetails { width height } } }
  categories { nodes { slug name } }
`;

const LIST_QUERY = /* GraphQL */ `
  query BlogPosts {
    posts(first: 100, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
      nodes { ${POST_FIELDS} content }
    }
  }
`;

const POST_QUERY = /* GraphQL */ `
  query BlogPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) { ${POST_FIELDS} content }
  }
`;

/** Texto plano de un fragmento HTML de WordPress (para extractos y conteo de palabras). */
function plain(html: string | null | undefined): string {
  return (html ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&hellip;|&#8230;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/\s+/g, " ")
    .trim();
}

const minutes = (html: string | null | undefined) =>
  Math.max(1, Math.round(plain(html).split(" ").filter(Boolean).length / 200));

function toCard(p: WpPost): PostCard {
  const node = p.featuredImage?.node;
  return {
    slug: p.slug,
    title: plain(p.title),
    date: p.date,
    // WordPress añade "[…]" al extracto automático.
    excerpt: plain(p.excerpt).replace(/\s*\[…\]\s*$/, "…"),
    cover: node
      ? {
          src: node.sourceUrl,
          width: node.mediaDetails?.width ?? 1600,
          height: node.mediaDetails?.height ?? 900,
          alt: node.altText ?? "",
        }
      : undefined,
    // "Sin categoría" no aporta nada en la interfaz.
    categories: (p.categories?.nodes ?? []).filter((c) => c.slug !== "uncategorized" && c.slug !== "sin-categoria"),
    readingTime: minutes(p.content),
  };
}

export async function fetchPosts(): Promise<PostCard[]> {
  try {
    const data = await wpClient.request<{ posts: { nodes: WpPost[] } }>(LIST_QUERY);
    return data.posts.nodes.map(toCard);
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const data = await wpClient.request<{ post: WpPost | null }>(POST_QUERY, { slug });
    if (!data.post) return null;
    return { ...toCard(data.post), content: data.post.content ?? "" };
  } catch {
    return null;
  }
}
