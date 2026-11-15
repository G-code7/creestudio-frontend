"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/src/lib/gsap";
import Words from "@/src/components/ui/Words";

type PostHeaderProps = {
  title: string;
  back: { label: string; href: string };
  category?: string;
  date: string;
  dateTime: string;
  reading: string;
  cover?: { src: string; width: number; height: number; alt: string };
  /** Aviso cuando el artículo no está en el idioma de la página. */
  note?: string;
};

/*
 * Cabecera del artículo: meta, título que sube palabra por palabra y portada
 * que se abre con una máscara. Una barra lavanda arriba marca cuánto se ha
 * leído del artículo ([data-article] en la página).
 */
export default function PostHeader({ title, back, category, date, dateTime, reading, cover, note }: PostHeaderProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(q("[data-word] > span"), { yPercent: 110, duration: 1.1, stagger: 0.05 })
          .from(q("[data-fade]"), { y: 16, autoAlpha: 0, duration: 0.7, stagger: 0.06, ease: "power3.out" }, 0.1)
          .from(q("[data-cover]"), { clipPath: "inset(12% 8% 0% 8% round 32px)", duration: 1.2, ease: "power3.out" }, 0.35);
      });

      // Progreso de lectura (también con movimiento reducido: no es decorativo).
      const article = document.querySelector("[data-article]");
      const bar = q("[data-progress]");
      if (article && bar.length) {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: article, start: "top 70%", end: "bottom 70%", scrub: true },
          }
        );
      }
    },
    { scope: root }
  );

  return (
    <header ref={root}>
      <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[3px]">
        <div data-progress className="h-full origin-left scale-x-0 bg-cree" />
      </div>

      <div className="container-site pt-36 md:pt-44">
        <div className="mx-auto max-w-3xl">
          <div data-fade className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs font-medium uppercase tracking-[0.14em] text-slate-soft">
            <Link href={back.href} className="text-ink transition-colors hover:text-brand-ink">
              ← {back.label}
            </Link>
            {category ? <span className="text-brand-ink">{category}</span> : null}
            <time dateTime={dateTime}>{date}</time>
            <span aria-hidden>·</span>
            <span>{reading}</span>
          </div>

          <h1 className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
            <Words text={title} />
          </h1>

          {note ? (
            <p data-fade className="mt-6 inline-block rounded-full bg-mist px-4 py-2 font-sans text-sm text-slate">
              {note}
            </p>
          ) : null}
        </div>
      </div>

      {cover ? (
        <div className="px-3 pt-12 md:px-6 md:pt-16">
          <div data-cover className="relative mx-auto aspect-[16/9] max-w-[1200px] overflow-hidden rounded-[2rem] bg-mist">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              preload
              quality={90}
              sizes="(min-width: 1248px) 1200px, 100vw"
              unoptimized={/\.gif(\?.*)?$/i.test(cover.src)}
              className="object-cover"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
