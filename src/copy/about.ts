export const aboutCopy = {
  hero: {
    badge: "Available for opportunities",
    heading: "About Me",
    description:
      "I'm an AI-native full-stack engineer based in Barrie, Ontario. I've spent 10+ years building web applications at companies from early-stage startups to established tech platforms — and the last year rebuilding how I work around AI agents.",
    highlights: [
      "10+ years experience",
      "Barrie, Ontario",
      "AI-agent-driven delivery",
    ],
  },
  story: {
    eyebrow: "My Story",
    paragraphs: [
      "I got into programming because I wanted to build things — not just use them. After studying Computer Programming at Conestoga College, I landed my first dev job at Weedmaps in 2016. I started as a junior and grew into an intermediate role over 3.5 years, learning what it takes to ship real products to real users.",
      "From there, I moved through roles at RenoRun (scaling a logistics platform across North America) and Local Logic (building location intelligence tools). Each company taught me something different — how to move fast at a startup, how to scale systems, and how to collaborate with product and design teams to build features people actually use.",
      "Then, about a year ago, the way I build changed completely. What started as experimenting with AI coding tools turned into a full pivot: today, most of my code is written by AI agents that I design, direct, and review. I've gone deep on the craft behind that — custom agents and skills, MCP servers, multi-agent orchestration, and the context engineering and feedback loops that make agent output production-quality. I work across Claude, Codex, and Gemini daily.",
      "I believe this is where the whole field is going: the senior engineer's job is becoming writing the spec, engineering the context, and holding the quality bar while agents do the typing. Ten years of shipping software is exactly what makes me good at that job — I know what production-ready looks like, so I know what to demand from the agents. Now I'm focused on building this way for product teams, and bringing the same leverage to local businesses.",
    ],
  },
  beliefs: {
    eyebrow: "What I Believe",
    heading: "My approach to building software",
    items: [
      {
        title: "AI raises the bar — it doesn't lower it.",
        description:
          "When agents write the code, specs, standards, and review matter more, not less. The engineers who thrive won't be the ones who type fastest — they'll be the ones who can define quality precisely enough that an agent can hit it.",
      },
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
        "Claude Code, Codex, Gemini, Custom Agents & Orchestration, Skills & Plugins, MCP Servers, Context Engineering, Eval & Feedback Loops, Automation Runbooks",
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
