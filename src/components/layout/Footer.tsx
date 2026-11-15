import Link from "next/link";
import { serviceSlugs, type Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import { localizePath } from "@/src/lib/i18n";
import { site } from "@/src/lib/site";

type FooterProps = { locale: Locale; dict: Dictionary };

const linkClass = "font-sans text-sm text-paper/65 transition-colors hover:text-cree";
const titleClass = "font-display text-sm font-semibold text-paper";

export default function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      {/* Logo protagonista. Si luego hay SVG del logo, va aquí en lugar del texto. */}
      <div className="container-site pt-20 pb-14 md:pt-28 md:pb-20">
        <Link
          href={localizePath(locale)}
          className="block text-center font-display font-bold leading-[0.9] tracking-tighter whitespace-nowrap transition-colors duration-500 hover:text-cree"
          style={{ fontSize: "clamp(2.75rem, 11.5vw, 9.5rem)" }}
        >
          {site.name}
        </Link>
        <p className="mx-auto mt-6 max-w-md text-center font-sans text-sm leading-relaxed text-paper/65 md:text-base">
          {dict.footer.tagline}
        </p>
      </div>

      <div className="container-site grid gap-10 border-t border-paper/10 py-14 sm:grid-cols-3">
        <nav aria-label={dict.footer.servicesTitle}>
          <h2 className={titleClass}>{dict.footer.servicesTitle}</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link href={localizePath(locale, `servicios/${slug}`)} className={linkClass}>
                  {dict.services.items[slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.footer.navTitle}>
          <h2 className={titleClass}>{dict.footer.navTitle}</h2>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li>
              <Link href={localizePath(locale, "servicios")} className={linkClass}>
                {dict.nav.services}
              </Link>
            </li>
            <li>
              <Link href={localizePath(locale, "proyectos")} className={linkClass}>
                {dict.nav.work}
              </Link>
            </li>
            <li>
              <Link href={localizePath(locale, "contacto")} className={linkClass}>
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>

        {site.social.length > 0 ? (
          <div>
            <h2 className={titleClass}>{dict.footer.socialTitle}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="container-site flex flex-col gap-3 border-t border-paper/10 py-6 font-sans text-xs text-paper/50 sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}. {dict.footer.rights}
        </p>
        <Link href={localizePath(locale, "privacidad")} className="transition-colors hover:text-cree">
          {dict.footer.privacy}
        </Link>
      </div>
    </footer>
  );
}
