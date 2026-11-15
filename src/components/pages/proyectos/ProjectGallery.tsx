import Image from "next/image";
import type { GalleryImage } from "@/src/lib/gallery";

// Patrón 1-2-1-2…: cada tercera imagen ocupa la fila completa; si la última queda sola, también.
const isFull = (i: number, total: number) => i % 3 === 0 || (i === total - 1 && i % 3 === 1);

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-2">
      {images.map((im, i) => {
        const full = isFull(i, images.length);
        return (
          <div
            key={`${im.src}-${i}`}
            className={`relative overflow-hidden ${full ? "col-span-2 aspect-16/10" : "aspect-4/5"}`}
          >
            <Image
              src={im.src}
              alt={im.alt}
              fill
              quality={90}
              sizes={full ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              unoptimized={/\.gif$/i.test(im.src)}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
