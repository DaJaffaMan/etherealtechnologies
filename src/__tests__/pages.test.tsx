import { afterEach, describe, expect, it } from "vitest";
import { flush } from "solid-js";
import { render } from "@solidjs/web";
import { memoryHistory } from "@solidjs/router";
import { SiteLayout } from "../components/SiteLayout";
import { AGORA } from "../data/agora";
import { createAppRouter } from "../router";
import { TRACK_RECORD } from "../data/work";

describe("Ethereal Technologies pages & routing", () => {
  let dispose: (() => void) | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    document.body.innerHTML = "";
  });

  function mountRoute(initialPath: string): HTMLElement {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const Router = createAppRouter(memoryHistory(initialPath));
    dispose = render(
      () => <Router>{(props) => <SiteLayout>{props.children}</SiteLayout>}</Router>,
      host
    );
    flush();
    return host;
  }

  it("renders HomePage with availability, engagement models, Agora screens, and active Home nav", () => {
    const host = mountRoute("/");

    expect(host.querySelector("h1")?.textContent).toContain("We architect resilient systems");
    expect(host.textContent).toContain("Available for select Q1/Q2 engagements");
    expect(host.textContent).toContain("Architecture & Modernisation Audit");
    expect(host.textContent).toContain("Embedded Principal Delivery");
    expect(host.textContent).toContain("Zero-to-One Product & Platform Build");

    const auditCta = host.querySelector(
      'a[href="/contact?engagement=Legacy%20System%20Modernisation"]'
    );
    expect(auditCta).not.toBeNull();

    expect(host.querySelector('img[src="/agora-screens/light/cleaner-profile.webp"]')).not.toBeNull();
    expect(host.querySelector('img[src="/agora-screens/dark/cleaner-profile.webp"]')).not.toBeNull();

    const homeNav = host.querySelector('nav[aria-label="Primary"] a[href="/"]');
    expect(homeNav?.getAttribute("aria-current")).toBe("page");
  });

  it("renders AgoraPage with 3 theme-aware app screens, trust pillars, and interactive blueprint", () => {
    const host = mountRoute("/agora");

    expect(host.querySelector("h1")?.textContent).toContain("Agora — Built & operated in-house");
    const links = Array.from(host.querySelectorAll("a"));
    const websiteLink = links.find((a) => a.getAttribute("href") === AGORA.websiteUrl);
    const playLink = links.find((a) => a.getAttribute("href") === AGORA.playStoreUrl);
    expect(websiteLink).toBeDefined();
    expect(playLink).toBeDefined();

    // 3 light+dark mobile screens
    expect(host.querySelector('img[src="/agora-screens/dark/cleaner-profile.webp"]')).not.toBeNull();
    expect(host.querySelector('img[src="/agora-screens/dark/live-tracker.webp"]')).not.toBeNull();
    expect(host.querySelector('img[src="/agora-screens/dark/payout-settings.webp"]')).not.toBeNull();

    // Trust pillars
    expect(host.textContent).toContain("Stripe Escrow Protection");
    expect(host.textContent).toContain("48h Spotless Guarantee & Photo Proof");
    expect(host.textContent).toContain("£0 Per-Lead Fees · Flat 10% Commission");
    expect(host.textContent).toContain("Encrypted Time-Windowed Lockbox Access");

    // Interactive architecture blueprint node selection
    const neo4jBtn = Array.from(
      host.querySelectorAll<HTMLButtonElement>(
        '[aria-label="Agora system architecture components"] button'
      )
    ).find((btn) => btn.textContent?.includes("Neo4j Graph"));
    expect(neo4jBtn).toBeDefined();
    expect(neo4jBtn?.getAttribute("aria-pressed")).toBe("false");

    neo4jBtn?.click();
    flush();

    expect(neo4jBtn?.getAttribute("aria-pressed")).toBe("true");
    expect(host.textContent).toContain("Connected Marketplace Graph DB");
    expect(host.textContent).toContain("Fast Cypher traversal");
  });

  it("renders WorkPage with quantified metrics, reactive filtering, and track record disclosure", () => {
    const host = mountRoute("/work");

    expect(host.querySelector("h1")?.textContent).toContain("Selected Client Engagements");
    expect(host.querySelectorAll("article").length).toBe(5);
    expect(host.textContent).toContain("5 Months");
    expect(host.textContent).toContain("Days → Hours");
    expect(host.textContent).toContain("18 Months");

    const cloudFilterBtn = Array.from(host.querySelectorAll("button")).find((btn) =>
      btn.textContent?.includes("Cloud & IaC")
    );
    expect(cloudFilterBtn).toBeDefined();
    cloudFilterBtn?.click();
    flush();

    expect(cloudFilterBtn?.getAttribute("aria-pressed")).toBe("true");
    expect(host.querySelectorAll("article").length).toBe(3);

    const disclosureBtn = host.querySelector<HTMLButtonElement>(
      'button[aria-controls="track-record-panel"]'
    );
    const panel = host.querySelector<HTMLElement>("#track-record-panel");
    expect(disclosureBtn?.getAttribute("aria-expanded")).toBe("false");
    expect(panel?.hasAttribute("hidden")).toBe(true);

    disclosureBtn?.click();
    flush();

    expect(disclosureBtn?.getAttribute("aria-expanded")).toBe("true");
    expect(panel?.hasAttribute("hidden")).toBe(false);
    expect(panel?.textContent).toContain("Nominet");
    expect(panel?.textContent).toContain("Northrop Grumman");
    expect(disclosureBtn?.textContent).toContain(`${TRACK_RECORD.length} Engagements`);
  });

  it("pre-selects Engagement Type on /contact from the ?engagement query parameter", () => {
    const host = mountRoute("/contact?engagement=Legacy+System+Modernisation");

    const select = host.querySelector<HTMLSelectElement>("#engagement-type");
    expect(select?.value).toBe("Legacy System Modernisation");
    expect(host.textContent).toContain("Available for select Q1/Q2 engagements");
  });

  it("renders AboutPage with Jack Jefferies profile and certifications", () => {
    const host = mountRoute("/about");

    expect(host.querySelector("h1")?.textContent).toContain("principal-level software engineering");
    expect(host.textContent).toContain("Jack Jefferies");
    expect(host.textContent).toContain("AWS Solutions Architect Associate");
    expect(host.textContent).toContain("Google Cloud Certified Developer");
  });

  it("renders NotFoundPage for unmatched routes", () => {
    const host = mountRoute("/non-existent-route");

    expect(host.querySelector("h1")?.textContent).toContain("Page not found");
    expect(host.textContent).toContain("HTTP 404");
  });
});
