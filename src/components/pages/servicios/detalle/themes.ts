import type { ServiceSlug } from "@/src/content/config";

/*
 * Cada servicio tiene su color de cabecera y su "firma" (animación propia).
 * Todo sale de la paleta de la marca; lo que cambia es la combinación.
 */
export type ServiceTheme = {
  /** Clases del panel de la cabecera (fondo + texto). */
  panel: string;
  /** Texto secundario sobre ese fondo. */
  muted: string;
  /** Color de acento de la firma, que contraste con el fondo. */
  accent: string;
  /** Fondo oscuro: botones claros. */
  dark: boolean;
};

export const serviceThemes: Record<ServiceSlug, ServiceTheme> = {
  // Estrategia: el núcleo de la marca, sobre su lavanda.
  branding: { panel: "bg-cree text-ink", muted: "text-ink/75", accent: "#ffffff", dark: false },
  // Feed: negro, como una pantalla apagada que se enciende.
  contenido: { panel: "bg-ink text-paper", muted: "text-paper/70", accent: "#917fc0", dark: true },
  // Pantalla: violeta profundo.
  "diseno-web": { panel: "bg-brand-ink text-paper", muted: "text-paper/75", accent: "#ffffff", dark: true },
  // Objeto físico: gris claro de mesa de trabajo.
  packaging: { panel: "bg-mist text-ink", muted: "text-slate", accent: "#917fc0", dark: false },
  // Espacio: blanco con retícula, como el plano de un montaje.
  eventos: { panel: "bg-paper text-ink ring-1 ring-line", muted: "text-slate", accent: "#917fc0", dark: false },
};
