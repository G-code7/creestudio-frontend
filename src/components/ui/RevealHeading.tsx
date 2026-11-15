"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP } from "@/src/lib/gsap";
import Words from "./Words";

type RevealHeadingProps = {
  text: string;
  as?: ElementType;
  className?: string;
};

/** Título cuyas palabras suben desde una máscara al entrar en pantalla. */
export default function RevealHeading({ text, as: Tag = "h2", className }: RevealHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(el.querySelectorAll("[data-word] > span"), {
          yPercent: 110,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      <Words text={text} />
    </Tag>
  );
}
