export type ServiceKey = "websites" | "webApps" | "aiTools";

export type RawServicePreviewItem = Readonly<{
  title: string;
  outcome: string;
  timeline: string;
  tags: readonly string[];
}>;

export type HomeServicePreviewItem = Readonly<{
  key: ServiceKey;
  title: string;
  outcome: string;
  timeline: string;
  tags: readonly string[];
  href: string;
}>;
