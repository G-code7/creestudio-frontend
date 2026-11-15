"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { Project } from "@/src/data/projects";

type Slot = {
  ratio: string;
  sm: [number, number];
  lg: [number, number];
  nudge?: string;
};

const SLOTS: Slot[] = [
  { ratio: "4 / 5", sm: [1, 1], lg: [1, 1] },
  { ratio: "1 / 1", sm: [2, 2], lg: [3, 1] },
  { ratio: "3 / 4", sm: [1, 3], lg: [2, 2] },
  { ratio: "4 / 3", sm: [2, 4], lg: [1, 3] },
  { ratio: "4 / 5", sm: [1, 5], lg: [2, 4] },
  { ratio: "3 / 4", sm: [2, 6], lg: [3, 4], nudge: "lg:-mt-32" },
  { ratio: "1 / 1", sm: [1, 7], lg: [1, 5] },
  { ratio: "4 / 5", sm: [2, 8], lg: [3, 5] },
  { ratio: "4 / 3", sm: [1, 9], lg: [2, 6] },
];

/* Portadas en cualquier formato: imagen (jpg, png, webp, gif) o vídeo (mp4, webm). */
const isVideo = (src: string) => /\.(mp4|webm)(\?.*)?$/i.test(src);
const isGif = (src: string) => /\.gif(\?.*)?$/i.test(src);

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
            const media = figure.querySelector<HTMLElement>("[data-media]");

            // Entrada y salida con máscara (clip-path), sin tocar la opacidad:
            // la imagen siempre se ve con su color real, nunca lavada sobre el lavanda.
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: slot,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                figure,
                { clipPath: "inset(18% 8% 0% 8% round 28px)", yPercent: 10 },
                { clipPath: "inset(0% 0% 0% 0% round 16px)", yPercent: 0, ease: "power2.out", duration: 0.35 }
              )
              .to(figure, { duration: 0.3 })
              .to(figure, {
                clipPath: "inset(0% 5% 14% 5% round 24px)",
                yPercent: -6,
                ease: "power2.in",
                duration: 0.35,
              });

            // Profundidad: la imagen se desplaza dentro del marco más lento que el marco.
            if (media) {
              gsap.fromTo(
                media,
                { yPercent: -7, scale: 1.14 },
                {
                  yPercent: 7,
                  scale: 1.04,
                  ease: "none",
                  scrollTrigger: {
                    trigger: slot,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }
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
            className={`mosaic-slot ${slot.nudge ?? ""}`}
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
              className="relative overflow-hidden rounded-2xl bg-mist [clip-path:inset(0_round_16px)]"
              style={{ aspectRatio: slot.ratio }}
            >
              {hasImage ? (
                <div data-media className="absolute inset-0 will-change-transform">
                  {project.poster && (
                    <Image
                      src={project.poster}
                      alt=""
                      width={900}
                      height={1100}
                      quality={90}
                      sizes="(min-width: 1024px) 30vw, 45vw"
                      loading={i < 3 ? "eager" : "lazy"}
                      className="absolute inset-0 size-full object-cover"
                    />
                  )}
                  {isVideo(project.cover) ? (
                    <video
                      src={project.cover}
                      poster={project.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="relative z-10 size-full object-cover"
                    />
                  ) : (
                    <Image
                      src={project.cover}
                      alt=""
                      width={900}
                      height={1100}
                      quality={90}
                      sizes="(min-width: 1024px) 30vw, 45vw"
                      loading={i < 3 ? "eager" : "lazy"}
                      // El optimizador no reduce GIF animados: se sirve el original una sola vez.
                      unoptimized={isGif(project.cover)}
                      // Entra suave al cargar (sobre el póster si lo hay, si no sobre el fondo).
                      className="relative z-10 size-full object-cover opacity-0 transition-opacity duration-700"
                      onLoad={(e) => {
                        (e.target as HTMLElement).style.opacity = "1";
                      }}
                    />
                  )}
                </div>
              ) : (
                <div className={`size-full ${PLACEHOLDERS[i % PLACEHOLDERS.length]}`} />
              )}
              {/* Filo interior muy sutil: separa la imagen del lavanda sin sombra pesada */}
              <span aria-hidden className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] ring-1 ring-inset ring-ink/10" />
            </figure>
          </div>
        );
      })}
    </div>
  );
}