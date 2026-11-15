"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";

/*
 * Packaging: del troquel a la caja.
 *   1. Se traza el troquel en 2D (contorno de corte, dobleces, caras).
 *   2. En su lugar aparece la misma caja desplegada, ya en 3D (CSS 3D, sin
 *      librerías), y sus caras se doblan hasta formar la caja cerrada.
 *   3. La caja gira hasta verse en perspectiva y queda flotando.
 *   4. Se puede girar arrastrando y abrir la tapa: por dentro dice "Cree".
 *
 * Geometría: la base mide un 25 % del escenario y está centrada (igual que la
 * cara frontal del troquel). Las paredes cuelgan de sus bordes y la tapa de la
 * pared superior. En el troquel se ve el lado interior de cada cara: al doblar
 * hacia el espectador, ese lado queda dentro de la caja.
 */

const OUTLINE =
  "M150 50 H250 V150 H350 V250 H250 V350 H150 V250 H50 V150 H150 Z" +
  " M150 50 L130 70 V130 L150 150 M250 50 L270 70 V130 L250 150" +
  " M150 250 L130 270 V330 L150 350 M250 250 L270 270 V330 L250 350";
const FOLDS = "M150 150 H250 M150 250 H250 M150 150 V250 M250 150 V250";

// Lavanda sobre el gris del panel, en sólido (en 3D las transparencias se ven mal).
const INSIDE = { base: "#9b8bc6", side: "#c5c0e0", end: "#cfcce6", lid: "#ece9f6" };
const OUTSIDE = { a: "#917fc0", b: "#8571b8", c: "#a293cc", lid: "#694eb1" };
const EDGE = "1.5px solid rgba(17,17,17,0.55)";

// Ángulos de la tapa respecto a la pared trasera.
const LID_CLOSED = -90;
const LID_OPEN = 25;
// Vista final.
// (shift: la caja crece hacia el espectador y al inclinarla sube; se baja para centrarla.)
const VIEW = { tilt: 58, spin: 35, scale: 1.55, shift: 14 };

type Labels = { open: string; close: string; hint: string };

/** Cara con dos lados: el interior (lo que se ve en el troquel) y el exterior. */
function Face({ inside, outside, children }: { inside: string; outside: string; children?: ReactNode }) {
  const side: CSSProperties = { backfaceVisibility: "hidden", border: EDGE };
  return (
    <>
      <div className="absolute inset-0 grid place-items-center" style={{ ...side, background: inside }}>
        {children}
      </div>
      <div className="absolute inset-0" style={{ ...side, background: outside, transform: "rotateY(180deg)" }} />
    </>
  );
}

const preserve: CSSProperties = { transformStyle: "preserve-3d" };

export default function PackagingDieline({ accent, labels }: { accent: string; labels?: Labels }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const toggle = useRef<(next: boolean) => void>(() => {});
  // Clic sin arrastre sobre la caja (lo llama el manejador de puntero de GSAP).
  const tap = useRef<() => void>(() => {});

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const stage = q<HTMLElement>("[data-stage]")[0];
      const tilt = q<HTMLElement>("[data-tilt]")[0];
      const spin = q<HTMLElement>("[data-spin]")[0];
      const lid = q<HTMLElement>("[data-lid]")[0];
      const walls = {
        top: q<HTMLElement>("[data-wall=top]")[0],
        bottom: q<HTMLElement>("[data-wall=bottom]")[0],
        left: q<HTMLElement>("[data-wall=left]")[0],
        right: q<HTMLElement>("[data-wall=right]")[0],
      };
      // Doblez de cada pared hacia el espectador (ver geometría arriba).
      const folded = { top: { rotationX: -90 }, bottom: { rotationX: 90 }, left: { rotationY: 90 }, right: { rotationY: -90 } };

      gsap.set(walls.top, { transformOrigin: "50% 100%" });
      gsap.set(walls.bottom, { transformOrigin: "50% 0%" });
      gsap.set(walls.left, { transformOrigin: "100% 50%" });
      gsap.set(walls.right, { transformOrigin: "0% 50%" });
      gsap.set(lid, { transformOrigin: "50% 100%" });

      const showFinal = () => {
        gsap.set(q("[data-flat]"), { autoAlpha: 0 });
        gsap.set(stage, { autoAlpha: 1 });
        Object.entries(walls).forEach(([k, el]) => gsap.set(el, folded[k as keyof typeof folded]));
        gsap.set(lid, { rotationX: LID_CLOSED, autoAlpha: 1 });
        gsap.set(tilt, { rotationX: VIEW.tilt, scale: VIEW.scale, yPercent: VIEW.shift });
        gsap.set(spin, { rotation: VIEW.spin });
        setReady(true);
      };

      const mm = gsap.matchMedia();

      // Sin movimiento: directamente la caja en 3D, cerrada.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        showFinal();
        toggle.current = (next) => gsap.set(lid, { rotationX: next ? LID_OPEN : LID_CLOSED });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const outline = q<SVGPathElement>("[data-outline]")[0];
        const len = outline.getTotalLength();
        gsap.set(outline, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(stage, { autoAlpha: 0 });
        gsap.set(lid, { rotationX: LID_CLOSED, autoAlpha: 0 });

        let idle: gsap.core.Tween | null = null;

        gsap
          .timeline({ delay: 0.3 })
          // 1. Troquel en 2D
          .to(outline, { strokeDashoffset: 0, duration: 1.8, ease: "power1.inOut" })
          .from(q("[data-folds]"), { autoAlpha: 0, duration: 0.5 }, 1.4)
          .from(q("[data-face]"), { autoAlpha: 0, duration: 0.5, stagger: 0.12 }, 1.7)
          // 2. Cambio al troquel en 3D (misma posición) y doblado
          .set(stage, { autoAlpha: 1 }, 2.8)
          .to(q("[data-flat]"), { autoAlpha: 0, duration: 0.3 }, 2.8)
          .to(walls.left, { ...folded.left, duration: 0.9, ease: "power2.inOut" }, 3.1)
          .to(walls.right, { ...folded.right, duration: 0.9, ease: "power2.inOut" }, 3.25)
          .to(walls.bottom, { ...folded.bottom, duration: 0.9, ease: "power2.inOut" }, 3.4)
          .to(walls.top, { ...folded.top, duration: 0.9, ease: "power2.inOut" }, 3.55)
          .to(lid, { autoAlpha: 1, duration: 0.3 }, 4.3)
          // 3. Giro hasta la vista en perspectiva
          .to(tilt, { rotationX: VIEW.tilt, scale: VIEW.scale, yPercent: VIEW.shift, duration: 1.4, ease: "power3.inOut" }, 3.6)
          .to(spin, { rotation: VIEW.spin, duration: 1.4, ease: "power3.inOut" }, 3.6)
          // Un vistazo: la tapa se entreabre y vuelve, para invitar a abrirla
          .to(lid, { rotationX: LID_CLOSED + 22, duration: 0.45, ease: "power2.out" }, 5.2)
          .to(lid, { rotationX: LID_CLOSED, duration: 0.6, ease: "bounce.out" }, 5.65)
          .add(() => {
            setReady(true);
            // Flota y gira muy despacio hasta que alguien la toca.
            idle = gsap.to(spin, { rotation: VIEW.spin + 25, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
            gsap.to(tilt, { y: -8, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
          }, 5.2);

        toggle.current = (next) =>
          gsap.to(lid, {
            rotationX: next ? LID_OPEN : LID_CLOSED,
            duration: next ? 0.9 : 0.7,
            ease: next ? "back.out(1.6)" : "power3.in",
            overwrite: "auto",
          });

        // Arrastrar para girar: horizontal gira la caja, vertical (con ratón) la inclina.
        const spinTo = gsap.quickTo(spin, "rotation", { duration: 0.5, ease: "power3" });
        const tiltTo = gsap.quickTo(tilt, "rotationX", { duration: 0.5, ease: "power3" });
        let start: { x: number; y: number; spin: number; tilt: number } | null = null;
        let moved = false;

        const down = (e: PointerEvent) => {
          idle?.kill();
          start = {
            x: e.clientX,
            y: e.clientY,
            spin: Number(gsap.getProperty(spin, "rotation")),
            tilt: Number(gsap.getProperty(tilt, "rotationX")),
          };
          moved = false;
          stage.setPointerCapture(e.pointerId);
        };
        const move = (e: PointerEvent) => {
          if (!start) return;
          const dx = e.clientX - start.x;
          const dy = e.clientY - start.y;
          if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
          spinTo(start.spin - dx * 0.5);
          if (e.pointerType === "mouse") tiltTo(gsap.utils.clamp(25, 85, start.tilt - dy * 0.3));
        };
        const up = () => {
          // Un clic sin arrastrar abre o cierra la tapa.
          if (start && !moved) tap.current();
          start = null;
        };

        stage.addEventListener("pointerdown", down);
        stage.addEventListener("pointermove", move);
        stage.addEventListener("pointerup", up);
        stage.addEventListener("pointercancel", up);
        return () => {
          stage.removeEventListener("pointerdown", down);
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerup", up);
          stage.removeEventListener("pointercancel", up);
        };
      });
    },
    { scope: root }
  );

  const setLid = (next: boolean) => {
    openRef.current = next;
    setOpen(next);
    toggle.current(next);
  };
  useEffect(() => {
    tap.current = () => setLid(!openRef.current);
  });

  return (
    <div ref={root} className="flex flex-col items-center gap-4">
      <div className="relative aspect-square w-full">
        {/* 1. Troquel en 2D */}
        <svg data-flat viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
          <rect data-face x="150" y="50" width="100" height="100" fill={accent} fillOpacity="0.35" />
          <rect data-face x="50" y="150" width="100" height="100" fill={accent} fillOpacity="0.45" />
          <rect data-face x="150" y="150" width="100" height="100" fill={accent} fillOpacity="0.9" />
          <rect data-face x="250" y="150" width="100" height="100" fill={accent} fillOpacity="0.45" />
          <rect data-face x="150" y="250" width="100" height="100" fill={accent} fillOpacity="0.35" />
          <path data-outline d={OUTLINE} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path data-folds d={FOLDS} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>

        {/* 2. La misma caja en 3D */}
        <div
          data-stage
          aria-hidden
          className={`absolute inset-0 touch-pan-y select-none ${ready ? "cursor-grab active:cursor-grabbing" : ""}`}
          style={{ perspective: "1100px" }}
        >
          {/* Las capas 3D no reciben el puntero: lo recibe el escenario (y la caja escalada no tapa el botón) */}
          <div data-tilt className="pointer-events-none absolute inset-0" style={preserve}>
            <div data-spin className="absolute inset-0" style={preserve}>
              {/* Base, centrada como la cara frontal del troquel */}
              <div className="absolute top-[37.5%] left-[37.5%] h-1/4 w-1/4" style={preserve}>
                <Face inside={INSIDE.base} outside={OUTSIDE.b} />

                <div data-wall="top" className="absolute inset-x-0 -top-full h-full" style={preserve}>
                  <Face inside={INSIDE.end} outside={OUTSIDE.c} />
                  {/* Tapa: cuelga de la pared superior. Por dentro, "Cree". */}
                  <div data-lid className="absolute inset-x-0 -top-full h-full" style={preserve}>
                    <Face inside={INSIDE.lid} outside={OUTSIDE.lid}>
                      <svg viewBox="0 0 100 100" className="h-full w-full">
                        <text
                          x="50"
                          y="58"
                          textAnchor="middle"
                          className="font-display"
                          fontWeight="700"
                          fontSize="30"
                          letterSpacing="-1"
                          fill="#694eb1"
                        >
                          Cree
                        </text>
                      </svg>
                    </Face>
                  </div>
                </div>
                <div data-wall="bottom" className="absolute inset-x-0 top-full h-full" style={preserve}>
                  <Face inside={INSIDE.end} outside={OUTSIDE.a} />
                </div>
                <div data-wall="left" className="absolute inset-y-0 -left-full w-full" style={preserve}>
                  <Face inside={INSIDE.side} outside={OUTSIDE.b} />
                </div>
                <div data-wall="right" className="absolute inset-y-0 left-full w-full" style={preserve}>
                  <Face inside={INSIDE.side} outside={OUTSIDE.c} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {labels ? (
        <div
          className={`relative z-10 flex flex-col items-center gap-2 transition-opacity duration-500 ${ready ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <button
            type="button"
            aria-pressed={open}
            onClick={() => setLid(!open)}
            className="rounded-full bg-ink px-5 py-2.5 font-sans text-sm font-medium text-paper transition-colors hover:bg-brand-ink"
          >
            {open ? labels.close : labels.open}
          </button>
          <span className="font-sans text-xs text-slate">{labels.hint}</span>
        </div>
      ) : null}
    </div>
  );
}
