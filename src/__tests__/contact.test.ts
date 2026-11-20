import { afterEach, describe, expect, it, vi } from "vitest";
import { createComponent, flush } from "solid-js";
import { render } from "@solidjs/web";
import { ContactPage } from "../pages/ContactPage";
import { SITE } from "../data/site";
import { buildMailtoUrl } from "../utils/contact";

describe("contact utilities and ContactPage", () => {
  let dispose: (() => void) | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    document.body.innerHTML = "";
  });

  it("builds a properly encoded mailto URL containing engagement type and timeline", () => {
    const url = buildMailtoUrl({
      name: "Alice Example",
      email: "alice@example.co.uk",
      engagementType: "Cloud & Platform Architecture",
      timeline: "Immediate (This month)",
      message: "Need help migrating ECS services to Terraform.",
    });

    expect(url).toContain(`mailto:${SITE.email}?subject=`);
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain("[Cloud & Platform Architecture] Consultancy Inquiry from Alice Example");
    expect(decoded).toContain("Email: alice@example.co.uk");
    expect(decoded).toContain("Target Timeline: Immediate (This month)");
    expect(decoded).toContain("Need help migrating ECS services to Terraform.");
  });

  it("initializes fields with aria-invalid=false and updates live status on email copy", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    const host = document.createElement("div");
    document.body.appendChild(host);
    dispose = render(() => createComponent(ContactPage, {}), host);
    flush();
    await Promise.resolve();

    const nameInput = host.querySelector<HTMLInputElement>("#contact-name");
    const emailInput = host.querySelector<HTMLInputElement>("#contact-email");
    const contextInput = host.querySelector<HTMLTextAreaElement>("#project-context");

    expect(nameInput?.getAttribute("aria-invalid")).toBe("false");
    expect(emailInput?.getAttribute("aria-invalid")).toBe("false");
    expect(contextInput?.getAttribute("aria-invalid")).toBe("false");

    // Hints must remain referenced without premounting hidden error IDs in aria-describedby
    expect(emailInput?.getAttribute("aria-describedby")).toBe("email-hint");

    const copyBtn = Array.from(host.querySelectorAll("button")).find((btn) =>
      btn.textContent?.includes("Copy Email Address")
    );
    expect(copyBtn).toBeDefined();
    copyBtn?.click();
    await Promise.resolve();
    flush();

    expect(writeText).toHaveBeenCalledWith(SITE.email);
    expect(host.textContent).toContain(`Copied ${SITE.email} to clipboard.`);
  });
});
