"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";

/*
 * Naming: la exploración. Cuatro rodillos de letras giran como una máquina
 * tragamonedas, cada uno se detiene un poco después del anterior y juntos
 * forman un nombre. Cada cierto tiempo vuelven a girar y prueban otro.
 * Letras fijas (no aleatorias) para que el servidor y el cliente coincidan.
 */
const NAMES = ["CREE", "ALMA", "NOVA", "RUMO"];
const FILLER = "BKXMOTSPLAQVDGHZ";
const SPINS = 12; // letras de relleno por giro

/** Columna de cada rodillo: relleno + letra final de cada nombre, en orden. */
function reel(col: number): string[] {
  const letters: string[] = [];
  NAMES.forEach((name, n) => {
    for (let k = 0; k < SPINS; k++) letters.push(FILLER[(k * 5 + col * 3 + n * 7) % FILLER.length]);
    letters.push(name[col]);
  });
  return letters;
}

export default function NamingReels({ accent }: { accent: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const strips = q<HTMLElement>("[data-strip]");
      const step = SPINS + 1;

      // Sin movimiento: se muestra directamente el primer nombre.
      gsap.set(strips, { yPercent: (-100 * (step - 1)) / (step * NAMES.length) });

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ repeat: -1, delay: 0.3 });
        NAMES.forEach((_, n) => {
          const target = (-100 * (n * step + step - 1)) / (step * NAMES.length);
          strips.forEach((s, col) => {
            tl.to(s, { yPercent: target, duration: 1.4 + col * 0.25, ease: "power3.inOut" }, n * 4.2);
          });
          tl.fromTo(
            q("[data-underline]"),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            n * 4.2 + 2.3
          ).to(q("[data-underline]"), { scaleX: 0, transformOrigin: "100% 50%", duration: 0.4 }, n * 4.2 + 3.7);
          tl.set(q("[data-underline]"), { transformOrigin: "0% 50%" });
        });
        // El último giro vuelve al primer nombre sin salto: reiniciamos los rodillos arriba.
        tl.set(strips, { yPercent: 0 });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} aria-hidden className="flex flex-col items-center gap-6">
      <div className="flex gap-2 md:gap-3">
        {[0, 1, 2, 3].map((col) => (
          <div
            key={col}
            className="relative h-20 w-14 overflow-hidden rounded-xl border border-paper/15 bg-paper/[0.04] md:h-28 md:w-20"
          >
            <div data-strip className="flex flex-col">
              {reel(col).map((letter, i) => (
                <span
                  key={i}
                  className="flex h-20 items-center justify-center font-display text-4xl font-bold md:h-28 md:text-6xl"
                >
                  {letter}
                </span>
              ))}
            </div>
            {/* Desvanecido arriba y abajo: se siente como un rodillo */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink via-transparent to-ink opacity-80" />
          </div>
        ))}
      </div>
      <span data-underline className="h-[3px] w-40 origin-left rounded-full md:w-64" style={{ background: accent }} />
    </div>
  );
}
