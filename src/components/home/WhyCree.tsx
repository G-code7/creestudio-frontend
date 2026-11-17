type WhyCreeProps = {
  eyebrow: string;
  title: string;
  items: { title: string; text: string }[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * "Por qué Cree": encabezado a la izquierda (eyebrow + título) y cuatro
 * propuestas de valor en una fila (2×2 en móvil). Sin icono: número, título
 * y texto, todo alineado a la izquierda, con un filo superior editorial.
 */
export default function WhyCree({ eyebrow, title, items }: WhyCreeProps) {
  return (
    <section className="bg-paper text-ink">
      <div className="container-site py-8 md:pt-32">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h2>

        <ol className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-x-8">
          {items.map((item, i) => (
            <li
              key={item.title}
              className="flex flex-col rounded-2xl border border-line bg-mist p-6 md:p-7"
            >              
            <span className="font-display text-sm font-bold tracking-[0.18em] text-cree">{pad(i + 1)}</span>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-slate md:text-base">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
