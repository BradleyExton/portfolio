import type { ContactFormData, SubmitStatus } from "./types";

export const CONTACT_ENDPOINT = "/api/contact";

export const initialFormState: ContactFormData = {
  name: "",
  email: "",
  topic: "",
  message: "",
  company: "",
};

export const updateContactFormData = (
  previous: ContactFormData,
  field: keyof ContactFormData,
  value: string,
): ContactFormData => ({
  ...previous,
  [field]: value,
});

type SubmitContactFormParams = {
  isEnabled: boolean;
  formData: ContactFormData;
  fetchImpl?: typeof fetch;
};

export const submitContactForm = async ({
  isEnabled,
  formData,
  fetchImpl = fetch,
}: SubmitContactFormParams): Promise<SubmitStatus> => {
  if (!isEnabled) {
    return "error";
  }

  try {
    const response = await fetchImpl(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    return response.ok ? "success" : "error";
  } catch {
    return "error";
  }
};
