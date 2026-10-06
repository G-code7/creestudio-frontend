type StakesProps = {
  title: string;
  items: { fear: string; answer: string }[];
};

/** Lo que cuesta no actuar, en la voz del cliente. Filas editoriales, sin tarjetas. */
export default function Stakes({ title, items }: StakesProps) {
  return (
    <section className="container-site py-24 md:py-36">
      <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      <ul className="mt-14 border-t border-line md:mt-20">
        {items.map((item) => (
          <li
            key={item.fear}
            className="grid gap-5 border-b border-line py-10 md:grid-cols-12 md:gap-8 md:py-14"
          >
            <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:col-span-6 md:text-3xl">
              {item.fear}
            </p>
            <p className="max-w-xl font-sans text-base leading-relaxed text-slate md:col-span-5 md:col-start-8 md:text-lg">
              {item.answer}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
