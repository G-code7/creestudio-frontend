"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { GalleryImage } from "@/src/lib/gallery";


const ratioOf = (im: GalleryImage) => (im.width > 0 && im.height > 0 ? im.width / im.height : 4 / 3);
/*
 * Filas justificadas: cada fila suma proporciones (ancho/alto) hasta llegar a
 * ROW_RATIO, y todas sus imágenes comparten alto. Una horizontal va sola; dos
 * verticales, o una vertical y una horizontal, van juntas. Nunca queda una
 * vertical sola con un hueco al lado: si sobra al final, se une a la fila anterior.
 */
const ROW_RATIO = 1.6;

function toRows(images: GalleryImage[]): GalleryImage[][] {
  const rows: GalleryImage[][] = [];
  let row: GalleryImage[] = [];
  let sum = 0;
  for (const im of images) {
    row.push(im);
    sum += ratioOf(im);
    if (sum >= ROW_RATIO) {
      rows.push(row);
      row = [];
      sum = 0;
    }
  }
  if (row.length > 0) {
    if (rows.length > 0 && sum < ROW_RATIO / 2) rows[rows.length - 1].push(...row);
    else rows.push(row);
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