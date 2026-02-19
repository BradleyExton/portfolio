import { expect, test } from "@playwright/test";

test("primary routes render", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Senior Full-Stack Developer" }),
  ).toBeVisible();

  await page.goto("/about");
  await expect(page.getByRole("heading", { name: "About Me" })).toBeVisible();

  await page.goto("/services");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Senior full-stack execution for teams that need momentum/i,
    }),
  ).toBeVisible();

  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: "Get In Touch" })).toBeVisible();
});

test("header navigation routes correctly from non-home pages", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("link", { name: "Services" }).first().click();
  await expect(page).toHaveURL(/\/services$/);
});

test("contact call-to-action link is never a dead hash", async ({ page }) => {
  await page.goto("/contact");

  const callLink = page
    .getByRole("link", { name: /Schedule a call|Email me instead/ })
    .first();

  const href = await callLink.getAttribute("href");
  expect(href).toBeTruthy();
  expect(href).not.toBe("#");
});

test("contact action links render valid hrefs", async ({ page }) => {
  await page.goto("/contact");

  const callLink = page
    .getByRole("link", { name: /Schedule a call|Email me instead/ })
    .first();
  const emailLink = page.getByRole("link", { name: /@/ }).first();
  const profileLink = page.getByRole("link", { name: "View Profile" });

  const callHref = await callLink.getAttribute("href");
  const emailHref = await emailLink.getAttribute("href");
  const profileHref = await profileLink.getAttribute("href");

  expect(callHref).toBeTruthy();
  expect(callHref).not.toBe("#");
  expect(emailHref?.startsWith("mailto:")).toBeTruthy();
  expect(profileHref?.startsWith("http")).toBeTruthy();
});

test("keyboard navigation reaches form controls and focus is visible", async ({
  page,
}) => {
  await page.goto("/contact");

  const nameInput = page.getByLabel("Name");
  const unavailableHeading = page.getByText("Form temporarily unavailable");

  if (await nameInput.isDisabled()) {
    await expect(unavailableHeading).toBeVisible();
    return;
  }

  for (let index = 0; index < 20; index += 1) {
    await page.keyboard.press("Tab");
    if (await nameInput.evaluate((node) => node === document.activeElement)) {
      break;
    }
  }

  await expect(nameInput).toBeFocused();

  const focusStyles = await nameInput.evaluate((node) => {
    const styles = getComputedStyle(node);
    return {
      outlineStyle: styles.outlineStyle,
      outlineWidth: styles.outlineWidth,
      boxShadow: styles.boxShadow,
    };
  });

  const hasOutline =
    focusStyles.outlineStyle !== "none" && focusStyles.outlineWidth !== "0px";
  const hasRing = focusStyles.boxShadow !== "none";
  expect(hasOutline || hasRing).toBeTruthy();
});

test("contact error or unavailable states include text guidance", async ({
  page,
}) => {
  await page.goto("/contact");

  const submitButton = page.getByRole("button", { name: /Send Message|Sending/ });
  const unavailableHeading = page.getByText("Form temporarily unavailable");

  if (await submitButton.isDisabled()) {
    await expect(unavailableHeading).toBeVisible();
    await expect(page.getByRole("link", { name: /@/ }).first()).toBeVisible();
    return;
  }

  await page.route("https://formspree.io/**", async (route) => {
    await route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ ok: false }),
    });
  });

  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("What can I help you with?").selectOption("other");
  await page.getByLabel("Message").fill("Testing contact error state.");
  await submitButton.click();

  await expect(
    page.getByText("Something went wrong. Please try again or email me directly."),
  ).toBeVisible();
});
