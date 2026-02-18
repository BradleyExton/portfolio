import type { ContactFormData, SubmitStatus } from "./types";

export const initialFormState: ContactFormData = {
  name: "",
  email: "",
  topic: "",
  message: "",
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
  submitUrl: string | null;
  formData: ContactFormData;
  fetchImpl?: typeof fetch;
};

export const submitContactForm = async ({
  submitUrl,
  formData,
  fetchImpl = fetch,
}: SubmitContactFormParams): Promise<SubmitStatus> => {
  if (!submitUrl) {
    return "error";
  }

  try {
    const response = await fetchImpl(submitUrl, {
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
