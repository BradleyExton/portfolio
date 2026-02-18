export const aboutCopy = {
  hero: {
    heading: "About Me",
    description:
      "I'm a senior full-stack developer based in Barrie, Ontario. I've spent the last 9+ years building web applications at companies ranging from early-stage startups to established tech platforms.",
  },
  story: {
    eyebrow: "My Story",
    paragraphs: [
      "I got into programming because I wanted to build things — not just use them. After studying Computer Programming at Conestoga College, I landed my first dev job at Weedmaps in 2016. I started as a junior and grew into an intermediate role over 3.5 years, learning what it takes to ship real products to real users.",
      "From there, I moved through roles at RenoRun (scaling a logistics platform across North America) and Local Logic (building location intelligence tools). Each company taught me something different — how to move fast at a startup, how to scale systems, and how to collaborate with product and design teams to build features people actually use.",
      "Now I'm focused on two things: continuing to grow as a senior developer, and helping local businesses get access to the same quality of web development that tech companies take for granted.",
    ],
  },
  beliefs: {
    eyebrow: "What I Believe",
    heading: "My approach to building software",
    items: [
      {
        title: "Code should solve problems, not create them.",
        description:
          "I write clean, maintainable code because I've inherited enough messy codebases to know the difference. Future you (or the next developer) will thank you.",
      },
      {
        title: "Modern tools exist for a reason.",
        description:
          "React, Next.js, Tailwind — these aren't buzzwords. They're tools that let me build faster, more reliable applications. I use them because they work.",
      },
      {
        title: "Communication matters as much as code.",
        description:
          "The best developers I've worked with are the ones who can explain what they're building and why. I aim to be one of those developers.",
      },
    ],
  },
  techStack: {
    eyebrow: "Tech Stack",
    heading: "What I work with",
    categories: {
      "Front-End": "React, Next.js, TypeScript, React Native, Tailwind CSS",
      "Back-End":
        "Node.js, Python, FastAPI, AWS Lambda, DynamoDB, GraphQL, SSO",
      "Quality & Observability":
        "Vitest, Jest, Cypress, Playwright, Pytest, Pydantic, Sentry, Mixpanel, Google Analytics, Documentation",
      "Tools & Platforms":
        "Git, AWS, Figma, Contentful, Prismic, Salesforce, Stripe, Jira",
      "AI & Automation":
        "Custom agents, MCP servers, ChatGPT integrations, spec.md and agent.md standards, automation runbooks",
    },
  },
  outsideOfCode: {
    eyebrow: "Outside of Code",
    description:
      "When I'm not building software, you'll find me in Barrie enjoying the outdoors, keeping up with the latest in tech, or working on side projects that scratch a creative itch. I'm always happy to chat — whether it's about a potential project, a job opportunity, or just to talk shop about web development.",
  },
  cta: {
    heading: "Want to work together?",
    description:
      "I'm open to new opportunities — both full-time roles and select freelance projects. If you think we'd be a good fit, I'd love to hear from you.",
    emailLabel: "Send Me an Email",
    bookCallLabel: "Book a Call",
    linkedinLabel: "View LinkedIn",
  },
} as const;
