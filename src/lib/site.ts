export type SocialLink = { label: string; href: string };

export const site = {
  name: "Cree Studio",
  url: "https://creestudio.es",
  /** Perfiles públicos (footer y JSON-LD). Si queda vacío, no se muestran. */
  social: [] as SocialLink[],
};
