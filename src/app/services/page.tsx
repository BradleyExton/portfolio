import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | Bradley Exton",
  description:
    "Freelance web development services by Bradley Exton: websites, custom web applications, and AI-powered tools for businesses.",
  openGraph: {
    title: "Services | Bradley Exton",
    description:
      "Explore websites, web applications, and AI-powered tools for your business.",
    url: "https://bradleyexton.ca/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Bradley Exton",
    description:
      "Explore websites, web applications, and AI-powered tools for your business.",
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
