import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isServiceSlug, locales, serviceSlugs } from "@/src/content/config";
import { getDictionary } from "@/src/content";
import { projects } from "@/src/data/projects";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import Button from "@/src/components/ui/Button";
import CtaBand from "@/src/components/ui/CtaBand";
import WorkGrid from "@/src/components/work/WorkGrid";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

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
  const related = projects.filter((p) => p.services.includes(slug)).slice(0, 4);

  return (
    <>
      <header className="container-site pt-36 pb-16 md:pt-44 md:pb-24">
        <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-ink sm:text-6xl md:text-8xl">
          {service.name}
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-slate md:text-xl">{service.short}</p>
      </header>

      <section className="container-site grid gap-x-8 gap-y-16 border-t border-ink py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <h2 className="font-sans text-sm font-medium text-slate-soft">{dict.services.problemLabel}</h2>
          <blockquote className="mt-4 font-display text-2xl font-semibold leading-snug tracking-tight text-ink md:text-3xl">
            “{service.problem}”
          </blockquote>
        </div>

        <div className="grid gap-12 md:col-span-6 md:col-start-7">
          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-ink">{dict.services.includesLabel}</h2>
            <ul className="mt-4 flex flex-col gap-2.5 font-sans text-base leading-relaxed text-slate">
              {service.includes.map((item) => (
                <li key={item} className="pl-4 [text-indent:-1rem] before:mr-2 before:text-brand before:content-['+']">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-ink">{dict.services.excludesLabel}</h2>
            <ul className="mt-4 flex flex-col gap-2.5 font-sans text-base leading-relaxed text-slate-soft">
              {service.excludes.map((item) => (
                <li key={item} className="pl-4 [text-indent:-1rem] before:mr-2 before:content-['-']">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-xl font-bold tracking-tight text-ink">{dict.services.outcomeLabel}</h2>
            <p className="mt-4 font-sans text-lg leading-relaxed text-ink">{service.outcome}</p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6 rounded-xl bg-mist p-6 md:p-8">
            <div>
              <p className="font-sans text-sm text-slate-soft">{dict.common.investment}</p>
              <p className="mt-1 font-display text-lg font-semibold text-ink">
                {service.investment ?? dict.common.investmentOnCall}
              </p>
            </div>
            <Button href={contactHref}>{dict.common.bookCall}</Button>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="container-site py-24 md:py-32">
          <h2 className="mb-12 font-display text-3xl font-bold tracking-tight text-ink md:mb-16 md:text-4xl">
            {dict.services.relatedWork}
          </h2>
          <WorkGrid projects={related} locale={locale} dict={dict} />
        </section>
      ) : null}

      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: contactHref }}
      />
    </>
  );
}
