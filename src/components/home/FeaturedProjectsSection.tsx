"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/src/data/projects";

type FeaturedProjectsSectionProps = {
  title?: string;
  projects: Project[];
};

export default function FeaturedProjectsSection({
  title = "Trabajo reciente",
  projects = [],
}: FeaturedProjectsSectionProps) {
  return (
    <section className="w-full bg-paper">
      <div className="container-site py-12">
        <h2 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
          {title}
        </h2>
      </div>

      <div className="flex flex-col">
        {projects.slice(0, 5).map((project) => {
          const hasImage = project.cover.length > 0;

          return (
            <article 
              key={project.slug} 
              className="group relative h-[60vh] min-h-[450px] w-full overflow-hidden"
            >
              {hasImage ? (
                <>
                  {project.poster && (
                    <Image
                      src={project.poster}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className="absolute inset-0 object-cover"
                    />
                  )}
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="100vw"
                    className={`relative z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                      project.poster ? "opacity-0 transition-opacity duration-700" : ""
                    }`}
                    onLoad={(e) => {
                      if (project.poster) {
                        (e.target as HTMLElement).style.opacity = "1";
                      }
                    }}
                  />
                </>
              ) : (
                <div className="size-full bg-slate" />
              )}

              <div className="absolute inset-0 z-20 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
                <span className="mb-2 font-sans text-xs uppercase tracking-widest text-paper/80">
                  {project.services.join(" · ")}
                </span>
                <h3 className="font-display text-2xl font-medium text-paper md:text-4xl mb-4">
                  {project.title}
                </h3>
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="rounded-full bg-paper/20 backdrop-blur-md px-6 py-2.5 font-sans text-xs font-medium text-paper transition-all hover:bg-paper hover:text-ink"
                >
                  Ver proyecto
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}