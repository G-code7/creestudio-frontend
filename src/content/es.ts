import type { Dictionary } from "./types";

/*
 * Copy en español. Revisar antes de publicar:
 * - investment: null en servicios, paquetes y planes. Mientras sea null se
 *   muestra "Te compartimos el rango en la primera llamada". Rellena los rangos
 *   reales ("Desde 2.500 USD") para que el sitio filtre por presupuesto.
 * - privacy: texto base. Completar con razón social, NIF y dirección del
 *   responsable, y validarlo con asesoría legal.
 */
const es: Dictionary = {
  meta: {
    title: "Cree Studio | Estudio de branding e identidad visual",
    description:
      "Estudio creativo de branding, identidad visual, naming, packaging y diseño web. Co-creamos marcas sólidas para fundadores y empresas que quieren liderar.",
  },
  nav: {
    label: "Principal",
    services: "Servicios",
    work: "Proyectos",
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
    language: "Idioma",
    skip: "Saltar al contenido",
  },
  common: {
    bookCall: "Agenda una llamada",
    seeWork: "Conoce nuestro trabajo",
    investment: "Inversión",
    investmentOnCall: "Te compartimos el rango en la primera llamada.",
  },
  hero: {
    title: "Branding estratégico para marcas listas para liderar su industria.",
    subtitle:
      "Co-creamos la identidad de fundadores y empresas: branding, identidad visual, naming, packaging y diseño web.",
  },
  home: {
    stakes: {
      title: "Tres señales de que tu marca te está frenando",
      items: [
        {
          fear: "“Mi marca se ve como la de cualquiera.”",
          answer:
            "Construimos la estrategia antes que el logo: a quién le hablas, por qué te eligen y qué te hace distinto. La identidad sale de ahí, no de una tendencia.",
        },
        {
          fear: "“Invertí en un logo y nada cambió.”",
          answer:
            "Un logo suelto no es una marca. Entregamos un sistema completo (color, tipografía, aplicaciones y manual) para que tu marca se vea igual de sólida en cada punto de contacto.",
        },
        {
          fear: "“Mi imagen no está a la altura de lo que cobro.”",
          answer:
            "Si tu precio dice premium y tu imagen dice improvisado, el cliente le cree a la imagen. Alineamos cómo te ves con el valor que ya entregas.",
        },
      ],
    },
    services: { title: "Lo que hacemos" },
    work: { title: "Trabajo reciente", all: "Ver todos los proyectos" },
    process: {
      title: "Así trabajamos",
      intro:
        "Sabemos que tu tiempo vale oro. Por eso seguimos un proceso claro, de la primera reunión a la entrega final.",
      steps: [
        {
          name: "Onboarding",
          text: "Convertimos la información de tu marca en la base de la estrategia. Firmamos el contrato, hacemos el pago inicial y completamos un brief creativo detallado.",
        },
        {
          name: "Estrategia de marca",
          text: "Definimos el enfoque de tu marca, tu cliente ideal y por qué deberían elegirte. La estrategia es la hoja de ruta que guía cada decisión de tu negocio.",
        },
        {
          name: "Dirección creativa",
          text: "Transformamos tu visión en una dirección creativa única. Te presentamos propuestas visuales y moodboards para que elijas la estética que mejor te represente.",
        },
        {
          name: "Identidad visual",
          text: "Desarrollamos una imagen sólida y memorable: isotipo, logotipo, paleta de color, tipografía y una guía de marca para asegurar coherencia.",
        },
        {
          name: "Material colateral",
          text: "Damos vida a tu marca en cada punto de contacto, desde menús de restaurante hasta diseños para redes sociales.",
        },
        {
          name: "Offboarding",
          text: "Entregamos todos los archivos y te damos las herramientas para mantener tu marca consistente cuando ya no estemos en la sala.",
        },
      ],
    },
    afterLaunch: {
      title: "La marca no termina en la entrega.",
      text: "Con los planes de continuidad seguimos diseñando contigo cada mes: contenido, piezas de temporada y la evolución de tu identidad, sin empezar de cero cada vez.",
      link: "Ver planes de continuidad",
    },
    cta: {
      title: "Cuéntanos qué estás construyendo.",
      text: "30 minutos con nuestro equipo. Llegas con un reto y sales con claridad.",
    },
  },
  services: {
    metaTitle: "Servicios de branding y diseño",
    metaDescription:
      "Branding, identidad visual, naming, packaging y diseño web para marcas que quieren diferenciarse. Conoce qué incluye cada servicio y cómo trabajamos.",
    title: "Servicios",
    intro:
      "Cinco disciplinas que trabajan juntas. Puedes empezar por una o construir la marca completa con nosotros.",
    problemLabel: "El problema",
    includesLabel: "Qué incluye",
    excludesLabel: "Qué no incluye",
    outcomeLabel: "Lo que te llevas",
    relatedWork: "Proyectos con este servicio",
    packages: {
      title: "Paquetes",
      intro:
        "Tres puntos de partida. Cada propuesta se ajusta después de la llamada de descubrimiento.",
      items: [
        {
          name: "Identidad",
          forWho: "Para marcas nuevas que necesitan salir al mercado con una base sólida.",
          includes: [
            "Estrategia de marca",
            "Identidad visual: logotipo, isotipo, color y tipografía",
            "Manual de marca",
            "Aplicaciones básicas para papelería y redes",
          ],
          investment: null,
        },
        {
          name: "Sistema de marca",
          forWho: "Para marcas en crecimiento o que necesitan un rebranding.",
          includes: [
            "Todo lo de Identidad",
            "Naming o packaging",
            "Material colateral para el lanzamiento",
            "Plantillas editables para tu equipo",
          ],
          investment: null,
        },
        {
          name: "Marca y web",
          forWho: "Para marcas que quieren lanzar identidad y sitio web a la vez.",
          includes: [
            "Todo lo de Sistema de marca",
            "Diseño y desarrollo del sitio web",
            "Arquitectura de contenido orientada a conversión",
            "Acompañamiento en el lanzamiento",
          ],
          investment: null,
        },
      ],
    },
    retainer: {
      title: "Planes de continuidad",
      intro:
        "Una marca se mantiene viva con uso. Estos planes te dan un estudio de diseño disponible cada mes, con prioridad y sin cotizar cada pieza por separado.",
      items: [
        {
          name: "Presencia",
          forWho: "Para mantener tus redes y piezas al día.",
          includes: [
            "Piezas mensuales para redes sociales",
            "Ajustes de material existente",
            "Revisión de coherencia de marca",
          ],
          investment: null,
        },
        {
          name: "Crecimiento",
          forWho: "Para marcas con campañas y lanzamientos frecuentes.",
          includes: [
            "Todo lo de Presencia",
            "Piezas de campaña y temporada",
            "Adaptaciones de packaging y punto de venta",
            "Reunión mensual de planificación",
          ],
          investment: null,
        },
        {
          name: "Estudio dedicado",
          forWho: "Para equipos que necesitan diseño de forma continua.",
          includes: [
            "Todo lo de Crecimiento",
            "Prioridad en la agenda del estudio",
            "Evolución de la identidad",
            "Dirección creativa en sesiones de contenido",
          ],
          investment: null,
        },
      ],
    },
    items: {
      branding: {
        name: "Branding",
        short: "Estrategia, propósito y mensaje: la base de cada decisión creativa.",
        metaTitle: "Branding estratégico para empresas",
        metaDescription:
          "Definimos el propósito, el posicionamiento y el mensaje de tu marca para que cada decisión creativa tenga un rumbo claro. Branding estratégico de Cree Studio.",
        problem:
          "Tengo un buen producto, pero cuando explico qué me hace distinto ni yo lo tengo claro. Cada pieza que publico parece de una marca diferente.",
        includes: [
          "Sesiones de descubrimiento con tu equipo",
          "Análisis de competencia y posicionamiento",
          "Propósito, valores y personalidad de marca",
          "Mensaje central y tono de voz",
          "Hoja de ruta para aplicar la estrategia",
        ],
        excludes: [
          "Producción de fotografía y video",
          "Gestión diaria de redes sociales",
          "Pauta publicitaria",
        ],
        outcome:
          "Una estrategia escrita que tu equipo puede usar para decidir qué decir, cómo decirlo y qué dejar fuera.",
        investment: null,
      },
      "identidad-visual": {
        name: "Identidad visual",
        short: "El sistema visual completo: lo que se ve, lo que se siente y lo que se recuerda.",
        metaTitle: "Diseño de identidad visual",
        metaDescription:
          "Logotipo, color, tipografía y manual de marca en un sistema visual coherente. Diseñamos identidades que se reconocen y se aplican igual en todos los formatos.",
        problem:
          "Mi logo lo hizo alguien hace años y ya no me representa. Cada proveedor usa colores y tipografías distintas.",
        includes: [
          "Logotipo e isotipo con sus variantes",
          "Paleta de color y sistema tipográfico",
          "Elementos gráficos y estilo de imagen",
          "Manual de marca",
          "Aplicaciones clave: papelería, redes y señalética",
        ],
        excludes: [
          "Estrategia de marca completa (disponible en Branding)",
          "Impresión y producción física",
          "Desarrollo web",
        ],
        outcome:
          "Una identidad que se reconoce al instante y se aplica igual en una tarjeta, un empaque o una pantalla.",
        investment: null,
      },
      naming: {
        name: "Naming",
        short: "Nombres que conectan, perduran y abren puertas.",
        metaTitle: "Naming: creación de nombres de marca",
        metaDescription:
          "Creamos nombres de marca con fundamento: exploración verbal, filtro de significado en varios idiomas y revisión preliminar de dominios. Naming de Cree Studio.",
        problem:
          "Tengo el negocio casi listo y no encuentro un nombre que suene bien, que se pueda registrar y que tenga dominio disponible.",
        includes: [
          "Brief de naming y territorio verbal",
          "Exploración de propuestas de nombre",
          "Filtro de pronunciación y significado en los idiomas que te importan",
          "Revisión preliminar de dominios y redes",
          "Presentación de finalistas con su racional",
        ],
        excludes: [
          "Registro legal de la marca (te recomendamos asesoría especializada)",
          "Compra de dominios",
        ],
        outcome:
          "Un nombre con fundamento que puedes defender ante socios, inversores y clientes.",
        investment: null,
      },
      packaging: {
        name: "Packaging",
        short: "Empaques que convierten recibir tu producto en una experiencia.",
        metaTitle: "Diseño de packaging",
        metaDescription:
          "Diseño de empaques y etiquetas con artes finales listos para imprenta. Packaging que se reconoce en el anaquel y se fotografía bien en redes.",
        problem:
          "Mi producto es bueno, pero en el anaquel o al llegar a casa se ve igual que el de la competencia.",
        includes: [
          "Concepto y arquitectura de la línea de empaques",
          "Diseño de empaque y etiquetas",
          "Artes finales listos para imprenta",
          "Mockups para venta y redes",
          "Acompañamiento con tu proveedor de impresión",
        ],
        excludes: [
          "Costos de impresión y producción",
          "Desarrollo estructural de troqueles complejos",
          "Fotografía de producto",
        ],
        outcome:
          "Un empaque que se reconoce, se fotografía bien y hace que el cliente quiera volver a comprar.",
        investment: null,
      },
      "diseno-web": {
        name: "Diseño web",
        short: "Sitios que traducen tu esencia en una experiencia digital que convierte.",
        metaTitle: "Diseño web para marcas",
        metaDescription:
          "Sitios web a medida, rápidos y alineados a tu identidad, con un panel para editar contenido sin depender de nadie. Diseño y desarrollo web de Cree Studio.",
        problem:
          "Mi web no refleja el nivel de mi marca. Carga lento, se ve genérica y casi nadie nos contacta desde ahí.",
        includes: [
          "Arquitectura de contenido y recorrido del usuario",
          "Diseño de interfaz alineado a tu identidad",
          "Desarrollo a medida, rápido y adaptado a móvil",
          "Panel para editar contenido sin depender de nadie",
          "SEO técnico de base y analítica",
        ],
        excludes: [
          "Redacción de todos los textos",
          "Fotografía y video",
          "Mantenimiento mensual (disponible en los planes de continuidad)",
        ],
        outcome:
          "Un sitio que carga rápido, se ve a la altura de tu marca y convierte visitas en conversaciones.",
        investment: null,
      },
    },
  },
  work: {
    metaTitle: "Proyectos de branding e identidad visual",
    metaDescription:
      "Casos de branding, identidad visual y packaging para marcas en Estados Unidos, España y Latinoamérica. Conoce el trabajo de Cree Studio.",
    title: "Proyectos",
    intro:
      "Marcas que construimos junto a sus fundadores, de la estrategia al último detalle.",
    servicesLabel: "Servicios",
    yearLabel: "Año",
    locationLabel: "Ubicación",
    next: "Siguiente proyecto",
  },
  contact: {
    metaTitle: "Cuéntanos tu proyecto",
    metaDescription:
      "Responde un cuestionario de 3 minutos sobre tu marca y te contactamos en menos de 24 horas hábiles para agendar la llamada de descubrimiento.",
    title: "Cuéntanos tu proyecto",
    intro:
      "Antes de hablar de presupuesto, queremos entender tu negocio. El cuestionario toma unos 3 minutos y nos permite preparar una propuesta a tu medida. Si encajamos, te respondemos en menos de 24 horas hábiles con el enlace para agendar la llamada.",
    form: {
      stepOf: "Paso {current} de {total}",
      next: "Continuar",
      back: "Volver",
      submit: "Enviar y solicitar mi llamada",
      sending: "Enviando…",
      project: {
        title: "Tu proyecto",
        companyLabel: "Nombre de la empresa o proyecto",
        needsLabel: "¿Qué necesitas? Puedes elegir varias opciones.",
        needs: {
          branding: "Branding",
          "identidad-visual": "Identidad visual",
          naming: "Naming",
          packaging: "Packaging",
          "diseno-web": "Diseño web",
          otro: "Otro",
        },
      },
      moment: {
        title: "El momento de tu marca",
        stageLabel: "¿En qué punto está tu marca?",
        stages: {
          nueva: "Es nueva, todavía no sale al mercado",
          "no-representa": "Existe, pero ya no nos representa",
          rebranding: "Es una marca establecida que necesita un rebranding",
        },
        stakesLabel: "¿Qué pasa con tu negocio si esto no se resuelve en los próximos 90 días?",
        stakesHint: "Con dos o tres frases es suficiente.",
      },
      budget: {
        title: "Inversión",
        label: "¿Cuál es tu rango de inversión para este proyecto?",
        options: {
          "lt-1500": "Menos de 1.500 USD",
          "1500-4000": "1.500 a 4.000 USD",
          "4000-8000": "4.000 a 8.000 USD",
          "8000-15000": "8.000 a 15.000 USD",
          "gt-15000": "Más de 15.000 USD",
          unknown: "Aún no lo sé, necesito orientación",
        },
        lowMessage:
          "Nuestros proyectos de identidad parten de un rango superior. Si estás empezando, envía el formulario igualmente: te diremos con honestidad qué opción tiene más sentido para tu momento.",
      },
      timing: {
        title: "Tiempos",
        label: "¿Para cuándo necesitas tenerlo listo?",
        options: {
          "lt-1m": "En menos de un mes",
          "1-3m": "En 1 a 3 meses",
          "3-6m": "En 3 a 6 meses",
          flexible: "No tengo una fecha fija",
        },
      },
      contact: {
        title: "Tus datos",
        nameLabel: "Tu nombre",
        emailLabel: "Correo electrónico",
        channelLabel: "¿Cómo prefieres que te contactemos?",
        channels: {
          email: "Correo",
          whatsapp: "WhatsApp",
          video: "Videollamada",
        },
        phoneLabel: "Número de WhatsApp con código de país",
        consentBefore: "Acepto la ",
        consentLink: "política de privacidad",
        consentAfter: " para que puedan responder a mi solicitud.",
      },
      errors: {
        required: "Completa este campo para continuar.",
        email: "Revisa el correo: parece incompleto.",
        needs: "Elige al menos una opción.",
        stakes: "Cuéntanos un poco más, con una frase completa basta.",
        phone: "Escribe tu número con el código de país, por ejemplo +34 612 345 678.",
        consent: "Necesitamos tu autorización para poder responderte.",
        server:
          "No pudimos enviar el formulario. Inténtalo de nuevo en unos minutos.",
        network:
          "No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.",
      },
      success: {
        title: "Recibimos tu solicitud.",
        text: "Revisamos cada cuestionario personalmente. Si tu proyecto encaja con nosotros, te escribimos en menos de 24 horas hábiles.",
      },
    },
  },
  privacy: {
    metaTitle: "Política de privacidad",
    metaDescription:
      "Cómo trata Cree Studio los datos que envías a través del formulario de contacto.",
    title: "Política de privacidad",
    updated: "Última actualización: octubre de 2026",
    sections: [
      {
        title: "Responsable",
        body: [
          "Cree Studio es responsable del tratamiento de los datos que nos envías a través de este sitio.",
        ],
      },
      {
        title: "Qué datos recogemos",
        body: [
          "Solo los que nos das en el formulario de contacto: tu nombre, tu correo, tu teléfono si eliges WhatsApp y la información sobre tu proyecto.",
        ],
      },
      {
        title: "Para qué los usamos",
        body: [
          "Para responder a tu solicitud, preparar una propuesta y continuar la conversación que tú iniciaste. No los usamos para enviarte publicidad sin tu permiso.",
        ],
      },
      {
        title: "Cuánto tiempo los guardamos",
        body: [
          "Mientras dure la conversación comercial y, si trabajamos juntos, durante la relación profesional y los plazos legales que correspondan.",
        ],
      },
      {
        title: "Con quién los compartimos",
        body: [
          "Con los proveedores técnicos que nos permiten recibir y gestionar tu mensaje, como el servicio de envío de correo. No vendemos ni cedemos tus datos a terceros.",
        ],
      },
      {
        title: "Tus derechos",
        body: [
          "Puedes pedir acceso, rectificación o eliminación de tus datos, oponerte a su uso o solicitar su portabilidad. Escríbenos desde el formulario de contacto y te responderemos.",
        ],
      },
    ],
  },
  notFound: {
    title: "Esta página no existe.",
    text: "Puede que el enlace haya cambiado. Vuelve al inicio o revisa nuestros proyectos.",
    home: "Volver al inicio",
  },
  footer: {
    tagline:
      "Estudio creativo de branding, identidad visual, naming, packaging y diseño web.",
    navTitle: "Sitio",
    servicesTitle: "Servicios",
    socialTitle: "Síguenos",
    privacy: "Política de privacidad",
    rights: "Todos los derechos reservados.",
  },
};

export default es;
