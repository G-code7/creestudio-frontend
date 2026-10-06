import type { Metadata } from "next";
import { getDictionary } from "@/src/content";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import PageHeader from "@/src/components/ui/PageHeader";
import CtaBand from "@/src/components/ui/CtaBand";
import ServicesIndex from "@/src/components/services/ServicesIndex";
import Packages from "@/src/components/services/Packages";
import RetainerTiers from "@/src/components/services/RetainerTiers";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "servicios",
    title: dict.services.metaTitle,
    description: dict.services.metaDescription,
  });
}

export default async function ServicesPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const labels = { investment: dict.common.investment, investmentOnCall: dict.common.investmentOnCall };

  return (
    <>
      <PageHeader title={dict.services.title} intro={dict.services.intro} />

      <section className="container-site pb-24 md:pb-32">
        <ServicesIndex locale={locale} dict={dict} headingLevel="h2" />
      </section>

      <section id="paquetes" className="container-site py-24 md:py-32">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
          {dict.services.packages.title}
        </h2>
        <p className="mt-5 mb-14 max-w-2xl font-sans text-lg leading-relaxed text-slate md:mb-20">
          {dict.services.packages.intro}
        </p>
        <Packages items={dict.services.packages.items} labels={labels} />
      </section>

      <section id="continuidad" className="container-site scroll-mt-8 py-24 md:py-32">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
          {dict.services.retainer.title}
        </h2>
        <p className="mt-5 mb-14 max-w-2xl font-sans text-lg leading-relaxed text-slate md:mb-20">
          {dict.services.retainer.intro}
        </p>
        <RetainerTiers items={dict.services.retainer.items} labels={labels} />
      </section>

      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: localizePath(locale, "contacto") }}
      />
    </>
  );
}
