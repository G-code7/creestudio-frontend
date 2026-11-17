"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/src/lib/gsap";
import Button from "@/src/components/ui/Button";
import Words from "@/src/components/ui/Words";

type StakesProps = {
  title: string;
  signal: string;
  answerLabel: string;
  outro: string;
  items: { fear: string; answer: string }[];
  cta: { label: string; href: string };
};

const stripQuotes = (text: string) => text.replace(/^[\s“"«]+|[\s”"»]+$/g, "");

const pad = (n: number) => String(n).padStart(2, "0");
const DIM = "rgba(17,17,17,0.16)";
const INK = "#111111";


export default function Stakes({ title, signal, answerLabel, outro, items, cta }: StakesProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);
      const slides = q<HTMLElement>("[data-slide]");
      const marks = q<HTMLElement>("[data-index-item]");

      slides.forEach((slide, i) => {
        ScrollTrigger.create({
          trigger: slide,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: ({ isActive }) => {
            if (isActive) marks.forEach((m, j) => m.toggleAttribute("data-active", j === i));
          },
        });
      });

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

        for (const slide of slides) {
          gsap.fromTo(
            slide.querySelectorAll("[data-fade-word]"),
            { color: DIM },
            {
              color: INK,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: { trigger: slide, start: "top 80%", end: "top 30%", scrub: true },
            }
          );
          gsap
            .timeline({ scrollTrigger: { trigger: slide, start: "top 50%", once: true } })
            .from(slide.querySelector("[data-mark]"), {
              scale: 0.4,
              rotate: -15,
              autoAlpha: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            })
            .from(slide.querySelector("[data-card]"), { autoAlpha: 0, y: 40, duration: 0.8, ease: "power3.out" }, 0.15);
        }
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-paper text-ink">
      <div className="container-site grid gap-12 py-24 md:grid-cols-12 md:gap-8 md:py-36">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <h2
              data-rise
              className="max-w-md font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              <Words text={title} />
            </h2>

            <ol aria-hidden className="mt-12 hidden flex-col gap-4 md:flex">
              {items.map((item, i) => (
                <li key={item.fear}>
                  <a
                    href={`#senal-${i + 1}`}
                    tabIndex={-1}
                    data-index-item
                    className="group/idx flex items-center gap-4 font-sans text-sm font-semibold tracking-[0.18em] text-ink/30 transition-colors duration-500 hover:text-ink/60 data-active:text-ink"
                  >
                    <span>{pad(i + 1)}</span>
                    <span className="h-0.5px w-6 rounded-full bg-current transition-[width,background-color] duration-500 group-data-active/idx:w-16 group-data-active/idx:bg-cree" />
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Columna derecha: las señales */}
        <div className="md:col-span-7">
          <ol className="flex flex-col">
            {items.map((item, i) => (
              <li
                key={item.fear}
                id={`senal-${i + 1}`}
                data-slide
                className="scroll-mt-32 border-t border-line py-14 first:border-t-0 first:pt-0 md:py-20"
              >
                <p className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-ink/60">
                  {signal} {pad(i + 1)} <span className="text-ink/35">/ {pad(items.length)}</span>
                </p>

                <blockquote className="relative mt-10 md:mt-12">
                  <span
                    data-mark
                    aria-hidden
                    className="pointer-events-none absolute -top[-0.42em] -left[-0.04em] font-display text-[6rem] leading-none font-bold text-cree select-none md:text-[8rem]"
                  >
                    “
                  </span>
                  <p className="relative font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl">
                    <Words text={stripQuotes(item.fear)} variant="fade" />
                  </p>
                </blockquote>

                <div data-card className="mt-8 rounded-2xl bg-mist p-6 md:mt-10 md:max-w-lg md:p-8">
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-brand-ink">
                    {answerLabel}
                  </p>
                  <p className="mt-3 font-sans text-base leading-relaxed text-slate md:text-lg">{item.answer}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Cierre: le habla directo al dueño de la marca */}
          <div className="mt-6 flex flex-col items-start gap-8 rounded-2xl bg-ink p-8 text-paper md:mt-10 md:p-10">
            <p data-rise className="max-w-xl font-display text-2xl font-bold leading-[1.1] tracking-tight md:text-4xl">
              <Words text={outro} />
            </p>
            <Button href={cta.href} variant="light">
              {cta.label}
              <span aria-hidden className="ml-2">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
