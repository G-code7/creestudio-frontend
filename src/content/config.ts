export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

/** Nombre de cada idioma en su propia lengua (selector del header). */
export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Slugs compartidos por ambos idiomas, en el orden en que se muestran. */
export const serviceSlugs = [
  "branding",
  "contenido",
  "diseno-web",
  "packaging",
  "eventos",
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}

/**
 * Servicios antiguos que ahora forman parte de otro. Los proyectos de WordPress
 * aún pueden venir etiquetados con ellos; se leen como el servicio nuevo.
 */
export const legacyServiceSlugs: Record<string, ServiceSlug> = {
  "identidad-visual": "branding",
  naming: "branding",
};

/** Slugs de servicio de WordPress → slugs vigentes, sin duplicados ni desconocidos. */
export function toServiceSlugs(values: string[]): ServiceSlug[] {
  const mapped = values.map((v) => legacyServiceSlugs[v] ?? v).filter(isServiceSlug);
  return [...new Set(mapped)];
}
