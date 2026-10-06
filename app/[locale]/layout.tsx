import type { Metadata } from "next";
import { Montserrat, Rubik } from "next/font/google";
import { locales } from "@/src/content/config";
import { getDictionary } from "@/src/content";
import { resolveLocale } from "@/src/lib/i18n";
import { site } from "@/src/lib/site";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import "../globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });
const rubik = Rubik({ subsets: ["latin"], variable: "--font-rubik", display: "swap" });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${site.name}` },
    description: dict.meta.description,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: dict.meta.description,
    ...(site.social.length > 0 ? { sameAs: site.social.map((s) => s.href) } : {}),
  };

  return (
    <html lang={locale} className={`${montserrat.variable} ${rubik.variable}`}>
      <body>
        <a
          href="#contenido"
          className="sr-only z-[60] rounded-full bg-ink px-5 py-3 font-sans text-sm text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          {dict.nav.skip}
        </a>
        <Header locale={locale} dict={dict} />
        <main id="contenido">{children}</main>
        <Footer locale={locale} dict={dict} />
        <script
          type="application/ld+json"
          // JSON-LD estático generado en el servidor; "<" escapado por seguridad.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
