import type { Metadata } from "next";
import { getDictionary } from "@/src/content";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import { fetchPosts } from "@/src/lib/blog-wp";
import { toBlogItem } from "@/src/components/pages/blog/format";
import BlogIndex from "@/src/components/pages/blog/BlogIndex";
import CtaBand from "@/src/components/ui/CtaBand";

type PageProps = { params: Promise<{ locale: string }> };

// Las entradas vienen de WordPress.
export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "blog", title: dict.blog.metaTitle, description: dict.blog.metaDescription });
}

export default async function BlogPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const posts = (await fetchPosts()).map((p) => toBlogItem(p, locale, dict));

  return (
    <>
      <BlogIndex
        title={dict.blog.title}
        intro={dict.blog.intro}
        allLabel={dict.blog.all}
        posts={posts}
        empty={{ ...dict.blog.empty, cta: { label: dict.common.seeWork, href: localizePath(locale, "proyectos") } }}
      />
      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: localizePath(locale, "contacto") }}
      />
    </>
  );
}
