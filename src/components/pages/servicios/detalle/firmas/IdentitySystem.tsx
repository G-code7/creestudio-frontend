"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";

/*
 * Identidad visual: el sistema. Una retícula de construcción se traza, sobre
 * ella se arma un símbolo (círculo + cuadrado), aparece la tipografía ("Aa")
 * y luego la paleta de color.
 */
const GRID = [80, 120, 160, 200, 240, 280, 320];
const SWATCHES = ["#917fc0", "#694eb1", "#111111", "#f0f5fa"];

export default function IdentitySystem({ accent }: { accent: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const circle = q<SVGCircleElement>("[data-circle]")[0];
        const len = 2 * Math.PI * 70;
        gsap.set(circle, { strokeDasharray: len, strokeDashoffset: len });

        gsap
          .timeline({ delay: 0.3 })
          .from(q("[data-v]"), { scaleY: 0, transformOrigin: "50% 0%", duration: 0.7, stagger: 0.05, ease: "power2.out" })
          .from(q("[data-h]"), { scaleX: 0, transformOrigin: "0% 50%", duration: 0.7, stagger: 0.05, ease: "power2.out" }, 0.1)
          .to(circle, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, 0.6)
          .from(q("[data-square]"), { x: 60, y: 60, autoAlpha: 0, duration: 0.9, ease: "power3.out" }, 1.1)
          .from(q("[data-type]"), { y: 20, autoAlpha: 0, duration: 0.7, ease: "power3.out" }, 1.5)
          .from(q("[data-swatch]"), { scale: 0, transformOrigin: "50% 50%", duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, 1.8);
      });
    },
    { scope: root }
  );

  return (
    <svg ref={root} viewBox="0 0 400 400" className="h-auto w-full" aria-hidden>
      {GRID.map((x) => (
        <line key={`v${x}`} data-v x1={x} y1="40" x2={x} y2="360" stroke="currentColor" strokeOpacity="0.12" />
      ))}
      {GRID.map((y) => (
        <line key={`h${y}`} data-h x1="40" y1={y} x2="360" y2={y} stroke="currentColor" strokeOpacity="0.12" />
      ))}

      {/* Símbolo: círculo de construcción + cuadrado que se superpone */}
      <circle data-circle cx="160" cy="160" r="70" fill="none" stroke={accent} strokeWidth="3" />
      <rect data-square x="160" y="160" width="100" height="100" rx="6" fill={accent} fillOpacity="0.85" />

      <text
        data-type
        x="290"
        y="150"
        textAnchor="middle"
        className="font-display"
        fontWeight="700"
        fontSize="64"
        fill="currentColor"
      >
        Aa
      </text>

      {SWATCHES.map((c, i) => (
        <circle
          key={c}
          data-swatch
          cx={120 + i * 52}
          cy="330"
          r="18"
          fill={c}
          stroke="currentColor"
          strokeOpacity={c === "#f0f5fa" ? 0.2 : 0}
        />
      ))}
    </svg>
  );
}
