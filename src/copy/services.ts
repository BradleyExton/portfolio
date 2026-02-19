export const servicesCopy = {
  hero: {
    eyebrow: "Services",
    heading: "Senior full-stack execution for teams that need momentum.",
    description:
      "I take on a limited number of projects each quarter for teams that want high-quality execution without agency overhead.",
    availabilityLabel: "Availability",
    availability: "Currently booking selective projects for Spring 2026.",
  },
  catalog: {
    eyebrow: "Service Pillars",
    heading: "Choose the engagement model that matches your stage.",
    description:
      "Each engagement includes clear planning, transparent updates, and a practical handoff.",
    timelineLabel: "Typical timeline",
    deliverablesLabel: "Core deliverables",
    stackLabel: "Suggested stack",
    bestFitLabel: "Best fit",
  },
  services: [
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
        src: "/images/services/website-illustration.png",
        alt: "Abstract illustration representing a high-converting marketing website",
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
        "Replace manual workflows with productized systems that improve speed, visibility, and reliability.",
      price: "Starting at $3,000",
      timeline: "4-8 weeks",
      illustration: {
        src: "/images/services/web-application-illustration.png",
        alt: "Abstract illustration representing a custom web application workflow",
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
    {
      id: "ai-tools",
      title: "AI Workflows & Integrations",
      description:
        "Practical AI workflows integrated into existing operations without brittle complexity.",
      outcome:
        "Automate repetitive execution and accelerate decision speed with safe, observable AI workflows.",
      price: "Custom pricing",
      timeline: "3-6 weeks",
      illustration: {
        src: "/images/services/ai-tools-illustration.png",
        alt: "Abstract illustration representing AI workflows and integrations",
      },
      deliverables: [
        "Use-case mapping and ROI prioritization",
        "Workflow automation and AI orchestration",
        "Internal assistants or chat interfaces",
        "Integrations with existing systems",
        "Guardrails, monitoring, and fallback flows",
      ],
      stack: [
        "OpenAI APIs",
        "Agent workflows",
        "MCP integrations",
        "Observability tooling",
      ],
      bestFor:
        "Teams with repetitive manual workflows, fragmented tools, or support-heavy processes that need smarter automation.",
      proof:
        "Production-minded integration patterns with clear guardrails, logging, and human override pathways.",
    },
  ],
  process: {
    eyebrow: "Process",
    heading: "How delivery works",
    description:
      "A simple four-step flow focused on clear decisions, predictable execution, and a clean handoff.",
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
    heading: "Common Questions",
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
