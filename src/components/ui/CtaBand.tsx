import Button from "./Button";

type CtaBandProps = {
  title: string;
  text: string;
  cta: { label: string; href: string };
};

export default function CtaBand({ title, text, cta }: CtaBandProps) {
  return (
    <section className="bg-mist">
      <div className="container-site flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between md:py-28">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 font-sans text-lg leading-relaxed text-slate">{text}</p>
        </div>
        <Button href={cta.href}>{cta.label}</Button>
      </div>
    </section>
  );
}
