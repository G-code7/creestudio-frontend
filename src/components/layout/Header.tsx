import Link from "next/link";
import type { Locale } from "@/src/content/config";
import type { Dictionary } from "@/src/content/types";
import { localizePath } from "@/src/lib/i18n";
import { site } from "@/src/lib/site";
import Button from "@/src/components/ui/Button";
import LocaleSwitcher from "./LocaleSwitcher";
import MobileMenu from "./MobileMenu";

type HeaderProps = { locale: Locale; dict: Dictionary };

/** Header absoluto: flota sobre el hero y se desplaza con la página. */
export default function Header({ locale, dict }: HeaderProps) {
  const links = [
    { href: localizePath(locale, "servicios"), label: dict.nav.services },
    { href: localizePath(locale, "proyectos"), label: dict.nav.work },
  ];
  const contact = { href: localizePath(locale, "contacto"), label: dict.nav.contact };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link
          href={localizePath(locale)}
          className="font-display text-lg font-bold tracking-tight text-ink"
        >
          {site.name}
        </Link>

        <nav aria-label={dict.nav.label} className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-slate transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <LocaleSwitcher locale={locale} label={dict.nav.language} />
          <Button href={contact.href} size="sm">
            {dict.common.bookCall}
          </Button>
        </nav>

        <MobileMenu
          locale={locale}
          links={links}
          contact={contact}
          labels={{
            open: dict.nav.menu,
            close: dict.nav.close,
            nav: dict.nav.label,
            language: dict.nav.language,
          }}
        />
      </div>
    </header>
  );
}
