import type { Metadata } from "next";
import { getDictionary } from "@/src/content";
import { resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import PageHeader from "@/src/components/ui/PageHeader";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "privacidad",
    title: dict.privacy.metaTitle,
    description: dict.privacy.metaDescription,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const { privacy } = getDictionary(locale);

  return (
    <>
      <PageHeader title={privacy.title} intro={privacy.updated} />
      <article className="container-site pb-28 md:pb-36">
        <div className="max-w-2xl">
          {privacy.sections.map((section) => (
            <section key={section.title} className="mt-12 first:mt-0">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-4 font-sans text-base leading-relaxed text-slate">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
