import type { MetadataRoute } from "next";
import { locales, serviceSlugs } from "@/src/content/config";
import { projects } from "@/src/data/projects";
import { localizePath } from "@/src/lib/i18n";
import { site } from "@/src/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "servicios",
    ...serviceSlugs.map((slug) => `servicios/${slug}`),
    "proyectos",
    ...projects.map((p) => `proyectos/${p.slug}`),
    "contacto",
    "privacidad",
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: site.url + localizePath(locale, path),
      alternates: {
        languages: {
          es: site.url + localizePath("es", path),
          en: site.url + localizePath("en", path),
        },
      },
    }))
  );
}
