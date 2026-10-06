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
      <div className="max-w-4xl">
        <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-6xl">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-slate">{text}</p>
        <Link
          href={link.href}
          className="mt-8 inline-block font-sans text-base font-medium text-brand underline decoration-brand/40 underline-offset-[6px] transition-colors hover:decoration-brand"
        >
          {link.label}
        </Link>
      </div>
    </section>
  );
}
