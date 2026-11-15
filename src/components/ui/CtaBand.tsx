import Button from "./Button";

type CtaBandProps = {
  title: string;
  text: string;
  cta: { label: string; href: string };
};

/** Cierre de página con el lavanda de la marca; da paso al footer negro. */
export default function CtaBand({ title, text, cta }: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-ink text-paper">
      {/* Halo lavanda: el mismo tono con el que termina el hero del home */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-2/3 -right-1/3 -z-10 aspect-square w-[min(110vw,1100px)] rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(157,139,204,0.6), rgba(145,127,192,0.2) 55%, transparent)" }}
      />

      <div className="container-site flex flex-col items-start gap-10 py-24 md:flex-row md:items-end md:justify-between md:py-32">
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-paper/85">{text}</p>
        </div>
        <Button href={cta.href} variant="light">
          {cta.label}
          <span aria-hidden className="ml-2">→</span>
        </Button>
      </div>
    </section>
  );
}
