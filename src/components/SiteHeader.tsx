import { For, onSettled, type Component } from "solid-js";
import { isServer } from "@solidjs/web";
import { NAV_LINKS, SITE } from "../data/site";
import { MenuIcon, EtherealMark } from "./Icons";
import { ThemeToggle } from "./ThemeToggle";

function isMenuOpen(menuEl: HTMLUListElement): boolean {
  try {
    return menuEl.matches(":popover-open") || menuEl.classList.contains(":popover-open");
  } catch {
    return menuEl.classList.contains(":popover-open");
  }
}

export const SiteHeader: Component = () => {
  let headerEl: HTMLElement | undefined;
  let innerEl: HTMLDivElement | undefined;
  let menuEl: HTMLUListElement | undefined;

  const closeMenuIfCollapsed = () => {
    if (!headerEl || !menuEl) return;
    if (!headerEl.classList.contains("is-wide") && isMenuOpen(menuEl)) {
      try {
        menuEl.hidePopover?.();
      } catch {
        // Ignore if popover is already closed or polyfill is loading
      }
    }
  };

  onSettled(() => {
    if (isServer) return;

    if (
      !Object.hasOwn(HTMLElement.prototype, "popover") &&
      typeof CSS !== "undefined" &&
      typeof CSS.escape === "function"
    ) {
      void import("@oddbird/popover-polyfill");
    }

    const header = headerEl;
    const inner = innerEl;
    const menu = menuEl;
    if (!header || !inner || !menu) return;

    let hasMeasured = false;
    let lastCollapsedWidth = 0;
    let rafId = 0;

    const updateLayout = () => {
      const currentlyWide = header.classList.contains("is-wide");
      const currentWidth = header.getBoundingClientRect().width;

      // Avoid thrashing by only remeasuring while wide, on initial mount, or when header widens
      if (hasMeasured && !currentlyWide && currentWidth <= lastCollapsedWidth) {
        return;
      }

      hasMeasured = true;
      const wasOpen = !currentlyWide && isMenuOpen(menu);

      header.classList.add("is-measuring");
      header.classList.add("is-wide");
      menu.removeAttribute("popover");

      const fits = inner.scrollWidth <= inner.clientWidth;

      if (fits) {
        menu.removeAttribute("popover");
      } else {
        header.classList.remove("is-wide");
        menu.setAttribute("popover", "auto");
        lastCollapsedWidth = currentWidth;
        if (wasOpen) {
          try {
            menu.showPopover?.();
          } catch {
            // Ignore if showPopover cannot open immediately
          }
        }
      }

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        header.classList.remove("is-measuring");
      });
    };

    updateLayout();

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => updateLayout()) : null;
    observer?.observe(header);
    observer?.observe(menu);

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  });

  return (
    <header ref={(el) => (headerEl = el)} class="site-header">
      <div ref={(el) => (innerEl = el)} class="header-inner max-w-6xl mx-auto px-5">
        <a
          href="/"
          class="flex items-center gap-3 text-left no-underline shrink-0"
          aria-label={`${SITE.name} — Home`}
        >
          <EtherealMark class="w-9 h-9 shrink-0" />
          <span class="flex flex-col">
            <span class="font-bold text-sm tracking-tight leading-none text-[var(--text-primary)] font-[var(--font-display)]">
              ETHEREAL
            </span>
            <span class="text-[11px] font-semibold uppercase tracking-widest mt-0.5 text-[var(--accent-text)]">
              Technologies
            </span>
          </span>
        </a>

        <div class="flex items-center gap-2 sm:gap-3">
          <nav class="site-nav" aria-label="Primary">
            <button
              class="menu-button inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[var(--border-hairline)] bg-[var(--surface-subtle)] text-[var(--text-primary)] hover:border-[var(--border-accent)] cursor-pointer"
              type="button"
              popovertarget="site-menu"
              popovertargetaction="toggle"
              aria-controls="site-menu"
            >
              <MenuIcon class="w-4 h-4" />
              <span>Menu</span>
            </button>

            <ul id="site-menu" ref={(el) => (menuEl = el)} class="site-menu" popover="auto">
              <For each={NAV_LINKS}>
                {(item) => (
                  <li>
                    <a href={item.href} class="nav-link" onClick={closeMenuIfCollapsed}>
                      {item.label}
                    </a>
                  </li>
                )}
              </For>
              <li class="nav-cta-item">
                <a
                  href="/contact"
                  onClick={closeMenuIfCollapsed}
                  class="nav-cta inline-flex w-full items-center justify-center px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors no-underline"
                >
                  Start a Project
                </a>
              </li>
            </ul>
          </nav>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
