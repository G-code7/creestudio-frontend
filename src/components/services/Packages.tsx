import type { Plan } from "@/src/content/types";

type PackagesProps = {
  items: Plan[];
  labels: { investment: string; investmentOnCall: string };
};

/** Paquetes en columnas separadas por filetes (sin tarjetas). */
export default function Packages({ items, labels }: PackagesProps) {
  return (
    <ul className="grid gap-12 md:grid-cols-3 md:gap-0">
      {items.map((plan, i) => (
        <li
          key={plan.name}
          className={`flex flex-col md:px-8 ${i === 0 ? "md:pl-0" : "md:border-l md:border-line"} ${
            i === items.length - 1 ? "md:pr-0" : ""
          }`}
        >
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">{plan.name}</h3>
          <p className="mt-3 font-sans text-base leading-relaxed text-slate">{plan.forWho}</p>
          <ul className="mt-6 flex flex-col gap-2.5 font-sans text-sm leading-relaxed text-slate">
            {plan.includes.map((item) => (
              <li key={item} className="pl-4 [text-indent:-1rem] before:mr-2 before:text-brand before:content-['+']">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <p className="font-sans text-xs text-slate-soft">{labels.investment}</p>
            <p className="mt-1 font-display text-lg font-semibold text-ink">
              {plan.investment ?? labels.investmentOnCall}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
