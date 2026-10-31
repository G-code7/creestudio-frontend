"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { GalleryImage } from "@/src/lib/gallery";


const ratioOf = (im: GalleryImage) => (im.width > 0 && im.height > 0 ? im.width / im.height : 4 / 3);
const isPortrait = (im: GalleryImage) => ratioOf(im) <= 0.9;

function toRows(images: GalleryImage[]): GalleryImage[][] {
  const rows: GalleryImage[][] = [];
  for (let i = 0; i < images.length; i++) {
    const im = images[i];
    const next = images[i + 1];
    if (isPortrait(im) && next && isPortrait(next)) {
      rows.push([im, next]);
      i++;
    } else {
      rows.push([im]);
    }
  }
  return rows;
}

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const root = useRef<HTMLDivElement>(null);
  const rows = toRows(images);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Solo opacidad: un desplazamiento abriría huecos entre filas.
        gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-row]")).forEach((row) => {
          gsap.from(row, {
            autoAlpha: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 90%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  if (rows.length === 0) return null;

  return (
    <div ref={root} className="overflow-hidden rounded-xl bg-mist">
      {rows.map((row, i) => (
        <div key={i} data-row className="flex items-start">
          {row.map((im, j) => {
            const r = ratioOf(im);
            return (
              <figure
                key={j}
                className="relative min-w-0"
                style={{ flex: `${r} 1 0%`, aspectRatio: String(r) }}
              >
                <Image
                  src={im.src}
                  alt={im.alt}
                  fill
                  unoptimized
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
              </figure>
            );
          })}
        </div>
      ))}
    </div>
  );
}