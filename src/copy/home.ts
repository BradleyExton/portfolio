export const homeCopy = {
  hero: {
    heading: {
      prefix: "",
      highlight: "AI-Native",
      suffix: "Full-Stack Engineer",
    },
    description:
      "I'm Bradley, an engineer in Barrie, Ontario. I've shipped production web apps for 10 years. These days most of my code is written by AI agents I design and direct, and it lets me deliver like a full team.",
    ctaPrimary: "See How I Work",
    ctaSecondary: "Get In Touch",
    yearsExperience: "10+",
    yearsExperienceLabel: "Years Exp.",
  },
  aboutSnapshot: {
    eyebrow: "What I Do",
    heading: "Senior full-stack delivery, accelerated with AI workflows",
    description:
      "I lead delivery end to end: PRD and technical spec, design iteration, implementation, testing, and launch. At Local Logic that means owning a customer-facing reporting platform, plus building the AI workflows and automations the team uses to ship faster without dropping quality.",
    cta: "More about me",
    portraitAlt: "Bradley Exton",
    tickerItems: [
      "PRD & Spec",
      "Design Iteration",
      "Implementation",
      "Testing",
      "Code Review",
      "Launch",
      "Automation",
    ],
  },
  whatIDoCapabilities: [
    {
      id: "delivery",
      title: "Product Delivery & Leadership",
      outcome: "Turn ambiguous goals into shippable plans teams can execute with confidence.",
      proofPoints: [
        "Translate initiatives into PRDs, technical specs, and Jira-ready execution plans with realistic estimates.",
        "Lead cross-functional delivery from Figma iteration through implementation, testing, release coordination, and production launch.",
      ],
      techChips: ["Product Discovery", "PRDs", "Technical Specs", "Jira Planning", "Cross-Functional Leadership"],
    },
    {
      id: "frontend",
      title: "Front-End Systems & Quality",
      outcome: "Build polished interfaces that stay fast, accessible, and maintainable as products scale.",
      proofPoints: [
        "Led the shift from static PDF reports to an interactive Next.js experience with strong UX parity.",
        "Own a layered quality strategy across unit, component, and end-to-end testing while evolving maintainable theming patterns.",
      ],
      techChips: ["React", "Next.js", "TypeScript", "Vitest", "Jest", "Playwright"],
    },
    {
      id: "platform",
      title: "Platform, Integrations & Observability",
      outcome: "Design backend and cloud architecture that scales while improving reliability and product visibility.",
      proofPoints: [
        "Built FastAPI and Express services on AWS serverless patterns, including secure enterprise SSO via SAML/OIDC.",
        "Delivered Stripe and Salesforce integrations while expanding Mixpanel and Sentry instrumentation to reduce recurring production issues.",
      ],
      techChips: ["FastAPI", "Express", "AWS Lambda", "DynamoDB", "SAML/OIDC", "Mixpanel", "Sentry"],
    },
  ],
  howIWork: {
    eyebrow: "How I Work",
    heading: "Spec first, agents in parallel, gates before merge",
    description:
      "AI-native is a workflow, and this is mine. Every project moves through the same four stages, whether it is a feature at Local Logic or a client build.",
    closing: "One engineer, shipping at the pace of a team. The workflow is the reason.",
    stages: [
      {
        id: "spec",
        station: "Input",
        name: "Write the spec",
        body: "Every piece of work starts as a written spec: what we are building, what done means, and what the agents need to know before they touch code. A precise spec.md is the difference between an agent that ships and an agent that guesses.",
        chips: ["spec.md", "PRDs", "acceptance criteria"],
      },
      {
        id: "context",
        station: "Setup",
        name: "Engineer the context",
        body: "Agents are only as good as what they can see. I maintain agent.md standards, reusable skills, and MCP servers so every agent session starts with the codebase conventions, the right tools, and the guardrails already loaded. The same standards drive automations for Sentry triage, PR readiness, and docs updates.",
        chips: ["agent.md", "skills", "MCP servers", "context engineering"],
      },
      {
        id: "agents",
        station: "Build",
        name: "Run the agents",
        body: "Implementation goes to agent teams: Claude Code and Codex working the spec, often across parallel worktrees. I stay on the decisions agents cannot make, which are architecture, tradeoffs, and when to stop.",
        chips: ["Claude Code", "Codex", "orchestration", "parallel worktrees"],
      },
      {
        id: "gates",
        station: "Ship",
        name: "Hold the gates",
        body: "Agent output is a draft until it clears the gates: lint, typecheck, tests, and build on every change, then a line-by-line review of the diff before merge. The gates are what make the speed safe.",
        chips: ["verify gates", "code review", "automated tests", "CI"],
      },
    ],
  },
  experience: {
    eyebrow: "Experience",
    heading: "Where I've worked",
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
        techChips: ["React", "Meteor", "Node.js", "Data Visualization"],
        current: false,
      },
    ],
  },
  servicesPreview: {
    eyebrow: "Services",
    heading: "Available for select projects",
    description:
      "I take on a small number of projects for local businesses and startups.",
    cta: "See all services",
    items: [
      {
        title: "AI Workflows",
        description:
          "AI agents and automations wired into how your business already operates.",
        price: "Custom pricing",
        icon: "🤖",
      },
      {
        title: "Websites",
        description:
          "Conversion-focused marketing sites that feel premium, load fast, and are easy to manage.",
        price: "Starting at $1,500",
        icon: "🌐",
      },
      {
        title: "Web Applications",
        description:
          "Custom internal or customer apps built around how your team actually works.",
        price: "Starting at $3,000",
        icon: "⚡",
      },
    ],
  },
  contactCta: {
    heading: "Let's connect",
    description:
      "Hiring, or have a project in mind? Send me a note. I answer everything.",
    ctaPrimary: "Send Me an Email",
    ctaSecondary: "Book a Call",
  },
  heroScreen: {
    windowTitle: "claude · agent session",
    command: "claude run overnight.md",
    lines: [
      { text: "Reading spec.md", meta: "" },
      { text: "Editing checkout.ts", meta: "+64 -12" },
      { text: "Running tests", meta: "128 passed" },
      { text: "lint · typecheck · build", meta: "clean" },
      { text: "Opening pull request", meta: "#214" },
    ],
    done: "Shipped while you were away",
  },
  heroToolchain: {
    aiPills: ["Claude Code", "Codex", "Gemini CLI", "MCP Servers"],
    stackPills: ["React", "Next.js", "TypeScript", "Node.js", "Python"],
  },
} as const;
