"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeNames, locales, type Locale } from "@/src/content/config";
import { localizePath, stripLocale } from "@/src/lib/i18n";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
};

export default function LocaleSwitcher({ locale, label }: LocaleSwitcherProps) {
  // stripLocale normaliza tanto "/en/x/" como la ruta reescrita "/es/x/" a "/x/".
  const rest = stripLocale(usePathname() ?? "/");

  return (
    <div role="group" aria-label={label} className="flex items-center gap-1 font-sans text-sm">
      {locales.map((l) =>
        l === locale ? (
          <span
            key={l}
            aria-current="true"
            className="rounded-full bg-ink px-2.5 py-1 font-medium uppercase text-paper"
          >
            <span className="sr-only">{localeNames[l]}</span>
            <span aria-hidden>{l}</span>
          </span>
        ) : (
          <Link
            key={l}
            href={localizePath(l, rest)}
            hrefLang={l}
            lang={l}
            className="rounded-full px-2.5 py-1 uppercase text-slate-soft transition-colors hover:text-brand"
          >
            <span className="sr-only">{localeNames[l]}</span>
            <span aria-hidden>{l}</span>
          </Link>
        )
      )}
    </div>
  );
}
