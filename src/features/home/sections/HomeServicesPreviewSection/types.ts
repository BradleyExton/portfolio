export type ServiceKey = "websites" | "webApps" | "aiTools";

export type RawServicePreviewItem = Readonly<{
  title: string;
  description: string;
}>;

export type HomeServicePreviewItem = Readonly<{
  key: ServiceKey;
  title: string;
  description: string;
  outcome: string;
  deliveryHint: string;
  tags: readonly string[];
}>;
