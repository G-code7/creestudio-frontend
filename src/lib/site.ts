export type SocialLink = { label: string; href: string };

export const site = {
  name: "Cree Estudio",
  url: "https://creestudio.es",
  /** Perfiles públicos (footer y JSON-LD). Si queda vacío, no se muestran. */
  social: [] as SocialLink[],
  /**
   * Los dos únicos caminos de contacto.
   * PENDIENTE: poner el enlace real del evento "Llamada con CREE" (Calendly o Cal.com)
   * y el número de WhatsApp solo con dígitos y código de país (p. ej. 584121234567).
   */
  booking: "https://calendly.com/PENDIENTE/llamada-con-cree",
  whatsapp: "580000000000",
};

/** Enlace de WhatsApp con un mensaje ya escrito. */
export function whatsappHref(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
