"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { Project } from "@/src/data/projects";


type Slot = {
  ratio: string;
  lg: [number, number];
  md: [number, number];
};


const SLOTS: Slot[] = [
  { ratio: "4 / 5", lg: [1, 1], md: [1, 1] },
  { ratio: "1 / 1", lg: [3, 1], md: [2, 2] },
  { ratio: "3 / 4", lg: [2, 2], md: [1, 3] },
  { ratio: "4 / 3", lg: [1, 3], md: [2, 4] },
  { ratio: "4 / 5", lg: [2, 4], md: [1, 5] },
  { ratio: "3 / 4", lg: [3, 4], md: [2, 6] },
  { ratio: "1 / 1", lg: [1, 5], md: [1, 7] },
  { ratio: "4 / 5", lg: [3, 5], md: [2, 8] },
  { ratio: "4 / 3", lg: [2, 6], md: [1, 9] },
  { ratio: "3 / 4", lg: [1, 7], md: [2, 10] },
  { ratio: "4 / 5", lg: [3, 7], md: [1, 11] },
  { ratio: "1 / 1", lg: [2, 8], md: [2, 12] },
];

/** Deriva de cada columna durante el recorrido, en px. Ritmos distintos = profundidad. */
const COLUMN_DRIFT = [-72, 44, -52];

const PLACEHOLDERS = ["bg-slate", "bg-brand-dark", "bg-slate-soft"];

type ProjectMosaicProps = { projects: Project[] };

export default function ProjectMosaic({ projects }: ProjectMosaicProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = root.current;
      if (!grid) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const slots = gsap.utils.toArray<HTMLElement>(grid.querySelectorAll("[data-slot]"));

        slots.forEach((slot) => {
          const figure = slot.querySelector<HTMLElement>("[data-figure]");

          // Parallax: la ranura deriva según la columna que ocupe en ese momento.
          gsap.to(slot, {
            y: () => COLUMN_DRIFT[Number(slot.dataset.column ?? 1) - 1] ?? 0,
            ease: "none",
            scrollTrigger: {
              trigger: grid,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          if (!figure) return;
          gsap.from(figure, {
            yPercent: 8,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: slot, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="container-site mosaic relative z-10 pt-[28vh] pb-32 md:pb-40">
      {SLOTS.map((slot, i) => {
        const project = projects[i % projects.length];
        const hasImage = project.cover.length > 0;

        return (
          <div
            key={i}
            data-slot
            data-column={slot.lg[0]}
            className="mosaic-slot"
            style={
              {
                "--c": 1,
                "--r": i + 1,
                "--c-md": slot.md[0],
                "--r-md": slot.md[1],
                "--c-lg": slot.lg[0],
                "--r-lg": slot.lg[1],
              } as React.CSSProperties
            }
          >
            <figure
              data-figure
              aria-hidden
              className="overflow-hidden rounded-xl"
              style={{ aspectRatio: slot.ratio }}
            >
              {hasImage ? (
                <Image
                  src={project.cover}
                  alt=""
                  width={900}
                  height={1100}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
                  className="size-full object-cover"
                />
              ) : (
                <div className={`size-full ${PLACEHOLDERS[i % PLACEHOLDERS.length]}`} />
              )}
            </figure>
          </div>
        );
      })}
    </div>
  );
}
