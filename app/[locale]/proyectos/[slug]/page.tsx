import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/src/content/config";
import { getDictionary } from "@/src/content";
import { getProject, projects } from "@/src/data/projects";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import CtaBand from "@/src/components/ui/CtaBand";
import ProjectImage from "@/src/components/work/ProjectImage";

/* Preview básico del caso. La plantilla completa se diseñará aparte. */

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

async function resolve(params: PageProps["params"]) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return { locale, project, dict: getDictionary(locale) };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, project, dict } = await resolve(params);
  const services = project.services.map((s) => dict.services.items[s].name).join(", ");
  return pageMetadata({
    locale,
    path: `proyectos/${project.slug}`,
    title: `${project.title}: ${services}`,
    description: project.summary?.[locale] ?? dict.work.metaDescription,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, project, dict } = await resolve(params);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const services = project.services.map((s) => dict.services.items[s].name).join(", ");

  const facts = [
    { label: dict.work.servicesLabel, value: services },
    project.year ? { label: dict.work.yearLabel, value: String(project.year) } : null,
    project.location ? { label: dict.work.locationLabel, value: project.location } : null,
  ].filter((f): f is { label: string; value: string } => f !== null);

  return (
    <>
      <header className="container-site pt-36 pb-12 md:pt-44 md:pb-16">
        <h1 className="font-display text-5xl font-bold leading-none tracking-tight text-ink sm:text-6xl md:text-8xl">
          {project.title}
        </h1>
        {project.summary ? (
          <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-slate md:text-xl">
            {project.summary[locale]}
          </p>
        ) : null}
        <dl className="mt-10 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-sans text-sm text-slate-soft">{fact.label}</dt>
              <dd className="mt-1 font-sans text-base text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="container-site pb-24 md:pb-32">
        <ProjectImage
          src={project.cover}
          alt={`${project.title}: ${services}`}
          ratio="16 / 9"
          sizes="(min-width: 1200px) 1152px, 100vw"
          index={index}
          priority
        />
      </div>

      <nav aria-label={dict.work.next} className="container-site border-t border-line py-16 md:py-24">
        <p className="font-sans text-sm text-slate-soft">{dict.work.next}</p>
        <Link
          href={localizePath(locale, `proyectos/${next.slug}`)}
          className="mt-3 inline-block font-display text-4xl font-bold tracking-tight text-ink underline-offset-8 transition-colors hover:text-brand hover:underline md:text-6xl"
        >
          {next.title}
        </Link>
      </nav>

      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: localizePath(locale, "contacto") }}
      />
    </>
  );
}
