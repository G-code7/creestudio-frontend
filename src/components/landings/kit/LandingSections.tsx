"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";
import Button from "@/src/components/ui/Button";
import Words from "@/src/components/ui/Words";
import type { LandingContent } from "./types";

const pad = (n: number) => String(n).padStart(2, "0");

/** Título de sección que sube palabra por palabra (dentro de una sección con useGSAP). */
function SectionTitle({ text, className = "" }: { text: string; className?: string }) {
  return (
    <h2 data-rise className={`font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl ${className}`}>
      <Words text={text} />
    </h2>
  );
}

/** Animación común: títulos que suben y elementos [data-item] que entran en cascada. */
function useSectionMotion(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        for (const block of q<HTMLElement>("[data-rise]")) {
          gsap.from(block.querySelectorAll("[data-word] > span"), {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.05,
            scrollTrigger: { trigger: block, start: "top 85%", once: true },
          });
        }
        const items = q<HTMLElement>("[data-item]");
        if (items.length) {
          gsap.from(items, {
            y: 48,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: items[0], start: "top 85%", once: true },
          });
        }
      });
    },
    { scope }
  );
}

/* ── Beneficios: tarjetas numeradas ──────────────────────────────────── */

export function Benefits({ title, items }: LandingContent["benefits"]) {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);

  return (
    <section ref={root} className="container-site py-24 md:py-32">
      <SectionTitle text={title} className="max-w-3xl text-ink" />
      <ul className="mt-14 grid gap-5 md:mt-20 md:grid-cols-3">
        {items.map((item, i) => (
          <li
            key={item.title}
            data-item
            className="group rounded-2xl bg-mist p-7 transition-[translate,background-color] duration-500 hover:-translate-y-1.5 hover:bg-cree/15 md:p-9"
          >
            <span className="font-sans text-sm font-medium tabular-nums text-brand-ink">({pad(i + 1)})</span>
            <h3 className="mt-10 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">{item.title}</h3>
            <p className="mt-3 font-sans text-base leading-relaxed text-slate">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ── Pasos: línea que se llena con el scroll ─────────────────────────── */

export function Steps({ title, items }: LandingContent["steps"]) {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const list = q<HTMLElement>("[data-steps]")[0];
      gsap.matchMedia().add({ desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
        if (!ctx.conditions?.motion) return;
        // Horizontal desde md, vertical en móvil.
        const axis = ctx.conditions.desktop ? "scaleX" : "scaleY";
        gsap.fromTo(
          q("[data-line]"),
          { [axis]: 0 },
          {
            [axis]: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 55%", scrub: true },
          }
        );
        // Cada punto se enciende cuando la línea llega a él.
        q<HTMLElement>("[data-dot]").forEach((dot) =>
          gsap.fromTo(
            dot,
            { backgroundColor: "#ffffff", scale: 1 },
            {
              backgroundColor: "#917fc0",
              scale: 1.25,
              duration: 0.4,
              scrollTrigger: { trigger: dot, start: "top 65%", toggleActions: "play none none reverse" },
            }
          )
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-ink py-24 text-paper md:py-32">
      <div className="container-site">
        <SectionTitle text={title} className="max-w-3xl" />
        <ol data-steps className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-4 md:gap-8">
          {/* Línea: vertical en móvil, horizontal desde md */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-paper/15 md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto" />
          <span
            data-line
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-cree md:top-[7px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto md:origin-left"
          />
          {items.map((item, i) => (
            <li key={item.title} data-item className="relative pl-10 md:pl-0 md:pt-12">
              <span
                data-dot
                aria-hidden
                className="absolute top-0 left-0 size-[15px] rounded-full border-2 border-cree bg-paper"
              />
              <span className="font-sans text-sm font-medium tabular-nums text-cree">({pad(i + 1)})</span>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight">{item.title}</h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-paper/70">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── Oferta: texto fijo a la izquierda, tarjeta de precio a la derecha ── */

export function Offer({ title, text, name, price, priceNote, includes, cta, ctaHref, id }: LandingContent["offer"] & { ctaHref: string; id?: string }) {
  const root = useRef<HTMLElement>(null);
  useSectionMotion(root);

  return (
    <section ref={root} id={id} className="container-site grid scroll-mt-24 gap-12 py-24 md:grid-cols-12 md:gap-8 md:py-32">
      <div className="md:col-span-5">
        <div className="md:sticky md:top-32">
          <SectionTitle text={title} className="text-ink" />
          <p className="mt-6 max-w-sm font-sans text-lg leading-relaxed text-slate">{text}</p>
        </div>
      </div>

      <div data-item className="md:col-span-6 md:col-start-7">
        <div className="relative overflow-hidden rounded-[2rem] bg-cree p-8 text-ink md:p-12">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full"
            style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.45), transparent)" }}
          />
          <p className="relative font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ink/70">{name}</p>
          <p className="relative mt-4 font-display text-6xl font-bold tracking-tight md:text-7xl">{price}</p>
          <p className="relative mt-2 font-sans text-sm text-ink/70">{priceNote}</p>

          <ul className="relative mt-8 flex flex-col gap-3 border-t border-ink/15 pt-8 font-sans text-base">
            {includes.map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ink text-[11px] text-paper">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="relative mt-10">
            <Button href={ctaHref}>
              {cta}
              <span aria-hidden className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Preguntas frecuentes: acordeón ──────────────────────────────────── */

export function Faq({ title, items }: LandingContent["faq"]) {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  useSectionMotion(root);

  return (
    <section ref={root} className="container-site grid gap-12 pb-24 md:grid-cols-12 md:gap-8 md:pb-32">
      <div className="md:col-span-5">
        <SectionTitle text={title} className="text-ink" />
      </div>
      <ul className="border-b border-line md:col-span-7">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} data-item className="border-t border-line">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-display text-lg font-semibold tracking-tight text-ink transition-colors group-hover:text-brand-ink md:text-xl">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`grid size-9 shrink-0 place-items-center rounded-full border text-lg transition-[rotate,background-color,color,border-color] duration-300 ${
                    isOpen ? "rotate-45 border-brand-ink bg-brand-ink text-paper" : "border-ink/20 text-ink"
                  }`}
                >
                  +
                </span>
              </button>
              {/* Altura animada con grid-rows: 0fr → 1fr */}
              <div
                id={`faq-${i}`}
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-xl pb-6 font-sans text-base leading-relaxed text-slate">{item.a}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
