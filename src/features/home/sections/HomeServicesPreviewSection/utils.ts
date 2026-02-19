import type {
  HomeServicePreviewItem,
  RawServicePreviewItem,
  ServiceKey,
} from "./types";

const titleToServiceKey: Record<string, ServiceKey> = {
  Websites: "websites",
  "Web Applications": "webApps",
  "AI-Powered Tools": "aiTools",
};

const detailsByServiceKey: Record<
  ServiceKey,
  Omit<HomeServicePreviewItem, "key" | "title" | "description">
> = {
  websites: {
    outcome: "Reduce friction and drive more qualified inquiries.",
    deliveryHint: "Typical build: 2 to 3 weeks",
    tags: ["Marketing Pages", "Content-Editable", "SEO Foundation"],
  },
  webApps: {
    outcome: "Reduce busywork and drive more reliable execution.",
    deliveryHint: "Typical build: 4 to 8 weeks",
    tags: ["Workflow Automation", "Secure Auth", "Reporting"],
  },
  aiTools: {
    outcome: "Reduce manual effort and drive more team leverage.",
    deliveryHint: "Typical build: scope-based",
    tags: ["Assistants", "Integrations", "Process Intelligence"],
  },
};

const getServiceKeyFromTitle = (title: string): ServiceKey =>
  titleToServiceKey[title] ?? "webApps";

export const buildHomeServicePreviewItems = (
  items: readonly RawServicePreviewItem[],
): readonly HomeServicePreviewItem[] =>
  items.map((item) => {
    const key = getServiceKeyFromTitle(item.title);
    const details = detailsByServiceKey[key];

    return {
      key,
      title: item.title,
      description: item.description,
      outcome: details.outcome,
      deliveryHint: details.deliveryHint,
      tags: details.tags,
    };
  });
