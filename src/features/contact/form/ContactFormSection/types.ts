export type ContactFormSectionProps = {
  isEnabled: boolean;
};

export type SubmitStatus = "idle" | "success" | "error";

export type ContactFormData = {
  name: string;
  email: string;
  topic: string;
  message: string;
  // Honeypot. Stays empty for anyone using a browser; the server rejects the rest.
  company: string;
};
