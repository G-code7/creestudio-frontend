type ProcessProps = {
  title: string;
  intro: string;
  steps: { name: string; text: string }[];
};

/**
 * Proceso real de Cree (secuencia ordenada): el número aporta información,
 * por eso se conserva el formato (00) que ya usa la marca.
 */
export default function Process({ title, intro, steps }: ProcessProps) {
  return (
    <section className="container-site grid gap-12 py-24 md:grid-cols-12 md:py-36">
      <div className="md:col-span-4">
        <div className="md:sticky md:top-28">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-sm font-sans text-base leading-relaxed text-slate">{intro}</p>
        </div>
      </div>

      <ol className="md:col-span-7 md:col-start-6">
        {steps.map((step, i) => (
          <li key={step.name} className="border-b border-line py-8 first:pt-0 md:py-10 md:first:pt-0">
            <div className="flex items-baseline gap-5">
              <span aria-hidden className="font-sans text-sm tabular-nums text-brand">
                ({String(i).padStart(2, "0")})
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                {step.name}
              </h3>
            </div>
            <p className="mt-3 max-w-xl pl-[3.25rem] font-sans text-base leading-relaxed text-slate">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
