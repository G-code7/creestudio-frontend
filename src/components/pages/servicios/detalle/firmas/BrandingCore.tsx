"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";

/*
 * Branding: el núcleo. Anillos que se dibujan hacia afuera desde un centro
 * (propósito → valores → voz → todo lo demás) y puntos que orbitan a
 * distinta velocidad.
 */
const RINGS = [44, 84, 124, 164];
const SATELLITES = [
  { r: 84, angle: -30, speed: 18 },
  { r: 124, angle: 140, speed: 28 },
  { r: 164, angle: 260, speed: 40 },
];

export default function BrandingCore({ accent }: { accent: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const rings = q<SVGCircleElement>("[data-ring]");
        rings.forEach((r) => {
          const len = 2 * Math.PI * Number(r.getAttribute("r"));
          gsap.set(r, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap
          .timeline({ delay: 0.3 })
          .from(q("[data-core]"), { scale: 0, svgOrigin: "200 200", duration: 0.8, ease: "back.out(2)" })
          .to(rings, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.18 }, 0.2)
          .from(q("[data-sat]"), { autoAlpha: 0, scale: 0, duration: 0.5, stagger: 0.12, ease: "back.out(2)" }, 1);

        q<SVGGElement>("[data-orbit]").forEach((g) =>
          gsap.to(g, { rotate: 360, svgOrigin: "200 200", duration: Number(g.dataset.speed), ease: "none", repeat: -1 })
        );
        gsap.to(q("[data-dash]"), { rotate: -360, svgOrigin: "200 200", duration: 60, ease: "none", repeat: -1 });
        gsap.to(q("[data-core]"), { scale: 1.25, svgOrigin: "200 200", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
    },
    { scope: root }
  );

  return (
    <svg ref={root} viewBox="0 0 400 400" className="h-auto w-full" aria-hidden>
      {RINGS.map((r) => (
        <circle key={r} data-ring cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      ))}
      <circle data-dash cx="200" cy="200" r="104" fill="none" stroke={accent} strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="2 10" strokeLinecap="round" />
      {SATELLITES.map((s) => (
        <g key={s.r} data-orbit data-speed={s.speed} transform={`rotate(${s.angle} 200 200)`}>
          <circle data-sat cx={200 + s.r} cy="200" r="7" fill={accent} />
        </g>
      ))}
      <circle data-core cx="200" cy="200" r="16" fill="currentColor" />
    </svg>
  );
}
