import type { Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import type { PostCard } from "@/src/lib/blog-wp";
import { localizePath } from "@/src/lib/i18n";
import type { BlogItem } from "./BlogIndex";

/** Fecha larga en el idioma de la página ("14 de noviembre de 2026"). En el servidor, con zona fija. */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-US", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(iso)
  );
}

export const readingLabel = (minutes: number, dict: Dictionary) => dict.blog.readingTime.replace("{n}", String(minutes));

/** Datos listos para pintar una tarjeta del blog. */
export function toBlogItem(post: PostCard, locale: Locale, dict: Dictionary): BlogItem {
  return {
    slug: post.slug,
    href: localizePath(locale, `blog/${post.slug}`),
    title: post.title,
    excerpt: post.excerpt,
    date: formatDate(post.date, locale),
    dateTime: post.date,
    reading: readingLabel(post.readingTime, dict),
    cover: post.cover,
    categories: post.categories,
  };
}
