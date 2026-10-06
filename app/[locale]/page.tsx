import type { Metadata } from "next";
import { getDictionary } from "@/src/content";
import { featuredProjects, projects } from "@/src/data/projects";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import Hero from "@/src/components/home/Hero";
import Stakes from "@/src/components/home/Stakes";
import Process from "@/src/components/home/Process";
import AfterLaunch from "@/src/components/home/AfterLaunch";
import ServicesIndex from "@/src/components/services/ServicesIndex";
import WorkGrid from "@/src/components/work/WorkGrid";
import CtaBand from "@/src/components/ui/CtaBand";
import Link from "next/link";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "",
    title: dict.meta.title,
    description: dict.meta.description,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const contactHref = localizePath(locale, "contacto");

  return (
    <>
      <Hero
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        primary={{ label: dict.common.bookCall, href: contactHref }}
        secondary={{ label: dict.common.seeWork, href: localizePath(locale, "proyectos") }}
        projects={projects}
      />

      <Stakes title={dict.home.stakes.title} items={dict.home.stakes.items} />

      <section className="container-site py-24 md:py-32">
        <h2 className="mb-12 font-display text-3xl font-bold tracking-tight text-ink md:mb-16 md:text-5xl">
          {dict.home.services.title}
        </h2>
        <ServicesIndex locale={locale} dict={dict} />
      </section>

      <section className="container-site py-24 md:py-32">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 md:mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            {dict.home.work.title}
          </h2>
          <Link
            href={localizePath(locale, "proyectos")}
            className="font-sans text-base font-medium text-brand underline decoration-brand/40 underline-offset-[6px] transition-colors hover:decoration-brand"
          >
            {dict.home.work.all}
          </Link>
        </div>
        <WorkGrid projects={featuredProjects.slice(0, 4)} locale={locale} dict={dict} />
      </section>

      <Process
        title={dict.home.process.title}
        intro={dict.home.process.intro}
        steps={dict.home.process.steps}
      />

      <AfterLaunch
        title={dict.home.afterLaunch.title}
        text={dict.home.afterLaunch.text}
        link={{ label: dict.home.afterLaunch.link, href: `${localizePath(locale, "servicios")}#continuidad` }}
      />

      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: contactHref }}
      />
    </>
  );
}
