export type ContactFormSectionProps = {
  formspreeFormId: string | null;
};

export type SubmitStatus = "idle" | "success" | "error";

export type ContactFormData = {
  name: string;
  email: string;
  topic: string;
  message: string;
};
