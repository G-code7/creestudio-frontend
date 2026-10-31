/*
 * Convierte el HTML del campo `content` de WordPress (bloques de imagen o de
 * galería de Gutenberg) en un array plano de imágenes. Corre en el servidor,
 * sin DOM, por regex.
 *
 * URL: la del srcset de mayor ancho si existe; si no, la del `src` tal cual.
 * No reconstruimos el "original" quitando el sufijo de tamaño, porque WordPress
 * no siempre guarda ese archivo (p. ej. con imágenes `-scaled`) y daría 404.
 * Usamos siempre una URL que WordPress está sirviendo de verdad.
 *
 * Dimensiones: atributos width/height → sufijo del nombre ("-1024x549") → 0.
 * Next/Image necesita la proporción, que se mantiene entre tamaños.
 */

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

function attr(tag: string, name: string): string | undefined {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? m[1] : undefined;
}

/** Dimensiones embebidas por WordPress en el nombre: "...-1024x549.jpg". */
function dimsFromFilename(url: string): { width: number; height: number } | null {
  const m = url.match(/-(\d+)x(\d+)\.[a-z]+(?:\?.*)?$/i);
  return m ? { width: Number(m[1]), height: Number(m[2]) } : null;
}

/** La URL de mayor ancho declarada en el srcset, si lo hay. */
function largestFromSrcset(tag: string): string | undefined {
  const srcset = attr(tag, "srcset");
  if (!srcset) return undefined;
  let best: string | undefined;
  let bestW = -1;
  for (const part of srcset.split(",")) {
    const [url, descriptor] = part.trim().split(/\s+/);
    const w = parseInt(descriptor ?? "0", 10);
    if (url && w > bestW) {
      bestW = w;
      best = url;
    }
  }
  return best;
}

export function parseGalleryImages(html: string | null | undefined): GalleryImage[] {
  if (!html) return [];
  const tags = html.match(/<img\b[^>]*>/gi) ?? [];
  const images: GalleryImage[] = [];

  for (const tag of tags) {
    const rawSrc = attr(tag, "src");
    if (!rawSrc) continue;

    // La URL que de verdad existe: srcset más grande, o el src tal cual.
    const src = largestFromSrcset(tag) ?? rawSrc;

    // La proporción se saca del nombre que estamos usando (o de los atributos).
    let width = Number(attr(tag, "width")) || 0;
    let height = Number(attr(tag, "height")) || 0;
    if (!width || !height) {
      const d = dimsFromFilename(src) ?? dimsFromFilename(rawSrc);
      if (d) {
        width = d.width;
        height = d.height;
      }
    }

    images.push({ src, width, height, alt: attr(tag, "alt") ?? "" });
  }

  return images;
}