export type ContactMessageInput = {
  name: string;
  email: string;
  topic: string;
  message: string;
  company: string;
};

export type ValidationResult =
  | { ok: true; value: ContactMessageInput }
  | { ok: false; reason: "invalid" | "honeypot" };

const MAX_LENGTHS = {
  name: 120,
  email: 200,
  topic: 60,
  message: 5000,
} as const;

const readField = (payload: Record<string, unknown>, field: string): string => {
  const value = payload[field];
  return typeof value === "string" ? value.trim() : "";
};

// Deliberately permissive: the real check is the reply landing, and an overly
// strict pattern silently loses valid addresses.
const isPlausibleEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const validateContactMessage = (payload: unknown): ValidationResult => {
  if (typeof payload !== "object" || payload === null) {
    return { ok: false, reason: "invalid" };
  }

  const record = payload as Record<string, unknown>;
  const value: ContactMessageInput = {
    name: readField(record, "name"),
    email: readField(record, "email"),
    topic: readField(record, "topic"),
    message: readField(record, "message"),
    company: readField(record, "company"),
  };

  // Hidden field no human sees. Anything in it means a bot filled the form.
  if (value.company.length > 0) {
    return { ok: false, reason: "honeypot" };
  }

  const isTooLong =
    value.name.length > MAX_LENGTHS.name ||
    value.email.length > MAX_LENGTHS.email ||
    value.topic.length > MAX_LENGTHS.topic ||
    value.message.length > MAX_LENGTHS.message;

  const isMissing =
    value.name.length === 0 || value.email.length === 0 || value.message.length === 0;

  if (isMissing || isTooLong || !isPlausibleEmail(value.email)) {
    return { ok: false, reason: "invalid" };
  }

  return { ok: true, value };
};

export const buildContactEmailSubject = (input: ContactMessageInput) => {
  const topic = input.topic.length > 0 ? input.topic : "general";
  return `Portfolio contact: ${topic} — ${input.name}`;
};

export const buildContactEmailText = (input: ContactMessageInput) => {
  return [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Topic: ${input.topic.length > 0 ? input.topic : "unspecified"}`,
    "",
    input.message,
  ].join("\n");
};
