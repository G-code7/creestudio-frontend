# Landings

- `kit/`: secciones reutilizables para cualquier landing (cabecera, beneficios, pasos, oferta, preguntas frecuentes) y el tipo `LandingContent`.
- Una carpeta por landing (`ejemplo/`, y luego por ejemplo `tienda-5-dias/`) con su `content.ts` en ES y EN, y secciones propias si las necesita.
- La página vive en `app/[locale]/l/<nombre>/page.tsx` (URL `/l/<nombre>/`) y arma la landing con el kit.

Para crear una nueva: copia `ejemplo/`, cambia los textos de `content.ts` y copia `app/[locale]/l/ejemplo/page.tsx`. Quita el `robots: noindex` cuando la landing sea real.

Una landing puede importar de `kit/`, `ui/` y `shared/`; nunca de `home/` ni de otra landing (ver `../README.md`).
