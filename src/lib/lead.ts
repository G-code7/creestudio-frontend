import { isLocale, serviceSlugs, type Locale } from "@/src/content/config";

/*
 * Opciones del formulario de calificación. Los valores son claves estables;
 * los textos visibles viven en src/content/{es,en}.ts.
 * Cliente y servidor validan contra estas mismas listas.
 */
export const needOptions = [...serviceSlugs, "otro"] as const;
export const stageOptions = ["nueva", "no-representa", "rebranding"] as const;
/** Rangos en USD. Ajusta claves y textos juntos si cambian los rangos. */
export const budgetOptions = [
  "lt-1500",
  "1500-4000",
  "4000-8000",
  "8000-15000",
  "gt-15000",
  "unknown",
] as const;
export const lowBudget: Budget = "lt-1500";
export const timingOptions = ["lt-1m", "1-3m", "3-6m", "flexible"] as const;
export const channelOptions = ["email", "whatsapp", "video"] as const;

export type NeedOption = (typeof needOptions)[number];
export type Stage = (typeof stageOptions)[number];
export type Budget = (typeof budgetOptions)[number];
export type Timing = (typeof timingOptions)[number];
export type Channel = (typeof channelOptions)[number];

export type Lead = {
  company: string;
  needs: NeedOption[];
  stage: Stage;
  stakes: string;
  budget: Budget;
  timing: Timing;
  name: string;
  email: string;
  channel: Channel;
  phone: string;
  locale: Locale;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

function oneOf<T extends readonly string[]>(
  list: T,
  value: unknown
): value is T[number] {
  return typeof value === "string" && (list as readonly string[]).includes(value);
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= max ? trimmed : null;
}

/** Valida el cuerpo recibido por la API. Devuelve null si algo no cuadra. */
export function parseLead(input: unknown): Lead | null {
  if (typeof input !== "object" || input === null) return null;
  const raw = input as Record<string, unknown>;

  const company = text(raw.company, 160);
  const stakes = text(raw.stakes, 3000);
  const name = text(raw.name, 160);
  const email = text(raw.email, 254);
  const phone = typeof raw.phone === "string" ? raw.phone.trim().slice(0, 40) : "";
  const needs = Array.isArray(raw.needs)
    ? raw.needs.filter((n): n is NeedOption => oneOf(needOptions, n))
    : [];

  if (!company || !stakes || !name || !email || !isEmail(email)) return null;
  if (needs.length === 0 || raw.consent !== true) return null;
  if (!oneOf(stageOptions, raw.stage)) return null;
  if (!oneOf(budgetOptions, raw.budget)) return null;
  if (!oneOf(timingOptions, raw.timing)) return null;
  if (!oneOf(channelOptions, raw.channel)) return null;
  if (raw.channel === "whatsapp" && phone.length < 6) return null;
  if (typeof raw.locale !== "string" || !isLocale(raw.locale)) return null;

  return {
    company,
    needs: Array.from(new Set(needs)),
    stage: raw.stage,
    stakes,
    budget: raw.budget,
    timing: raw.timing,
    name,
    email,
    channel: raw.channel,
    phone,
    locale: raw.locale,
  };
}
