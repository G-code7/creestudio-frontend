"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";
import Words from "@/src/components/ui/Words";

type HowWeWorkProps = {
  title: string;
  intro: string;
  steps: { name: string; text: string }[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * "Así trabajamos" con el mismo lenguaje que "Lo que hacemos": filas numeradas
 * separadas por líneas. Cada fila dibuja su línea, el título sube desde una
 * máscara y luego entran número y texto. Sin enlaces ni hover: es informativo.
 * Movimiento reducido o sin JS: todo visible y estático.
 * (El proceso con la línea curva vive en Process + ProcessPath, para las landings.)
 */
export default function HowWeWork({ title, intro, steps }: HowWeWorkProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-heading] [data-word] > span"), {
          yPercent: 110,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: q("[data-heading]")[0], start: "top 85%", once: true },
        });
        gsap.from(q("[data-line-top]"), {
          scaleX: 0,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: q("ol")[0], start: "top 85%", once: true },
        });

        for (const row of q<HTMLElement>("[data-row]")) {
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
            .from(row.querySelector("[data-line]"), { scaleX: 0, duration: 1.2, ease: "power3.inOut" })
            .from(row.querySelector("[data-name]"), { yPercent: 110, duration: 1, ease: "power4.out" }, 0.1)
            .from(
              row.querySelectorAll("[data-index], [data-text]"),
              { autoAlpha: 0, y: 16, duration: 0.7, ease: "power3.out", stagger: 0.08 },
              0.35
            );
        }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="container-site py-24 md:py-32">
      <div className="mb-12 max-w-2xl md:mb-16">
        <h2 data-heading className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
          <Words text={title} />
        </h2>
        <p className="mt-5 font-sans text-base leading-relaxed text-slate md:text-lg">{intro}</p>
      </div>

      <div className="relative">
        <span data-line-top aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-ink" />

        <ol>
          {steps.map((step, i) => (
            <li
              key={step.name}
              data-row
              className="relative grid gap-3 py-8 md:grid-cols-12 md:items-end md:gap-8 md:py-10"
            >
              <h3 className="font-display text-4xl font-bold leading-none tracking-tight text-ink sm:text-5xl md:col-span-7 md:text-7xl">
                <span
                  data-index
                  aria-hidden
                  className="mr-3 inline-block align-top font-display text-sm font-bold tracking-[0.18em] text-brand-ink md:mr-5 md:text-base"
                >
                  {pad(i + 1)}
                </span>
                <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                  <span data-name className="inline-block">
                    {step.name}
                  </span>
                </span>
              </h3>

              <p
                data-text
                className="max-w-md font-sans text-base leading-relaxed text-slate-soft md:col-span-5"
              >
                {step.text}
              </p>

              <span data-line aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-line" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
