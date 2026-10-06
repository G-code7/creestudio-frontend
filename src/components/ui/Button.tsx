import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost";
type Size = "md" | "sm";

type ButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export const buttonBase =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-sans font-medium " +
  "transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50";

export const buttonVariants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-brand",
  ghost: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

export const buttonSizes: Record<Size, string> = {
  md: "px-7 py-3.5 text-sm",
  sm: "px-5 py-2.5 text-sm",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  children,
  ...rest
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
