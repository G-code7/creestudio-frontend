"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/src/lib/gsap";
import type { ServiceSlug } from "@/src/content/config";
import Words from "@/src/components/ui/Words";
import { serviceThemes } from "./themes";
import BrandingCore from "./firmas/BrandingCore";
import IdentitySystem from "./firmas/IdentitySystem";
import NamingReels from "./firmas/NamingReels";
import PackagingDieline from "./firmas/PackagingDieline";
import WebInterface from "./firmas/WebInterface";

type SignatureProps = { accent: string; labels?: { open: string; close: string; hint: string } };

const SIGNATURES: Record<ServiceSlug, (p: SignatureProps) => React.JSX.Element> = {
  branding: BrandingCore,
  "identidad-visual": IdentitySystem,
  naming: NamingReels,
  packaging: PackagingDieline,
  "diseno-web": WebInterface,
};

type ServiceHeroProps = {
  slug: ServiceSlug;
  name: string;
  short: string;
  index: number;
  total: number;
  back: { label: string; href: string };
  /** Textos de la caja 3D (solo los usa Packaging). */
  boxLabels: { open: string; close: string; hint: string };
};

const pad = (n: number) => String(n).padStart(2, "0");
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/*
 * Cabecera del detalle de servicio: un panel con el color propio del servicio
 * y su firma animada a la derecha. Igual en estructura para los cinco, distinto
 * en carácter. En Naming el título, además, se "baraja" antes de asentarse.
 */
export default function ServiceHero({ slug, name, short, index, total, back, boxLabels }: ServiceHeroProps) {
  const root = useRef<HTMLElement>(null);
  const theme = serviceThemes[slug];
  const Signature = SIGNATURES[slug];
  const scramble = slug === "naming";

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const q = gsap.utils.selector(el);

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(q("[data-panel]"), { clipPath: "inset(6% 4% 6% 4% round 48px)", duration: 1.1, ease: "power3.out" });

        if (scramble) {
          // Cada letra pasa por letras al azar y se fija de izquierda a derecha.
          const target = q<HTMLElement>("[data-scramble]")[0];
          const state = { p: 0 };
          tl.to(
            state,
            {
              p: 1,
              duration: 1.4,
              ease: "none",
              onUpdate: () => {
                const fixed = Math.floor(state.p * name.length);
                target.textContent = name
                  .split("")
                  .map((ch, i) => (i < fixed || ch === " " ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
                  .join("");
              },
              onComplete: () => {
                target.textContent = name;
              },
            },
            0.3
          );
        } else {
          tl.from(q("[data-word] > span"), { yPercent: 110, duration: 1, stagger: 0.06 }, 0.3);
        }

        tl.from(q("[data-fade]"), { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" }, 0.5).from(
          q("[data-signature]"),
          { autoAlpha: 0, scale: 0.94, duration: 0.8, ease: "power3.out" },
          0.2
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="px-3 pt-24 md:px-6 md:pt-28">
      <div
        data-panel
        className={`relative overflow-hidden rounded-[2rem] ${theme.panel}`}
        style={
          slug === "identidad-visual"
            ? {
                // Retícula de construcción de fondo
                backgroundImage:
                  "linear-gradient(to right, rgba(17,17,17,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.05) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }
            : undefined
        }
      >
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-6 py-14 md:min-h-[min(34rem,72svh)] md:grid-cols-12 md:gap-8 md:px-12 md:py-20">
          <div className="md:col-span-7">
            <div data-fade className="flex items-center gap-4 font-sans text-sm font-medium">
              <Link href={back.href} className={`${theme.muted} transition-opacity hover:opacity-70`}>
                ← {back.label}
              </Link>
              <span className={`tabular-nums ${theme.muted}`}>
                ({pad(index)}) / {pad(total)}
              </span>
            </div>

            <h1 className="mt-8 font-display text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[7.5rem]">
              {scramble ? (
                <>
                  <span className="sr-only">{name}</span>
                  <span aria-hidden data-scramble>
                    {name}
                  </span>
                </>
              ) : (
                <Words text={name} />
              )}
            </h1>
            <p data-fade className={`mt-6 max-w-lg font-sans text-lg leading-relaxed md:text-xl ${theme.muted}`}>
              {short}
            </p>
          </div>

          <div data-signature className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-md">
            <Signature accent={theme.accent} labels={boxLabels} />
          </div>
        </div>
      </div>
    </section>
  );
}
