"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { Plan } from "@/src/content/types";
import Words from "@/src/components/ui/Words";

type RetainerTiersProps = {
  id: string;
  title: string;
  intro: string;
  /** Etiqueta de recurrencia ("Cada mes"). */
  cadence: string;
  items: Plan[];
  labels: { investment: string; investmentOnCall: string };
};

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Planes de continuidad, sobre blanco y en dos columnas (como "Tres señales"):
 * título fijo a la izquierda, planes en filas a la derecha.
 *   - Entrada: cada fila dibuja su línea, el nombre sube desde una máscara y
 *     luego aparecen descripción, inversión y lista.
 *   - Hover: una barra lavanda crece a la izquierda de la fila.
 *   - Como en los paquetes, el "Todo lo de…" de los planes 2 y 3 va como etiqueta.
 * Es el destino del CTA "Ver planes de continuidad" del home (#continuidad).
 */
export default function RetainerTiers({ id, title, intro, cadence, items, labels }: RetainerTiersProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-title] [data-word] > span"), {
          yPercent: 110,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });

        for (const row of q<HTMLElement>("[data-tier]")) {
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 85%", once: true } })
            .from(row.querySelector("[data-rule]"), { scaleX: 0, duration: 1.1, ease: "power3.inOut" })
            .from(row.querySelectorAll("[data-name] [data-word] > span"), {
              yPercent: 110,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.05,
            }, 0.1)
            .from(row.querySelectorAll("[data-reveal]"), {
              y: 18,
              autoAlpha: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.07,
            }, 0.35);
        }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={id} className="scroll-mt-8 bg-paper">
      <div className="container-site grid gap-12 py-24 md:grid-cols-12 md:gap-8 md:py-36">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink">{cadence}</p>
            <h2
              data-title
              className="mt-4 font-display text-4xl font-bold leading-[1.02] tracking-tight text-ink md:text-6xl"
            >
              <Words text={title} />
            </h2>
            <p className="mt-6 max-w-sm font-sans text-lg leading-relaxed text-slate">{intro}</p>
          </div>
        </div>

        <ol className="border-b border-line md:col-span-7 md:col-start-6">
          {items.map((tier, i) => (
            <li key={tier.name} data-tier className="group relative py-10 md:py-12">
              <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-ink/80" />
              {/* Barra lavanda del hover */}
              <span
                aria-hidden
                className="absolute top-10 bottom-10 -left-4 w-[3px] origin-top scale-y-0 rounded-full bg-cree transition-transform duration-500 ease-out group-hover:scale-y-100 md:-left-8 md:top-12 md:bottom-12"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
                <h3 data-name className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
                  <Words text={tier.name} />
                  <span
                    data-reveal
                    aria-hidden
                    className="ml-2 align-top font-sans text-xs font-medium tracking-normal text-brand-ink md:ml-3 md:text-sm"
                  >
                    ({pad(i + 1)})
                  </span>
                </h3>
                <p data-reveal className="rounded-full bg-mist px-4 py-2 font-sans text-sm text-slate">
                  {labels.investment}:{" "}
                  <span className="font-semibold text-ink">{tier.investment ?? labels.investmentOnCall}</span>
                </p>
              </div>

              <p data-reveal className="mt-4 max-w-lg font-sans text-base leading-relaxed text-slate md:text-lg">
                {tier.forWho}
              </p>

              <ul
                data-reveal
                className="mt-6 grid gap-x-8 gap-y-2.5 font-sans text-base leading-relaxed text-slate sm:grid-cols-2"
              >
                {tier.includes.map((item, k) =>
                  // "Todo lo de…": en los planes 2 y 3 el primer punto resume el anterior.
                  i > 0 && k === 0 ? (
                    <li key={item} className="sm:col-span-2">
                      <span className="inline-block rounded-full bg-cree/15 px-3 py-1 text-sm font-semibold text-brand-ink">
                        {item}
                      </span>
                    </li>
                  ) : (
                    <li key={item} className="pl-5 [text-indent:-1.25rem] before:mr-2.5 before:text-brand before:content-['+']">
                      {item}
                    </li>
                  )
                )}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
