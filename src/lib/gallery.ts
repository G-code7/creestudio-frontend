/*
 * Galería de un proyecto. Del contenido de WordPress solo se toma qué
 * imágenes se insertaron y en qué orden; URL, proporción y alt salen de la
 * biblioteca de medios (ver fetchGallery en projects-wp.ts).
 *
 * Cada imagen trae dos referencias: su ID de adjunto ("wp-image-38") y el
 * nombre del archivo. Si el adjunto se borró y se volvió a subir, el ID ya
 * no existe, pero el archivo sigue ahí con otro ID y casi el mismo nombre:
 * WordPress solo le añade "-1", "-2"… o "-scaled".
 */

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** id: adjunto citado; name: nombre del archivo; search: término para buscarlo en la biblioteca. */
export type GalleryRef = { id: number | null; name: string; search: string };

/** Nombre del archivo sin extensión ni tamaño: ".../qqqqqq-1024x549.jpg" -> "qqqqqq". */
function fileName(url: string): string {
  return (url.split("?")[0].split("/").pop() ?? "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/-\d+x\d+$/, "")
    .toLowerCase();
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * ¿Es `url` el mismo archivo que `name`, resubido? Mismo nombre más, como
 * mucho, los sufijos que añade WordPress. La extensión puede cambiar
 * (un .png que vuelve como .jpg).
 *   "qqqqqq" ~ ".../qqqqqq-1.jpg"   sí
 *   "mesa-de-trabajo-1" ~ ".../mesa-de-trabajo-2.jpg"   no
 */
export function isSameFile(url: string, name: string): boolean {
  return new RegExp(`^${escapeRegExp(name)}(?:-scaled|-\\d+)*$`).test(fileName(url));
}

/** Imágenes del contenido, en orden y sin repetir. */
export function galleryRefs(html: string | null | undefined): GalleryRef[] {
  const refs: GalleryRef[] = [];
  const seen = new Set<string>();
  for (const tag of (html ?? "").match(/<img\b[^>]*>/gi) ?? []) {
    const src = tag.match(/\bsrc="([^"]+)"/i)?.[1];
    if (!src) continue;
    const name = fileName(src);
    if (!name || seen.has(name)) continue;
    seen.add(name);
    refs.push({
      id: Number(tag.match(/wp-image-(\d+)/)?.[1]) || null,
      name,
      // La búsqueda de WordPress es amplia; isSameFile filtra después.
      search: name.replace(/(?:-scaled|-\d+)+$/, "") || name,
    });
  }
  return refs;
}
