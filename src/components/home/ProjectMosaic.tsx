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

/* Definimos exactamente 9 casillas con un patrón de escalera/asimetría fluido */
const SLOTS: Slot[] = [
  { ratio: "4 / 5", lg: [1, 1], md: [1, 1] }, // Fila 1 (Izquierda)
  { ratio: "1 / 1", lg: [3, 1], md: [2, 2] }, // Fila 1 (Derecha)
  { ratio: "3 / 4", lg: [2, 2], md: [1, 3] }, // Fila 2 (Centro / Escalera)
  { ratio: "4 / 3", lg: [1, 3], md: [2, 4] }, // Fila 3
  { ratio: "4 / 5", lg: [2, 4], md: [1, 5] }, // Fila 3
  { ratio: "3 / 4", lg: [3, 4], md: [2, 6] }, // Fila 4
  { ratio: "1 / 1", lg: [1, 5], md: [1, 7] }, // Fila 5
  { ratio: "4 / 5", lg: [3, 5], md: [2, 8] }, // Fila 5
  { ratio: "4 / 3", lg: [2, 6], md: [1, 9] }, // Fila 6 (Casilla 9 añadida)
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
        // Tomamos los proyectos en orden estricto del 0 al 8 (las 9 casillas)
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
              className="relative overflow-hidden rounded-xl bg-mist"
              style={{ aspectRatio: slot.ratio }}
            >
              {hasImage ? (
                <>
                  {/* 1. IMAGEN ESTÁTICA DE PRE-CARGA (Poster opcional) */}
                  {project.poster && (
                    <Image
                      src={project.poster}
                      alt=""
                      width={900}
                      height={1100}
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
                      className="absolute inset-0 size-full object-cover"
                    />
                  )}

                  {/* 2. LA PORTADA O GIF PRINCIPAL */}
                  <Image
                    src={project.cover}
                    alt=""
                    width={900}
                    height={1100}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 88vw"
                    className={`relative z-10 size-full object-cover ${project.poster ? "opacity-0 transition-opacity duration-700" : ""}`}
                    onLoad={(e) => {
                      if (project.poster) {
                        (e.target as HTMLElement).style.opacity = "1";
                      }
                    }}
                  />
                </>
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