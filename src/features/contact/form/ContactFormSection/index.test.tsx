import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { contactCopy } from "@/copy/contact";
import { ContactFormSection } from "./index";

describe("ContactFormSection", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("shows unavailable state and disables submit when form ID is missing", () => {
    render(<ContactFormSection formspreeFormId={null} />);

    expect(screen.getByText(contactCopy.form.unavailableTitle)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: contactCopy.form.submitLabel })).toBeDisabled();
  });

  it("submits successfully when Formspree responds with ok", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.mocked(global.fetch);
    fetchMock.mockResolvedValue({ ok: true } as Response);

    render(<ContactFormSection formspreeFormId="abc123" />);

    await user.type(screen.getByLabelText(contactCopy.form.nameLabel), "Bradley");
    await user.type(screen.getByLabelText(contactCopy.form.emailLabel), "brad@example.com");
    await user.selectOptions(screen.getByLabelText(contactCopy.form.topicLabel), "hiring");
    await user.type(screen.getByLabelText(contactCopy.form.messageLabel), "Hello");

    await user.click(screen.getByRole("button", { name: contactCopy.form.submitLabel }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "https://formspree.io/f/abc123",
        expect.objectContaining({
          method: "POST",
        }),
      );
    });

    expect(screen.getByText(contactCopy.form.successTitle)).toBeInTheDocument();
  });

  it("shows error when Formspree response is not ok", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.mocked(global.fetch);
    fetchMock.mockResolvedValue({ ok: false } as Response);

    render(<ContactFormSection formspreeFormId="abc123" />);

    await user.type(screen.getByLabelText(contactCopy.form.nameLabel), "Bradley");
    await user.type(screen.getByLabelText(contactCopy.form.emailLabel), "brad@example.com");
    await user.selectOptions(screen.getByLabelText(contactCopy.form.topicLabel), "hiring");
    await user.type(screen.getByLabelText(contactCopy.form.messageLabel), "Hello");

    await user.click(screen.getByRole("button", { name: contactCopy.form.submitLabel }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
