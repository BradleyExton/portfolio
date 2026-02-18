import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { servicesCopy } from "@/copy/services";
import { ServicesFaqSection } from "./index";

describe("ServicesFaqSection", () => {
  it("toggles answers open and closed", async () => {
    const user = userEvent.setup();
    render(<ServicesFaqSection />);

    const firstFaq = servicesCopy.faq.items[0];

    const questionButton = screen.getByRole("button", {
      name: firstFaq.question,
    });

    expect(screen.queryByText(firstFaq.answer)).not.toBeInTheDocument();

    await user.click(questionButton);
    expect(screen.getByText(firstFaq.answer)).toBeInTheDocument();

    await user.click(questionButton);
    expect(screen.queryByText(firstFaq.answer)).not.toBeInTheDocument();
  });
});
