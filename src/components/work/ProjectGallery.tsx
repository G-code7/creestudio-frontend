import Image from "next/image";
import type { GalleryImage } from "@/src/lib/gallery";

const CYCLE = 13;
const FULL_WIDTH = new Set([0, 3, 6, 9]);
const PAIR_START = new Set([1, 4, 7, 10]);

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  return (
    <div className="grid grid-cols-2">
      {images.map((im, i) => {
        const isFull = (i: number, total: number) => i % 3 === 0 || (i === total - 1 && i % 3 === 1);
        return (
          <div
            key={`${im.src}-${i}`}
            className={`relative overflow-hidden ${isFull(i, images.length) ? "col-span-2 aspect-16/10" : "aspect-4/5"}`}
          >
            <Image
              src={im.src}
              alt={im.alt}
              fill
              quality={90}
              sizes={isFull(i, images.length) ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              unoptimized={/\.gif$/i.test(im.src)}
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
