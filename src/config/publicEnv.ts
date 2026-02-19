const toNonEmptyValue = (value: string | undefined): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const toSafeHttpUrl = (value: string | null): string | null => {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
};

export type PublicEnv = {
  formspreeFormId: string | null;
  calcomUrl: string | null;
  gaMeasurementId: string | null;
  underConstruction: boolean;
};

export const publicEnv: PublicEnv = {
  formspreeFormId: toNonEmptyValue(process.env.NEXT_PUBLIC_FORMSPREE_ID),
  calcomUrl: toSafeHttpUrl(toNonEmptyValue(process.env.NEXT_PUBLIC_CALCOM_URL)),
  gaMeasurementId: toNonEmptyValue(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  underConstruction: process.env.UNDER_CONSTRUCTION === "true",
};

export const getFormspreeSubmitUrl = (
  formspreeFormId: string | null,
): string | null => {
  if (!formspreeFormId) {
    return null;
  }

  return `https://formspree.io/f/${formspreeFormId}`;
};
