"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, useGSAP } from "@/src/lib/gsap";

type ServiceItem = {
  slug: string;
  href: string;
  name: string;
  short: string;
  previews: string[];
};

type ServicesListProps = {
  items: ServiceItem[];
  headingLevel: "h2" | "h3";
};

const pad = (n: number) => String(n).padStart(2, "0");
/** Píxeles de recorrido del cursor entre una portada y la siguiente. */
const STEP = 110;

/*
 * Índice de servicios con el mismo layout de siempre, más:
 *   - Entrada: cada fila dibuja su línea, el nombre sube desde una máscara y
 *     luego aparecen número, descripción y flecha.
 *   - Hover (escritorio): la fila se llena de lavanda desde abajo, el resto se
 *     atenúa y las portadas de los proyectos de ese servicio siguen al cursor,
 *     alternándose cada cierto tramo de movimiento.
 *   - Movimiento reducido o sin JS: todo visible; solo quedan los hovers de CSS.
 */
export default function ServicesList({ items, headingLevel }: ServicesListProps) {
  const Heading = headingLevel;
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const list = root.current;
      if (!list) return;
      const q = gsap.utils.selector(list);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-line-top]"), {
          scaleX: 0,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: list, start: "top 85%", once: true },
        });

        for (const row of q<HTMLElement>("[data-row]")) {
          gsap
            .timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } })
            .from(row.querySelector("[data-line]"), { scaleX: 0, duration: 1.2, ease: "power3.inOut" })
            .from(row.querySelector("[data-name]"), { yPercent: 110, duration: 1, ease: "power4.out" }, 0.1)
            .from(
              row.querySelectorAll("[data-index], [data-short], [data-arrow]"),
              { autoAlpha: 0, y: 16, duration: 0.7, ease: "power3.out", stagger: 0.08 },
              0.35
            );
        }
      });

      // Portada que sigue al cursor (solo con ratón y en escritorio).
      mm.add("(hover: hover) and (min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const preview = q<HTMLElement>("[data-preview]")[0];
        if (!preview) return;
        const images = q<HTMLElement>("[data-preview-img]");

        // Esquina inferior izquierda junto al cursor: la imagen flota arriba a la derecha y no tapa el nombre.
        gsap.set(preview, { xPercent: 0, yPercent: -100, transformOrigin: "0% 100%", autoAlpha: 0, scale: 0.6 });
        const moveX = gsap.quickTo(preview, "x", { duration: 0.6, ease: "power3" });
        const moveY = gsap.quickTo(preview, "y", { duration: 0.6, ease: "power3" });
        const tilt = gsap.quickTo(preview, "rotate", { duration: 0.8, ease: "power3" });

        let lastX = 0;
        let lastY = 0;
        let travelled = 0;
        let active: string | null = null;
        let index = 0;
        let depth = 1;

        const imagesOf = (slug: string | null) => images.filter((img) => img.dataset.previewImg === slug);

        // Muestra la portada `i` del servicio activo: entra por encima de la anterior con un leve zoom.
        const reveal = (i: number) => {
          const set = imagesOf(active);
          const img = set[i];
          if (!img) return;
          depth += 1;
          gsap.set(img, { zIndex: depth });
          gsap.fromTo(
            img,
            { autoAlpha: 0, scale: 1.15 },
            { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out", overwrite: true }
          );
          // Las demás se ocultan cuando la nueva ya cubre el marco.
          const others = images.filter((o) => o !== img);
          gsap.to(others, { autoAlpha: 0, duration: 0.01, delay: 0.45, overwrite: true });
        };

        const show = (slug: string | null) => {
          if (slug === active) return;
          active = slug;
          index = 0;
          travelled = 0;
          const has = imagesOf(slug).length > 0;
          if (has) reveal(0);
          gsap.to(preview, {
            autoAlpha: has ? 1 : 0,
            scale: has ? 1 : 0.6,
            duration: 0.5,
            ease: has ? "back.out(1.6)" : "power3.in",
            overwrite: "auto",
          });
        };

        const onMove = (e: PointerEvent) => {
          const rect = list.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          moveX(x + 28);
          moveY(y - 20);
          tilt(gsap.utils.clamp(-12, 12, (x - lastX) * 0.6));

          const row = (e.target as HTMLElement).closest<HTMLElement>("[data-row]");
          show(row?.dataset.row ?? null);

          // Cada STEP píxeles recorridos dentro de la misma fila, siguiente portada.
          const count = imagesOf(active).length;
          if (count > 1) {
            travelled += Math.hypot(x - lastX, y - lastY);
            if (travelled >= STEP) {
              travelled = 0;
              index = (index + 1) % count;
              reveal(index);
            }
          }
          lastX = x;
          lastY = y;
        };
        const onLeave = () => {
          show(null);
          tilt(0);
        };

        list.addEventListener("pointermove", onMove);
        list.addEventListener("pointerleave", onLeave);
        return () => {
          list.removeEventListener("pointermove", onMove);
          list.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="group/list relative isolate">
      <span data-line-top aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-ink" />

      <ul>

        {items.map((item, i) => (
          <li
            key={item.slug}
            data-row={item.slug}
            className="relative transition-opacity duration-500 group-hover/list:[&:not(:hover)]:opacity-40"
          >
            <Link
              href={item.href}
              className="group relative grid gap-3 py-8 outline-offset-0 md:grid-cols-12 md:items-end md:gap-8 md:py-10"
            >
              {/* Relleno lavanda que sube desde abajo */}
              <span
                aria-hidden
                className="absolute inset-y-0 -inset-x-4 z-0 origin-bottom scale-y-0 rounded-sm bg-cree transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 md:-inset-x-6"
              />

              <Heading className="relative z-10 font-display text-4xl font-bold leading-none tracking-tight text-ink transition-[color,transform] duration-500 ease-out group-hover:translate-x-3 group-hover:text-paper group-focus-visible:text-paper sm:text-5xl md:col-span-7 md:text-7xl">
                <span
                  data-index
                  aria-hidden
                  className="mr-3 inline-block align-top font-display text-sm font-bold tracking-[0.18em] text-brand-ink transition-colors duration-500 group-hover:text-ink md:mr-5 md:text-base"
                >
                  {pad(i + 1)}
                </span>
                <span className="inline-block overflow-hidden pb-[0.06em] align-bottom">
                  <span data-name className="inline-block">
                    {item.name}
                  </span>
                </span>
              </Heading>

              <div className="relative z-10 flex items-end justify-between gap-6 md:col-span-5">
                <p
                  data-short
                  className="max-w-md font-sans text-base leading-relaxed text-slate-soft transition-colors duration-500 group-hover:text-ink"
                >
                  {item.short}
                </p>
                <span
                  data-arrow
                  aria-hidden
                  className="grid size-11 shrink-0 place-items-center rounded-full border border-ink/20 font-sans text-lg text-ink transition-[background-color,color,border-color] duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper"
                >
                  {/* GSAP anima este contenedor; la rotación va en el span interno para no pisarse */}
                  <span className="inline-block -rotate-45 transition-[rotate] duration-500 group-hover:rotate-0">→</span>
                </span>
              </div>
            </Link>

            <span data-line aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left bg-line" />
          </li>
        ))}
      </ul>

      {/* Portada flotante */}
      <div
        data-preview
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0 z-20 hidden aspect-[4/5] w-48 overflow-hidden rounded-xl shadow-[0_40px_80px_-30px_rgba(17,17,17,0.55)] md:block lg:w-56"
      >
        {items.flatMap((item) =>
          item.previews.map((src) => (
            <Image
              key={`${item.slug}-${src}`}
              data-preview-img={item.slug}
              src={src}
              alt=""
              fill
              sizes="224px"
              unoptimized={/\.gif$/i.test(src)}
              className="invisible object-cover"
            />
          ))
        )}
      </div>
    </div>
  );
}
