import Image from "next/image";
import Link from "next/link";
import type { ProjectCard } from "@/src/lib/projects-wp";

type PagerItem = { project: ProjectCard; href: string };

type ProjectPagerProps = {
  label: string;
  prev: PagerItem | null;
  next: PagerItem | null;
  labels: { prev: string; next: string };
};

/** Navegación entre proyectos: anterior a la izquierda, siguiente a la derecha. */
export default function ProjectPager({ label, prev, next, labels }: ProjectPagerProps) {
  if (!prev && !next) return null;

  return (
    <nav aria-label={label} className="bg-mist">
      <div className="grid md:grid-cols-2">
        {prev ? <PagerLink item={prev} label={labels.prev} direction="prev" /> : <div aria-hidden className="hidden md:block" />}
        {next ? <PagerLink item={next} label={labels.next} direction="next" /> : null}
      </div>
    </nav>
  );
}

function PagerLink({ item, label, direction }: { item: PagerItem; label: string; direction: "prev" | "next" }) {
  const isNext = direction === "next";
  const { project } = item;

  return (
    <Link
      href={item.href}
      rel={direction}
      className={`group flex items-center gap-5 px-6 py-10 transition-colors duration-300 hover:bg-cree/10 md:gap-7 md:px-10 md:py-14 ${
        isNext ? "flex-row-reverse text-right md:border-l md:border-line" : "border-b border-line md:border-b-0"
      }`}
    >
      <div className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-sm bg-line md:w-36">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(min-width: 768px) 144px, 96px"
            unoptimized={project.cover.endsWith(".gif")}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : null}
      </div>

      <div className="min-w-0">
        <p className={`flex items-center gap-2 ${isNext ? "justify-end" : ""} font-sans text-xs font-medium uppercase tracking-[0.14em] text-brand-ink md:text-sm`}>
          <span
            aria-hidden
            className={`inline-block transition-transform duration-300 ${
              isNext ? "order-last group-hover:translate-x-1" : "group-hover:-translate-x-1"
            }`}
          >
            {isNext ? "→" : "←"}
          </span>
          <span>{label}</span>
        </p>
        <p className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:text-brand-ink md:text-3xl">
          {project.title}
        </p>
      </div>
    </Link>
  );
}
