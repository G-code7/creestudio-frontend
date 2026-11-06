import Image from "next/image";
import type { GalleryImage } from "@/src/lib/gallery";

// Patrón de imágenes por fila: 1-2-1-2-1-1-2-1-2 (13 imágenes por ciclo).
// Índices (base 0) que ocupan la fila completa:
const CYCLE = 13;
const FULL_WIDTH = new Set([0, 3, 6, 7, 10]);

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-2">
      {images.map((im, i) => {
        const full = FULL_WIDTH.has(i % CYCLE);
        return (
          <div
            key={`${im.src}-${i}`}
            className={`relative overflow-hidden ${full ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"}`}
          >
            <Image
              src={im.src}
              alt={im.alt}
              fill
              quality={100}
              sizes="(min-width: 768px) 66vw, 100vw"
              unoptimized={im.src.endsWith(".gif")}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}