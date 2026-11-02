/*
 * Galería de un proyecto. El contenido de WordPress solo se usa para saber
 * qué adjuntos se insertaron y en qué orden (clase "wp-image-<id>" de los
 * bloques de imagen y de galería). URL, proporción y alt salen de la
 * biblioteca de medios: ver fetchGallery en projects-wp.ts.
 */

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** IDs de adjuntos en el orden en que aparecen en el contenido, sin repetir. */
export function galleryIds(html: string | null | undefined): number[] {
  const ids = [...(html ?? "").matchAll(/wp-image-(\d+)/g)].map((m) => Number(m[1]));
  return [...new Set(ids)];
}
