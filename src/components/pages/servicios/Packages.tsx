"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { Plan } from "@/src/content/types";
import Words from "@/src/components/ui/Words";

type PackagesProps = {
  id: string;
  title: string;
  intro: string;
  items: Plan[];
  labels: { investment: string; investmentOnCall: string };
};

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Paquetes sobre negro, en escalera: cada uno sube un escalón porque incluye
 * al anterior. La barra de nivel (1, 2 o 3 tramos en lavanda) lo dice sin texto,
 * y el primer punto de los paquetes 2 y 3 ("Todo lo de…") se destaca como etiqueta.
 * Entrada: las tarjetas suben en cascada y luego se llenan sus barras de nivel.
 */
export default function Packages({ id, title, intro, items, labels }: PackagesProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-word] > span"), {
          yPercent: 110,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        });

        gsap
          .timeline({ scrollTrigger: { trigger: q("[data-cards]")[0], start: "top 80%", once: true } })
          .from(q("[data-card]"), { y: 100, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: 0.15 })
          .from(q("[data-level]"), { scaleX: 0, duration: 0.5, ease: "power2.out", stagger: 0.06 }, "-=0.5");
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id={id} className="scroll-mt-8 bg-ink text-paper">
      <div className="container-site py-24 md:py-36">
        <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-8">
          <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight md:col-span-6 md:text-7xl">
            <Words text={title} />
          </h2>
          <p className="max-w-md font-sans text-lg leading-relaxed text-paper/70 md:col-span-5 md:col-start-8">
            {intro}
          </p>
        </div>

        <ol data-cards className="mt-16 grid gap-5 md:mt-24 md:grid-cols-3 md:items-start">
          {items.map((plan, i) => (
            <li
              key={plan.name}
              data-card
              // Escalera: el primero más abajo, el último arriba.
              style={{ "--step": items.length - 1 - i } as React.CSSProperties}
              className="group flex h-full flex-col rounded-2xl border border-paper/10 bg-paper/[0.04] p-7 transition-[border-color,background-color,translate] duration-500 hover:-translate-y-2 hover:border-cree hover:bg-paper/[0.07] md:mt-[calc(var(--step)*4rem)] md:h-auto md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-sans text-sm font-medium tabular-nums text-cree">({pad(i + 1)})</span>
                {/* Nivel: tantos tramos encendidos como el número del paquete */}
                <span aria-hidden className="flex gap-1">
                  {items.map((_, j) => (
                    <span key={j} className="h-1 w-6 overflow-hidden rounded-full bg-paper/15">
                      {j <= i ? <span data-level className="block h-full origin-left bg-cree" /> : null}
                    </span>
                  ))}
                </span>
              </div>

              <h3 className="mt-8 font-display text-3xl font-bold tracking-tight md:text-4xl">{plan.name}</h3>
              <p className="mt-3 font-sans text-base leading-relaxed text-paper/70">{plan.forWho}</p>

              <ul className="mt-8 flex flex-col gap-3 border-t border-paper/10 pt-6 font-sans text-sm leading-relaxed text-paper/85">
                {plan.includes.map((item, k) =>
                  // "Todo lo de…": en los paquetes 2 y 3 el primer punto resume el anterior.
                  i > 0 && k === 0 ? (
                    <li key={item}>
                      <span className="inline-block rounded-full bg-cree/20 px-3 py-1 text-xs font-semibold text-paper">
                        {item}
                      </span>
                    </li>
                  ) : (
                    <li key={item} className="pl-5 [text-indent:-1.25rem] before:mr-2.5 before:text-cree before:content-['+']">
                      {item}
                    </li>
                  )
                )}
              </ul>

              <div className="mt-auto pt-10">
                <p className="font-sans text-xs uppercase tracking-[0.16em] text-paper/50">{labels.investment}</p>
                <p className="mt-1.5 font-display text-lg font-semibold">{plan.investment ?? labels.investmentOnCall}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
