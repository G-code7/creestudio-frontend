"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Header fijo:
 *   - arriba del todo: transparente, flota sobre el hero como antes;
 *   - al bajar: se esconde;
 *   - al subir: reaparece con fondo blanco translúcido.
 * El fondo va en una capa hermana (no en el <header>) y el <header> solo lleva
 * `translate` mientras está oculto: así el panel `fixed` del menú móvil sigue
 * anclado a la ventana y no al header.
 */
export default function HeaderShell({ children }: { children: ReactNode }) {
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(window.scrollY, 0);
      const delta = y - lastY;
      setAtTop(y < 8);
      if (y < 80) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      if (Math.abs(delta) > 6 || y < 80) lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      // Si alguien navega con teclado y el foco entra al header, se muestra.
      onFocusCapture={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-50 transition-[translate] duration-300 ease-out ${
        hidden ? "-translate-y-full" : ""
      }`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 -z-10 border-b bg-paper/85 backdrop-blur-md transition-[opacity,border-color] duration-300 ${
          atTop ? "border-transparent opacity-0" : "border-line opacity-100"
        }`}
      />
      {children}
    </header>
  );
}
