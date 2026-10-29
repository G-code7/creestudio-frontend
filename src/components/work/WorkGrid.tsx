import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import type { Project } from "@/src/data/projects";
import { localizePath } from "@/src/lib/i18n";

type WorkGridProps = {
  projects: Project[];
  locale: Locale;
  dict: Dictionary;
  headingLevel?: "h2" | "h3";
};

export default function WorkGrid({ projects, locale, dict, headingLevel = "h3" }: WorkGridProps) {
  const Heading = headingLevel;

  return (
    /* Franjas con ancho de pantalla real (Full-bleed viewport) */
    <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex flex-col overflow-hidden">
      {projects.map((project, i) => {
        const services = project.services
          .map((slug) => dict.services.items[slug]?.name || slug)
          .join(" · ");

        const projectHref = localizePath(locale, `proyectos/${project.slug}`);

        return (
          <article
            key={project.slug}
            className="group relative h-[60vh] min-h-[450px] w-full overflow-hidden border-b border-paper/10"
          >
            {/* 1. Imagen de Fondo a Ancho Total */}
            {project.cover ? (
              <Image
                src={project.cover}
                alt={project.title}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            ) : (
              <div className="size-full bg-slate-900" />
            )}

            {/* 2. Capa Oscura (Overlay) */}
            <div className="absolute inset-0 z-10 bg-black/40 transition-colors duration-500 group-hover:bg-black/55" />

            {/* 3. Contenido Centrado */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
              {services && (
                <span className="mb-3 font-sans text-xs uppercase tracking-widest text-paper/80">
                  {services}
                </span>
              )}

              <Heading className="font-display text-3xl font-medium tracking-tight text-paper md:text-5xl mb-6">
                {project.title}
              </Heading>

              <Link
                href={projectHref}
                className="rounded-full border border-paper/30 bg-paper/10 backdrop-blur-md px-7 py-2.5 font-sans text-xs font-medium text-paper transition-all hover:bg-paper hover:text-ink"
              >
                {dict.common?.seeWork || "Ver proyecto"}
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}