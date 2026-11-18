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
    title: "Cree Estudio | Estudio de branding e identidad visual",
    description:
      "Estudio creativo de branding, identidad visual, naming, packaging y diseño web. Co-creamos marcas sólidas para fundadores y empresas que quieren liderar.",
  },
  nav: {
    label: "Principal",
    services: "Servicios",
    work: "Proyectos",
    blog: "Blog",
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
    title: "Creamos marcas que la gente recuerda y que de verdad venden",
    subtitle:
      "Un estudio creativo con cabeza de negocio. Branding, contenido, diseño web y packaging, todo lo que tu marca necesita para crecer.",
  },
  home: {
    whyCree: {
      eyebrow: "Por qué Cree",
      title: "No somos solo diseño",
      items: [
        {
          title: "Creatividad con cabeza de negocio",
          text: "No diseñamos solo para que se vea bonito, sino para que te venda. Detrás de cada decisión hay una razón de negocio.",
        },
        {
          title: "Decidimos contigo, no por ti",
          text: "Nada se define sin ti. Te involucramos desde el brief hasta la entrega, así que sabes exactamente lo que vas a recibir.",
        },
        {
          title: "Toda tu marca, en un solo estudio",
          text: "Del branding al contenido y la web. Una sola visión que mantiene tu marca coherente, sin saltar entre proveedores.",
        },
        {
          title: "Nos quedamos",
          text: "No somos un proyecto y adiós. Nuestros clientes trabajan con nosotros por años, porque de verdad nos importa que les vaya bien.",
        },
      ],
    },
    services: { title: "Lo que hacemos" },
    work: { title: "Trabajos recientes", all: "Ver todos los proyectos" },
    howWeWork: {
      title: "Así trabajamos",
      intro:
        "Sabemos que tu tiempo vale oro. Por eso el proceso es claro y directo, desde el primer mensaje hasta que tu proyecto está en tus manos.",
      steps: [
        {
          name: "Nos escribes",
          text: "Por WhatsApp o agendas una llamada. Nos cuentas qué necesita tu marca y en qué estás.",
        },
        {
          name: "Nos reunimos",
          text: "En una llamada conocemos tu negocio y tus objetivos, y te mostramos cómo podemos ayudarte. Sin compromiso.",
        },
        {
          name: "Te cotizamos",
          text: "Una cotización hecha a tu medida, con el servicio y la inversión claros. Sin letra chica ni sorpresas.",
        },
        {
          name: "Arrancamos",
          text: "Firmamos, haces el pago inicial y empezamos a construir. Decides con nosotros en cada etapa.",
        },
        {
          name: "Seguimos cerca",
          text: "Te entregamos todo listo para usar, y quedamos a la mano para lo que tu marca necesite después.",
        },
      ],
    },
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
    disciplinesLabel: "Disciplinas",
    perMonth: "Cada mes",
    prevService: "Disciplina anterior",
    nextService: "Siguiente disciplina",
    box: { open: "Abrir la caja", close: "Cerrar la caja", hint: "Arrastra para girarla" },
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
        short:
          "Estrategia, naming e identidad visual. La base de tu marca: quién eres, a quién le hablas y cómo se ve. Todo lo demás nace de aquí.",
        metaTitle: "Branding: estrategia, naming e identidad visual",
        metaDescription:
          "Estrategia de marca, naming e identidad visual en un solo proceso. Definimos quién eres, a quién le hablas y cómo se ve tu marca. Branding de Cree Estudio.",
        problem:
          "Tengo un buen producto, pero cuando explico qué me hace distinto ni yo lo tengo claro. Cada pieza que publico parece de una marca diferente.",
        includes: [
          "Sesiones de descubrimiento y análisis de competencia",
          "Propósito, posicionamiento, mensaje y tono de voz",
          "Naming con finalistas y su racional, si lo necesitas",
          "Logotipo, paleta de color y sistema tipográfico",
          "Manual de marca y aplicaciones clave",
        ],
        excludes: [
          "Registro legal de la marca (te recomendamos asesoría especializada)",
          "Producción de fotografía y video",
          "Impresión y producción física",
        ],
        outcome:
          "Una marca con estrategia, nombre e identidad coherentes, lista para aplicarse igual en cada punto de contacto.",
        investment: null,
      },
      contenido: {
        name: "Social Media",
        short:
          "Contenido que trabaja para tu negocio: video, posts y gestión que venden, no que solo llenan el feed.",
        metaTitle: "Contenido y gestión de redes sociales",
        metaDescription:
          "Video, posts y gestión de redes alineados a tu marca y a tus objetivos de venta. Contenido que trabaja para tu negocio. Social media de Cree Estudio.",
        problem:
          "Publico porque toca, pero no sé si sirve de algo. Mis redes no se parecen a mi marca y no me traen clientes.",
        includes: [
          "Estrategia de contenido y líneas editoriales",
          "Calendario mensual de publicaciones",
          "Producción de video corto y piezas gráficas",
          "Copys con el tono de tu marca",
          "Gestión de perfiles y reporte de resultados",
        ],
        excludes: [
          "Inversión en pauta publicitaria",
          "Atención a mensajes directos de clientes",
          "Producciones audiovisuales de gran formato",
        ],
        outcome:
          "Redes que se ven como tu marca y que generan conversaciones con clientes reales, no solo likes.",
        investment: null,
      },
      "diseno-web": {
        name: "Diseño Web",
        short: "Sitios y tiendas que traducen tu marca en una experiencia digital que vende.",
        metaTitle: "Diseño web y tiendas online para marcas",
        metaDescription:
          "Sitios web y tiendas online a medida, rápidos y alineados a tu identidad, con un panel para editar contenido sin depender de nadie. Diseño web de Cree Estudio.",
        problem:
          "Mi web no refleja el nivel de mi marca. Carga lento, se ve genérica y casi nadie nos contacta ni compra desde ahí.",
        includes: [
          "Arquitectura de contenido y recorrido del usuario",
          "Diseño de interfaz alineado a tu identidad",
          "Desarrollo a medida o tienda online, rápido y adaptado a móvil",
          "Panel para editar contenido sin depender de nadie",
          "SEO técnico de base y analítica",
        ],
        excludes: [
          "Redacción de todos los textos",
          "Fotografía y video",
          "Mantenimiento mensual (disponible en los planes de continuidad)",
        ],
        outcome:
          "Un sitio que carga rápido, se ve a la altura de tu marca y convierte visitas en conversaciones y ventas.",
        investment: null,
      },
      packaging: {
        name: "Packaging",
        short: "Empaques que hacen de abrir tu producto una experiencia.",
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
      eventos: {
        name: "Eventos",
        short:
          "Lanzamientos, pop-ups y activaciones. Tu marca hecha experiencia, para que la gente no solo la vea: la viva.",
        metaTitle: "Eventos y activaciones de marca",
        metaDescription:
          "Lanzamientos, pop-ups y activaciones diseñados desde tu marca. Experiencias que la gente vive y recuerda. Eventos para marcas de Cree Estudio.",
        problem:
          "Voy a lanzar algo importante y no quiero un evento genérico: quiero que la gente salga hablando de mi marca.",
        includes: [
          "Concepto creativo de la experiencia",
          "Diseño del espacio, señalética y piezas gráficas",
          "Coordinación de proveedores y producción",
          "Contenido del evento para redes",
          "Acompañamiento el día del evento",
        ],
        excludes: [
          "Alquiler del espacio y costos de producción",
          "Catering y logística de invitados",
          "Permisos y trámites locales",
        ],
        outcome:
          "Un evento que se siente 100% tu marca y que deja contenido, contactos y conversación después del día.",
        investment: null,
      },
    },
  },
  work: {
    metaTitle: "Proyectos de branding e identidad visual",
    metaDescription:
      "Casos de branding, identidad visual y packaging para marcas en Estados Unidos, España y Latinoamérica. Conoce el trabajo de Cree Estudio.",
    title: "Proyectos",
    intro:
      "Marcas que construimos junto a sus fundadores, de la estrategia al último detalle.",
    servicesLabel: "Servicios",
    yearLabel: "Año",
    locationLabel: "Ubicación",
    prev: "Proyecto anterior",
    next: "Siguiente proyecto",
  },
  contact: {
    metaTitle: "Hablemos de tu marca",
    metaDescription:
      "Agenda una llamada de 20 minutos con CREE o escríbenos por WhatsApp. Llegamos preparados y te enviamos una propuesta a tu medida en 24 horas.",
    title: "Hablemos de tu marca",
    intro:
      "Antes de hablar de presupuesto, queremos entender tu negocio. Elige cómo prefieres empezar: agenda una llamada o escríbenos directo.",
    call: {
      eyebrow: "Recomendado",
      title: "Agenda una llamada",
      meta: "20 minutos",
      text: "Responde unas preguntas rápidas (toma 2 minutos) y llegamos a la llamada ya preparados, con una propuesta pensada para ti.",
      asks: ["Tu marca", "Qué necesitas", "Tu presupuesto", "Tu WhatsApp"],
      cta: "Elegir día y hora",
    },
    whatsapp: {
      title: "Escríbenos por WhatsApp",
      text: "¿Prefieres escribir? Cuéntanos qué necesita tu marca y te respondemos en horario laboral.",
      cta: "Abrir WhatsApp",
      message: "Hola CREE, quiero hablar sobre mi marca.",
      messageService: "Hola CREE, me interesa {service} para mi marca.",
    },
    next: {
      title: "Qué pasa después",
      steps: [
        { name: "Agendas o nos escribes", text: "Por la llamada o por WhatsApp, como te quede mejor." },
        { name: "Revisamos lo que nos cuentas", text: "Llegamos a la conversación sabiendo qué necesitas." },
        { name: "Hablamos", text: "Una llamada directa, sin rodeos y sin compromiso." },
        { name: "Tu propuesta en 24 h", text: "Una cotización a tu medida, con todo claro. Sin letra chica." },
      ],
    },
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
          contenido: "Contenido y redes sociales",
          "diseno-web": "Diseño web",
          packaging: "Packaging",
          eventos: "Eventos para marcas",
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
      "Cómo trata Cree Estudio los datos que envías a través del formulario de contacto.",
    title: "Política de privacidad",
    updated: "Última actualización: octubre de 2026",
    sections: [
      {
        title: "Responsable",
        body: [
          "Cree Estudio es responsable del tratamiento de los datos que nos envías a través de este sitio.",
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
        title: "Base legal",
        body: [
          "Tratamos tus datos porque nos pides una propuesta: es una medida precontractual solicitada por ti (artículo 6.1.b del RGPD). Si no nos das los datos obligatorios del formulario, no podemos responderte.",
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
        title: "Transferencias internacionales",
        body: [
          "Algunos de esos proveedores están en Estados Unidos: Vercel, que aloja este sitio, y Resend, que nos entrega tu solicitud por correo. Solo trabajamos con proveedores que ofrecen las garantías del RGPD para estas transferencias, como el Marco de Privacidad de Datos UE-EE. UU. o las cláusulas contractuales tipo de la Comisión Europea.",
        ],
      },
      {
        title: "Tus derechos",
        body: [
          "Puedes pedir acceso, rectificación o eliminación de tus datos, oponerte a su uso o solicitar su portabilidad. Escríbenos desde el formulario de contacto y te responderemos.",
          "Si crees que no hemos tratado bien tus datos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (aepd.es).",
        ],
      },
    ],
  },
  notFound: {
    title: "Esta página no existe.",
    text: "Puede que el enlace haya cambiado. Vuelve al inicio o revisa nuestros proyectos.",
    home: "Volver al inicio",
  },
  blog: {
    metaTitle: "Blog de branding y diseño",
    metaDescription:
      "Ideas sobre branding, identidad visual, naming, packaging y diseño web para marcas que quieren crecer. El blog de Cree Estudio.",
    title: "Blog",
    intro: "Lo que aprendemos construyendo marcas: estrategia, diseño y negocio, sin relleno.",
    all: "Todo",
    empty: {
      title: "Estamos escribiendo.",
      text: "Pronto publicaremos los primeros artículos. Mientras tanto, mira lo que hemos construido.",
    },
    readingTime: "{n} min de lectura",
    more: "Más artículos",
    back: "Blog",
    langNote: "",
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
