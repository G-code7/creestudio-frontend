import Link from "next/link";

type PagerItem = { name: string; short: string; href: string };

type ServicePagerProps = {
  label: string;
  prev: PagerItem;
  next: PagerItem;
  labels: { prev: string; next: string };
};

/** Navegación circular entre disciplinas, con el mismo lenguaje que la de proyectos. */
export default function ServicePager({ label, prev, next, labels }: ServicePagerProps) {
  return (
    <nav aria-label={label} className="grid bg-mist md:grid-cols-2">
      {[
        { item: prev, text: labels.prev, isNext: false },
        { item: next, text: labels.next, isNext: true },
      ].map(({ item, text, isNext }) => (
        <Link
          key={item.href + text}
          href={item.href}
          rel={isNext ? "next" : "prev"}
          className={`group flex flex-col gap-3 px-6 py-12 transition-colors duration-300 hover:bg-cree/10 md:px-10 md:py-16 ${
            isNext ? "md:items-end md:border-l md:border-line md:text-right" : "border-b border-line md:border-b-0"
          }`}
        >
          <span className="flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-[0.14em] text-brand-ink md:text-sm">
            {!isNext ? <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span> : null}
            {text}
            {isNext ? <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span> : null}
          </span>
          <span className="font-display text-3xl font-bold tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-ink md:text-5xl">
            {item.name}
          </span>
          <span className="max-w-sm font-sans text-sm leading-relaxed text-slate">{item.short}</span>
        </Link>
      ))}
    </nav>
  );
}
