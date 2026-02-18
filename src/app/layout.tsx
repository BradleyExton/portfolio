import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "@/copy/metadata";
import { publicEnv } from "@/config/publicEnv";
import UnderConstruction from "@/components/UnderConstruction";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isUnderConstruction = publicEnv.underConstruction;

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-surface-muted font-sans text-content antialiased`}
      >
        {isUnderConstruction ? <UnderConstruction /> : children}
      </body>
    </html>
  );
}
