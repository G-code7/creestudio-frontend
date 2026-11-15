import type { MetadataRoute } from "next";
import { locales, serviceSlugs } from "@/src/content/config";
import { localizePath } from "@/src/lib/i18n";
import { fetchProjects } from "@/src/lib/projects-wp";
import { fetchPosts } from "@/src/lib/blog-wp";
import { site } from "@/src/lib/site";

// Los proyectos vienen de WordPress: el sitemap se regenera cada hora.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([fetchProjects("es"), fetchPosts()]);
  const paths = [
    "",
    "servicios",
    ...serviceSlugs.map((slug) => `servicios/${slug}`),
    "proyectos",
    ...projects.map((p) => `proyectos/${p.slug}`),
    "blog",
    ...posts.map((p) => `blog/${p.slug}`),
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
