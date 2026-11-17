import type { Dictionary } from "./types";

/* English copy. Same review notes as es.ts (investment ranges, privacy). */
const en: Dictionary = {
  meta: {
    title: "Cree Estudio | Branding and visual identity studio",
    description:
      "Creative studio for branding, visual identity, naming, packaging and web design. We co-create strong brands with founders and companies ready to lead.",
  },
  nav: {
    label: "Main",
    services: "Services",
    work: "Work",
    blog: "Blog",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
    language: "Language",
    skip: "Skip to content",
  },
  common: {
    bookCall: "Book a call",
    seeWork: "See our work",
    investment: "Investment",
    investmentOnCall: "We share the range on our first call.",
  },
  hero: {
    title: "Strategic branding for companies ready to lead their industry.",
    subtitle:
      "We co-create identities with founders and companies: branding, visual identity, naming, packaging and web design.",
  },
  home: {
    whyCree: {
      eyebrow: "Why Cree",
      title: "We’re not just design.",
      items: [
        {
          title: "Creative with a business mind",
          text: "We don’t design just to look good, but to make you sell. Behind every decision there’s a business reason.",
        },
        {
          title: "We decide with you, not for you",
          text: "Nothing gets defined without you. We involve you from the brief to the handover, so you know exactly what you’ll get.",
        },
        {
          title: "Your whole brand, in one studio",
          text: "From branding to content and web. One vision that keeps your brand consistent, with no jumping between vendors.",
        },
        {
          title: "We stay",
          text: "We’re not a one-off project. Our clients work with us for years, because we genuinely care about how they do.",
        },
      ],
    },
    services: { title: "What we do" },
    work: { title: "Recent work", all: "See all projects" },
    howWeWork: {
      title: "How we work",
      intro:
        "We know your time is valuable. That’s why the process is clear and direct, from your first message until your project is in your hands.",
      steps: [
        {
          name: "You reach out",
          text: "On WhatsApp or by booking a call. Tell us what your brand needs and where you are right now.",
        },
        {
          name: "We meet",
          text: "On a call we get to know your business and your goals, and show you how we can help. No strings attached.",
        },
        {
          name: "We send your proposal",
          text: "A quote made to measure, with the service and the investment spelled out. No fine print, no surprises.",
        },
        {
          name: "We start together",
          text: "We sign, you make the first payment and we start building. You decide with us at every stage.",
        },
        {
          name: "We deliver and stay close",
          text: "We hand everything over ready to use, and stay within reach for whatever your brand needs next.",
        },
      ],
    },
    process: {
      title: "How we work",
      intro:
        "We know your time is valuable. That is why we follow a clear process, from the first meeting to the final handover.",
      steps: [
        {
          name: "Onboarding",
          text: "We turn what we learn about your brand into the foundation of the strategy. We sign the contract, take the first payment and complete a detailed creative brief.",
        },
        {
          name: "Brand strategy",
          text: "We define your brand’s focus, your ideal client and why they should choose you. The strategy is the roadmap behind every business decision.",
        },
        {
          name: "Creative direction",
          text: "We turn your vision into a distinct creative direction, presenting visual proposals and moodboards so you can choose the look that represents you best.",
        },
        {
          name: "Visual identity",
          text: "We build a solid, memorable image: symbol, logotype, color palette, typography and brand guidelines to keep everything consistent.",
        },
        {
          name: "Collateral",
          text: "We bring your brand to life at every touchpoint, from restaurant menus to social media design.",
        },
        {
          name: "Offboarding",
          text: "We hand over every file and give you the tools to keep your brand consistent once we are out of the room.",
        },
      ],
    },
    afterLaunch: {
      title: "A brand doesn’t end at handover.",
      text: "With our continuity plans we keep designing with you every month: content, seasonal pieces and the evolution of your identity, without starting from scratch each time.",
      link: "See continuity plans",
    },
    cta: {
      title: "Tell us what you are building.",
      text: "30 minutes with our team. Come with a challenge, leave with clarity.",
    },
  },
  services: {
    metaTitle: "Branding and design services",
    metaDescription:
      "Branding, visual identity, naming, packaging and web design for brands that want to stand apart. See what each service includes and how we work.",
    title: "Services",
    intro:
      "Five disciplines that work together. Start with one, or build the whole brand with us.",
    disciplinesLabel: "Disciplines",
    perMonth: "Every month",
    prevService: "Previous discipline",
    nextService: "Next discipline",
    box: { open: "Open the box", close: "Close the box", hint: "Drag to rotate it" },
    problemLabel: "The problem",
    includesLabel: "What’s included",
    excludesLabel: "What’s not included",
    outcomeLabel: "What you walk away with",
    relatedWork: "Projects with this service",
    packages: {
      title: "Packages",
      intro:
        "Three starting points. Every proposal is tailored after the discovery call.",
      items: [
        {
          name: "Identity",
          forWho: "For new brands that need to reach the market on a solid foundation.",
          includes: [
            "Brand strategy",
            "Visual identity: logotype, symbol, color and type",
            "Brand guidelines",
            "Core applications for stationery and social",
          ],
          investment: null,
        },
        {
          name: "Brand system",
          forWho: "For growing brands or brands that need a rebrand.",
          includes: [
            "Everything in Identity",
            "Naming or packaging",
            "Launch collateral",
            "Editable templates for your team",
          ],
          investment: null,
        },
        {
          name: "Brand and web",
          forWho: "For brands launching their identity and website together.",
          includes: [
            "Everything in Brand system",
            "Website design and development",
            "Conversion-focused content architecture",
            "Launch support",
          ],
          investment: null,
        },
      ],
    },
    retainer: {
      title: "Continuity plans",
      intro:
        "A brand stays alive through use. These plans give you a design studio on call every month, with priority and without quoting each piece separately.",
      items: [
        {
          name: "Presence",
          forWho: "To keep your social channels and materials up to date.",
          includes: [
            "Monthly social media pieces",
            "Updates to existing materials",
            "Brand consistency review",
          ],
          investment: null,
        },
        {
          name: "Growth",
          forWho: "For brands with frequent campaigns and launches.",
          includes: [
            "Everything in Presence",
            "Campaign and seasonal pieces",
            "Packaging and point-of-sale adaptations",
            "Monthly planning meeting",
          ],
          investment: null,
        },
        {
          name: "Dedicated studio",
          forWho: "For teams that need design on an ongoing basis.",
          includes: [
            "Everything in Growth",
            "Priority in the studio’s schedule",
            "Identity evolution",
            "Creative direction on content shoots",
          ],
          investment: null,
        },
      ],
    },
    items: {
      branding: {
        name: "Branding",
        short:
          "Strategy, naming and visual identity. The foundation of your brand: who you are, who you speak to and how you look. Everything else grows from here.",
        metaTitle: "Branding: strategy, naming and visual identity",
        metaDescription:
          "Brand strategy, naming and visual identity in one process. We define who you are, who you speak to and how your brand looks. Branding by Cree Estudio.",
        problem:
          "I have a good product, but when I explain what makes it different, even I am not sure. Everything I publish looks like it comes from a different brand.",
        includes: [
          "Discovery sessions and competitive analysis",
          "Purpose, positioning, message and tone of voice",
          "Naming with a shortlist and rationale, if you need it",
          "Logotype, color palette and type system",
          "Brand guidelines and key applications",
        ],
        excludes: [
          "Legal trademark registration (we recommend specialized counsel)",
          "Photo and video production",
          "Printing and physical production",
        ],
        outcome:
          "A brand with a consistent strategy, name and identity, ready to be applied the same way at every touchpoint.",
        investment: null,
      },
      contenido: {
        name: "Content & Social Media",
        short:
          "Content that works for your business: video, posts and management that sell, not just fill the feed.",
        metaTitle: "Content and social media management",
        metaDescription:
          "Video, posts and social media management aligned with your brand and your sales goals. Content that works for your business. Social media by Cree Estudio.",
        problem:
          "I post because I have to, but I don’t know if it does anything. My social media doesn’t look like my brand and doesn’t bring in clients.",
        includes: [
          "Content strategy and editorial pillars",
          "Monthly posting calendar",
          "Short-form video and graphic production",
          "Copy in your brand’s voice",
          "Profile management and performance reports",
        ],
        excludes: [
          "Paid ad spend",
          "Handling customer direct messages",
          "Large-scale video productions",
        ],
        outcome:
          "Social media that looks like your brand and starts conversations with real clients, not just likes.",
        investment: null,
      },
      "diseno-web": {
        name: "Web Design",
        short: "Websites and online stores that translate your brand into a digital experience that sells.",
        metaTitle: "Web design and online stores for brands",
        metaDescription:
          "Custom websites and online stores that load fast and match your identity, with a dashboard to edit content on your own. Web design by Cree Estudio.",
        problem:
          "My website doesn’t reflect the level of my brand. It loads slowly, looks generic and almost nobody contacts us or buys through it.",
        includes: [
          "Content architecture and user journey",
          "Interface design aligned with your identity",
          "Custom development or online store, fast and mobile-ready",
          "A dashboard to edit content without depending on anyone",
          "Technical SEO foundations and analytics",
        ],
        excludes: [
          "Writing all the copy",
          "Photography and video",
          "Monthly maintenance (available in continuity plans)",
        ],
        outcome:
          "A site that loads fast, looks as good as your brand and turns visits into conversations and sales.",
        investment: null,
      },
      packaging: {
        name: "Packaging",
        short: "Packaging that makes opening your product an experience.",
        metaTitle: "Packaging design",
        metaDescription:
          "Packaging and label design with print-ready artwork. Packaging people recognize on the shelf and that photographs well on social media.",
        problem:
          "My product is good, but on the shelf or once it arrives home it looks just like the competition.",
        includes: [
          "Concept and architecture for the packaging line",
          "Packaging and label design",
          "Print-ready final artwork",
          "Mockups for sales and social",
          "Support with your print supplier",
        ],
        excludes: [
          "Printing and production costs",
          "Structural engineering for complex dielines",
          "Product photography",
        ],
        outcome:
          "Packaging people recognize, that photographs well and makes customers want to buy again.",
        investment: null,
      },
      eventos: {
        name: "Brand events",
        short:
          "Launches, pop-ups and activations. Your brand turned into an experience, so people don’t just see it: they live it.",
        metaTitle: "Brand events and activations",
        metaDescription:
          "Launches, pop-ups and activations designed from your brand. Experiences people live and remember. Brand events by Cree Estudio.",
        problem:
          "I’m about to launch something important and I don’t want a generic event: I want people to leave talking about my brand.",
        includes: [
          "Creative concept for the experience",
          "Space design, signage and graphic pieces",
          "Supplier coordination and production",
          "Event content for social media",
          "On-site support on the day",
        ],
        excludes: [
          "Venue rental and production costs",
          "Catering and guest logistics",
          "Local permits and paperwork",
        ],
        outcome:
          "An event that feels 100% like your brand and leaves content, contacts and conversation after the day.",
        investment: null,
      },
    },
  },
  work: {
    metaTitle: "Branding and visual identity projects",
    metaDescription:
      "Branding, visual identity and packaging work for brands in the United States, Spain and Latin America. See the work of Cree Estudio.",
    title: "Work",
    intro: "Brands we built alongside their founders, from strategy to the last detail.",
    servicesLabel: "Services",
    yearLabel: "Year",
    locationLabel: "Location",
    prev: "Previous project",
    next: "Next project",
  },
  contact: {
    metaTitle: "Tell us about your project",
    metaDescription:
      "Answer a 3-minute questionnaire about your brand and we will get back to you within one business day to schedule a discovery call.",
    title: "Tell us about your project",
    intro:
      "Before we talk budget, we want to understand your business. The questionnaire takes about 3 minutes and helps us prepare a proposal that fits. If we are a good match, we reply within one business day with a link to book the call.",
    form: {
      stepOf: "Step {current} of {total}",
      next: "Continue",
      back: "Back",
      submit: "Send and request my call",
      sending: "Sending…",
      project: {
        title: "Your project",
        companyLabel: "Company or project name",
        needsLabel: "What do you need? You can choose more than one.",
        needs: {
          branding: "Branding",
          contenido: "Content and social media",
          "diseno-web": "Web design",
          packaging: "Packaging",
          eventos: "Brand events",
          otro: "Something else",
        },
      },
      moment: {
        title: "Where your brand is",
        stageLabel: "Where is your brand today?",
        stages: {
          nueva: "It’s new and hasn’t launched yet",
          "no-representa": "It exists, but no longer represents us",
          rebranding: "It’s an established brand that needs a rebrand",
        },
        stakesLabel: "What happens to your business if this isn’t solved in the next 90 days?",
        stakesHint: "Two or three sentences are enough.",
      },
      budget: {
        title: "Investment",
        label: "What is your investment range for this project?",
        options: {
          "lt-1500": "Under 1,500 USD",
          "1500-4000": "1,500 to 4,000 USD",
          "4000-8000": "4,000 to 8,000 USD",
          "8000-15000": "8,000 to 15,000 USD",
          "gt-15000": "Over 15,000 USD",
          unknown: "Not sure yet, I need guidance",
        },
        lowMessage:
          "Our identity projects start at a higher range. If you are just getting started, send the form anyway: we will tell you honestly which option makes the most sense for where you are.",
      },
      timing: {
        title: "Timing",
        label: "When do you need it ready?",
        options: {
          "lt-1m": "In less than a month",
          "1-3m": "In 1 to 3 months",
          "3-6m": "In 3 to 6 months",
          flexible: "No fixed date",
        },
      },
      contact: {
        title: "Your details",
        nameLabel: "Your name",
        emailLabel: "Email",
        channelLabel: "How would you like us to reach you?",
        channels: {
          email: "Email",
          whatsapp: "WhatsApp",
          video: "Video call",
        },
        phoneLabel: "WhatsApp number with country code",
        consentBefore: "I accept the ",
        consentLink: "privacy policy",
        consentAfter: " so you can reply to my request.",
      },
      errors: {
        required: "Fill in this field to continue.",
        email: "Check the email address: it looks incomplete.",
        needs: "Choose at least one option.",
        stakes: "Tell us a little more. One full sentence is enough.",
        phone: "Enter your number with the country code, for example +1 212 555 0147.",
        consent: "We need your permission to reply.",
        server: "We couldn’t send the form. Please try again in a few minutes.",
        network: "There is no connection to the server. Check your internet and try again.",
      },
      success: {
        title: "We received your request.",
        text: "We read every questionnaire personally. If your project is a good fit, we will write to you within one business day.",
      },
    },
  },
  privacy: {
    metaTitle: "Privacy policy",
    metaDescription:
      "How Cree Estudio handles the data you send through the contact form.",
    title: "Privacy policy",
    updated: "Last updated: October 2026",
    sections: [
      {
        title: "Controller",
        body: [
          "Cree Estudio is responsible for the data you send us through this website.",
        ],
      },
      {
        title: "What we collect",
        body: [
          "Only what you give us in the contact form: your name, your email, your phone if you choose WhatsApp, and information about your project.",
        ],
      },
      {
        title: "How we use it",
        body: [
          "To reply to your request, prepare a proposal and continue the conversation you started. We never use it to send you advertising without your permission.",
        ],
      },
      {
        title: "Legal basis",
        body: [
          "We process your data because you ask us for a proposal: a pre-contractual step taken at your request (Article 6(1)(b) GDPR). Without the required fields of the form we cannot reply to you.",
        ],
      },
      {
        title: "How long we keep it",
        body: [
          "For as long as the sales conversation lasts and, if we work together, for the duration of the professional relationship and any legally required periods.",
        ],
      },
      {
        title: "Who we share it with",
        body: [
          "With the technical providers that let us receive and manage your message, such as our email delivery service. We never sell or hand your data to third parties.",
        ],
      },
      {
        title: "International transfers",
        body: [
          "Some of these providers are based in the United States: Vercel, which hosts this site, and Resend, which delivers your request to us by email. We only work with providers that offer the safeguards required by the GDPR for these transfers, such as the EU-U.S. Data Privacy Framework or the European Commission’s standard contractual clauses.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "You can request access to, correction or deletion of your data, object to its use or request its portability. Write to us through the contact form and we will reply.",
          "If you believe we have not handled your data properly, you can lodge a complaint with the Spanish Data Protection Agency (aepd.es).",
        ],
      },
    ],
  },
  notFound: {
    title: "This page doesn’t exist.",
    text: "The link may have changed. Go back to the homepage or browse our work.",
    home: "Back to homepage",
  },
  blog: {
    metaTitle: "Branding and design blog",
    metaDescription:
      "Ideas on branding, visual identity, naming, packaging and web design for brands that want to grow. The Cree Estudio blog.",
    title: "Blog",
    intro: "What we learn building brands: strategy, design and business, no filler.",
    all: "All",
    empty: {
      title: "We’re writing.",
      text: "Our first articles are coming soon. In the meantime, take a look at what we’ve built.",
    },
    readingTime: "{n} min read",
    more: "More articles",
    back: "Blog",
    langNote: "This article is only available in Spanish for now.",
  },
  footer: {
    tagline: "Creative studio for branding, visual identity, naming, packaging and web design.",
    navTitle: "Site",
    servicesTitle: "Services",
    socialTitle: "Follow us",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
  },
};

export default en;
