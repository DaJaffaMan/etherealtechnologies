import { createEffect, type ParentComponent } from "solid-js";
import { isServer } from "@solidjs/web";
import { useInRouter, useLocation } from "@solidjs/router";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export const SiteLayout: ParentComponent = (props) => {
  const inRouter = useInRouter();
  const location = inRouter ? useLocation() : undefined;
  let mainEl: HTMLElement | undefined;

  createEffect(
    () => location?.pathname,
    (pathname, prev) => {
      if (isServer) return;
      if (prev !== undefined && pathname !== undefined && prev !== pathname) {
        mainEl?.focus({ preventScroll: true });
      }
    }
  );

  return (
    <div class="min-h-dvh flex flex-col bg-[var(--surface-canvas)] text-[var(--text-primary)]">
      <a href="#main-content" rel="external" class="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main ref={(el) => (mainEl = el)} id="main-content" tabindex="-1" class="flex-1 outline-none">
        {props.children}
      </main>
      <SiteFooter />
    </div>
  );
};
