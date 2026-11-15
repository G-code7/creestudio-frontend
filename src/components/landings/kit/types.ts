/** Contenido de una landing armada con el kit. Cada landing define el suyo (ES y EN). */
export type LandingContent = {
  meta: { title: string; description: string };
  hero: {
    /** Etiqueta pequeña sobre el título ("Oferta de lanzamiento"). */
    eyebrow: string;
    /** Título; `highlight` es la parte que va en lavanda, al final. */
    title: string;
    highlight: string;
    text: string;
    primary: string;
    secondary: string;
    /** Línea de confianza bajo los botones ("Respuesta en 24 h · Sin compromiso"). */
    note: string;
    /** Texto que gira en el sello circular. */
    badge: string;
  };
  benefits: { title: string; items: { title: string; text: string }[] };
  steps: { title: string; items: { title: string; text: string }[] };
  offer: {
    title: string;
    text: string;
    name: string;
    price: string;
    priceNote: string;
    includes: string[];
    cta: string;
  };
  faq: { title: string; items: { q: string; a: string }[] };
  final: { title: string; text: string; cta: string };
};
