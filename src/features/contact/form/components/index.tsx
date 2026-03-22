import type { FormEvent, ReactNode } from "react";
import { contactCopy } from "@/copy/contact";
import { errorCopy } from "@/copy/errors";
import { profileComputed } from "@/copy/profile";
import { CheckCircleIcon } from "@/features/shared/designSystem";
import * as styles from "./styles";
import type { ContactFormData, SubmitStatus } from "../ContactFormSection/types";

function SubmitSpinnerIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className={styles.spinnerTrack} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className={styles.spinnerFill}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

type ContactFormFieldProps = {
  htmlFor: string;
  label: string;
  hint?: ReactNode;
  children: ReactNode;
};

export function ContactFormField({ htmlFor, label, hint, children }: ContactFormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
      {hint ? <p className={styles.fieldHint}>{hint}</p> : null}
    </div>
  );
}

type ContactFormSubmitButtonProps = {
  disabled: boolean;
  isSubmitting: boolean;
};

export function ContactFormSubmitButton({
  disabled,
  isSubmitting,
}: ContactFormSubmitButtonProps) {
  return (
    <button type="submit" disabled={disabled} className={styles.button}>
      {isSubmitting ? (
        <>
          <SubmitSpinnerIcon className={styles.spinnerIcon} />
          {contactCopy.form.submittingLabel}
        </>
      ) : (
        contactCopy.form.submitLabel
      )}
    </button>
  );
}

export function ContactFormSupportCard() {
  return (
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
  );
}

export function ContactFormUnavailableState() {
  return (
    <div className={styles.card} role="status">
      <p className={styles.text}>{contactCopy.form.unavailableTitle}</p>
      <p className={styles.unavailableDescription}>{contactCopy.form.unavailableDescription}</p>
      <a className={styles.link} href={profileComputed.mailto}>
        {profileComputed.mailto.replace("mailto:", "")}
      </a>
    </div>
  );
}

export function ContactFormSuccessState() {
  return (
    <div className={styles.successCard} role="status" aria-live="polite" aria-atomic="true">
      <CheckCircleIcon className={styles.icon} />
      <h3 className={styles.subheading}>{contactCopy.form.successTitle}</h3>
      <p className={styles.description}>{contactCopy.form.successDescription}</p>
    </div>
  );
}

type ContactFormStatesProps = {
  formData: ContactFormData;
  submitStatus: SubmitStatus;
  isSubmitting: boolean;
  submitUrl: string | null;
  onFieldFocus: () => void;
  onFieldChange: (field: keyof ContactFormData, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
};

export function ContactFormFields({
  formData,
  isSubmitting,
  submitStatus,
  submitUrl,
  onFieldFocus,
  onFieldChange,
  onSubmit,
}: ContactFormStatesProps) {
  const disabled = !submitUrl || isSubmitting;

  return (
    <div className={styles.layout}>
      <form onSubmit={onSubmit} className={styles.block}>
        <ContactFormField htmlFor="name" label={contactCopy.form.nameLabel}>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            value={formData.name}
            onFocus={onFieldFocus}
            onChange={(event) => onFieldChange("name", event.target.value)}
            className={styles.fieldControl}
            placeholder={contactCopy.form.namePlaceholder}
            disabled={disabled}
          />
        </ContactFormField>

        <ContactFormField htmlFor="email" label={contactCopy.form.emailLabel}>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            value={formData.email}
            onFocus={onFieldFocus}
            onChange={(event) => onFieldChange("email", event.target.value)}
            className={styles.fieldControl}
            placeholder={contactCopy.form.emailPlaceholder}
            disabled={disabled}
          />
        </ContactFormField>

        <ContactFormField htmlFor="topic" label={contactCopy.form.topicLabel} hint={contactCopy.form.topicHint}>
          <select
            id="topic"
            name="topic"
            required
            value={formData.topic}
            onFocus={onFieldFocus}
            onChange={(event) => onFieldChange("topic", event.target.value)}
            className={styles.fieldControl}
            disabled={disabled}
          >
            <option value="">{contactCopy.form.topicDefault}</option>
            {contactCopy.form.topics.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </ContactFormField>

        <ContactFormField htmlFor="message" label={contactCopy.form.messageLabel} hint={contactCopy.form.messageHint}>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            autoComplete="off"
            value={formData.message}
            onFocus={onFieldFocus}
            onChange={(event) => onFieldChange("message", event.target.value)}
            className={styles.textareaControl}
            placeholder={contactCopy.form.messagePlaceholder}
            disabled={disabled}
          />
        </ContactFormField>

        {submitStatus === "error" ? (
          <div className={styles.errorCard} role="alert">
            {errorCopy.contact.submitFailed}
          </div>
        ) : null}

        <ContactFormSubmitButton disabled={disabled} isSubmitting={isSubmitting} />
      </form>

      <ContactFormSupportCard />
    </div>
  );
}
