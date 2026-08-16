import { describe, expect, it } from "vitest";
import {
  buildContactEmailSubject,
  buildContactEmailText,
  validateContactMessage,
} from "./contactMessage";

const validPayload = {
  name: "Bradley",
  email: "brad@example.com",
  topic: "hiring",
  message: "Hello there",
  company: "",
};

describe("validateContactMessage", () => {
  it("accepts a complete submission", () => {
    const result = validateContactMessage(validPayload);

    expect(result.ok).toBe(true);
    expect(result.ok && result.value.email).toBe("brad@example.com");
  });

  it("trims surrounding whitespace", () => {
    const result = validateContactMessage({ ...validPayload, name: "  Bradley  " });

    expect(result.ok && result.value.name).toBe("Bradley");
  });

  it("treats a filled honeypot as a bot", () => {
    const result = validateContactMessage({ ...validPayload, company: "Acme" });

    expect(result).toEqual({ ok: false, reason: "honeypot" });
  });

  it("rejects missing required fields", () => {
    for (const field of ["name", "email", "message"]) {
      const result = validateContactMessage({ ...validPayload, [field]: "" });
      expect(result).toEqual({ ok: false, reason: "invalid" });
    }
  });

  it("rejects an implausible email", () => {
    const result = validateContactMessage({ ...validPayload, email: "not-an-email" });

    expect(result).toEqual({ ok: false, reason: "invalid" });
  });

  it("rejects an oversized message", () => {
    const result = validateContactMessage({ ...validPayload, message: "x".repeat(5001) });

    expect(result).toEqual({ ok: false, reason: "invalid" });
  });

  it("rejects non-object payloads", () => {
    expect(validateContactMessage(null)).toEqual({ ok: false, reason: "invalid" });
    expect(validateContactMessage("string")).toEqual({ ok: false, reason: "invalid" });
  });

  it("ignores non-string field values rather than throwing", () => {
    const result = validateContactMessage({ ...validPayload, name: { evil: true } });

    expect(result).toEqual({ ok: false, reason: "invalid" });
  });
});

describe("contact email content", () => {
  it("puts the topic and sender in the subject", () => {
    expect(buildContactEmailSubject(validPayload)).toBe("Portfolio contact: hiring — Bradley");
  });

  it("falls back when no topic was chosen", () => {
    expect(buildContactEmailSubject({ ...validPayload, topic: "" })).toContain("general");
    expect(buildContactEmailText({ ...validPayload, topic: "" })).toContain("unspecified");
  });

  it("includes every submitted field in the body", () => {
    const text = buildContactEmailText(validPayload);

    expect(text).toContain("Bradley");
    expect(text).toContain("brad@example.com");
    expect(text).toContain("hiring");
    expect(text).toContain("Hello there");
  });
});
