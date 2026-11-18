import type { Metadata } from "next";
import { getDictionary } from "@/src/content";
import { toServiceSlugs } from "@/src/content/config";
import { resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import { site, whatsappHref } from "@/src/lib/site";
import PageHeader from "@/src/components/ui/PageHeader";
import ContactOptions from "@/src/components/pages/contacto/ContactOptions";

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

export default async function ContactPage({ params, searchParams }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const { servicio } = await searchParams;

  // Si llegan desde un servicio (?servicio=branding), el mensaje de WhatsApp ya lo menciona.
  const [slug] = toServiceSlugs([Array.isArray(servicio) ? servicio[0] : (servicio ?? "")]);
  const message = slug
    ? dict.contact.whatsapp.messageService.replace("{service}", dict.services.items[slug].name)
    : dict.contact.whatsapp.message;

  return (
    <>
      <PageHeader title={dict.contact.title} intro={dict.contact.intro} />
      <ContactOptions copy={dict.contact} bookingHref={site.booking} whatsappHref={whatsappHref(message)} />
    </>
  );
}
