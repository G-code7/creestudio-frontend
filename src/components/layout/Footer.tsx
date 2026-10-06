import Link from "next/link";
import { serviceSlugs, type Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import { localizePath } from "@/src/lib/i18n";
import { site } from "@/src/lib/site";

type FooterProps = { locale: Locale; dict: Dictionary };

const linkClass = "font-sans text-sm text-slate transition-colors hover:text-brand";
const titleClass = "font-display text-sm font-semibold text-ink";

export default function Footer({ locale, dict }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link href={localizePath(locale)} className="font-display text-xl font-bold tracking-tight text-ink">
            {site.name}
          </Link>
          <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-slate-soft">
            {dict.footer.tagline}
          </p>
        </div>

        <nav aria-label={dict.footer.servicesTitle} className="md:col-span-3">
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

        <nav aria-label={dict.footer.navTitle} className="md:col-span-2">
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
          <div className="md:col-span-2">
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

      <div className="container-site flex flex-col gap-3 border-t border-line py-6 font-sans text-xs text-slate-soft sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}. {dict.footer.rights}
        </p>
        <Link href={localizePath(locale, "privacidad")} className="transition-colors hover:text-brand">
          {dict.footer.privacy}
        </Link>
      </div>
    </footer>
  );
}
