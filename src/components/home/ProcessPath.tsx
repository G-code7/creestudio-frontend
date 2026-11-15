"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";

/*
 * Línea que une los pasos de "Así trabajamos" y termina en el CTA de
 * "La marca no termina en la entrega".
 *   - Escritorio: serpentea por el pasillo entre el título y los pasos, cruza
 *     el espacio vacío bajo el último paso, baja por el margen derecho y entra
 *     al CTA por la derecha.
 *   - Móvil: serpentea en el margen izquierdo y baja hasta el CTA.
 * Se dibuja con el scroll: la punta va a la altura del 60 % de la pantalla, cada
 * punto se enciende al pasar y el CTA cambia de color al llegar.
 * Lee el DOM de sus hijos: [data-node], [data-path-cta], [data-path-aside],
 * [data-path-steps] y [data-path-box].
 */

const VIEW_LINE = 0.6; // altura de la pantalla donde va la punta

type Anchor = { y: number; length: number; el: HTMLElement };

export default function ProcessPath({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  // Se recalcula el trazado cuando cambia el tamaño del bloque (fuentes, imágenes, ventana).
  const [size, setSize] = useState("");

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let timer = 0;
    const ro = new ResizeObserver(([entry]) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const { width, height } = entry.contentRect;
        setSize(`${Math.round(width)}x${Math.round(height)}`);
      }, 120);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      const svgEl = svg.current;
      if (!el || !svgEl || !size) return;

      const nodes = Array.from(el.querySelectorAll<HTMLElement>("[data-node]"));
      const cta = el.querySelector<HTMLElement>("[data-path-cta]");
      const aside = el.querySelector<HTMLElement>("[data-path-aside]");
      const steps = el.querySelector<HTMLElement>("[data-path-steps]");
      const box = el.querySelector<HTMLElement>("[data-path-box]");
      const line = svgEl.querySelector<SVGPathElement>("[data-line]");
      const track = svgEl.querySelector<SVGPathElement>("[data-track]");
      const tip = svgEl.querySelector<SVGCircleElement>("[data-tip]");
      if (nodes.length === 0 || !cta || !aside || !steps || !box || !line || !track || !tip) return;

      const base = el.getBoundingClientRect();
      const rel = (r: DOMRect) => ({
        left: r.left - base.left,
        right: r.right - base.left,
        top: r.top - base.top,
        bottom: r.bottom - base.top,
        cx: r.left - base.left + r.width / 2,
        cy: r.top - base.top + r.height / 2,
      });

      const W = base.width;
      const asideR = rel(aside.getBoundingClientRect());
      const stepsR = rel(steps.getBoundingClientRect());
      const boxR = rel(box.getBoundingClientRect());
      const ctaR = rel(cta.getBoundingClientRect());
      const stacked = asideR.bottom <= stepsR.top + 1; // móvil: columnas apiladas

      // Carril de la línea y amplitud de la serpiente.
      const gutter = stepsR.left - asideR.right;
      const offset = stacked ? -13 : -gutter / 2; // posición del punto respecto a la columna de pasos
      const amp = stacked ? 7 : Math.max(16, Math.min(56, gutter / 2 - 16));

      // Coloca los puntos en el carril y mide sus centros.
      nodes.forEach((n) => {
        n.style.left = `${offset}px`;
        n.style.visibility = "visible";
      });
      const pts = nodes.map((n) => rel(n.getBoundingClientRect())).map((r) => ({ x: r.cx, y: r.cy }));

      // Tramos: entre puntos, una curva que se abre a un lado y al otro (seno).
      const segments: string[] = [`M ${pts[0].x} ${pts[0].y}`];
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i];
        const b = pts[i + 1];
        const dy = b.y - a.y;
        const side = i % 2 === 0 ? -1 : 1;
        segments.push(`C ${a.x + side * amp} ${a.y + dy * 0.3} ${b.x + side * amp} ${b.y - dy * 0.3} ${b.x} ${b.y}`);
      }

      // Tramo final hasta el CTA.
      const last = pts[pts.length - 1];
      const end = stacked
        ? { x: ctaR.left - 4, y: ctaR.cy }
        : { x: ctaR.right + 4, y: ctaR.cy };
      if (stacked) {
        const turn = Math.max(last.y + 40, end.y - 36);
        segments.push(`L ${last.x} ${turn}`, `C ${last.x} ${end.y} ${last.x} ${end.y} ${end.x} ${end.y}`);
      } else {
        // Cruza el hueco bajo el último paso y baja por el margen derecho.
        const laneX = Math.min(W - 24, boxR.right + Math.max(48, (W - boxR.right) / 2));
        const bandY = (stepsR.bottom + boxR.top) / 2;
        const downY = Math.min(end.y - 80, bandY + 140);
        segments.push(
          `C ${last.x} ${bandY} ${laneX} ${bandY - 30} ${laneX} ${downY}`,
          `L ${laneX} ${end.y - 60}`,
          `C ${laneX} ${end.y} ${laneX} ${end.y} ${end.x + 60} ${end.y}`,
          `L ${end.x} ${end.y}`
        );
      }

      const d = segments.join(" ");
      svgEl.setAttribute("viewBox", `0 0 ${W} ${base.height}`);
      line.setAttribute("d", d);
      track.setAttribute("d", d);
      const total = line.getTotalLength();

      // Longitud recorrida al llegar a cada punto (y al CTA).
      const measure = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svgEl.appendChild(measure);
      const lengthUntil = (count: number) => {
        measure.setAttribute("d", segments.slice(0, count).join(" "));
        return measure.getTotalLength();
      };
      const anchors: Anchor[] = [
        ...pts.map((p, i) => ({ y: p.y, length: i === 0 ? 0 : lengthUntil(i + 1), el: nodes[i] })),
        { y: end.y, length: total, el: cta },
      ];
      measure.remove();

      const setTip = (len: number) => {
        const p = line.getPointAtLength(len);
        tip.setAttribute("cx", String(p.x));
        tip.setAttribute("cy", String(p.y));
      };
      const mark = (len: number) => anchors.forEach((a) => a.el.toggleAttribute("data-reached", len >= a.length - 1));

      gsap.set(line, { strokeDasharray: total, strokeDashoffset: total });
      gsap.set([line, track, tip], { autoAlpha: 1 });

      const mm = gsap.matchMedia();

      // Sin movimiento: línea completa, todo encendido.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(line, { strokeDashoffset: 0 });
        setTip(total);
        mark(total);
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const state = { len: 0 };
        const apply = () => {
          gsap.set(line, { strokeDashoffset: total - state.len });
          setTip(state.len);
          mark(state.len);
        };
        apply();

        // Cada tramo dura lo que mide en vertical: así la punta coincide con la línea de lectura.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: `top+=${anchors[0].y} ${VIEW_LINE * 100}%`,
            end: `top+=${anchors[anchors.length - 1].y} ${VIEW_LINE * 100}%`,
            scrub: 0.6,
          },
          onUpdate: apply,
        });
        for (let i = 1; i < anchors.length; i++) {
          tl.to(state, { len: anchors[i].length, duration: Math.max(1, anchors[i].y - anchors[i - 1].y) });
        }
      });

      return () => {
        nodes.forEach((n) => n.removeAttribute("data-reached"));
        cta.removeAttribute("data-reached");
      };
    },
    { scope: root, dependencies: [size], revertOnUpdate: true }
  );

  return (
    <div ref={root} className="relative">
      <svg
        ref={svg}
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Recorrido completo, tenue; encima, la línea que se dibuja con el scroll */}
        <path data-track fill="none" stroke="rgba(17,17,17,0.12)" strokeWidth="1.5" strokeDasharray="2 7" strokeLinecap="round" style={{ visibility: "hidden" }} />
        <path data-line fill="none" stroke="#917fc0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ visibility: "hidden" }} />
        <circle data-tip r="5" fill="#917fc0" style={{ visibility: "hidden" }} />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}
