"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import { localizePath } from "@/src/lib/i18n";
import Button from "@/src/components/ui/Button";

type NotFoundViewProps = { copy: Record<Locale, Dictionary["notFound"]> };

export default function NotFoundView({ copy }: NotFoundViewProps) {
  const pathname = usePathname() ?? "/";
  const locale: Locale = /^\/en(\/|$)/.test(pathname) ? "en" : "es";
  const text = copy[locale];

  return (
    <section className="container-site flex min-h-[80svh] flex-col items-start justify-center pt-28 pb-20">
      <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-ink md:text-6xl">
        {text.title}
      </h1>
      <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-slate">{text.text}</p>
      <div className="mt-10">
        <Button href={localizePath(locale)}>{text.home}</Button>
      </div>
    </section>
  );
}
