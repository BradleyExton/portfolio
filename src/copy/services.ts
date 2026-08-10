export const servicesCopy = {
  hero: {
    eyebrow: "Services",
    heading: "Senior help for your website, app, or AI project.",
    description:
      "I'm based in Barrie and work with businesses across Simcoe County. I take on a few projects each quarter. You work directly with me, no agency overhead, and get senior engineering from first call to launch.",
    availabilityLabel: "Availability",
    availability: "Booking a small number of projects for Fall 2026.",
  },
  caseStudy: {
    eyebrow: "Recent work",
    heading: "A live example: Precision Tradework",
    description:
      "A renovation and finishing company in Barrie needed a site that turns local searches into quote requests. Here is what shipped.",
    client: "Precision Tradework",
    clientMeta: "Renovation and finishing, Barrie and Simcoe County",
    summary:
      "The site leads with the service area and a quote request on every page. Homeowners can read what a job involves, check that their town is covered, and send details from their phone in under a minute.",
    highlights: [
      "Service pages with the questions homeowners actually ask",
      "Multi-step quote form with spam protection, delivered straight to the owner's inbox",
      "Interactive service area map for Barrie, Simcoe County, and Muskoka",
      "Technical SEO, analytics, and cookie consent set up at launch",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Mapbox", "Resend", "Vercel"],
    linkLabel: "Visit precisiontradework.ca",
    linkHref: "https://precisiontradework.ca",
    imageAlt:
      "The Precision Tradework homepage, showing a renovated kitchen behind the headline Barrie's Trusted Renovation and Finishing Experts",
  },
  catalog: {
    eyebrow: "What I offer",
    heading: "Three ways to work together.",
    description:
      "Each engagement includes clear planning, transparent updates, and a practical handoff.",
    timelineLabel: "Typical timeline",
    deliverablesLabel: "Core deliverables",
    stackLabel: "Suggested stack",
    bestFitLabel: "Best fit",
  },
  services: [
    {
      id: "ai-tools",
      title: "AI Workflows & Integrations",
      description:
        "AI agents and automations wired into how your business already operates, built by an engineer who ships with them every day.",
      outcome:
        "Hand repetitive work to reliable automations and speed up decisions with AI that's safe, observable, and yours.",
      price: "Custom pricing",
      timeline: "3-6 weeks",
      illustration: {
        alt: "Isometric drawing of an agent console sending finished work across a board, with the last step held for a person to approve",
      },
      deliverables: [
        "Use-case mapping and ROI prioritization",
        "Workflow automation and AI orchestration",
        "Internal assistants or chat interfaces",
        "Integrations with existing systems",
        "Guardrails, monitoring, and fallback flows",
      ],
      stack: [
        "Claude & OpenAI APIs",
        "Agent orchestration",
        "MCP servers",
        "Observability tooling",
      ],
      bestFor:
        "Teams with repetitive manual workflows, fragmented tools, or support-heavy processes that need smarter automation.",
      proof:
        "I ship production software with AI agent teams daily. The same guardrails, review gates, and observability go into every workflow I hand off.",
    },
    {
      id: "websites",
      title: "Marketing Websites",
      description:
        "Conversion-focused websites that feel premium, load fast, and are easy to manage.",
      outcome:
        "Turn your website into a stronger sales and trust channel instead of just an online brochure.",
      price: "Starting at $1,500",
      timeline: "2-4 weeks",
      illustration: {
        alt: "Isometric drawing of a marketing page with a quote request lifting off it toward a send button",
      },
      deliverables: [
        "Information architecture and visual direction",
        "Responsive front-end build",
        "Performance and technical SEO baseline",
        "Form and conversion tracking setup",
        "Launch support and post-launch stabilization",
      ],
      stack: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Analytics",
      ],
      bestFor:
        "Small businesses, consultants, and startups that need a high-quality website without a long agency cycle.",
      proof:
        "Performance-first build, semantic structure, and conversion instrumentation from day one.",
    },
    {
      id: "web-applications",
      title: "Web Applications",
      description:
        "Custom internal or customer apps built around how your team actually works.",
      outcome:
        "Replace manual workflows with custom software that improves speed, visibility, and reliability.",
      price: "Starting at $3,000",
      timeline: "4-8 weeks",
      illustration: {
        alt: "Isometric drawing of an application screen riding on a solid base of data, serving records out of it",
      },
      deliverables: [
        "Discovery and scope alignment",
        "UX flows and production UI build",
        "Backend APIs and data modeling",
        "Authentication and role-aware access",
        "Deployment pipeline and release support",
      ],
      stack: [
        "React + Next.js",
        "Node.js or FastAPI",
        "Postgres or DynamoDB",
        "Vercel or AWS",
      ],
      bestFor:
        "Teams that have outgrown spreadsheets and patchwork SaaS workflows, and need software tailored to operations.",
      proof:
        "Clear scope boundaries, iterative delivery checkpoints, and maintainable architecture decisions.",
    },
  ],
  process: {
    eyebrow: "Process",
    heading: "How delivery works",
    description:
      "A simple four-step flow focused on clear decisions, predictable execution, and a clean handoff.",
    outputLabel: "You get:",
    steps: [
      {
        step: 1,
        title: "Discovery & Alignment",
        description:
          "We align on goals, users, constraints, and technical risks so the scope is grounded before work starts.",
        output:
          "A clear direction, key priorities, and early risk callouts.",
      },
      {
        step: 2,
        title: "Scope & Plan",
        description:
          "You get a practical implementation plan with deliverables, milestones, timeline, and pricing.",
        output:
          "A written scope and execution plan you can approve with confidence.",
      },
      {
        step: 3,
        title: "Build in Iterations",
        description:
          "Work is shipped in short cycles with regular reviews, so you can steer decisions before changes get expensive.",
        output:
          "Visible weekly progress and decisions captured as we go.",
      },
      {
        step: 4,
        title: "Launch & Handoff",
        description:
          "After QA and launch, I provide handoff context and support to stabilize production.",
        output:
          "A stable release, handoff notes, and short post-launch support.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Common questions",
    items: [
      {
        question: "How long does a project take?",
        answer:
          "Marketing websites usually take 2-4 weeks. Application builds typically run 4-8 weeks based on scope and integrations. You'll get a realistic timeline before work starts.",
      },
      {
        question: "Do you offer ongoing maintenance?",
        answer:
          "Yes. After the included post-launch support window, I offer monthly maintenance and iteration support based on your needs.",
      },
      {
        question: "Can you work with an existing product or codebase?",
        answer:
          "In most cases, yes. I'll review the current setup and recommend whether to improve in place or rebuild specific areas.",
      },
      {
        question: "What if I just need a small update or fix?",
        answer:
          "Smaller scoped work is available when capacity allows. Share the details and I'll confirm the fastest path.",
      },
      {
        question: "Do you do design, or just development?",
        answer:
          "Both. I can lead from planning and interface design through implementation and launch, or plug into an existing design workflow.",
      },
    ],
  },
  cta: {
    heading: "Let's scope your project.",
    description:
      "Book a free 30-minute call and I'll give you direct feedback on scope, timeline, and the best implementation path.",
    buttonLabel: "Book a Free Consultation",
  },
} as const;
