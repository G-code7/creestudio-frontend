import type { Metadata } from "next";
import { getDictionary } from "@/src/content";
import { projects } from "@/src/data/projects";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import PageHeader from "@/src/components/ui/PageHeader";
import CtaBand from "@/src/components/ui/CtaBand";
import WorkGrid from "@/src/components/work/WorkGrid";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "proyectos",
    title: dict.work.metaTitle,
    description: dict.work.metaDescription,
  });
}

export default async function WorkPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader title={dict.work.title} intro={dict.work.intro} />
      <section className="container-site pb-24 md:pb-36">
        <WorkGrid projects={projects} locale={locale} dict={dict} headingLevel="h2" />
      </section>
      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: localizePath(locale, "contacto") }}
      />
    </>
  );
}
