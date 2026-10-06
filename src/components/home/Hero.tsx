"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";
import Button from "@/src/components/ui/Button";
import type { Project } from "@/src/data/projects";
import ProjectMosaic from "./ProjectMosaic";

/*
 * El copy queda fijo y retrocede (se encoge, se difumina y se apaga) a lo largo
 * del hero y de la primera mitad del mosaico, que entra desde abajo y pasa por
 * encima. El mosaico no lleva fondo, así que el titular se ve por los huecos
 * mientras se aleja.
 */

type HeroProps = {
  title: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  projects: Project[];
};

export default function Hero({ title, subtitle, primary, secondary, projects }: HeroProps) {
  const wrapper = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapperEl = wrapper.current;
      const copyEl = copy.current;
      if (!wrapperEl || !copyEl) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(copyEl, { transformPerspective: 1200, z: 0, scale: 1, autoAlpha: 1 });

        gsap.to(copyEl, {
          z: -1400,
          scale: 0.8,
          autoAlpha: 0,
          filter: "blur(14px)",
          // Arranca lento: el titular aguanta legible buena parte del recorrido
          // y se apaga al final del tramo.
          ease: "power2.in",
          scrollTrigger: {
            trigger: wrapperEl,
            start: "top top",
            // El retroceso se completa hacia la mitad del mosaico.
            // Para que dure más, mueve este punto: "60% center", "bottom center"…
            end: "center center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: wrapper }
  );

  return (
    <div ref={wrapper} className="relative">
      <section
        className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div ref={copy} className="container-site flex flex-col items-center text-center">
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
      </section>

      <ProjectMosaic projects={projects} />
    </div>
  );
}