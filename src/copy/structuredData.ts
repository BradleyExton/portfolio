import { profile } from "@/copy/profile";

// Schema.org JSON-LD. Google reads this to connect the site to the Google
// Business Profile, so `name` here has to stay identical to the name the
// profile is registered under, and `areaServed` to the service area set there.
const businessName = "Bradley Exton Web Design";

const areaServed = [
  "Barrie, Ontario",
  "Simcoe County, Ontario",
  "Innisfil, Ontario",
  "Orillia, Ontario",
  "Muskoka, Ontario",
];

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.title,
  email: profile.email,
  url: profile.links.website,
  sameAs: [profile.links.linkedin, profile.links.github],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barrie",
    addressRegion: "ON",
    addressCountry: "CA",
  },
} as const;

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: businessName,
  description:
    "Websites, custom web applications, and AI automation for businesses in Barrie and Simcoe County, built by an engineer with 10+ years of production experience.",
  url: `${profile.links.website}/services`,
  email: profile.email,
  founder: { "@type": "Person", name: profile.fullName },
  areaServed: areaServed.map((name) => ({ "@type": "Place", name })),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Barrie",
    addressRegion: "ON",
    addressCountry: "CA",
  },
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Marketing Websites",
          description:
            "Conversion-focused websites that load fast and are easy to manage.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Applications",
          description:
            "Custom internal or customer applications built around how a team works.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Workflows and Integrations",
          description:
            "AI agents and automations wired into how a business already operates.",
        },
      },
    ],
  },
} as const;
