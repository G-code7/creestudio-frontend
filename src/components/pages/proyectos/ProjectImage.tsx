import Image from "next/image";

/** Rellenos sólidos de la paleta mientras no haya imagen real. */
const FILLS = ["bg-slate", "bg-brand-dark", "bg-slate-soft", "bg-ink"];

type ProjectImageProps = {
  src: string;
  alt: string;
  ratio: string;
  sizes: string;
  index?: number;
  priority?: boolean;
};

export default function ProjectImage({
  src,
  alt,
  ratio,
  sizes,
  index = 0,
  priority = false,
}: ProjectImageProps) {
  if (!src) {
    return (
      <div
        aria-hidden
        className={`rounded-xl ${FILLS[index % FILLS.length]}`}
        style={{ aspectRatio: ratio }}
      />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-mist" style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
