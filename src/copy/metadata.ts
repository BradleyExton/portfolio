import type { Metadata } from "next";
import { profile } from "@/copy/profile";

const defaultDescription =
  "AI-native full-stack engineer based in Barrie, Ontario with 10+ years shipping production web applications. Building with AI agents, custom skills, and orchestrated workflows on React, Node.js, and Python.";

export const siteMetadata: Metadata = {
  metadataBase: new URL(profile.links.website),
  title: `${profile.fullName} | ${profile.title}`,
  description: defaultDescription,
  keywords: [
    "AI-native engineer",
    "full-stack developer",
    "AI agents",
    "agent orchestration",
    "context engineering",
    "Claude Code",
    "MCP",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
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

export const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.title,
  email: profile.email,
  url: profile.links.website,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barrie",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  sameAs: [profile.links.linkedin, profile.links.github],
} as const;

export const homeMetadata: Metadata = {
  title: `${profile.fullName} | ${profile.title}`,
  description: defaultDescription,
};

export const aboutMetadata: Metadata = {
  title: `About | ${profile.fullName}`,
  description:
    "Learn more about Bradley Exton, an AI-native full-stack engineer based in Barrie, Ontario with 10+ years of experience building web applications.",
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
