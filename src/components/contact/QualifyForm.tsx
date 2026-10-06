"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import type { Locale } from "@/src/content/config";
import type { FormCopy } from "@/src/content/types";
import {
  budgetOptions,
  channelOptions,
  isEmail,
  lowBudget,
  needOptions,
  stageOptions,
  timingOptions,
  type Budget,
  type Channel,
  type NeedOption,
  type Stage,
  type Timing,
} from "@/src/lib/lead";
import { buttonBase, buttonSizes, buttonVariants } from "@/src/components/ui/Button";

const STEPS = ["project", "moment", "budget", "timing", "contact"] as const;
type StepKey = (typeof STEPS)[number];

type Values = {
  company: string;
  needs: NeedOption[];
  stage: Stage | "";
  stakes: string;
  budget: Budget | "";
  timing: Timing | "";
  name: string;
  email: string;
  channel: Channel | "";
  phone: string;
  consent: boolean;
  /** Honeypot: los humanos no lo ven; si llega relleno es un bot. */
  website: string;
};

type Field = Exclude<keyof Values, "website">;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent";

type QualifyFormProps = {
  copy: FormCopy;
  locale: Locale;
  privacyHref: string;
  /** Servicio preseleccionado desde ?servicio=slug */
  preselect?: NeedOption;
};

const inputClass =
  "mt-2 block w-full rounded-xl border border-line bg-paper px-4 py-3.5 font-sans text-base text-ink " +
  "transition-colors placeholder:text-slate-soft hover:border-slate-soft focus:border-ink focus:outline-none " +
  "aria-[invalid=true]:border-red-700";

export default function QualifyForm({ copy, locale, privacyHref, preselect }: QualifyFormProps) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Values>({
    company: "",
    needs: preselect ? [preselect] : [],
    stage: "",
    stakes: "",
    budget: "",
    timing: "",
    name: "",
    email: "",
    channel: "",
    phone: "",
    consent: false,
    website: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");

  const uid = useId();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);

  // Al cambiar de paso, el foco va al título del paso (lectores de pantalla y teclado).
  useEffect(() => {
    if (!hasNavigated.current) return;
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  const current: StepKey = STEPS[step];
  const isLast = step === STEPS.length - 1;

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleNeed(need: NeedOption) {
    set(
      "needs",
      values.needs.includes(need) ? values.needs.filter((n) => n !== need) : [...values.needs, need]
    );
  }

  function validate(key: StepKey): Errors {
    const e: Errors = {};
    const { errors: msg } = copy;
    if (key === "project") {
      if (!values.company.trim()) e.company = msg.required;
      if (values.needs.length === 0) e.needs = msg.needs;
    }
    if (key === "moment") {
      if (!values.stage) e.stage = msg.required;
      if (values.stakes.trim().length < 12) e.stakes = msg.stakes;
    }
    if (key === "budget" && !values.budget) e.budget = msg.required;
    if (key === "timing" && !values.timing) e.timing = msg.required;
    if (key === "contact") {
      if (!values.name.trim()) e.name = msg.required;
      if (!isEmail(values.email)) e.email = msg.email;
      if (!values.channel) e.channel = msg.required;
      if (values.channel === "whatsapp" && values.phone.replace(/\D/g, "").length < 6) e.phone = msg.phone;
      if (!values.consent) e.consent = msg.consent;
    }
    return e;
  }

  function goTo(next: number) {
    hasNavigated.current = true;
    setSubmitError("");
    setStep(next);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(current);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Lleva el foco al primer campo con error.
      const first = Object.keys(found)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (!isLast) {
      goTo(step + 1);
      return;
    }

    setStatus("sending");
    setSubmitError("");
    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!res.ok) throw new Error("server");
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setSubmitError(err instanceof TypeError ? copy.errors.network : copy.errors.server);
    }
  }

  if (status === "sent") {
    return (
      <div className="max-w-2xl animate-step-in py-6">
        <h2
          ref={successRef}
          tabIndex={-1}
          className="font-display text-3xl font-bold tracking-tight text-ink focus:outline-none md:text-4xl"
        >
          {copy.success.title}
        </h2>
        <p className="mt-4 font-sans text-lg leading-relaxed text-slate">{copy.success.text}</p>
      </div>
    );
  }

  const stepTitle = copy[current].title;
  const id = (field: Field) => `${uid}-${field}`;

  return (
    <form noValidate onSubmit={onSubmit} className="max-w-2xl">
      <p className="font-sans text-sm tabular-nums text-slate-soft" aria-live="polite">
        {copy.stepOf.replace("{current}", String(step + 1)).replace("{total}", String(STEPS.length))}
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 font-display text-3xl font-bold tracking-tight text-ink focus:outline-none md:text-4xl"
      >
        {stepTitle}
      </h2>

      <div key={current} className="mt-10 flex animate-step-in flex-col gap-8">
        {current === "project" && (
          <>
            <TextField
              id={id("company")}
              label={copy.project.companyLabel}
              value={values.company}
              error={errors.company}
              autoComplete="organization"
              onChange={(v) => set("company", v)}
            />
            <ChoiceGroup
              id={id("needs")}
              type="checkbox"
              legend={copy.project.needsLabel}
              error={errors.needs}
              options={needOptions.map((n) => ({ value: n, label: copy.project.needs[n] }))}
              isChecked={(v) => values.needs.includes(v as NeedOption)}
              onToggle={(v) => toggleNeed(v as NeedOption)}
            />
          </>
        )}

        {current === "moment" && (
          <>
            <ChoiceGroup
              id={id("stage")}
              type="radio"
              legend={copy.moment.stageLabel}
              error={errors.stage}
              options={stageOptions.map((s) => ({ value: s, label: copy.moment.stages[s] }))}
              isChecked={(v) => values.stage === v}
              onToggle={(v) => set("stage", v as Stage)}
              columns={1}
            />
            <div>
              <label htmlFor={id("stakes")} className="font-sans text-base font-medium text-ink">
                {copy.moment.stakesLabel}
              </label>
              <p id={`${id("stakes")}-hint`} className="mt-1 font-sans text-sm text-slate-soft">
                {copy.moment.stakesHint}
              </p>
              <textarea
                id={id("stakes")}
                rows={4}
                value={values.stakes}
                onChange={(e) => set("stakes", e.target.value)}
                aria-invalid={errors.stakes ? true : undefined}
                aria-describedby={`${id("stakes")}-hint${errors.stakes ? ` ${id("stakes")}-error` : ""}`}
                className={`${inputClass} resize-y`}
              />
              <FieldError id={`${id("stakes")}-error`} message={errors.stakes} />
            </div>
          </>
        )}

        {current === "budget" && (
          <>
            <ChoiceGroup
              id={id("budget")}
              type="radio"
              legend={copy.budget.label}
              error={errors.budget}
              options={budgetOptions.map((b) => ({ value: b, label: copy.budget.options[b] }))}
              isChecked={(v) => values.budget === v}
              onToggle={(v) => set("budget", v as Budget)}
            />
            <div aria-live="polite">
              {values.budget === lowBudget ? (
                <p className="rounded-xl bg-mist px-5 py-4 font-sans text-base leading-relaxed text-slate">
                  {copy.budget.lowMessage}
                </p>
              ) : null}
            </div>
          </>
        )}

        {current === "timing" && (
          <ChoiceGroup
            id={id("timing")}
            type="radio"
            legend={copy.timing.label}
            error={errors.timing}
            options={timingOptions.map((t) => ({ value: t, label: copy.timing.options[t] }))}
            isChecked={(v) => values.timing === v}
            onToggle={(v) => set("timing", v as Timing)}
          />
        )}

        {current === "contact" && (
          <>
            <TextField
              id={id("name")}
              label={copy.contact.nameLabel}
              value={values.name}
              error={errors.name}
              autoComplete="name"
              onChange={(v) => set("name", v)}
            />
            <TextField
              id={id("email")}
              type="email"
              label={copy.contact.emailLabel}
              value={values.email}
              error={errors.email}
              autoComplete="email"
              onChange={(v) => set("email", v)}
            />
            <ChoiceGroup
              id={id("channel")}
              type="radio"
              legend={copy.contact.channelLabel}
              error={errors.channel}
              options={channelOptions.map((c) => ({ value: c, label: copy.contact.channels[c] }))}
              isChecked={(v) => values.channel === v}
              onToggle={(v) => set("channel", v as Channel)}
              columns={3}
            />
            {values.channel === "whatsapp" ? (
              <TextField
                id={id("phone")}
                type="tel"
                label={copy.contact.phoneLabel}
                value={values.phone}
                error={errors.phone}
                autoComplete="tel"
                onChange={(v) => set("phone", v)}
              />
            ) : null}
            <div>
              <label className="flex items-start gap-3 font-sans text-base leading-relaxed text-slate">
                <input
                  id={id("consent")}
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
                  className="mt-1 size-5 shrink-0 accent-ink"
                />
                <span>
                  {copy.contact.consentBefore}
                  <Link
                    href={privacyHref}
                    target="_blank"
                    className="text-ink underline underline-offset-4 hover:text-brand"
                  >
                    {copy.contact.consentLink}
                  </Link>
                  {copy.contact.consentAfter}
                </span>
              </label>
              <FieldError id={`${id("consent")}-error`} message={errors.consent} />
            </div>
          </>
        )}
      </div>

      {/* Honeypot fuera de la vista y del orden de tabulación */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </label>
      </div>

      <div aria-live="assertive">
        {submitError ? (
          <p role="alert" className="mt-8 font-sans text-base text-red-700">
            {submitError}
          </p>
        ) : null}
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={status === "sending"}
            className={`${buttonBase} ${buttonVariants.ghost} ${buttonSizes.md}`}
          >
            {copy.back}
          </button>
        ) : null}
        <button
          type="submit"
          disabled={status === "sending"}
          aria-busy={status === "sending" || undefined}
          className={`${buttonBase} ${buttonVariants.primary} ${buttonSizes.md}`}
        >
          {isLast ? (status === "sending" ? copy.sending : copy.submit) : copy.next}
        </button>
      </div>
    </form>
  );
}

/* ─── Campos ─────────────────────────────────────────────────── */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 font-sans text-sm text-red-700">
      {message}
    </p>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  error?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  onChange: (value: string) => void;
};

function TextField({ id, label, value, error, type = "text", autoComplete, onChange }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="font-sans text-base font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={inputClass}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

type ChoiceGroupProps = {
  id: string;
  type: "radio" | "checkbox";
  legend: ReactNode;
  options: { value: string; label: string }[];
  error?: string;
  columns?: 1 | 2 | 3;
  isChecked: (value: string) => boolean;
  onToggle: (value: string) => void;
};

const COLS: Record<1 | 2 | 3, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
};

function ChoiceGroup({ id, type, legend, options, error, columns = 2, isChecked, onToggle }: ChoiceGroupProps) {
  return (
    <fieldset aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="font-sans text-base font-medium text-ink">{legend}</legend>
      <div className={`mt-3 grid gap-3 ${COLS[columns]}`}>
        {options.map((option, i) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-line px-4 py-3.5 font-sans text-base text-slate transition-colors hover:border-slate-soft has-checked:border-ink has-checked:bg-mist has-checked:text-ink has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
          >
            <input
              id={i === 0 ? id : undefined}
              type={type}
              name={id}
              value={option.value}
              checked={isChecked(option.value)}
              onChange={() => onToggle(option.value)}
              className="size-4 shrink-0 accent-ink focus:outline-none"
            />
            {option.label}
          </label>
        ))}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}
