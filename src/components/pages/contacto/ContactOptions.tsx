import type { Dictionary } from "@/src/content/types";
import { buttonBase, buttonSizes, buttonVariants } from "@/src/components/ui/Button";

type ContactOptionsProps = {
  copy: Dictionary["contact"];
  bookingHref: string;
  whatsappHref: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Contacto en un solo camino con dos puertas: agendar la llamada (con las
 * preguntas dentro de Calendly) o escribir por WhatsApp. Debajo, qué pasa
 * después, para que nadie se quede preguntando.
 */
export default function ContactOptions({ copy, bookingHref, whatsappHref }: ContactOptionsProps) {
  return (
    <>
      <section className="container-site pb-20 md:pb-28">
        <div className="grid gap-4 md:grid-cols-12 md:gap-6">
          {/* Agenda: la opción principal, con el violeta de la marca */}
          <article className="relative isolate flex flex-col overflow-hidden rounded-2xl bg-brand-ink p-7 text-paper md:col-span-7 md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-1/3 -bottom-1/2 -z-10 aspect-square w-[min(90vw,720px)] rounded-full"
              style={{ background: "radial-gradient(closest-side, rgba(157,139,204,0.6), rgba(145,127,192,0.2) 55%, transparent)" }}
            />
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-paper/80">
                {copy.call.eyebrow}
              </span>
              <span className="rounded-full border border-paper/30 px-3 py-1 font-sans text-xs text-paper/90">
                {copy.call.meta}
              </span>
            </div>
            <h2 className="mt-10 font-display text-4xl font-bold leading-[1.05] tracking-tight md:mt-16 md:text-6xl">
              {copy.call.title}
            </h2>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-paper/85 md:text-lg">{copy.call.text}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {copy.call.asks.map((ask) => (
                <li key={ask} className="rounded-full bg-paper/10 px-3 py-1.5 font-sans text-xs text-paper/90">
                  {ask}
                </li>
              ))}
            </ul>
            <a
              href={bookingHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonBase} ${buttonVariants.light} ${buttonSizes.md} mt-10 self-start md:mt-14`}
            >
              {copy.call.cta}
              <span aria-hidden className="ml-2">→</span>
            </a>
          </article>

          {/* WhatsApp: para quien prefiere escribir */}
          <article className="flex flex-col rounded-2xl border border-line bg-mist p-7 md:col-span-5 md:p-10">
            <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-brand-ink">WhatsApp</span>
            <h2 className="mt-10 font-display text-3xl font-bold leading-[1.05] tracking-tight text-ink md:mt-16 md:text-4xl">
              {copy.whatsapp.title}
            </h2>
            <p className="mt-5 max-w-sm font-sans text-base leading-relaxed text-slate">{copy.whatsapp.text}</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonBase} ${buttonVariants.primary} ${buttonSizes.md} mt-10 self-start md:mt-auto`}
            >
              {copy.whatsapp.cta}
              <span aria-hidden className="ml-2">→</span>
            </a>
          </article>
        </div>
      </section>

      <section className="container-site pb-28 md:pb-40">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">{copy.next.title}</h2>
        <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-ink pt-8 md:mt-12 md:grid-cols-4 md:gap-x-8 md:pt-10">
          {copy.next.steps.map((step, i) => (
            <li key={step.name}>
              <span className="font-display text-sm font-bold tracking-[0.18em] text-cree">{pad(i + 1)}</span>
              <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight text-ink md:text-xl">
                {step.name}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-slate md:text-base">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
