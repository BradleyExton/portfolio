import type { Metadata } from "next";
import { contactMetadata } from "@/copy/metadata";
import { publicEnv } from "@/config/publicEnv";
import { isContactFormEnabled } from "@/config/serverEnv";
import ContactPageClient from "@/features/contact/ContactPageClient";

export const metadata: Metadata = contactMetadata;

export default function ContactPage() {
  return (
    <ContactPageClient
      isContactFormEnabled={isContactFormEnabled()}
      calcomUrl={publicEnv.calcomUrl}
    />
  );
}
