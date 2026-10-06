import type { Metadata } from "next";
import { getDictionary } from "@/src/content";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { needOptions, type NeedOption } from "@/src/lib/lead";
import { pageMetadata } from "@/src/lib/seo";
import PageHeader from "@/src/components/ui/PageHeader";
import QualifyForm from "@/src/components/contact/QualifyForm";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ servicio?: string | string[] }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "contacto",
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
  });
}

function toNeed(value: string | string[] | undefined): NeedOption | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  return v && (needOptions as readonly string[]).includes(v) ? (v as NeedOption) : undefined;
}

export default async function ContactPage({ params, searchParams }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const { servicio } = await searchParams;

  return (
    <>
      <PageHeader title={dict.contact.title} intro={dict.contact.intro} />
      <section className="container-site pb-28 md:pb-40">
        <div className="border-t border-ink pt-12 md:pt-16">
          <QualifyForm
            copy={dict.contact.form}
            locale={locale}
            privacyHref={localizePath(locale, "privacidad")}
            preselect={toNeed(servicio)}
          />
        </div>
      </section>
    </>
  );
}
