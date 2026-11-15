import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isServiceSlug, locales, serviceSlugs } from "@/src/content/config";
import { getDictionary } from "@/src/content";
import { fetchProjects } from "@/src/lib/projects-wp";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import CtaBand from "@/src/components/ui/CtaBand";
import RevealHeading from "@/src/components/ui/RevealHeading";
import WorkGrid from "@/src/components/shared/WorkGrid";
import ServiceHero from "@/src/components/pages/servicios/detalle/ServiceHero";
import ServiceBody from "@/src/components/pages/servicios/detalle/ServiceBody";
import ServicePager from "@/src/components/pages/servicios/detalle/ServicePager";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
// "Proyectos con este servicio" viene de WordPress.
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.flatMap((locale) => serviceSlugs.map((slug) => ({ locale, slug })));
}

async function resolve(params: PageProps["params"]) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  if (!isServiceSlug(slug)) notFound();
  return { locale, slug, dict: getDictionary(locale) };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug, dict } = await resolve(params);
  const service = dict.services.items[slug];
  return pageMetadata({
    locale,
    path: `servicios/${slug}`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

export default async function ServicePage({ params }: PageProps) {
  const { locale, slug, dict } = await resolve(params);
  const service = dict.services.items[slug];
  const contactHref = `${localizePath(locale, "contacto")}?servicio=${slug}`;
  const related = (await fetchProjects(locale)).filter((p) => p.services.includes(slug)).slice(0, 4);

  // Posición y vecinos (navegación circular entre disciplinas).
  const index = serviceSlugs.indexOf(slug);
  const neighbour = (offset: number) => {
    const other = serviceSlugs[(index + offset + serviceSlugs.length) % serviceSlugs.length];
    const copy = dict.services.items[other];
    return { name: copy.name, short: copy.short, href: localizePath(locale, `servicios/${other}`) };
  };

  return (
    <>
      <ServiceHero
        slug={slug}
        name={service.name}
        short={service.short}
        index={index + 1}
        total={serviceSlugs.length}
        back={{ label: dict.services.title, href: localizePath(locale, "servicios") }}
        boxLabels={dict.services.box}
      />

      <ServiceBody
        problem={service.problem}
        includes={service.includes}
        excludes={service.excludes}
        outcome={service.outcome}
        investment={service.investment ?? dict.common.investmentOnCall}
        labels={{
          problem: dict.services.problemLabel,
          includes: dict.services.includesLabel,
          excludes: dict.services.excludesLabel,
          outcome: dict.services.outcomeLabel,
          investment: dict.common.investment,
        }}
        cta={{ label: dict.common.bookCall, href: contactHref }}
      />

      {related.length > 0 ? (
        <section className="py-24 md:py-32">
          <RevealHeading
            text={dict.services.relatedWork}
            className="container-site mb-12 font-display text-3xl font-bold tracking-tight text-ink md:mb-16 md:text-5xl"
          />
          <WorkGrid projects={related} locale={locale} dict={dict} />
        </section>
      ) : null}

      <ServicePager
        label={dict.services.title}
        prev={neighbour(-1)}
        next={neighbour(1)}
        labels={{ prev: dict.services.prevService, next: dict.services.nextService }}
      />

      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: contactHref }}
      />
    </>
  );
}
