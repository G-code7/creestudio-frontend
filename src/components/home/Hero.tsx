"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/src/lib/gsap";
import Button from "@/src/components/ui/Button";
import type { Project } from "@/src/data/projects";

/** Cuántas imágenes atraviesan el lente (se ciclan los proyectos disponibles). */
const IMG_COUNT = 10;

/** Offsets para que no todas pasen por el centro exacto (da profundidad real). */
const OFFSETS = [
  { x: -40, y: -24 }, { x: 64, y: 30 }, { x: 0, y: -64 }, { x: -84, y: 42 },
  { x: 52, y: -30 }, { x: -30, y: 54 }, { x: 72, y: 12 }, { x: -62, y: -42 },
  { x: 24, y: 62 }, { x: 44, y: -52 },
];

/** Proporciones alternas para las imágenes del túnel. */
const RATIOS = ["3 / 4", "4 / 5", "1 / 1", "4 / 3"];

const PLACEHOLDERS = [
  "linear-gradient(135deg,#020381 0%,#2874fc 100%)",
  "linear-gradient(135deg,#045cb4 0%,#1e293b 100%)",
  "linear-gradient(135deg,#334155 0%,#046bd2 100%)",
];

type HeroProps = {
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  projects: Project[];
};

export default function Hero({ title, subtitle, primary, secondary, projects }: HeroProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  const images = Array.from({ length: IMG_COUNT }, (_, i) => projects[i % projects.length]);

  useGSAP(
    () => {
      const sceneEl = scene.current;
      const copyEl = copy.current;
      const wrap = wrapper.current;
      if (!sceneEl || !copyEl || !wrap) return;

      const figures = gsap.utils.toArray<HTMLElement>(sceneEl.querySelectorAll("[data-figure]"));

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Sin movimiento: copy visible, imágenes ocultas.
        gsap.set(copyEl, { autoAlpha: 1, z: 0, scale: 1, filter: "blur(0px)" });
        gsap.set(figures, { autoAlpha: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Estado base: copy al frente; imágenes lejos, invisibles y difusas.
        gsap.set(copyEl, { transformPerspective: 1200, z: 0, scale: 1, autoAlpha: 1 });
        figures.forEach((fig, i) => {
          const off = OFFSETS[i % OFFSETS.length];
          gsap.set(fig, {
            xPercent: -50,
            yPercent: -50,
            x: off.x,
            y: off.y,
            z: -2600,
            autoAlpha: 0,
            filter: "blur(12px)",
          });
        });

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });

        // El copy se aleja hacia atrás: retrocede, se encoge y se difumina.
        master.to(
          copyEl,
          { z: -1500, scale: 0.78, autoAlpha: 0, filter: "blur(14px)", ease: "power1.in", duration: 2.4 },
          0
        );

        // Las imágenes emergen del fondo, se enfocan y pasan de largo.
        const step = 0.9;
        figures.forEach((fig, i) => {
          const seg = gsap.timeline();
          seg
            .to(fig, { z: 0, autoAlpha: 1, filter: "blur(0px)", ease: "power1.out", duration: 1.7 })
            .to(fig, { z: 760, autoAlpha: 0, filter: "blur(6px)", ease: "power1.in", duration: 1.2 });
          master.add(seg, 0.2 + i * step);
        });
      });
    },
    { scope: wrapper }
  );

  return (
    <div ref={wrapper} className="relative h-[400vh]">
      <section
        className="sticky top-0 h-[100svh] overflow-hidden bg-paper"
        style={{ perspective: "1200px" }}
      >
        {/* Escena 3D: copy + imágenes comparten profundidad (preserve-3d) */}
        <div ref={scene} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {/* Copy: estado de reposo del hero */}
          <div
            ref={copy}
            className="container-site absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <h1 className="max-w-5xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-slate">{subtitle}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button href={primary.href} variant="primary">
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            </div>
          </div>

          {/* Imágenes apiladas en profundidad (decorativas: el contenido real está en Proyectos) */}
          {images.map((project, i) => {
            const hasImage = project.cover.length > 0;
            return (
              <figure
                key={i}
                data-figure
                aria-hidden
                className="absolute left-1/2 top-1/2 w-[72vw] max-w-[520px] overflow-hidden rounded-xl shadow-[0_30px_80px_-20px_rgba(2,3,129,0.45)] will-change-transform"
                style={{
                  aspectRatio: RATIOS[i % RATIOS.length],
                  ...(hasImage ? {} : { background: PLACEHOLDERS[i % PLACEHOLDERS.length] }),
                }}
              >
                {hasImage && (
                  <Image
                    src={project.cover}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 40vw, 72vw"
                    className="object-cover"
                  />
                )}
              </figure>
            );
          })}
        </div>
      </section>
    </div>
  );
}
