import type { Metadata } from "next";
import { servicesMetadata } from "@/copy/metadata";
import ServicesPageClient from "@/features/services/ServicesPageClient";

export const metadata: Metadata = servicesMetadata;

export default function ServicesPage() {
  return <ServicesPageClient />;
}
