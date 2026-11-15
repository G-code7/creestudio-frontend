import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { locales } from "@/src/content/config";
import { getDictionary } from "@/src/content";
import { localizePath, resolveLocale } from "@/src/lib/i18n";
import { pageMetadata } from "@/src/lib/seo";
import { fetchPostBySlug, fetchPosts } from "@/src/lib/blog-wp";
import { formatDate, readingLabel, toBlogItem } from "@/src/components/pages/blog/format";
import PostHeader from "@/src/components/pages/blog/PostHeader";
import CtaBand from "@/src/components/ui/CtaBand";
import RevealHeading from "@/src/components/ui/RevealHeading";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export const revalidate = 3600;
// Las entradas nuevas se generan al primer acceso.
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

async function resolve(params: PageProps["params"]) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();
  return { locale, post, dict: getDictionary(locale) };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, post } = await resolve(params);
  return pageMetadata({
    locale,
    path: `blog/${post.slug}`,
    title: post.title,
    description: post.excerpt.slice(0, 160),
    image: post.cover?.src,
    type: "article",
  });
}

export default async function PostPage({ params }: PageProps) {
  const { locale, post, dict } = await resolve(params);
  // Por ahora los artículos se escriben en español.
  const translated = locale === "es";
  const others = (await fetchPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map((p) => toBlogItem(p, locale, dict));

  return (
    <>
      <PostHeader
        title={post.title}
        back={{ label: dict.blog.back, href: localizePath(locale, "blog") }}
        category={post.categories[0]?.name}
        date={formatDate(post.date, locale)}
        dateTime={post.date}
        reading={readingLabel(post.readingTime, dict)}
        cover={post.cover}
        note={translated ? undefined : dict.blog.langNote || undefined}
      />

      <article data-article className="container-site py-16 md:py-24">
        <div
          lang={translated ? undefined : "es"}
          className="wp-content mx-auto max-w-2xl"
          // HTML de nuestro propio WordPress (contenido editorial de confianza).
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {others.length > 0 ? (
        <section className="container-site border-t border-line py-20 md:py-28">
          <RevealHeading
            text={dict.blog.more}
            className="mb-10 font-display text-3xl font-bold tracking-tight text-ink md:mb-14 md:text-5xl"
          />
          <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={p.href} className="group block border-t border-ink pt-5">
                  <p className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-slate-soft">
                    {p.date} · {p.reading}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand-ink">
                    {p.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <CtaBand
        title={dict.home.cta.title}
        text={dict.home.cta.text}
        cta={{ label: dict.common.bookCall, href: localizePath(locale, "contacto") }}
      />
    </>
  );
}
