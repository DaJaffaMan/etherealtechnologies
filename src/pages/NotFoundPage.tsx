import type { Component } from "solid-js";
import { httpStatus } from "@solidjs/web";
import { SITE } from "../data/site";
import { ArrowRightIcon } from "../components/Icons";
import { SeoHead } from "../components/SeoHead";

export const NotFoundPage: Component = () => {
  httpStatus(404);

  return (
    <div class="page-enter">
      <SeoHead
        title={`Page Not Found | ${SITE.name}`}
        description="The requested page could not be found on Ethereal Technologies."
        path="/404"
        noindex={true}
      />

      <section class="py-20 px-5">
        <div class="max-w-2xl mx-auto studio-card rounded-3xl p-8 text-center">
          <p class="text-xs font-mono uppercase tracking-widest text-[var(--accent-text)] m-0">
            HTTP 404
          </p>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-[var(--text-primary)]">
            Page not found
          </h1>
          <p class="text-sm sm:text-base mt-3 text-[var(--text-secondary)]">
            The route you requested doesn't exist. You can return to the overview or jump directly
            to Agora, our case studies, or consultancy inquiries.
          </p>
          <div class="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="/"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors no-underline"
            >
              <span>Return Home</span>
              <ArrowRightIcon class="w-4 h-4" />
            </a>
            <a
              href="/agora"
              class="px-4 py-2.5 rounded-xl text-sm font-semibold studio-surface-subtle text-[var(--text-primary)] hover:border-[var(--border-accent)] no-underline"
            >
              Explore Agora
            </a>
            <a
              href="/work"
              class="px-4 py-2.5 rounded-xl text-sm font-semibold studio-surface-subtle text-[var(--text-primary)] hover:border-[var(--border-accent)] no-underline"
            >
              Case Studies
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
