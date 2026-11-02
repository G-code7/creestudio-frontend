"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/src/content/config";
import { localizePath } from "@/src/lib/i18n";
import Button from "@/src/components/ui/Button";

type Copy = { title: string; text: string; home: string; work: string };

type NotFoundViewProps = { copy: Record<Locale, Copy> };

export default function NotFoundView({ copy }: NotFoundViewProps) {
  const pathname = usePathname() ?? "/";
  const locale: Locale = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
  const t = copy[locale];

  return (
    <section
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, rgba(145,127,192,0) 0%, rgba(145,127,192,0.35) 55%, rgba(145,127,192,0.9) 100%)",
      }}
    >
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-[0.22em] right-[-0.04em] select-none font-display text-[clamp(10rem,34vw,30rem)] font-bold leading-none tracking-tighter text-[#917fc0]"
      >
        404
      </p>

      <div className="container-site relative z-10 py-32">
        <p className="font-sans text-sm text-slate-soft">Error 404</p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink md:text-7xl">
          {t.title}
        </h1>
        <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-slate">{t.text}</p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href={localizePath(locale, "")} variant="primary">
            {t.home}
          </Button>
          <Link
            href={localizePath(locale, "proyectos")}
            className="font-sans text-base font-medium text-ink underline decoration-ink/30 underline-offset-[6px] transition-colors hover:decoration-ink"
          >
            {t.work}
          </Link>
        </div>
      </div>
    </section>
  );
}
