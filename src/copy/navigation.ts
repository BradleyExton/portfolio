export const navigationCopy = {
  headerPrimaryLabel: "Get In Touch",
  footerQuickLinksLabel: "Quick Links",
  footerConnectLabel: "Connect",
  items: [
    {
      label: "About",
      homeHref: "#about",
      routeHref: "/about",
    },
    {
      label: "Experience",
      homeHref: "#experience",
      routeHref: "/#experience",
    },
    {
      label: "Services",
      homeHref: "#services",
      routeHref: "/services",
    },
  ],
  footerLinks: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
