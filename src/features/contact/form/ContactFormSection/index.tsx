"use client";

import { useMemo, useRef, useState } from "react";
import { contactCopy } from "@/copy/contact";
import { errorCopy } from "@/copy/errors";
import { profileComputed } from "@/copy/profile";
import { getFormspreeSubmitUrl } from "@/config/publicEnv";
import {
  trackContactFormError,
  trackContactFormStart,
  trackContactFormSubmit,
  trackContactLeadGenerated,
} from "@/features/shared/analytics";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";
import type { ContactFormData, ContactFormSectionProps, SubmitStatus } from "./types";
import { initialFormState, submitContactForm, updateContactFormData } from "./utils";

export function ContactFormSection({ formspreeFormId }: ContactFormSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const hasTrackedStartRef = useRef(false);

  const submitUrl = useMemo(
    () => getFormspreeSubmitUrl(formspreeFormId),
    [formspreeFormId],
  );

  const updateField = (field: keyof ContactFormData, value: string) => {
    setFormData((previous) => updateContactFormData(previous, field, value));
  };

  const maybeTrackFormStart = () => {
    if (hasTrackedStartRef.current) {
      return;
    }

    hasTrackedStartRef.current = true;
    trackContactFormStart();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <div className={styles.container}>
      <ScrollReveal className={styles.header}>
        <h2 className={styles.heading}>{contactCopy.form.heading}</h2>
        <p className={styles.intro}>{contactCopy.form.intro}</p>
      </ScrollReveal>

      {!submitUrl && (
        <ScrollReveal delayMs={100}>
          <div
            className={styles.card}
            role="status"
          >
            <p className={styles.text}>{contactCopy.form.unavailableTitle}</p>
            <p className={styles.unavailableDescription}>{contactCopy.form.unavailableDescription}</p>
            <a className={styles.link} href={profileComputed.mailto}>
              {profileComputed.mailto.replace("mailto:", "")}
            </a>
          </div>
        </ScrollReveal>
      )}

      {submitStatus === "success" ? (
        <ScrollReveal delayMs={120}>
          <div
            className={styles.successCard}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <svg
              className={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className={styles.subheading}>{contactCopy.form.successTitle}</h3>
            <p className={styles.description}>{contactCopy.form.successDescription}</p>
          </div>
        </ScrollReveal>
      ) : (
        <ScrollReveal delayMs={120}>
          <div className={styles.layout}>
            <form onSubmit={handleSubmit} className={styles.block}>
              <div>
                <label htmlFor="name" className={styles.label}>
                  {contactCopy.form.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onFocus={maybeTrackFormStart}
                  onChange={(event) => updateField("name", event.target.value)}
                  className={styles.fieldControl}
                  placeholder={contactCopy.form.namePlaceholder}
                  disabled={!submitUrl || isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className={styles.label}>
                  {contactCopy.form.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onFocus={maybeTrackFormStart}
                  onChange={(event) => updateField("email", event.target.value)}
                  className={styles.fieldControl}
                  placeholder={contactCopy.form.emailPlaceholder}
                  disabled={!submitUrl || isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="topic" className={styles.label}>
                  {contactCopy.form.topicLabel}
                </label>
                <select
                  id="topic"
                  name="topic"
                  required
                  value={formData.topic}
                  onFocus={maybeTrackFormStart}
                  onChange={(event) => updateField("topic", event.target.value)}
                  className={styles.fieldControl}
                  disabled={!submitUrl || isSubmitting}
                >
                  <option value="">{contactCopy.form.topicDefault}</option>
                  {contactCopy.form.topics.map((topic) => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
                <p className={styles.fieldHint}>{contactCopy.form.topicHint}</p>
              </div>

              <div>
                <label htmlFor="message" className={styles.label}>
                  {contactCopy.form.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  autoComplete="off"
                  value={formData.message}
                  onFocus={maybeTrackFormStart}
                  onChange={(event) => updateField("message", event.target.value)}
                  className={styles.textareaControl}
                  placeholder={contactCopy.form.messagePlaceholder}
                  disabled={!submitUrl || isSubmitting}
                />
                <p className={styles.fieldHint}>{contactCopy.form.messageHint}</p>
              </div>

              {submitStatus === "error" && (
                <div className={styles.errorCard} role="alert">
                  {errorCopy.contact.submitFailed}
                </div>
              )}

              <button
                type="submit"
                disabled={!submitUrl || isSubmitting}
                className={styles.button}
              >
                {isSubmitting ? (
                  <>
                    <svg className={styles.spinnerIcon} fill="none" viewBox="0 0 24 24">
                      <circle
                        className={styles.spinnerTrack}
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className={styles.spinnerFill}
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {contactCopy.form.submittingLabel}
                  </>
                ) : (
                  contactCopy.form.submitLabel
                )}
              </button>
            </form>

            <aside className={styles.supportCard} aria-label={contactCopy.form.supportHeading}>
              <h3 className={styles.supportHeading}>{contactCopy.form.supportHeading}</h3>
              <ul className={styles.supportList}>
                {contactCopy.form.supportSteps.map((step) => (
                  <li key={step} className={styles.supportItem}>
                    {step}
                  </li>
                ))}
              </ul>
              <p className={styles.supportDetail}>{contactCopy.form.supportDetail}</p>
            </aside>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
