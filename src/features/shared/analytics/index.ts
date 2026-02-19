type AnalyticsParams = Record<string, string | number | boolean>;

type ContactCtaType = "call" | "email" | "linkedin";
type DestinationKind = "calendar" | "mailto" | "external";

type ContactCtaClickParams = {
  ctaType: ContactCtaType;
  destinationKind: DestinationKind;
};

const hasGaMeasurementId = () => {
  return Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
};

const isProduction = () => {
  return process.env.NODE_ENV === "production";
};

const isAnalyticsEnabled = () => {
  return isProduction() && hasGaMeasurementId();
};

const getGtag = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const candidate = (window as typeof window & {
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
  }).gtag;

  return typeof candidate === "function" ? candidate : null;
};

const trackEvent = (eventName: string, params?: AnalyticsParams) => {
  if (!isAnalyticsEnabled()) {
    return;
  }

  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag("event", eventName, params);
};

const normalizeTopic = (topic: string) => {
  return topic.trim().length > 0 ? topic : "unknown";
};

export const trackContactCtaClick = ({ ctaType, destinationKind }: ContactCtaClickParams) => {
  trackEvent("contact_cta_click", {
    cta_type: ctaType,
    section: "contact_options",
    destination_kind: destinationKind,
  });
};

export const trackContactFormStart = () => {
  trackEvent("contact_form_start", {
    section: "contact_form",
  });
};

export const trackContactFormSubmit = (topic: string) => {
  trackEvent("contact_form_submit", {
    topic: normalizeTopic(topic),
    section: "contact_form",
  });
};

export const trackContactLeadGenerated = (topic: string) => {
  trackEvent("generate_lead", {
    method: "contact_form",
    topic: normalizeTopic(topic),
  });
};

export const trackContactFormError = (errorType: "submit_failed") => {
  trackEvent("contact_form_error", {
    error_type: errorType,
  });
};

