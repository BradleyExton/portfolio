import type { Metadata } from "next";
import { publicEnv } from "@/config/publicEnv";
import { profile } from "@/copy/profile";

const defaultDescription =
  "Product engineer based in Barrie, Ontario with 10+ years shipping production software. Building products and AI systems with AI agents, custom skills, and orchestrated workflows on React, Node.js, and Python.";

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
  // Only rendered once GOOGLE_SITE_VERIFICATION is set, so the tag never ships empty.
  ...(publicEnv.googleSiteVerification
    ? { verification: { google: publicEnv.googleSiteVerification } }
    : {}),
};

export const homeMetadata: Metadata = {
  title: `${profile.fullName} | ${profile.title}`,
  description: defaultDescription,
};

export const aboutMetadata: Metadata = {
  title: `About | ${profile.fullName}`,
  description:
    "Learn more about Bradley Exton, a product engineer based in Barrie, Ontario with 10+ years of experience building software products and AI systems.",
};

const servicesTitle = `Web Design & Development Services in Barrie | ${profile.fullName}`;
const servicesDescription =
  "Websites, custom web applications, and AI automation for businesses in Barrie and Simcoe County. Built by an engineer with 10+ years of production experience, not an agency.";

export const servicesMetadata: Metadata = {
  title: servicesTitle,
  description: servicesDescription,
  keywords: [
    "web designer Barrie",
    "web developer Barrie",
    "website design Simcoe County",
    "small business website Ontario",
    "custom web application",
    "AI automation",
  ],
  openGraph: {
    title: servicesTitle,
    description: servicesDescription,
    url: `${profile.links.website}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: servicesTitle,
    description: servicesDescription,
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
