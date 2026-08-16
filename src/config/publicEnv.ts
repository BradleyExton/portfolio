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

type PublicEnv = {
  calcomUrl: string | null;
  gaMeasurementId: string | null;
  googleSiteVerification: string | null;
  underConstruction: boolean;
};

export const publicEnv: PublicEnv = {
  calcomUrl: toSafeHttpUrl(toNonEmptyValue(process.env.NEXT_PUBLIC_CALCOM_URL)),
  gaMeasurementId: toNonEmptyValue(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  googleSiteVerification: toNonEmptyValue(process.env.GOOGLE_SITE_VERIFICATION),
  underConstruction: process.env.UNDER_CONSTRUCTION === "true",
};
