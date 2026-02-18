import type { Metadata } from "next";
import { contactMetadata } from "@/copy/metadata";
import { publicEnv } from "@/config/publicEnv";
import ContactPageClient from "@/features/contact/ContactPageClient";

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
  return (
    <ContactPageClient
      formspreeFormId={publicEnv.formspreeFormId}
      calcomUrl={publicEnv.calcomUrl}
    />
  );
}
