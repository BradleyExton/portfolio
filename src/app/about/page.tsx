import type { Metadata } from "next";
import { aboutMetadata } from "@/copy/metadata";
import AboutPage from "@/features/about/AboutPage";

export const metadata: Metadata = aboutMetadata;

export default function AboutRoutePage() {
  return <AboutPage />;
}
