import type {
  HomeServicePreviewItem,
  RawServicePreviewItem,
  ServiceKey,
} from "./types";

const titleToServiceKey: Record<string, ServiceKey> = {
  Websites: "websites",
  "Web Applications": "webApps",
  "AI Workflows": "aiTools",
};

const hrefByServiceKey: Record<ServiceKey, string> = {
  websites: "/services#websites",
  webApps: "/services#web-applications",
  aiTools: "/services#ai-tools",
};

const getServiceKeyFromTitle = (title: string): ServiceKey =>
  titleToServiceKey[title] ?? "webApps";

export const buildHomeServicePreviewItems = (
  items: readonly RawServicePreviewItem[],
): readonly HomeServicePreviewItem[] =>
  items.map((item) => {
    const key = getServiceKeyFromTitle(item.title);

    return {
      key,
      title: item.title,
      outcome: item.outcome,
      timeline: item.timeline,
      tags: item.tags,
      href: hrefByServiceKey[key],
    };
  });
