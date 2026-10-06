import { notFound } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/src/content/config";

/**
 * Construye una ruta pública con el prefijo de idioma.
 * El español vive sin prefijo para conservar las URLs indexadas del sitio actual.
 *   localizePath("es", "servicios/branding") -> "/servicios/branding/"
 *   localizePath("en", "servicios/branding") -> "/en/servicios/branding/"
 */
export function localizePath(locale: Locale, path = "/"): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const prefix = locale === defaultLocale ? "" : `/${locale}`;
  return clean ? `${prefix}/${clean}/` : `${prefix}/`;
}

/** Quita el prefijo de idioma: "/en/proyectos/" -> "/proyectos/". */
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(?:es|en)(?=\/|$)/, "") || "/";
}

/** Lee y valida el segmento [locale] de una página o layout. */
export async function resolveLocale(
  params: Promise<{ locale: string }>
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
