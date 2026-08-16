import { profile } from "@/copy/profile";

// Server-only counterpart to publicEnv. Nothing here may be imported from a
// client component: these values are secrets or delivery details that must not
// reach the browser bundle.
const toNonEmptyValue = (value: string | undefined): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

type ServerEnv = {
  resendApiKey: string | null;
  contactFromEmail: string;
  contactToEmail: string;
};

export const serverEnv: ServerEnv = {
  resendApiKey: toNonEmptyValue(process.env.RESEND_API_KEY),
  // Must sit on the domain verified in Resend, not the Workspace inbox domain.
  contactFromEmail:
    toNonEmptyValue(process.env.CONTACT_FROM_EMAIL) ?? "contact@send.bradleyexton.ca",
  contactToEmail: toNonEmptyValue(process.env.CONTACT_TO_EMAIL) ?? profile.email,
};

export const isContactFormEnabled = () => {
  return Boolean(serverEnv.resendApiKey);
};
