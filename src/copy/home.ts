export const homeCopy = {
  hero: {
    badge: "Available for opportunities",
    heading: {
      prefix: "Senior",
      highlight: "Full-Stack",
      suffix: "Developer",
    },
    description:
      "I'm Bradley — a developer based in Barrie, Ontario with 9+ years of experience building web applications, from early-stage startups to scale-ups. I specialize in React, Node.js, and modern JavaScript.",
    ctaPrimary: "View My Work",
    ctaSecondary: "Get In Touch",
    yearsExperience: "9+",
    yearsExperienceLabel: "Years Exp.",
  },
  aboutSnapshot: {
    eyebrow: "What I Do",
    heading: "Senior full-stack delivery, accelerated with AI workflows",
    description:
      "I lead end-to-end delivery for a customer-facing reporting platform at Local Logic, acting as a key technical owner across Product, Design, Data, Platform, and Support. I partner closely with stakeholders to translate requirements into PRDs, technical specs, and clear Jira execution plans, then carry work through Figma iteration, implementation, testing, and production launch. Over the last year, I've also built AI workflows and automations that improve delivery speed and cross-team productivity without lowering quality.",
    cta: "More about me",
    aiFocusLabel: "AI Workflow",
  },
  whatIDoCapabilities: [
    {
      id: "delivery",
      nodeLabel: "Delivery",
      title: "Product Delivery & Leadership",
      outcome: "Turn ambiguous goals into shippable plans teams can execute with confidence.",
      proofPoints: [
        "Translate initiatives into PRDs, technical specs, and Jira-ready execution plans with realistic estimates.",
        "Lead cross-functional delivery from Figma iteration through implementation, testing, release coordination, and production launch.",
      ],
      techChips: ["Product Discovery", "PRDs", "Technical Specs", "Jira Planning", "Cross-Functional Leadership"],
      emphasis: "core",
    },
    {
      id: "frontend",
      nodeLabel: "Front-End",
      title: "Front-End Systems & Quality",
      outcome: "Build polished interfaces that stay fast, accessible, and maintainable as products scale.",
      proofPoints: [
        "Led the shift from static PDF reports to an interactive Next.js experience with strong UX parity.",
        "Own a layered quality strategy across unit, component, and end-to-end testing while evolving maintainable theming patterns.",
      ],
      techChips: ["React", "Next.js", "TypeScript", "Vitest", "Jest", "Playwright"],
      emphasis: "core",
    },
    {
      id: "platform",
      nodeLabel: "Platform",
      title: "Platform, Integrations & Observability",
      outcome: "Design backend and cloud architecture that scales while improving reliability and product visibility.",
      proofPoints: [
        "Built FastAPI and Express services on AWS serverless patterns, including secure enterprise SSO via SAML/OIDC.",
        "Delivered Stripe and Salesforce integrations while expanding Mixpanel and Sentry instrumentation to reduce recurring production issues.",
      ],
      techChips: ["FastAPI", "Express", "AWS Lambda", "DynamoDB", "SAML/OIDC", "Mixpanel", "Sentry"],
      emphasis: "core",
    },
    {
      id: "ai",
      nodeLabel: "AI",
      title: "AI Workflow & Automation",
      outcome:
        "Implement practical AI workflows that accelerate delivery without lowering quality. Recent stack: Codex, Claude Code, MCP Servers, and ChatGPT Integrations.",
      proofPoints: [
        "Built custom agent and MCP workflows for engineering and business-facing tasks that speed delivery.",
        "Defined reusable AI standards (spec.md and agent.md) plus automations for Sentry triage, PR readiness, and docs updates.",
      ],
      techChips: ["Codex", "Claude Code", "MCP Servers", "ChatGPT Integrations", "AI Standards"],
      emphasis: "ai",
    },
  ],
  experience: {
    eyebrow: "Experience",
    heading: "Where I've Worked",
    cta: "View full experience on LinkedIn",
    currentLabel: "Current",
    items: [
      {
        company: "Local Logic",
        role: "Senior Software Developer",
        description:
          "Primary technical owner of a customer-facing reporting platform, leading full-stack delivery and product direction through major team transitions.",
        highlights: [
          "Led migration from static PDF reporting to an interactive web experience, improving usability while preserving feature parity.",
          "Evolved theming and custom-branding architecture, including a scalable color-driven illustration approach that preserved product differentiation.",
          "Designed and delivered backend/frontend branding architecture updates to support distinct experiences across channels without brittle workarounds.",
          "Expanded analytics and internal tooling to enable self-serve branding and authentication management for non-engineering teams.",
          "Shared technical context through documentation, AI tooling presentations, and onboarding support while driving standards automation for sustainable team velocity.",
        ],
        period: "2022 - Present",
        monogram: "LL",
        techChips: ["Next.js", "React", "Python", "FastAPI", "AWS", "Lambda", "DynamoDB", "Sentry"],
        current: true,
      },
      {
        company: "RenoRun",
        role: "Front End Developer",
        description:
          "Delivered high-impact front-end features across web and mobile products for a contractor supply platform expanding across North America.",
        highlights: [
          "Built a walk-in service pricing feature that improved charge accuracy and protected revenue from underbilling.",
          "Managed release cycles end-to-end, coordinating stakeholders, deployment, and post-release monitoring.",
        ],
        period: "Dec 2021 - Feb 2023",
        monogram: "RR",
        techChips: ["Angular", "React", "Next.js", "React Native"],
        current: false,
      },
      {
        company: "Opsware Data",
        role: "Web Developer",
        description:
          "Built and optimized the company website with an emphasis on discoverability, compliance, and maintainable content operations.",
        highlights: [
          "Led SEO and GDPR-focused implementation work from design handoff through production delivery.",
          "Integrated analytics and CMS workflows so product teams could iterate on content without engineering bottlenecks.",
        ],
        period: "Oct 2019 - Dec 2021",
        monogram: "OD",
        techChips: ["React", "GatsbyJS", "SEO", "GDPR"],
        current: false,
      },
      {
        company: "Weedmaps",
        role: "Full Stack Developer",
        description:
          "Shipped product and platform improvements for SaaS point-of-sale workflows in a fast-moving cannabis technology environment.",
        highlights: [
          "Led a major UI redesign initiative that replaced most React components and improved the overall product experience.",
          "Built dashboard and hardware integration features that streamlined onboarding and store-side operations.",
        ],
        period: "May 2016 - Oct 2019",
        monogram: "WM",
        techChips: ["React", "Meteor", "Node.js", "Data Visualization"],
        current: false,
      },
    ],
  },
  servicesPreview: {
    eyebrow: "Services",
    heading: "Available for Select Projects",
    description:
      "Outside of my full-time role, I take on a limited number of projects for local businesses and startups.",
    cta: "Learn more about services",
    items: [
      {
        title: "Websites",
        description:
          "Marketing sites and landing pages built with modern tools — fast, responsive, and easy to update.",
        price: "Starting at $1,500",
        icon: "🌐",
      },
      {
        title: "Web Applications",
        description:
          "Dashboards, booking systems, client portals — tools built specifically for how your business operates.",
        price: "Starting at $3,000",
        icon: "⚡",
      },
      {
        title: "AI-Powered Tools",
        description:
          "Chatbots, automated workflows, and integrations that save hours of manual work.",
        price: "Custom pricing",
        icon: "🤖",
      },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    heading: "What People Are Saying",
    items: [
      {
        id: 1,
        quote:
          "Bradley built exactly what we needed — no fluff, no delays. Professional and efficient.",
        name: "S. Patel",
        role: "Founder, Toronto Startup",
      },
      {
        id: 2,
        quote:
          "Professional, responsive, and genuinely cared about the outcome. Would highly recommend.",
        name: "M. Chen",
        role: "Owner, Barrie Local Business",
      },
    ],
  },
  contactCta: {
    heading: "Let's Connect",
    description:
      "Whether you're hiring, have a project in mind, or just want to chat about tech — I'd love to hear from you.",
    ctaPrimary: "Send Me an Email",
    ctaSecondary: "Book a Call",
  },
  techStackPills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Tailwind CSS",
  ],
} as const;
