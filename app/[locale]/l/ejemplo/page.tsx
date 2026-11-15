import type { Metadata } from "next";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import CtaBand from "@/src/components/ui/CtaBand";
import LandingHero from "@/src/components/landings/kit/LandingHero";
import { Benefits, Faq, Offer, Steps } from "@/src/components/landings/kit/LandingSections";
import { content } from "@/src/components/landings/ejemplo/content";

/*
 * Landing de ejemplo (/l/ejemplo/). Las landings viven bajo /l/ y no entran
 * en el sitemap. Esta, además, no se indexa: es solo una plantilla.
 */
type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const c = content[locale];
  return {
    ...pageMetadata({ locale, path: "l/ejemplo", title: c.meta.title, description: c.meta.description }),
    robots: { index: false, follow: false },
  };
}

export default async function ExampleLanding({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const c = content[locale];
  const contact = `${localizePath(locale, "contacto")}?origen=landing-ejemplo`;

  return (
    <>
      <LandingHero {...c.hero} primaryHref={contact} secondaryHref="#oferta" />
      <Benefits {...c.benefits} />
      <Steps {...c.steps} />
      <Offer {...c.offer} id="oferta" ctaHref={contact} />
      <Faq {...c.faq} />
      <CtaBand title={c.final.title} text={c.final.text} cta={{ label: c.final.cta, href: contact }} />
    </>
  );
}
