import { NextResponse } from "next/server";
import { serverEnv } from "@/config/serverEnv";
import {
  buildContactEmailSubject,
  buildContactEmailText,
  validateContactMessage,
} from "@/features/contact/server/contactMessage";
import { consumeRateLimit, getRequestIp } from "@/features/contact/server/rateLimit";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function POST(request: Request) {
  const apiKey = serverEnv.resendApiKey;
  if (!apiKey) {
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }

  if (!consumeRateLimit(getRequestIp(request.headers), Date.now())) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const validation = validateContactMessage(payload);

  if (!validation.ok) {
    // Bots get the same 200 a human gets, so a filled honeypot teaches them nothing.
    if (validation.reason === "honeypot") {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const input = validation.value;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: serverEnv.contactFromEmail,
        to: [serverEnv.contactToEmail],
        // Lets a reply go straight back to the sender from the inbox.
        reply_to: input.email,
        subject: buildContactEmailSubject(input),
        text: buildContactEmailText(input),
      }),
    });

    if (!response.ok) {
      // Body may carry the address or key, so log the status only.
      console.error(`Resend rejected the contact email with status ${response.status}`);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Contact email request failed", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
