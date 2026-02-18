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
    aiToolbeltHeading: "AI Tools (Recent Focus)",
  },
  whatIDoCapabilities: [
    {
      title: "Front-End Engineering",
      outcome: "Build polished web interfaces that stay fast, accessible, and maintainable as products scale.",
      proofPoints: [
        "Led the transition from static PDF reports to an interactive Next.js web experience with polished UX and motion.",
        "Iterate on Figma designs and ship pixel-accurate interfaces while preserving content and data parity across report formats.",
      ],
      techChips: ["React", "Next.js", "TypeScript", "React Native"],
      emphasis: "core",
    },
    {
      title: "Product-Focused Engineering",
      outcome: "Translate business goals into clear, scoped execution plans that teams can deliver with confidence.",
      proofPoints: [
        "Partner closely with Product, Design, and stakeholders to define requirements, tradeoffs, and delivery priorities.",
        "Turn ambiguous initiatives into PRDs, technical specs, and Jira-ready tickets with realistic estimates and aligned milestones.",
      ],
      techChips: ["Product Discovery", "Figma", "Jira", "Technical Specs", "Backlog Planning"],
      emphasis: "core",
    },
    {
      title: "Cloud & Backend Architecture",
      outcome: "Design backend systems and cloud infrastructure that scale with product demand.",
      proofPoints: [
        "Diagnose platform constraints and deliver scalable architecture changes, including support for context-specific branding across delivery channels.",
        "Build Python (FastAPI) and Node.js (Express) services with AWS serverless patterns, including Cognito, DynamoDB, Lambda, and enterprise SSO flows.",
        "Implement SSO integrations using SAML and OIDC to support secure, scalable authentication across customer environments.",
      ],
      techChips: ["Python", "Node.js", "Express", "FastAPI", "AWS", "SSO (SAML/OIDC)"],
      emphasis: "core",
    },
    {
      title: "Quality Engineering & Testing",
      outcome: "Build release confidence with layered testing across frontend and backend systems.",
      proofPoints: [
        "Own test strategy across unit, integration/component, and end-to-end coverage.",
        "Use Vitest and Jest for frontend quality, Cypress and Playwright for user-flow regression, and Pytest with Pydantic validation tests to catch backend data and contract issues before production.",
      ],
      techChips: ["Vitest", "Jest", "Cypress", "Playwright", "Pytest", "Pydantic"],
      emphasis: "core",
    },
    {
      title: "Engineering Standards & Enablement",
      outcome: "Raise team productivity and consistency through standards, documentation, and coaching.",
      proofPoints: [
        "Automate front-end standards enforcement and codify repeatable quality practices across the delivery workflow.",
        "Share context through technical docs, AI tooling presentations, and onboarding support for engineers and cross-functional partners.",
      ],
      techChips: ["FE Standards", "Documentation", "Coaching", "Cross-Functional Enablement"],
      emphasis: "core",
    },
    {
      title: "AI Tooling & Automation",
      outcome: "Build practical AI workflows that accelerate delivery and reduce repetitive engineering overhead.",
      proofPoints: [
        "Implement custom agents, MCP server workflows, and ChatGPT integrations for engineering and business-facing use cases.",
        "Present practical AI adoption patterns (including Jira and Confluence workflows via MCP), author spec.md and agent.md standards, and run Codex automations for Sentry triage, PR readiness, and docs updates.",
      ],
      techChips: ["Custom Agents", "MCP Servers", "ChatGPT Integrations", "AI Standards"],
      emphasis: "ai",
    },
    {
      title: "Integrations, Analytics & Observability",
      outcome: "Connect critical business platforms and instrument product behavior and reliability for better decisions.",
      proofPoints: [
        "Implement Salesforce and Stripe integrations while expanding Mixpanel with provider attribution and group analytics for stronger product visibility.",
        "Integrate Sentry monitoring and lead defensive hardening initiatives that reduce recurring production failures and support overhead.",
      ],
      techChips: ["Salesforce", "Stripe", "Mixpanel", "Google Analytics", "Sentry"],
      emphasis: "core",
    },
  ],
  aiToolbelt: [
    {
      name: "Codex",
      usage: "Custom agent workflows for implementation, plus standards-driven automations for Sentry triage, PR checks, and documentation tasks.",
      level: "core",
    },
    {
      name: "Claude Code",
      usage: "Deep codebase analysis, planning support, and structured edits with reusable agent skills.",
      level: "core",
    },
    {
      name: "GitHub Copilot",
      usage: "In-editor acceleration for repetitive code patterns.",
      level: "core",
    },
    {
      name: "MCP Servers",
      usage: "Tool-connected agent context for repo, docs, and platform workflows.",
      level: "core",
    },
    {
      name: "ChatGPT Integrations",
      usage: "Chat-based features and internal productivity workflows for cross-functional teams.",
      level: "core",
    },
    {
      name: "Gemini Code Assist / Cloud Code",
      usage: "Evaluating cloud-native development workflows.",
      level: "exploring",
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
