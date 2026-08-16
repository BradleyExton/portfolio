"use client";

import { contactCopy } from "@/copy/contact";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import { ContactFormFields, ContactFormSuccessState, ContactFormUnavailableState } from "../components";
import * as styles from "./styles";
import type { ContactFormSectionProps } from "./types";
import { useContactFormController } from "./useContactFormController";

export function ContactFormSection({ isEnabled }: ContactFormSectionProps) {
  const {
    formData,
    isSubmitting,
    submitStatus,
    isUnavailable,
    updateField,
    handleFieldFocus,
    handleSubmit,
  } = useContactFormController({ isEnabled });

  return (
    <div className={styles.container}>
      <ScrollReveal className={styles.header}>
        <SectionIntro
          title={contactCopy.form.heading}
          description={contactCopy.form.intro}
          titleClassName={styles.heading}
          descriptionClassName={styles.intro}
        />
      </ScrollReveal>

      {isUnavailable ? (
        <ScrollReveal delayMs={100}>
          <ContactFormUnavailableState />
        </ScrollReveal>
      ) : null}

      {submitStatus === "success" ? (
        <ScrollReveal delayMs={120}>
          <ContactFormSuccessState />
        </ScrollReveal>
      ) : (
        <ScrollReveal delayMs={120}>
          <ContactFormFields
            formData={formData}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
            isEnabled={isEnabled}
            onFieldFocus={handleFieldFocus}
            onFieldChange={updateField}
            onSubmit={handleSubmit}
          />
        </ScrollReveal>
      )}
    </div>
  );
}
