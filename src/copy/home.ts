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
      "I build fast, reliable web applications — the kind that scale. Currently a Senior Developer at Local Logic, I've spent the last decade shipping product across companies like Weedmaps, Opsware Data, and RenoRun.",
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
          "Delivered neighborhood intelligence features that made location data faster to interpret and easier to trust for end users.",
        highlights: [
          "Translated dense geospatial data into clear product experiences for both consumers and enterprise stakeholders.",
          "Improved feature reliability through iterative UI polish, API integration hardening, and performance-focused refactors.",
        ],
        period: "2022 - Present",
        monogram: "LL",
        techChips: ["React", "TypeScript", "Data Visualization", "Maps API"],
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
