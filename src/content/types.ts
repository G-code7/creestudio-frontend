import type { ServiceSlug } from "./config";
import type { Budget, Channel, NeedOption, Stage, Timing } from "@/src/lib/lead";

export type ServiceCopy = {
  name: string;
  /** Una línea para el índice de servicios. */
  short: string;
  metaTitle: string;
  metaDescription: string;
  /** El problema en la voz del cliente. */
  problem: string;
  includes: string[];
  excludes: string[];
  outcome: string;
  /** Rango de inversión ("Desde 2.500 USD"). null = se comparte en la llamada. */
  investment: string | null;
};

export type Plan = {
  name: string;
  forWho: string;
  includes: string[];
  /** null = se comparte en la llamada. */
  investment: string | null;
};

export type FormCopy = {
  /** Usa {current} y {total}. */
  stepOf: string;
  next: string;
  back: string;
  submit: string;
  sending: string;
  project: {
    title: string;
    companyLabel: string;
    needsLabel: string;
    needs: Record<NeedOption, string>;
  };
  moment: {
    title: string;
    stageLabel: string;
    stages: Record<Stage, string>;
    stakesLabel: string;
    stakesHint: string;
  };
  budget: {
    title: string;
    label: string;
    options: Record<Budget, string>;
    lowMessage: string;
  };
  timing: {
    title: string;
    label: string;
    options: Record<Timing, string>;
  };
  contact: {
    title: string;
    nameLabel: string;
    emailLabel: string;
    channelLabel: string;
    channels: Record<Channel, string>;
    phoneLabel: string;
    consentBefore: string;
    consentLink: string;
    consentAfter: string;
  };
  errors: {
    required: string;
    email: string;
    needs: string;
    stakes: string;
    phone: string;
    consent: string;
    server: string;
    network: string;
  };
  success: { title: string; text: string };
};

export type Dictionary = {
  meta: { title: string; description: string };
  nav: {
    label: string;
    services: string;
    work: string;
    blog: string;
    contact: string;
    menu: string;
    close: string;
    language: string;
    skip: string;
  };
  common: {
    bookCall: string;
    seeWork: string;
    investment: string;
    investmentOnCall: string;
  };
  hero: { title: string; subtitle: string };
  home: {
    whyCree: {
      eyebrow: string;
      title: string;
      items: { title: string; text: string }[];
    };
    services: { title: string };
    work: { title: string; all: string };
    /** "Así trabajamos" del home: filas numeradas. */
    howWeWork: {
      title: string;
      intro: string;
      steps: { name: string; text: string }[];
    };
    /** Proceso con línea curva (Process + ProcessPath), reservado para las landings de servicios. */
    process: {
      title: string;
      intro: string;
      steps: { name: string; text: string }[];
    };
    afterLaunch: { title: string; text: string; link: string };
    cta: { title: string; text: string };
  };
  services: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    disciplinesLabel: string;
    perMonth: string;
    prevService: string;
    nextService: string;
    /** Caja 3D de la página de Packaging. */
    box: { open: string; close: string; hint: string };
    problemLabel: string;
    includesLabel: string;
    excludesLabel: string;
    outcomeLabel: string;
    relatedWork: string;
    packages: { title: string; intro: string; items: Plan[] };
    retainer: { title: string; intro: string; items: Plan[] };
    items: Record<ServiceSlug, ServiceCopy>;
  };
  work: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    servicesLabel: string;
    yearLabel: string;
    locationLabel: string;
    prev: string;
    next: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    call: { eyebrow: string; title: string; meta: string; text: string; asks: string[]; cta: string };
    whatsapp: {
      title: string;
      text: string;
      cta: string;
      /** Mensaje ya escrito. Con `{service}` cuando llegan desde un servicio. */
      message: string;
      messageService: string;
    };
    next: { title: string; steps: { name: string; text: string }[] };
    /** Formulario largo anterior (QualifyForm), fuera de uso. */
    form: FormCopy;
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    updated: string;
    sections: { title: string; body: string[] }[];
  };
  notFound: { title: string; text: string; home: string };
  blog: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    intro: string;
    /** Filtro "todas las categorías". */
    all: string;
    empty: { title: string; text: string };
    /** "{n} min de lectura" */
    readingTime: string;
    more: string;
    back: string;
    /** Aviso en la versión en inglés: el artículo está en español. */
    langNote: string;
  };
  footer: {
    tagline: string;
    navTitle: string;
    servicesTitle: string;
    socialTitle: string;
    privacy: string;
    rights: string;
  };
};
