import type { Metadata } from "next";
import { getDictionary } from "@/src/content";
import { projects as heroProjects } from "@/src/data/projects";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import { fetchProjects } from "@/src/lib/projects-wp";
import Hero from "@/src/components/home/Hero";
import WhyCree from "@/src/components/home/WhyCree";
import HowWeWork from "@/src/components/home/HowWeWork";
import AfterLaunch from "@/src/components/home/AfterLaunch";
import ServicesIndex from "@/src/components/shared/ServicesIndex";
import FeaturedProjectsSection from "@/src/components/home/FeaturedProjectsSection";
import CtaBand from "@/src/components/ui/CtaBand";
import RevealHeading from "@/src/components/ui/RevealHeading";

type PageProps = { params: Promise<{ locale: string }> };

// Los destacados vienen de WordPress: se revalidan cada hora sin redesplegar.
export const revalidate = 86400;

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
  // Una sola petición: destacados para su sección y todos para las vistas previas de servicios.
  const projects = await fetchProjects(locale);
  const featured = projects.filter((p) => p.featured).slice(0, 5);

  return (
    <>
      {/* El mosaico del hero es el único que sigue leyendo src/data/projects.ts */}
      <Hero
        title={dict.hero.title}
        subtitle={dict.hero.subtitle}
        primary={{ label: dict.common.bookCall, href: contactHref }}
        secondary={{ label: dict.common.seeWork, href: localizePath(locale, "proyectos") }}
        projects={heroProjects}
      />

      <WhyCree
        eyebrow={dict.home.whyCree.eyebrow}
        title={dict.home.whyCree.title}
        items={dict.home.whyCree.items}
      />

      <section className="container-site py-24 md:py-32">
        <RevealHeading
          text={dict.home.services.title}
          className="mb-12 font-display text-3xl font-bold tracking-tight text-ink md:mb-16 md:text-5xl"
        />
        <ServicesIndex locale={locale} dict={dict} projects={projects} />
      </section>

      <FeaturedProjectsSection projects={featured} locale={locale} dict={dict} />

      {/* Process + ProcessPath (la línea curva) quedan guardados para las landings de servicios */}
      <HowWeWork
        title={dict.home.howWeWork.title}
        intro={dict.home.howWeWork.intro}
        steps={dict.home.howWeWork.steps}
      />

      {/* <AfterLaunch
        title={dict.home.afterLaunch.title}
        text={dict.home.afterLaunch.text}
        link={{ label: dict.home.afterLaunch.link, href: `${localizePath(locale, "servicios")}#continuidad` }}
      /> */}

      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: contactHref }}
      />
    </>
  );
}
