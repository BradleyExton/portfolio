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

    const panelId = questionButton.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();
    const answerRegion = document.getElementById(panelId as string);
    expect(answerRegion).toBeTruthy();
    expect(answerRegion).not.toBeVisible();

    await user.click(questionButton);
    expect(answerRegion).toBeVisible();
    expect(screen.getByText(firstFaq.answer)).toBeVisible();

    await user.click(questionButton);
    expect(answerRegion).not.toBeVisible();
  });
});
