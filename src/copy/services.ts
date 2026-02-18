export const servicesCopy = {
  hero: {
    heading: "Services",
    description:
      "I take on a limited number of freelance projects alongside my full-time work. If you need a website, web application, or custom tool built right — let's talk.",
  },
  services: [
    {
      title: "Websites",
      description:
        "Marketing sites, landing pages, and business websites built with modern tools. Fast, responsive, and designed to convert.",
      price: "Starting at $1,500",
      icon: "🌐",
      features: [
        "Custom design (no templates)",
        "Mobile-responsive layout",
        "SEO fundamentals",
        "Contact forms",
        "Analytics setup",
        "1 month of support after launch",
      ],
      bestFor:
        "Small businesses, startups, professionals who need an online presence that actually works.",
    },
    {
      title: "Web Applications",
      description:
        "Custom dashboards, booking systems, client portals, and internal tools — built specifically for how your business operates.",
      price: "Starting at $3,000",
      icon: "⚡",
      features: [
        "Requirements discovery session",
        "Custom UI/UX design",
        "Full-stack development",
        "Database setup",
        "User authentication (if needed)",
        "Deployment and hosting setup",
        "1 month of support after launch",
      ],
      bestFor:
        "Businesses that have outgrown spreadsheets, need to automate workflows, or want a custom tool that off-the-shelf software can't provide.",
    },
    {
      title: "AI-Powered Tools",
      description:
        "Chatbots, automated workflows, and smart integrations that save hours of manual work.",
      price: "Custom pricing",
      icon: "🤖",
      features: [
        "Customer service chatbot for your website",
        "Automated lead qualification",
        "Document processing and data extraction",
        "Custom AI assistants for your team",
      ],
      bestFor:
        "Businesses looking to automate repetitive tasks or add intelligent features to their existing tools.",
    },
  ],
  process: {
    eyebrow: "Process",
    heading: "How I Work",
    steps: [
      {
        step: 1,
        title: "Discovery Call",
        description:
          "We hop on a 30-minute call to discuss your project. I'll ask questions to understand what you need, and give you honest feedback on scope, timeline, and budget.",
      },
      {
        step: 2,
        title: "Proposal",
        description:
          "If we're a good fit, I'll send a clear proposal with scope, timeline, and fixed pricing. No surprises.",
      },
      {
        step: 3,
        title: "Build",
        description:
          "I work in short cycles, sharing progress along the way. You'll see your project come together and have opportunities to give feedback before we're too far down the road.",
      },
      {
        step: 4,
        title: "Launch & Handoff",
        description:
          "I deploy your project, walk you through everything, and make sure you're set up for success. I stick around for a month after launch to handle any issues.",
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
          "Simple websites: 2-3 weeks. Web applications: 4-8 weeks depending on complexity. I'll give you a realistic timeline in our discovery call.",
      },
      {
        question: "Do you offer ongoing maintenance?",
        answer:
          "Yes. After the included support period, I offer monthly maintenance packages starting at $150/month. We can discuss what makes sense for your project.",
      },
      {
        question: "Can you work with my existing site?",
        answer:
          "Depends on what it's built with. I'm happy to take a look and let you know what's possible.",
      },
      {
        question: "What if I just need a small update or fix?",
        answer:
          "I offer hourly work for smaller tasks at $100/hour with a 2-hour minimum. Get in touch with details.",
      },
      {
        question: "Do you do design, or just development?",
        answer:
          "I do both. I handle the full process from design to deployment. If you already have designs, I can work from those too.",
      },
    ],
  },
  cta: {
    heading: "Let's build something.",
    description:
      "Book a free 30-minute discovery call. I'll give you honest advice on your project — whether we end up working together or not.",
    buttonLabel: "Book a Free Consultation",
  },
} as const;
