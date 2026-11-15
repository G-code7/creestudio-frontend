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
      <div data-path-aside className="md:col-span-4">
        <div className="md:sticky md:top-28">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-sm font-sans text-base leading-relaxed text-slate">{intro}</p>
        </div>
      </div>

      <ol data-path-steps className="md:col-span-7 md:col-start-6">
        {steps.map((step, i) => (
          <li key={step.name} className="border-b border-line py-8 first:pt-0 md:py-10 md:first:pt-0">
            <div className="relative flex items-baseline gap-5">
              {/* Punto por donde pasa la línea (ProcessPath lo coloca y lo enciende) */}
              <span
                data-node
                aria-hidden
                className="invisible absolute top-1/2 left-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cree bg-paper transition-[background-color,box-shadow,scale] duration-500 data-[reached]:scale-125 data-[reached]:bg-cree data-[reached]:shadow-[0_0_0_4px_rgba(145,127,192,0.22)] md:data-[reached]:shadow-[0_0_0_6px_rgba(145,127,192,0.22)]"
              />
              <span aria-hidden className="font-sans text-sm tabular-nums text-brand-ink">
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
