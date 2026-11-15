"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";

/*
 * Diseño web: la interfaz. Una ventana de navegador se arma por bloques
 * (menú, titular, botón, tarjetas), llega el cursor, hace clic en el botón y
 * este se enciende. Se repite.
 */
export default function WebInterface({ accent }: { accent: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.2, delay: 0.3 })
          .from(q("[data-frame]"), { scale: 0.92, autoAlpha: 0, transformOrigin: "50% 50%", duration: 0.7, ease: "power3.out" })
          .from(q("[data-block]"), { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.09, ease: "power3.out" }, 0.4)
          .fromTo(q("[data-cursor]"), { x: 120, y: 90, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 1, ease: "power2.inOut" }, 1.4)
          .to(q("[data-cursor]"), { scale: 0.8, transformOrigin: "0% 0%", duration: 0.12, yoyo: true, repeat: 1 }, 2.45)
          .to(q("[data-button]"), { fill: accent, fillOpacity: 1, duration: 0.25 }, 2.5)
          .fromTo(q("[data-ripple]"), { scale: 0, autoAlpha: 0.6, transformOrigin: "50% 50%" }, { scale: 3, autoAlpha: 0, duration: 0.7, ease: "power2.out" }, 2.5)
          .to({}, { duration: 1.6 })
          .to(q("[data-frame], [data-block], [data-cursor]"), { autoAlpha: 0, duration: 0.4 })
          .set(q("[data-button]"), { fillOpacity: 0.25 });
      });
    },
    { scope: root }
  );

  return (
    <svg ref={root} viewBox="0 0 400 400" className="h-auto w-full" aria-hidden>
      <g data-frame>
        <rect x="30" y="70" width="340" height="260" rx="14" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="30" y1="100" x2="370" y2="100" stroke="currentColor" strokeOpacity="0.25" />
        {[50, 64, 78].map((x) => (
          <circle key={x} cx={x} cy="85" r="4" fill="currentColor" fillOpacity="0.4" />
        ))}
      </g>

      {/* Menú */}
      <rect data-block x="50" y="116" width="48" height="8" rx="4" fill="currentColor" fillOpacity="0.7" />
      <rect data-block x="250" y="116" width="100" height="8" rx="4" fill="currentColor" fillOpacity="0.3" />
      {/* Titular */}
      <rect data-block x="50" y="146" width="210" height="16" rx="5" fill="currentColor" fillOpacity="0.85" />
      <rect data-block x="50" y="170" width="150" height="16" rx="5" fill="currentColor" fillOpacity="0.85" />
      {/* Botón */}
      <g data-block>
        <rect data-button x="50" y="200" width="96" height="28" rx="14" fill={accent} fillOpacity="0.25" stroke={accent} strokeWidth="1.5" />
        <circle data-ripple cx="98" cy="214" r="14" fill={accent} />
      </g>
      {/* Tarjetas */}
      {[50, 160, 270].map((x) => (
        <rect key={x} data-block x={x} y="250" width="80" height="60" rx="8" fill="currentColor" fillOpacity="0.15" />
      ))}

      {/* Cursor: su punta queda sobre el botón */}
      <path
        data-cursor
        d="M110 218 l0 22 l6 -6 l5 11 l5 -2 l-5 -11 l9 0 z"
        fill="#ffffff"
        stroke="#111111"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
