"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/src/content/config";
import LocaleSwitcher from "./LocaleSwitcher";

type NavItem = { href: string; label: string };

type MobileMenuProps = {
  locale: Locale;
  links: NavItem[];
  contact: NavItem;
  labels: { open: string; close: string; nav: string; language: string };
};

export default function MobileMenu({ locale, links, contact, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="relative z-10 rounded-full border border-ink/25 px-4 py-2 font-sans text-sm font-medium text-ink"
      >
        {open ? labels.close : labels.open}
      </button>

      <div
        id={panelId}
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 bg-paper px-6 pt-28 pb-10"
      >
        <nav aria-label={labels.nav} className="flex h-full flex-col">
          <ul className="flex flex-col gap-2">
            {[...links, contact].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block py-2 font-display text-4xl font-bold tracking-tight text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <LocaleSwitcher locale={locale} label={labels.language} />
          </div>
        </nav>
      </div>
    </div>
  );
}
