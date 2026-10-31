"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import type { Project } from "@/src/data/projects";
import { localizePath } from "@/src/lib/i18n";

type FeaturedProjectsSectionProps = {
  projects: Project[];
  locale: Locale;
  dict: Dictionary;
};

export default function FeaturedProjectsSection({
  projects,
  locale,
  dict,
}: FeaturedProjectsSectionProps) {
  const root = useRef<HTMLDivElement>(null);
  const featured = projects.slice(0, 5);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-panel]"));

        panels.forEach((panel, i) => {
          if (i === panels.length - 1) return; // al último no lo cubre nadie
          const media = panel.querySelector<HTMLElement>("[data-media]");
          if (!media) return;

          // Mientras el siguiente panel lo cubre, este retrocede.
          gsap.to(media, {
            scale: 0.92,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top top",
              end: "+=100%",
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative bg-paper">
      <div className="container-site flex flex-wrap items-end justify-between gap-6 py-16 md:py-24">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
          {dict.home.work.title}
        </h2>
        <Link
          href={localizePath(locale, "proyectos")}
          className="font-sans text-base font-medium text-brand underline decoration-brand/40 underline-offset-[6px] transition-colors hover:decoration-brand"
        >
          {dict.home.work.all}
        </Link>
      </div>

      <div>
        {featured.map((project) => {
          const hasImage = project.cover.length > 0;
          const services = project.services
            .map((slug) => dict.services.items[slug].name)
            .join(" · ");

          return (
            <article key={project.slug} data-panel className="sticky top-0 h-svh overflow-hidden">
              <Link
                href={localizePath(locale, `proyectos/${project.slug}`)}
                className="group block size-full"
              >
                <div data-media className="absolute inset-0 will-change-transform">
                  {hasImage ? (
                    <>
                      {project.poster && (
                        <Image src={project.poster} alt="" fill sizes="100vw" className="object-cover" />
                      )}
                      <Image
                        src={project.cover}
                        alt=""
                        fill
                        sizes="100vw"
                        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                          project.poster ? "opacity-0 transition-opacity duration-700" : ""
                        }`}
                        onLoad={(e) => {
                          if (project.poster) (e.target as HTMLElement).style.opacity = "1";
                        }}
                      />
                    </>
                  ) : (
                    <div className="size-full bg-slate" />
                  )}
                </div>

                {/* Scrim solo abajo, donde va el texto (legibilidad sin tapar la imagen) */}
                <div className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />

                <div className="container-site absolute inset-x-0 bottom-0 z-20 pb-16 md:pb-24">
                  <p className="font-sans text-sm text-paper/80 md:text-base">{services}</p>
                  <h3 className="mt-2 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-paper md:text-6xl">
                    {project.title}
                  </h3>
                  <span className="mt-5 inline-block font-sans text-sm font-medium text-paper underline decoration-paper/40 underline-offset-[6px] transition-colors group-hover:decoration-paper">
                    {dict.common.seeWork}
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}