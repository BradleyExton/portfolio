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
    heading: "Building fast, reliable web applications",
    description:
      "I build fast, reliable web applications — the kind that scale. Currently a Senior Developer at Local Logic, I've spent the last decade shipping product across companies like Weedmaps and RenoRun.",
    cta: "More about me",
  },
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
          "Building location intelligence tools that help people understand neighborhoods through data.",
        period: "2022 - Present",
        current: true,
      },
      {
        company: "RenoRun",
        role: "Software Developer",
        description:
          "Scaled the contractor supply-chain platform across North American markets.",
        period: "2020 - 2022",
        current: false,
      },
      {
        company: "Weedmaps",
        role: "Junior → Intermediate Developer",
        description:
          "Grew from junior to intermediate over 3.5 years, building consumer and B2B tools in the cannabis tech space.",
        period: "2016 - 2020",
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
  skillAreas: [
    {
      label: "Front-End",
      skills: "React, Next.js, TypeScript, Tailwind CSS",
    },
    {
      label: "Back-End",
      skills: "Node.js, Python, REST APIs, GraphQL",
    },
    {
      label: "Tools",
      skills: "Git, Vercel, AWS, Figma",
    },
    {
      label: "Exploring",
      skills: "AI integrations, LLMs, automation",
    },
  ],
  techStackPills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Tailwind CSS",
  ],
} as const;
