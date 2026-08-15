export const profile = {
  firstName: "Bradley",
  lastName: "Exton",
  fullName: "Bradley Exton",
  initials: "BE",
  title: "Full-Stack Product Engineer",
  tagline: "Full-Stack Product Engineer",
  email: "bradley@bradleyexton.ca",
  location: "Barrie, Ontario, Canada",
  links: {
    // Canonical host. The apex domain 308-redirects to www in production, so every
    // sitemap, canonical, and structured-data URL has to use www to avoid pointing
    // search engines and ad crawlers at a redirect.
    website: "https://www.bradleyexton.ca",
    linkedin: "https://www.linkedin.com/in/bradley-exton-7aa347136/",
    github: "https://github.com/bradleyexton",
  },
} as const;

export const profileComputed = {
  mailto: `mailto:${profile.email}`,
} as const;
