import { serviceSlugs, type Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import { localizePath } from "@/src/lib/i18n";
import type { ProjectCard } from "@/src/lib/projects-wp";
import ServicesList from "./ServicesList";

type ServicesIndexProps = {
  locale: Locale;
  dict: Dictionary;
  headingLevel?: "h2" | "h3";
  /** Proyectos del CMS: sus portadas se alternan como vista previa al pasar el cursor por cada servicio. */
  projects?: ProjectCard[];
};

const MAX_PREVIEWS = 6;

/** Índice tipográfico de servicios: el nombre es el elemento visual. */
export default function ServicesIndex({ locale, dict, headingLevel = "h3", projects = [] }: ServicesIndexProps) {
  // Hasta 6 portadas por servicio. La primera, si se puede, distinta en cada uno.
  const used = new Set<string>();
  const items = serviceSlugs.map((slug) => {
    const covers = [
      ...new Set(projects.filter((p) => p.cover && p.services.includes(slug)).map((p) => p.cover!)),
    ].slice(0, MAX_PREVIEWS);
    const first = covers.findIndex((c) => !used.has(c));
    if (first > 0) covers.unshift(...covers.splice(first, 1));
    if (covers[0]) used.add(covers[0]);
    return {
      slug,
      // href: localizePath(locale, `servicios/${slug}`),
      href: localizePath(locale, `contacto/`),
      name: dict.services.items[slug].name,
      short: dict.services.items[slug].short,
      previews: covers,
    };
  });

  return <ServicesList items={items} headingLevel={headingLevel} />;
}
