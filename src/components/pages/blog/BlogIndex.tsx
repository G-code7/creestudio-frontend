"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP } from "@/src/lib/gsap";
import Words from "@/src/components/ui/Words";
import Button from "@/src/components/ui/Button";

export type BlogItem = {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  /** Fecha ya formateada en el servidor (evita diferencias de zona horaria al hidratar). */
  date: string;
  dateTime: string;
  reading: string;
  cover?: { src: string; width: number; height: number; alt: string };
  categories: { slug: string; name: string }[];
};

type BlogIndexProps = {
  title: string;
  intro: string;
  allLabel: string;
  posts: BlogItem[];
  empty: { title: string; text: string; cta: { label: string; href: string } };
};

const isGif = (src: string) => /\.gif(\?.*)?$/i.test(src);

/** Fecha · lectura · categoría, en una línea. */
function Meta({ post }: { post: BlogItem }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs font-medium uppercase tracking-[0.14em] text-slate-soft">
      {post.categories[0] ? <span className="text-brand-ink">{post.categories[0].name}</span> : null}
      <time dateTime={post.dateTime}>{post.date}</time>
      <span aria-hidden>·</span>
      <span>{post.reading}</span>
    </p>
  );
}

function Cover({ post, sizes, ratio }: { post: BlogItem; sizes: string; ratio: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-mist ${ratio}`}>
      {post.cover ? (
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          sizes={sizes}
          quality={90}
          unoptimized={isGif(post.cover.src)}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        // Sin imagen: un bloque de marca en lugar de un hueco gris.
        <div className="absolute inset-0 grid place-items-center bg-cree/25">
          <span className="font-display text-5xl font-bold text-brand-ink/40">Cree</span>
        </div>
      )}
    </div>
  );
}

/** Título con subrayado lavanda que se dibuja al pasar el cursor por la tarjeta. */
const titleUnderline =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]";

/*
 * Índice del blog: cabecera grande, filtro por categoría, el artículo más
 * reciente destacado y el resto en rejilla. Las tarjetas suben al entrar en
 * pantalla y al cambiar de filtro.
 */
export default function BlogIndex({ title, intro, allLabel, posts, empty }: BlogIndexProps) {
  const root = useRef<HTMLDivElement>(null);
  const [category, setCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    posts.forEach((p) => p.categories.forEach((c) => map.set(c.slug, c.name)));
    return [...map].map(([slug, name]) => ({ slug, name }));
  }, [posts]);

  const visible = category ? posts.filter((p) => p.categories.some((c) => c.slug === category)) : posts;
  const [featured, ...rest] = visible;

  // Cabecera: una sola vez.
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(q("[data-word] > span"), { yPercent: 110, duration: 1.1, ease: "power4.out", stagger: 0.06 });
        gsap.from(q("[data-fade]"), { y: 20, autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, delay: 0.3 });
      });
    },
    { scope: root }
  );

  // Tarjetas: suben al entrar en pantalla. Se rehace al cambiar el filtro.
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(q("[data-card]"), { autoAlpha: 0, y: 40 });
        ScrollTrigger.batch(q("[data-card]"), {
          start: "top 92%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.1 }),
        });
      });
    },
    { scope: root, dependencies: [category], revertOnUpdate: true }
  );

  return (
    <div ref={root}>
      <header className="container-site grid gap-8 pt-36 pb-12 md:grid-cols-12 md:items-end md:pt-48 md:pb-16">
        <h1 className="font-display text-7xl font-bold leading-[0.95] tracking-tight text-ink md:col-span-7 md:text-[9rem]">
          <Words text={title} />
        </h1>
        <p data-fade className="max-w-md font-sans text-lg leading-relaxed text-slate md:col-span-5 md:pb-4 md:text-xl">
          {intro}
        </p>
      </header>

      {posts.length === 0 ? (
        <section className="container-site pb-28 md:pb-36">
          <div data-fade className="rounded-[2rem] bg-mist px-6 py-16 md:px-14 md:py-24">
            <p className="font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">{empty.title}</p>
            <p className="mt-4 max-w-lg font-sans text-lg leading-relaxed text-slate">{empty.text}</p>
            <div className="mt-8">
              <Button href={empty.cta.href}>{empty.cta.label}</Button>
            </div>
          </div>
        </section>
      ) : (
        <>
          {categories.length > 1 ? (
            <div data-fade className="container-site flex flex-wrap gap-2 pb-12 md:pb-16" role="group" aria-label={title}>
              {[{ slug: null as string | null, name: allLabel }, ...categories].map((c) => (
                <button
                  key={c.slug ?? "all"}
                  type="button"
                  aria-pressed={category === c.slug}
                  onClick={() => setCategory(c.slug)}
                  className="rounded-full border border-ink/15 px-4 py-2 font-sans text-sm font-medium text-ink transition-colors hover:border-ink aria-pressed:border-brand-ink aria-pressed:bg-brand-ink aria-pressed:text-paper"
                >
                  {c.name}
                </button>
              ))}
            </div>
          ) : null}

          <section className="container-site border-t border-ink pt-12 pb-28 md:pt-16 md:pb-36">
            {featured ? (
              <Link
                key={featured.slug}
                href={featured.href}
                data-card
                className="group grid items-center gap-8 md:grid-cols-12 md:gap-12"
              >
                <div className="md:col-span-7">
                  <Cover post={featured} sizes="(min-width: 768px) 60vw, 100vw" ratio="aspect-[16/10]" />
                </div>
                <div className="md:col-span-5">
                  <Meta post={featured} />
                  <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl">
                    <span className={titleUnderline}>{featured.title}</span>
                  </h2>
                  <p className="mt-5 line-clamp-4 font-sans text-lg leading-relaxed text-slate">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-brand-ink">
                    {featured.reading}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ) : null}

            {rest.length > 0 ? (
              <ul className="mt-20 grid gap-x-8 gap-y-16 md:mt-28 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={post.slug} data-card>
                    <Link href={post.href} className="group block">
                      <Cover post={post} sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" ratio="aspect-[4/3]" />
                      <div className="mt-5">
                        <Meta post={post} />
                        <h3 className="mt-3 font-display text-2xl font-bold leading-snug tracking-tight text-ink">
                          <span className={titleUnderline}>{post.title}</span>
                        </h3>
                        <p className="mt-3 line-clamp-2 font-sans text-base leading-relaxed text-slate">{post.excerpt}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        </>
      )}
    </div>
  );
}
