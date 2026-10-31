import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locales } from "@/src/content/config";
import { getDictionary } from "@/src/content";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import { fetchProjectBySlug, fetchProjectSlugs } from "@/src/lib/projects-wp";
import CtaBand from "@/src/components/ui/CtaBand";
import ProjectGallery from "@/src/components/work/ProjectGallery";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

// Los proyectos nuevos publicados en WordPress aparecen sin redesplegar.
export const dynamicParams = true;
export const revalidate = 3600; // revalida cada hora

export async function generateStaticParams() {
  const slugs = await fetchProjectSlugs();
  return locales.flatMap((locale) => slugs.map((s) => ({ locale, slug: s.slug })));
}

async function resolve(params: PageProps["params"]) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug, locale);
  if (!project) notFound();
  return { locale, project, dict: getDictionary(locale) };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug, locale);
  const dict = getDictionary(locale);
  if (!project) {
    return pageMetadata({ locale, path: `proyectos/${slug}`, title: dict.work.title, description: dict.work.metaDescription });
  }

  const services = project.services.map((s) => dict.services.items[s]?.name).filter(Boolean).join(", ");
  return pageMetadata({
    locale,
    path: `proyectos/${project.slug}`,
    title: services ? `${project.title}: ${services}` : project.title,
    description: project.summary ?? dict.work.metaDescription,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, project, dict } = await resolve(params);

  const services = project.services.map((s) => dict.services.items[s]?.name).filter(Boolean).join(", ");
  const meta = [project.year ? String(project.year) : null, services].filter(Boolean).join(" · ");

  // Siguiente proyecto, en el orden del CMS.
  const all = await fetchProjectSlugs();
  const index = all.findIndex((p) => p.slug === project.slug);
  const next = all.length > 0 ? all[(index + 1) % all.length] : null;

  return (
    <>
      <header className="relative flex min-h-[80svh] items-end overflow-hidden">
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized={project.cover.src.endsWith(".gif")}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-slate" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
        <div className="container-site relative z-10 pb-16 md:pb-24">
          {meta ? <p className="font-sans text-sm text-paper/80 md:text-base">{meta}</p> : null}
          <h1 className="mt-3 max-w-4xl font-display text-5xl font-bold leading-[1.02] tracking-tight text-paper sm:text-6xl md:text-8xl">
            {project.title}
          </h1>
        </div>
      </header>

      {/* Body: izquierda información (sticky), derecha galería que se auto-organiza. */}
      <section className="container-site py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.8fr)] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            {project.summary ? (
              <p className="font-display text-xl font-medium leading-snug tracking-tight text-ink md:text-2xl">
                {project.summary}
              </p>
            ) : null}
            <dl className="mt-8 flex flex-col gap-5 border-t border-line pt-6">
              {services ? (
                <div>
                  <dt className="font-sans text-sm text-slate-soft">{dict.work.servicesLabel}</dt>
                  <dd className="mt-1 font-sans text-base text-ink">{services}</dd>
                </div>
              ) : null}
              {project.year ? (
                <div>
                  <dt className="font-sans text-sm text-slate-soft">{dict.work.yearLabel}</dt>
                  <dd className="mt-1 font-sans text-base text-ink">{project.year}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <div>
            {project.images.length > 0 ? (
              <ProjectGallery images={project.images} />
            ) : (
              <p className="font-sans text-sm text-slate-soft">
                {/* Sin imágenes en el cuerpo del proyecto todavía. */}
              </p>
            )}
          </div>
        </div>
      </section>

      {next ? (
        <nav aria-label={dict.work.next} className="container-site border-t border-line py-16 md:py-24">
          <p className="font-sans text-sm text-slate-soft">{dict.work.next}</p>
          <Link
            href={localizePath(locale, `proyectos/${next.slug}`)}
            className="mt-3 inline-block font-display text-4xl font-bold tracking-tight text-ink underline-offset-8 transition-colors hover:text-brand hover:underline md:text-6xl"
          >
            {next.title}
          </Link>
        </nav>
      ) : null}

      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: localizePath(locale, "contacto") }}
      />
    </>
  );
}