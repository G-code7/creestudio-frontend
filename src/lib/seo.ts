import type { Metadata } from "next";
import type { Locale } from "@/src/content/config";
import { localizePath } from "./i18n";
import { site } from "./site";

type PageMetaArgs = {
  locale: Locale;
  /** Ruta sin idioma: "", "servicios", "proyectos/ventu-branding"… */
  path: string;
  title: string;
  description: string;
  /** true en la home: el título no pasa por la plantilla "%s | Cree Studio". */
  absoluteTitle?: boolean;
  /** Imagen al compartir el enlace. Por defecto, la de la marca en el idioma de la página. */
  image?: string;
  type?: "website" | "article";
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  image,
  type = "website",
}: PageMetaArgs): Metadata {
  const url = localizePath(locale, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        es: localizePath("es", path),
        en: localizePath("en", path),
        "x-default": localizePath("es", path),
      },
    },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: site.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      images: [image ?? `/og-${locale}.jpg`],
    },
    twitter: { card: "summary_large_image" },
  };
}
