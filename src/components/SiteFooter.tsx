import type { Component } from "solid-js";
import { AGORA } from "../data/agora";
import { SITE } from "../data/site";
import { ExternalLinkIcon, GithubIcon, LinkedinIcon } from "./Icons";

export const SiteFooter: Component = () => {
  return (
    <footer class="border-t border-[var(--border-hairline)] py-8 px-5 text-xs text-[var(--text-secondary)]">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex flex-col gap-1">
          <p class="m-0 font-medium text-[var(--text-primary)]">
            © {SITE.copyrightYear} {SITE.legalName} · {SITE.location}
          </p>
          <p class="m-0">
            Principal-led engineering consultancy &amp; creator of{" "}
            <a href="/agora" class="text-[var(--accent-text)] hover:underline">
              Agora
            </a>
            .
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <a href="/work" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline">
            Case Studies
          </a>
          <a href="/about" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline">
            About
          </a>
          <a href="/contact" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline">
            Contact
          </a>
          <a
            href={AGORA.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 text-[var(--accent-text)] hover:underline no-underline"
          >
            agora.cleaning
            <ExternalLinkIcon class="w-3 h-3" />
          </a>
          <span aria-hidden="true" class="opacity-40">
            ·
          </span>
          <a
            href={SITE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ethereal Technologies on GitHub"
            class="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline"
          >
            <GithubIcon class="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={SITE.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jack Jefferies on LinkedIn"
            class="inline-flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] no-underline"
          >
            <LinkedinIcon class="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
