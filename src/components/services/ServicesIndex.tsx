import Link from "next/link";
import { serviceSlugs, type Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import { localizePath } from "@/src/lib/i18n";

type ServicesIndexProps = {
  locale: Locale;
  dict: Dictionary;
  headingLevel?: "h2" | "h3";
};

/** Índice tipográfico de servicios: el nombre es el elemento visual. */
export default function ServicesIndex({ locale, dict, headingLevel = "h3" }: ServicesIndexProps) {
  const Heading = headingLevel;

  return (
    <ul className="border-t border-ink">
      {serviceSlugs.map((slug) => {
        const service = dict.services.items[slug];
        return (
          <li key={slug} className="border-b border-line">
            <Link
              href={localizePath(locale, `servicios/${slug}`)}
              className="group grid gap-3 py-8 md:grid-cols-12 md:items-end md:gap-8 md:py-10"
            >
              <Heading className="font-display text-4xl font-bold leading-none tracking-tight text-ink transition-[color,transform] duration-500 ease-out group-hover:translate-x-3 group-hover:text-brand sm:text-5xl md:col-span-7 md:text-7xl">
                {service.name}
              </Heading>
              <p className="max-w-md font-sans text-base leading-relaxed text-slate-soft transition-colors group-hover:text-ink md:col-span-5">
                {service.short}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
