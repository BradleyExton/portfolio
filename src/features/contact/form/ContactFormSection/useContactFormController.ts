import { useRef, useState, type FormEvent } from "react";
import {
  trackContactFormError,
  trackContactFormStart,
  trackContactFormSubmit,
  trackContactLeadGenerated,
} from "@/features/shared/analytics";
import { getFormspreeSubmitUrl } from "@/config/publicEnv";
import type { ContactFormData, ContactFormSectionProps, SubmitStatus } from "./types";
import { initialFormState, submitContactForm, updateContactFormData } from "./utils";

type UseContactFormControllerResult = {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitStatus: SubmitStatus;
  submitUrl: string | null;
  isUnavailable: boolean;
  updateField: (field: keyof ContactFormData, value: string) => void;
  handleFieldFocus: () => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function useContactFormController({
  formspreeFormId,
}: ContactFormSectionProps): UseContactFormControllerResult {
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const hasTrackedStartRef = useRef(false);
  const submitUrl = getFormspreeSubmitUrl(formspreeFormId);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((previous) => updateContactFormData(previous, field, value));
  };

  const handleFieldFocus = () => {
    if (hasTrackedStartRef.current) {
      return;
    }

    hasTrackedStartRef.current = true;
    trackContactFormStart();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    trackContactFormSubmit(formData.topic);
    setIsSubmitting(true);

    const result = await submitContactForm({ submitUrl, formData });
    setSubmitStatus(result);

    if (result === "success") {
      trackContactLeadGenerated(formData.topic);
      setFormData(initialFormState);
    } else {
      trackContactFormError("submit_failed");
    }

    setIsSubmitting(false);
  };

  return {
    formData,
    isSubmitting,
    submitStatus,
    submitUrl,
    isUnavailable: !submitUrl,
    updateField,
    handleFieldFocus,
    handleSubmit,
  };
}
