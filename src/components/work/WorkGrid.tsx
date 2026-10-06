import Link from "next/link";
import type { Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import type { Project } from "@/src/data/projects";
import { localizePath } from "@/src/lib/i18n";
import ProjectImage from "./ProjectImage";

/*
 * Rejilla asimétrica en ciclos de 4: ancho/estrecho, estrecho/ancho.
 * Los desfases verticales rompen la fila y dan ritmo de masonry.
 */
const PATTERN = [
  { cell: "md:col-span-7", ratio: "4 / 3", sizes: "(min-width: 768px) 58vw, 100vw" },
  { cell: "md:col-span-5 md:mt-28", ratio: "4 / 5", sizes: "(min-width: 768px) 42vw, 100vw" },
  { cell: "md:col-span-5", ratio: "4 / 5", sizes: "(min-width: 768px) 42vw, 100vw" },
  { cell: "md:col-span-7 md:mt-28", ratio: "4 / 3", sizes: "(min-width: 768px) 58vw, 100vw" },
];

type WorkGridProps = {
  projects: Project[];
  locale: Locale;
  dict: Dictionary;
  /** h2 si la rejilla cuelga del H1 de la página, h3 si va dentro de una sección. */
  headingLevel?: "h2" | "h3";
};

export default function WorkGrid({ projects, locale, dict, headingLevel = "h3" }: WorkGridProps) {
  const Heading = headingLevel;

  return (
    <ul className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12 md:gap-y-20">
      {projects.map((project, i) => {
        const layout = PATTERN[i % PATTERN.length];
        const services = project.services
          .map((slug) => dict.services.items[slug].name)
          .join(", ");

        return (
          <li key={project.slug} className={layout.cell}>
            <Link href={localizePath(locale, `proyectos/${project.slug}`)} className="group block">
              <ProjectImage
                src={project.cover}
                alt={project.title}
                ratio={layout.ratio}
                sizes={layout.sizes}
                index={i}
              />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <Heading className="font-display text-xl font-semibold tracking-tight text-ink underline-offset-4 group-hover:underline md:text-2xl">
                  {project.title}
                </Heading>
                {project.year ? (
                  <span className="font-sans text-sm tabular-nums text-slate-soft">{project.year}</span>
                ) : null}
              </div>
              <p className="mt-1 font-sans text-sm text-slate-soft">{services}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
