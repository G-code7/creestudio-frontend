import type { Metadata } from "next";
import { getDictionary } from "@/src/content";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import { fetchProjects } from "@/src/lib/projects-wp";
import CtaBand from "@/src/components/ui/CtaBand";
import { serviceSlugs } from "@/src/content/config";
import ServicesIndex from "@/src/components/shared/ServicesIndex";
import ServicesHero from "@/src/components/pages/servicios/ServicesHero";
import Packages from "@/src/components/pages/servicios/Packages";
import RetainerTiers from "@/src/components/pages/servicios/RetainerTiers";

type PageProps = { params: Promise<{ locale: string }> };

// Las vistas previas del índice usan portadas de WordPress.
export const revalidate = 3600;

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
  const projects = await fetchProjects(locale);
  const labels = { investment: dict.common.investment, investmentOnCall: dict.common.investmentOnCall };

  return (
    <>
      <ServicesHero
        title={dict.services.title}
        intro={dict.services.intro}
        count={serviceSlugs.length}
        countLabel={dict.services.disciplinesLabel}
        nav={[
          { label: dict.services.disciplinesLabel, href: "#disciplinas" },
          { label: dict.services.packages.title, href: "#paquetes" },
          { label: dict.services.retainer.title, href: "#continuidad" },
        ]}
      />

      <section id="disciplinas" className="container-site scroll-mt-24 pb-24 md:pb-36">
        <ServicesIndex locale={locale} dict={dict} headingLevel="h2" projects={projects} />
      </section>

      {/* <Packages
        id="paquetes"
        title={dict.services.packages.title}
        intro={dict.services.packages.intro}
        items={dict.services.packages.items}
        labels={labels}
      />

      <RetainerTiers
        id="continuidad"
        title={dict.services.retainer.title}
        intro={dict.services.retainer.intro}
        cadence={dict.services.perMonth}
        items={dict.services.retainer.items}
        labels={labels}
      /> */}

      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: localizePath(locale, "contacto") }}
      />
    </>
  );
}
