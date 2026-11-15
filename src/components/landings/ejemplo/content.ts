import type { Locale } from "@/src/content/config";
import type { LandingContent } from "../kit/types";

/*
 * Landing de EJEMPLO: textos de relleno para ver la estructura del kit.
 * Para una landing real: copia esta carpeta, cambia los textos y crea su
 * página en app/[locale]/l/<nombre>/page.tsx.
 */
export const content: Record<Locale, LandingContent> = {
  es: {
    meta: {
      title: "Landing de ejemplo",
      description: "Plantilla de landing de campaña de Cree Studio.",
    },
    hero: {
      eyebrow: "Oferta de ejemplo · cupos limitados",
      title: "Una frase que dice qué ganas,",
      highlight: "en pocas palabras.",
      text: "Un párrafo corto que explica a quién va dirigida la oferta, qué problema resuelve y por qué ahora. Dos líneas, no más.",
      primary: "Quiero empezar",
      secondary: "Ver qué incluye",
      note: "Respuesta en 24 h · Sin compromiso",
      badge: "CREE STUDIO • OFERTA DE EJEMPLO • ",
    },
    benefits: {
      title: "Por qué esta oferta tiene sentido",
      items: [
        { title: "Beneficio uno", text: "Lo que cambia para el cliente, dicho en su idioma y no en el nuestro." },
        { title: "Beneficio dos", text: "Un resultado concreto y fácil de imaginar: tiempo, dinero o tranquilidad." },
        { title: "Beneficio tres", text: "La objeción más común, convertida en una razón para decir que sí." },
      ],
    },
    steps: {
      title: "Cómo funciona",
      items: [
        { title: "Llamada", text: "Hablamos 30 minutos para entender tu caso." },
        { title: "Propuesta", text: "Te enviamos alcance, tiempos e inversión." },
        { title: "Trabajo", text: "Diseñamos contigo, con revisiones claras." },
        { title: "Entrega", text: "Recibes todo listo para usar desde el día uno." },
      ],
    },
    offer: {
      title: "Todo lo que incluye",
      text: "Un resumen de la oferta en una frase. Aquí va la promesa, sin letra pequeña.",
      name: "Nombre del paquete",
      price: "[Precio]",
      priceNote: "Pago único · [condiciones]",
      includes: ["Entregable uno", "Entregable dos", "Entregable tres", "Entregable cuatro", "Acompañamiento de [X] días"],
      cta: "Reservar mi cupo",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        { q: "¿Cuánto tiempo toma?", a: "Respuesta corta y concreta. Si depende de algo, decir de qué." },
        { q: "¿Qué necesito tener listo?", a: "Lista breve de lo que el cliente debe aportar antes de empezar." },
        { q: "¿Cómo se paga?", a: "Medios de pago, moneda y si hay anticipo." },
        { q: "¿Qué pasa si no me gusta el resultado?", a: "Cuántas rondas de revisión incluye y qué pasa después." },
      ],
    },
    final: {
      title: "¿Empezamos?",
      text: "Una última línea que reduce el riesgo de escribirnos.",
      cta: "Agenda una llamada",
    },
  },
  en: {
    meta: {
      title: "Example landing page",
      description: "Cree Studio campaign landing page template.",
    },
    hero: {
      eyebrow: "Example offer · limited spots",
      title: "One sentence that says what you get,",
      highlight: "in a few words.",
      text: "A short paragraph explaining who the offer is for, what problem it solves and why now. Two lines, no more.",
      primary: "I want to start",
      secondary: "See what’s included",
      note: "Reply within 24 h · No commitment",
      badge: "CREE STUDIO • EXAMPLE OFFER • ",
    },
    benefits: {
      title: "Why this offer makes sense",
      items: [
        { title: "Benefit one", text: "What changes for the client, in their words, not ours." },
        { title: "Benefit two", text: "A concrete, easy-to-picture result: time, money or peace of mind." },
        { title: "Benefit three", text: "The most common objection, turned into a reason to say yes." },
      ],
    },
    steps: {
      title: "How it works",
      items: [
        { title: "Call", text: "We talk for 30 minutes to understand your case." },
        { title: "Proposal", text: "We send you scope, timeline and investment." },
        { title: "Work", text: "We design with you, with clear review rounds." },
        { title: "Delivery", text: "You get everything ready to use from day one." },
      ],
    },
    offer: {
      title: "Everything included",
      text: "A one-sentence summary of the offer. This is the promise, no fine print.",
      name: "Package name",
      price: "[Price]",
      priceNote: "One-time payment · [terms]",
      includes: ["Deliverable one", "Deliverable two", "Deliverable three", "Deliverable four", "[X] days of support"],
      cta: "Book my spot",
    },
    faq: {
      title: "FAQ",
      items: [
        { q: "How long does it take?", a: "A short, concrete answer. If it depends on something, say what." },
        { q: "What do I need to have ready?", a: "A short list of what the client must provide before starting." },
        { q: "How do I pay?", a: "Payment methods, currency and whether there is a deposit." },
        { q: "What if I don’t like the result?", a: "How many review rounds are included and what happens after." },
      ],
    },
    final: {
      title: "Shall we start?",
      text: "One last line that lowers the risk of reaching out.",
      cta: "Book a call",
    },
  },
};
