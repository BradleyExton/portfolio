import type { Metadata } from "next";
import { profile } from "@/copy/profile";

const defaultDescription =
  "Senior full-stack developer based in Barrie, Ontario with 9+ years of experience building web applications. Specializing in React, Node.js, and modern JavaScript.";

export const siteMetadata: Metadata = {
  title: `${profile.fullName} | ${profile.title}`,
  description: defaultDescription,
  keywords: [
    "web developer",
    "full-stack developer",
    "React",
    "Node.js",
    "TypeScript",
    "Barrie",
    "Ontario",
    "freelance",
  ],
  authors: [{ name: profile.fullName }],
  openGraph: {
    title: `${profile.fullName} | ${profile.title}`,
    description: defaultDescription,
    url: profile.links.website,
    siteName: profile.fullName,
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} | ${profile.title}`,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const homeMetadata: Metadata = {
  title: `${profile.fullName} | ${profile.title}`,
  description: defaultDescription,
};

export const aboutMetadata: Metadata = {
  title: `About | ${profile.fullName}`,
  description:
    "Learn more about Bradley Exton, a senior full-stack developer based in Barrie, Ontario with 9+ years of experience building web applications.",
};

export const servicesMetadata: Metadata = {
  title: `Services | ${profile.fullName}`,
  description:
    "Freelance web development services by Bradley Exton: websites, custom web applications, and AI-powered tools for businesses.",
  openGraph: {
    title: `Services | ${profile.fullName}`,
    description:
      "Explore websites, web applications, and AI-powered tools for your business.",
    url: `${profile.links.website}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Services | ${profile.fullName}`,
    description:
      "Explore websites, web applications, and AI-powered tools for your business.",
  },
};

export const contactMetadata: Metadata = {
  title: `Contact | ${profile.fullName}`,
  description:
    "Contact Bradley Exton for full-time opportunities, freelance projects, or technical collaboration.",
  openGraph: {
    title: `Contact | ${profile.fullName}`,
    description:
      "Get in touch with Bradley Exton for opportunities, projects, and collaboration.",
    url: `${profile.links.website}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact | ${profile.fullName}`,
    description:
      "Get in touch with Bradley Exton for opportunities, projects, and collaboration.",
  },
};
