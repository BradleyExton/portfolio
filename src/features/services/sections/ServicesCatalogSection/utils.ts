export const serviceAnchorIdByTitle: Record<string, string> = {
  Websites: "websites",
  "Web Applications": "web-applications",
  "AI-Powered Tools": "ai-powered-tools",
};

export const getServiceAnchorId = (title: string): string =>
  serviceAnchorIdByTitle[title] ?? "services";
