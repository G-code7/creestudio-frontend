import type { Plan } from "@/src/content/types";

type RetainerTiersProps = {
  items: Plan[];
  labels: { investment: string; investmentOnCall: string };
};

/** Planes de continuidad en filas, para diferenciarlos de los paquetes. */
export default function RetainerTiers({ items, labels }: RetainerTiersProps) {
  return (
    <ul className="border-t border-ink">
      {items.map((tier) => (
        <li key={tier.name} className="grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">{tier.name}</h3>
            <p className="mt-2 max-w-sm font-sans text-base leading-relaxed text-slate">{tier.forWho}</p>
            <p className="mt-5 font-sans text-sm text-slate-soft">
              {labels.investment}:{" "}
              <span className="font-medium text-ink">{tier.investment ?? labels.investmentOnCall}</span>
            </p>
          </div>
          <ul className="flex flex-col gap-2.5 font-sans text-base leading-relaxed text-slate md:col-span-6 md:col-start-7">
            {tier.includes.map((item) => (
              <li key={item} className="pl-4 [text-indent:-1rem] before:mr-2 before:text-brand before:content-['+']">
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
