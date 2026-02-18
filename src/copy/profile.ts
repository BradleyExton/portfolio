export const profile = {
  firstName: "Bradley",
  lastName: "Exton",
  fullName: "Bradley Exton",
  initials: "BE",
  title: "Senior Full-Stack Developer",
  tagline: "Senior Full-Stack Developer",
  email: "bradley@bradleyexton.ca",
  location: "Barrie, Ontario, Canada",
  links: {
    website: "https://bradleyexton.ca",
    linkedin: "https://www.linkedin.com/in/bradley-exton-7aa347136/",
    github: "https://github.com/bradleyexton",
  },
} as const;

export const profileComputed = {
  mailto: `mailto:${profile.email}`,
} as const;
