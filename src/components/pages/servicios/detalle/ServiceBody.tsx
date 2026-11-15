"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";
import Button from "@/src/components/ui/Button";
import Words from "@/src/components/ui/Words";

type ServiceBodyProps = {
  problem: string;
  includes: string[];
  excludes: string[];
  outcome: string;
  investment: string;
  labels: { problem: string; includes: string; excludes: string; outcome: string; investment: string };
  cta: { label: string; href: string };
};

const pad = (n: number) => String(n).padStart(2, "0");
const DIM = "rgba(17,17,17,0.16)";
const INK = "#111111";
const stripQuotes = (text: string) => text.replace(/^[\s“"«]+|[\s”"»]+$/g, "");

/*
 * Cuerpo del detalle de servicio, común a los cinco:
 *   1. El problema, en la voz del cliente: se enciende palabra por palabra.
 *   2. Qué incluye: filas numeradas que dibujan su línea y suben; qué no incluye, discreto.
 *   3. Lo que te llevas + inversión + CTA, en una tarjeta lavanda.
 */
export default function ServiceBody({ problem, includes, excludes, outcome, investment, labels, cta }: ServiceBodyProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          q("[data-problem] [data-fade-word]"),
          { color: DIM },
          {
            color: INK,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: q("[data-problem]")[0], start: "top 80%", end: "bottom 45%", scrub: true },
          }
        );
        gsap.from(q("[data-mark]"), {
          scale: 0.4,
          rotate: -15,
          autoAlpha: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: q("[data-problem]")[0], start: "top 75%", once: true },
        });

        for (const block of q<HTMLElement>("[data-rise]")) {
          gsap.from(block.querySelectorAll("[data-word] > span"), {
            yPercent: 110,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.05,
            scrollTrigger: { trigger: block, start: "top 85%", once: true },
          });
        }

        for (const row of q<HTMLElement>("[data-row]")) {
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 90%", once: true } })
            .from(row.querySelector("[data-rule]"), { scaleX: 0, duration: 1, ease: "power3.inOut" })
            .from(row.querySelectorAll("[data-cell]"), { y: 18, autoAlpha: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }, 0.2);
        }

        gsap.from(q("[data-outcome]"), {
          clipPath: "inset(10% 6% 10% 6% round 48px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: q("[data-outcome]")[0], start: "top 85%", once: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      {/* 1. El problema */}
      <section className="container-site grid gap-8 py-24 md:grid-cols-12 md:py-32">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink md:col-span-3 md:pt-4">
          {labels.problem}
        </p>
        <blockquote data-problem className="relative md:col-span-9">
          <span
            data-mark
            aria-hidden
            className="pointer-events-none absolute -top-[0.45em] -left-[0.04em] font-display text-[6rem] leading-none font-bold text-cree select-none md:text-[9rem]"
          >
            “
          </span>
          <p className="relative font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            <Words text={stripQuotes(problem)} variant="fade" />
          </p>
        </blockquote>
      </section>

      {/* 2. Qué incluye / qué no */}
      <section className="container-site grid gap-12 pb-24 md:grid-cols-12 md:gap-8 md:pb-32">
        <div className="md:col-span-4">
          <h2 data-rise className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink md:sticky md:top-32 md:text-6xl">
            <Words text={labels.includes} />
          </h2>
        </div>

        <div className="md:col-span-8">
          <ol className="border-b border-line">
            {includes.map((item, i) => (
              <li key={item} data-row className="relative grid grid-cols-[3rem_1fr] items-baseline gap-4 py-6 md:grid-cols-[4.5rem_1fr] md:py-8">
                <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-ink/80" />
                <span data-cell className="font-sans text-sm font-medium tabular-nums text-brand-ink">
                  ({pad(i + 1)})
                </span>
                <span data-cell className="font-display text-xl font-semibold leading-snug tracking-tight text-ink md:text-3xl">
                  {item}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-2xl border border-dashed border-line p-6 md:p-8">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-slate-soft">{labels.excludes}</h3>
            <ul className="mt-4 flex flex-col gap-2.5 font-sans text-base leading-relaxed text-slate-soft">
              {excludes.map((item) => (
                <li key={item} className="pl-5 [text-indent:-1.25rem] before:mr-2.5 before:content-['—']">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Lo que te llevas + inversión + CTA */}
      <section className="px-3 pb-24 md:px-6 md:pb-32">
        <div data-outcome className="mx-auto max-w-[1200px] rounded-[2rem] bg-cree px-6 py-14 text-ink md:px-14 md:py-20">
          <p className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ink/70">{labels.outcome}</p>
          <p data-rise className="mt-6 max-w-4xl font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            <Words text={outcome} />
          </p>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-ink/15 pt-8">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.16em] text-ink/70">{labels.investment}</p>
              <p className="mt-1.5 font-display text-lg font-semibold">{investment}</p>
            </div>
            <Button href={cta.href}>
              {cta.label}
              <span aria-hidden className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
