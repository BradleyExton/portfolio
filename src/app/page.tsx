import type { Metadata } from "next";
import { homeMetadata } from "@/copy/metadata";
import HomePageClient from "@/features/home/HomePageClient";

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  return <HomePageClient />;
}
