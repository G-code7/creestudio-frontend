"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { Project } from "@/src/data/projects";

type Slot = {
  ratio: string;
  sm: [number, number];
  lg: [number, number];
};

const SLOTS: Slot[] = [
  { ratio: "4 / 5", sm: [1, 1], lg: [1, 1] },
  { ratio: "1 / 1", sm: [2, 1], lg: [2, 1] },
  { ratio: "3 / 4", sm: [1, 2], lg: [3, 2] },
  { ratio: "4 / 3", sm: [2, 2], lg: [1, 2] },
  { ratio: "4 / 5", sm: [1, 3], lg: [2, 2] },
  { ratio: "1 / 1", sm: [2, 3], lg: [3, 3] },
  { ratio: "3 / 4", sm: [1, 4], lg: [1, 3] },
  { ratio: "4 / 5", sm: [2, 4], lg: [2, 3] },
  { ratio: "4 / 3", sm: [1, 5], lg: [3, 4] },
  { ratio: "1 / 1", sm: [2, 5], lg: [1, 4] },
  { ratio: "3 / 4", sm: [1, 6], lg: [2, 4] },
  { ratio: "4 / 5", sm: [2, 6], lg: [3, 5] },
];

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

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          motionOk: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          if (!ctx.conditions?.motionOk) return;
          const isDesktop = ctx.conditions.isDesktop;

          const slots = gsap.utils.toArray<HTMLElement>(grid.querySelectorAll("[data-slot]"));

          slots.forEach((slot) => {
            const col = Number(isDesktop ? slot.dataset.colLg : slot.dataset.colSm) || 1;
            const figure = slot.querySelector<HTMLElement>("[data-figure]");

            gsap.to(slot, {
              y: () => COLUMN_DRIFT[col - 1] ?? 0,
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
              yPercent: 10,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: { trigger: slot, start: "top 90%", once: true },
            });

            gsap.to(figure, {
              yPercent: -12,
              scale: 0.97,
              autoAlpha: 0,
              ease: "none",
              scrollTrigger: { trigger: slot, start: "top 20%", end: "top -5%", scrub: true },
            });
          });
        }
      );
    },
    { scope: root }
  );

  return (
    <div ref={root} className="container-site mosaic relative z-10 pt-[28vh] pb-28 md:pb-36">
      {SLOTS.map((slot, i) => {
        const project = projects[i % projects.length];
        const hasImage = project.cover.length > 0;

        return (
          <div
            key={i}
            data-slot
            data-col-sm={slot.sm[0]}
            data-col-lg={slot.lg[0]}
            className="mosaic-slot"
            style={
              {
                "--c": slot.sm[0],
                "--r": slot.sm[1],
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
                  {project.poster && (
                    <Image
                      src={project.poster}
                      alt=""
                      width={900}
                      height={1100}
                      sizes="(min-width: 1024px) 30vw, 45vw"
                      className="absolute inset-0 size-full object-cover"
                    />
                  )}
                  <Image
                    src={project.cover}
                    alt=""
                    width={900}
                    height={1100}
                    sizes="(min-width: 1024px) 30vw, 45vw"
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