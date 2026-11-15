"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import type { ProjectCard } from "@/src/lib/projects-wp";
import { localizePath } from "@/src/lib/i18n";
import Button from "@/src/components/ui/Button";
import RevealHeading from "@/src/components/ui/RevealHeading";

/*
 * Pila de proyectos destacados. Cada panel ocupa la pantalla y queda fijo
 * (sticky); el siguiente sube y lo tapa. El panel cubierto no se mueve: solo
 * se oscurece un poco mientras lo cubren, para que la superposición se lea.
 *
 * El título y "Ver todos" van arriba, sobre blanco, como en el resto de
 * secciones. En móvil los paneles son más bajos (casi 4:3) para no recortar
 * tanto las portadas horizontales; desde md ocupan la pantalla.
 *
 * Imágenes sin optimizar: api.creestudio.es rechaza las peticiones del
 * optimizador de Next (ver ProjectGallery).
 */

type Props = {
  projects: ProjectCard[];
  locale: Locale;
  dict: Dictionary;
};

export default function FeaturedProjectsSection({ projects, locale, dict }: Props) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-panel]"));

        panels.forEach((panel, i) => {
          const next = panels[i + 1];
          const shade = panel.querySelector<HTMLElement>("[data-shade]");
          if (!next || !shade) return;

          // El sombreado sigue al panel que entra: empieza cuando asoma por
          // abajo y termina cuando lo cubre por completo.
          gsap.fromTo(
            shade,
            { opacity: 0 },
            {
              opacity: 0.6,
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top bottom",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });
    },
    { scope: root }
  );

  if (projects.length === 0) return null;

  return (
    <section ref={root} aria-labelledby="featured-title">
      <div className="container-site flex flex-wrap items-end justify-between gap-x-8 gap-y-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <RevealHeading
          id="featured-title"
          text={dict.home.work.title}
          className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl"
        />
        <Button href={localizePath(locale, "proyectos")} variant="ghost">
          {dict.home.work.all}
        </Button>
      </div>

      <div className="relative bg-ink">
        {projects.map((project, i) => {
          const services = project.services
            .map((slug) => dict.services.items[slug]?.name)
            .filter(Boolean)
            .join(", ");

          return (
            <article
              key={project.slug}
              data-panel
              className="sticky top-0 h-[max(19rem,80vw)] overflow-hidden md:h-svh"
            >
              <Link
                href={localizePath(locale, `proyectos/${project.slug}`)}
                className="group block size-full"
              >
                {project.cover ? (
                  <Image
                    src={project.cover}
                    alt=""
                    fill
                    unoptimized
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate" />
                )}

                {/* Legibilidad del texto: degradado solo abajo, donde va el título. */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-ink/80" />

                {/* Se oscurece mientras el siguiente panel lo cubre. */}
                <div data-shade className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0" />

                <div className="container-site absolute inset-x-0 bottom-0 z-20 pb-8 md:pb-20">
                  <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
                    <h3 className="max-w-3xl font-display text-3xl font-bold leading-[1.02] tracking-tight text-paper sm:text-4xl md:text-7xl">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-paper/80 md:pb-3 md:text-right md:text-base">
                      {services}
                      {project.year ? <span className="block tabular-nums">{project.year}</span> : null}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}