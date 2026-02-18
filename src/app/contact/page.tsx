import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Bradley Exton",
  description:
    "Contact Bradley Exton for full-time opportunities, freelance projects, or technical collaboration.",
  openGraph: {
    title: "Contact | Bradley Exton",
    description:
      "Get in touch with Bradley Exton for opportunities, projects, and collaboration.",
    url: "https://bradleyexton.ca/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Bradley Exton",
    description:
      "Get in touch with Bradley Exton for opportunities, projects, and collaboration.",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
