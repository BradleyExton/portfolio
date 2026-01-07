import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bradley Exton | Senior Full-Stack Developer",
  description: "Senior full-stack developer based in Barrie, Ontario with 9+ years of experience building web applications. Specializing in React, Node.js, and modern JavaScript.",
  keywords: ["web developer", "full-stack developer", "React", "Node.js", "TypeScript", "Barrie", "Ontario", "freelance"],
  authors: [{ name: "Bradley Exton" }],
  openGraph: {
    title: "Bradley Exton | Senior Full-Stack Developer",
    description: "Senior full-stack developer based in Barrie, Ontario with 9+ years of experience building web applications.",
    url: "https://bradleyexton.ca",
    siteName: "Bradley Exton",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bradley Exton | Senior Full-Stack Developer",
    description: "Senior full-stack developer based in Barrie, Ontario with 9+ years of experience building web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
