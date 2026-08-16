import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const validBody = {
  name: "Bradley",
  email: "brad@example.com",
  topic: "hiring",
  message: "Hello there",
  company: "",
};

const loadRoute = async () => {
  vi.resetModules();
  const routeModule = await import("./route");
  const { resetRateLimits } = await import("@/features/contact/server/rateLimit");
  resetRateLimits();
  return routeModule.POST;
};

const postRequest = (body: unknown, ip = "203.0.113.5") =>
  new Request("https://www.bradleyexton.ca/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const originalFetch = global.fetch;

beforeEach(() => {
  vi.stubEnv("RESEND_API_KEY", "re_test_key");
  vi.stubEnv("CONTACT_TO_EMAIL", "inbox@example.com");
  vi.stubEnv("CONTACT_FROM_EMAIL", "contact@send.example.com");
  global.fetch = vi.fn().mockResolvedValue({ ok: true } as Response);
});

afterEach(() => {
  global.fetch = originalFetch;
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("POST /api/contact", () => {
  it("sends the submission through Resend and reports success", async () => {
    const POST = await loadRoute();
    const response = await POST(postRequest(validBody));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });

    const [url, init] = vi.mocked(global.fetch).mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");

    const sent = JSON.parse(String((init as RequestInit).body));
    expect(sent.to).toEqual(["inbox@example.com"]);
    expect(sent.from).toBe("contact@send.example.com");
    expect(sent.reply_to).toBe("brad@example.com");
    expect(sent.text).toContain("Hello there");
  });

  it("reports unavailable when no API key is configured", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const POST = await loadRoute();
    const response = await POST(postRequest(validBody));

    expect(response.status).toBe(503);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("silently accepts a filled honeypot without sending", async () => {
    const POST = await loadRoute();
    const response = await POST(postRequest({ ...validBody, company: "Acme" }));

    expect(response.status).toBe(200);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("rejects an invalid submission", async () => {
    const POST = await loadRoute();
    const response = await POST(postRequest({ ...validBody, email: "nope" }));

    expect(response.status).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("rejects a malformed body", async () => {
    const POST = await loadRoute();
    const response = await POST(postRequest("{not json"));

    expect(response.status).toBe(400);
  });

  it("surfaces a send failure rather than claiming success", async () => {
    vi.mocked(global.fetch).mockResolvedValue({ ok: false, status: 422 } as Response);
    vi.spyOn(console, "error").mockImplementation(() => {});
    const POST = await loadRoute();
    const response = await POST(postRequest(validBody));

    expect(response.status).toBe(502);
  });

  it("blocks a caller past the rate limit", async () => {
    const POST = await loadRoute();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await POST(postRequest(validBody));
    }

    const response = await POST(postRequest(validBody));
    expect(response.status).toBe(429);
  });
});
