"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";
import Button from "@/src/components/ui/Button";
import Words from "@/src/components/ui/Words";
import type { LandingContent } from "./types";

type LandingHeroProps = LandingContent["hero"] & {
  primaryHref: string;
  secondaryHref: string;
};

/*
 * Cabecera de landing: etiqueta con punto que late, título grande con la
 * última parte en lavanda, botones y un sello circular con texto que gira.
 * El halo lavanda conecta con el hero del home.
 */
export default function LandingHero({
  eyebrow,
  title,
  highlight,
  text,
  primary,
  secondary,
  note,
  badge,
  primaryHref,
  secondaryHref,
}: LandingHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .from(q("[data-word] > span"), { yPercent: 110, duration: 1.1, stagger: 0.05 })
          .from(q("[data-fade]"), { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.3)
          .from(q("[data-badge]"), { scale: 0, rotate: -90, duration: 1, ease: "back.out(1.6)" }, 0.6);
        gsap.to(q("[data-badge-text]"), { rotate: 360, duration: 18, ease: "none", repeat: -1, svgOrigin: "60 60" });
        gsap.to(q("[data-glow]"), {
          yPercent: 25,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate overflow-x-clip">
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute -top-1/4 left-1/2 -z-10 aspect-square w-[min(120vw,1100px)] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(145,127,192,0.32), rgba(145,127,192,0.1) 55%, transparent)" }}
      />

      <div className="container-site relative flex flex-col items-center pt-36 pb-24 text-center md:pt-48 md:pb-32">
        <p
          data-fade
          className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-paper/70 px-4 py-2 font-sans text-sm font-medium text-ink backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-cree opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex size-2 rounded-full bg-brand-ink" />
          </span>
          {eyebrow}
        </p>

        <h1 className="mt-8 max-w-5xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-8xl">
          <Words text={title} />{" "}
          <span className="text-brand-ink">
            <Words text={highlight} />
          </span>
        </h1>

        <p data-fade className="mt-8 max-w-2xl font-sans text-lg leading-relaxed text-slate md:text-xl">
          {text}
        </p>

        <div data-fade className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href={primaryHref}>
            {primary}
            <span aria-hidden className="ml-2">→</span>
          </Button>
          <Button href={secondaryHref} variant="ghost">
            {secondary}
          </Button>
        </div>
        <p data-fade className="mt-5 font-sans text-sm text-slate-soft">
          {note}
        </p>

        {/* Sello circular: texto que gira alrededor de una estrella de marca */}
        <div data-badge aria-hidden className="absolute right-4 bottom-6 hidden size-32 md:block lg:right-10 lg:size-36">
          <svg viewBox="0 0 120 120" className="size-full">
            <defs>
              <path id="landing-badge-circle" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
            </defs>
            <circle cx="60" cy="60" r="58" fill="#111111" />
            <g data-badge-text>
              <text className="font-sans" fontSize="10.5" fontWeight="600" letterSpacing="2.4" fill="#ffffff">
                <textPath href="#landing-badge-circle">{badge}</textPath>
              </text>
            </g>
            <path d="M60 44 L64 56 L76 60 L64 64 L60 76 L56 64 L44 60 L56 56 Z" fill="#917fc0" />
          </svg>
        </div>
      </div>
    </section>
  );
}
