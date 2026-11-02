"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import type { ProjectCard } from "@/src/lib/projects-wp";
import { localizePath } from "@/src/lib/i18n";

/*
 * Pila de proyectos destacados. Cada panel ocupa la pantalla y queda fijo
 * (sticky); el siguiente sube y lo tapa. El panel cubierto no se mueve: solo
 * se oscurece un poco mientras lo cubren, para que la superposición se lea.
 *
 * El título de la sección vive dentro del primer panel, y "Ver todos" flota
 * en la esquina superior derecha por encima de toda la pila.
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
    <section ref={root} aria-labelledby="featured-title" className="relative bg-ink">
      {/* "Ver todos": flota sobre toda la pila. h-0 para no empujar el contenido. */}
      <div className="pointer-events-none sticky top-0 z-30 h-0">
        <div className="container-site flex justify-end pt-24 md:pt-28">
          <Link
            href={localizePath(locale, "proyectos")}
            className="pointer-events-auto rounded-full bg-paper px-5 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {dict.home.work.all}
          </Link>
        </div>
      </div>

      {projects.map((project, i) => {
        const services = project.services
          .map((slug) => dict.services.items[slug]?.name)
          .filter(Boolean)
          .join(", ");

        return (
          <article key={project.slug} data-panel className="sticky top-0 h-svh overflow-hidden">
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

              {/* Legibilidad del texto: degradado solo arriba y abajo. */}
              <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/75" />

              {/* Se oscurece mientras el siguiente panel lo cubre. */}
              <div data-shade className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0" />

              {i === 0 ? (
                <div className="container-site absolute inset-x-0 top-0 z-20 pt-24 md:pt-28">
                  <h2
                    id="featured-title"
                    className="font-display text-3xl font-bold tracking-tight text-paper md:text-5xl"
                  >
                    {dict.home.work.title}
                  </h2>
                </div>
              ) : null}

              <div className="container-site absolute inset-x-0 bottom-0 z-20 pb-14 md:pb-20">
                <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
                  <h3 className="max-w-3xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-paper md:text-7xl">
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
    </section>
  );
}