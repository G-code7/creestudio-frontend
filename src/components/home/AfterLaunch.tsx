import Link from "next/link";

type AfterLaunchProps = {
  title: string;
  text: string;
  link: { label: string; href: string };
};

/** Puente hacia los planes de continuidad (ingreso recurrente). */
export default function AfterLaunch({ title, text, link }: AfterLaunchProps) {
  return (
    <section className="container-site py-24 md:py-32">
      <div data-path-box className="max-w-4xl">
        <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-6xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-slate">{text}</p>
        {/* La línea de "Así trabajamos" termina aquí y lo enciende (data-reached) */}
        <Link
          href={link.href}
          data-path-cta
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-sans text-base font-medium text-ink transition-[background-color,border-color,color,box-shadow] duration-700 hover:border-ink data-[reached]:border-brand-ink data-[reached]:bg-brand-ink data-[reached]:text-paper data-[reached]:shadow-[0_0_0_8px_rgba(145,127,192,0.25)]"
        >
          {link.label}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
