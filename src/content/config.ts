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

/** Slugs compartidos por ambos idiomas. Coinciden con las URLs actuales de creestudio.es. */
export const serviceSlugs = [
  "branding",
  "identidad-visual",
  "naming",
  "packaging",
  "diseno-web",
] as const;
export type ServiceSlug = (typeof serviceSlugs)[number];

export function isServiceSlug(value: string): value is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(value);
}
