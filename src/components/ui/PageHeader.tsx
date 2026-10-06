import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  intro?: string;
  children?: ReactNode;
};

/** Cabecera de páginas interiores: único H1 de la página. */
export default function PageHeader({ title, intro, children }: PageHeaderProps) {
  return (
    <header className="container-site pt-36 pb-14 md:pt-44 md:pb-20">
      <h1 className="max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-slate">{intro}</p>
      ) : null}
      {children}
    </header>
  );
}
