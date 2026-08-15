import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import { siteMetadata } from "@/copy/metadata";
import { personSchema, professionalServiceSchema } from "@/copy/structuredData";
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
  const gaMeasurementId = publicEnv.gaMeasurementId;
  const isProduction = process.env.NODE_ENV === "production";
  const shouldTrackAnalytics = isProduction && Boolean(gaMeasurementId);
  // Vercel serves these two scripts from the deployment itself, so they only exist
  // in production and only once Web Analytics and Speed Insights are enabled on the project.
  const shouldTrackVercelInsights = isProduction && !isUnderConstruction;

  return (
    <ViewTransitions>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} bg-surface-muted font-sans text-content antialiased`}
        >
          {shouldTrackAnalytics && gaMeasurementId ? (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){window.dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag("js", new Date());
                  gtag("config", "${gaMeasurementId}", { send_page_view: true });
                `}
              </Script>
            </>
          ) : null}
          {shouldTrackVercelInsights ? (
            <>
              <Script id="vercel-insights-queue" strategy="afterInteractive">
                {`
                  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
                  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
                `}
              </Script>
              <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
              <Script src="/_vercel/speed-insights/script.js" strategy="afterInteractive" />
            </>
          ) : null}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([personSchema, professionalServiceSchema]),
            }}
          />
          {isUnderConstruction ? <UnderConstruction /> : children}
        </body>
      </html>
    </ViewTransitions>
  );
}
