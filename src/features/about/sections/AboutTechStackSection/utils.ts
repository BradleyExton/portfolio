export const FEATURE_CATEGORY = "AI & Automation";

export type TechCategoryEntry = readonly [name: string, tools: string];

export function splitTechCategories(
  categories: Record<string, string>,
): { coreEntries: TechCategoryEntry[]; featureEntry: TechCategoryEntry | null } {
  const entries = Object.entries(categories);
  return {
    coreEntries: entries.filter(([name]) => name !== FEATURE_CATEGORY),
    featureEntry: entries.find(([name]) => name === FEATURE_CATEGORY) ?? null,
  };
}

export function splitTools(tools: string): string[] {
  return tools
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean);
}
