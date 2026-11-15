"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";
import Words from "@/src/components/ui/Words";

type ServicesHeroProps = {
  title: string;
  intro: string;
  /** Número de disciplinas y su etiqueta ("05 disciplinas"). */
  count: number;
  countLabel: string;
  /** Atajos a las secciones de la página. */
  nav: { label: string; href: string }[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Cabecera de /servicios: título grande que sube desde una máscara, la cifra de
 * disciplinas en contorno lavanda y atajos a disciplinas, paquetes y continuidad.
 * Un halo lavanda (el tono con que termina el hero del home) flota detrás.
 */
export default function ServicesHero({ title, intro, count, countLabel, nav }: ServicesHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(q("[data-word] > span"), { yPercent: 110, duration: 1.1, stagger: 0.06 })
          .from(q("[data-count]"), { yPercent: 40, autoAlpha: 0, duration: 1 }, 0.15)
          .from(q("[data-fade]"), { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 0.35);

        // El halo se desplaza y crece un poco al bajar.
        gsap.to(q("[data-glow]"), {
          yPercent: 30,
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <header ref={root} className="relative isolate overflow-x-clip">
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute -top-1/3 -right-1/4 -z-10 aspect-square w-[min(95vw,900px)] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(145,127,192,0.35), rgba(145,127,192,0.12) 55%, transparent)" }}
      />

      <div className="container-site grid gap-10 pt-36 pb-16 md:grid-cols-12 md:items-end md:gap-8 md:pt-48 md:pb-24">
        <div className="md:col-span-7">
          <p data-count className="flex items-end gap-3">
            <span className="font-display text-7xl leading-none font-bold tracking-tighter text-transparent [-webkit-text-stroke:2px_var(--color-cree)] md:text-9xl">
              {pad(count)}
            </span>
            <span className="pb-2 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink md:pb-4">
              {countLabel}
            </span>
          </p>
          <h1 className="mt-4 font-display text-6xl font-bold leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-[8.5rem]">
            <Words text={title} />
          </h1>
        </div>

        <div className="md:col-span-5 md:pb-4">
          <p data-fade className="max-w-md font-sans text-lg leading-relaxed text-slate md:text-xl">
            {intro}
          </p>
          <nav data-fade aria-label={title} className="mt-8 flex flex-wrap gap-2">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full border border-ink/15 px-4 py-2 font-sans text-sm font-medium text-ink transition-colors hover:border-brand-ink hover:bg-brand-ink hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
