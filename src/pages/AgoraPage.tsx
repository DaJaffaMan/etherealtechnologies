import { For, type Component } from "solid-js";
import { AGORA } from "../data/agora";
import { AGORA_FAQS } from "../data/faqs";
import { buildAgoraGraph, SITE } from "../data/site";
import { AgoraArchitectureBlueprint } from "../components/AgoraArchitectureBlueprint";
import { FaqSection } from "../components/FaqSection";
import { ArrowRightIcon, CheckIcon, ExternalLinkIcon } from "../components/Icons";
import { SeoHead } from "../components/SeoHead";
import { ThemePicture } from "../components/ThemePicture";

export const AgoraPage: Component = () => {
  return (
    <div class="page-enter">
      <SeoHead
        title={`Agora Platform — Flagship Product | ${SITE.name}`}
        description="Explore Agora, a two-sided professional cleaning services marketplace built and operated in-house by Ethereal Technologies using Flutter, NestJS, GraphQL, Neo4j, and Stripe Connect."
        path="/agora"
        jsonLd={buildAgoraGraph(AGORA_FAQS)}
      />

      {/* Hero */}
      <section class="hero-backdrop pt-14 pb-12 px-5">
        <div class="max-w-5xl mx-auto">
          <div class="flex items-center gap-3 mb-5">
            <img
              src={AGORA.iconPath}
              alt="Agora logo"
              width="48"
              height="48"
              decoding="async"
              class="w-12 h-12 rounded-2xl object-cover border border-[var(--border-accent)]"
            />
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
                {AGORA.tagline}
              </p>
              <span class="inline-block mt-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
                {AGORA.statusBadge}
              </span>
            </div>
          </div>

          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
            Agora — Built &amp; operated in-house
          </h1>

          <p class="mt-4 text-base sm:text-lg max-w-2xl leading-relaxed text-[var(--text-secondary)]">
            {AGORA.lead}
          </p>

          <div class="mt-6 flex flex-wrap gap-3">
            <a
              href={AGORA.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors no-underline"
            >
              <span>Visit agora.cleaning</span>
              <ExternalLinkIcon class="w-4 h-4" />
            </a>
            <a
              href={AGORA.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold studio-card studio-card-interactive text-[var(--text-primary)] no-underline"
            >
              <span>Google Play Store</span>
              <ExternalLinkIcon class="w-4 h-4 text-[var(--accent-text)]" />
            </a>
          </div>
        </div>
      </section>

      {/* Platform Reality / Snapshot */}
      <section class="py-8 px-5">
        <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <For each={AGORA.highlights}>
            {(item) => (
              <div class="studio-card rounded-2xl p-5">
                <div class="text-xs font-mono text-[var(--accent-text)] uppercase">
                  {item.label}
                </div>
                <div class="text-lg font-bold mt-1.5 text-[var(--text-primary)]">{item.value}</div>
                <p class="text-xs mt-2 leading-relaxed text-[var(--text-secondary)] m-0">
                  {item.detail}
                </p>
              </div>
            )}
          </For>
        </div>
      </section>

      {/* Theme-Aware Live Product Screens */}
      <section class="py-10 px-5">
        <div class="max-w-5xl mx-auto">
          <div class="mb-6">
            <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
              Live Production Experience
            </p>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[var(--text-primary)]">
              Real screens from the shipped Flutter app
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <For each={AGORA.screens}>
              {(screen) => (
                <article class="studio-card studio-card-interactive rounded-2xl p-5 flex flex-col justify-between">
                  <div class="studio-surface-subtle rounded-2xl p-4 flex justify-center">
                    <ThemePicture
                      lightSrc={screen.lightSrc}
                      darkSrc={screen.darkSrc}
                      alt={screen.alt}
                      width={screen.width}
                      height={screen.height}
                      loading="lazy"
                      class="w-full max-w-[215px] h-auto rounded-xl"
                    />
                  </div>
                  <div class="mt-4">
                    <div class="text-[11px] font-mono text-[var(--accent-text)]">
                      {screen.badge}
                    </div>
                    <h3 class="text-base font-bold mt-1 text-[var(--text-primary)]">
                      {screen.title}
                    </h3>
                    <p class="text-xs sm:text-sm mt-1.5 leading-relaxed text-[var(--text-secondary)] m-0">
                      {screen.caption}
                    </p>
                  </div>
                </article>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Marketplace Trust & Fintech Differentiators */}
      <section class="py-10 px-5">
        <div class="max-w-5xl mx-auto">
          <div class="mb-6">
            <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
              Marketplace Trust &amp; Fintech Mechanics
            </p>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[var(--text-primary)]">
              Built for customer confidence and fair cleaner economics
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <For each={AGORA.trustPillars}>
              {(pillar) => (
                <article class="studio-card rounded-2xl p-5 sm:p-6">
                  <div class="flex items-center justify-between gap-2">
                    <span class="text-xs font-mono text-[var(--accent-text)]">{pillar.tag}</span>
                    <span class="px-2.5 py-0.5 rounded-full text-xs font-mono bg-[var(--accent-soft)] text-[var(--accent-text)]">
                      {pillar.metric}
                    </span>
                  </div>
                  <h3 class="text-base sm:text-lg font-bold mt-2 text-[var(--text-primary)]">
                    {pillar.title}
                  </h3>
                  <p class="text-xs sm:text-sm mt-2 leading-relaxed text-[var(--text-secondary)] m-0">
                    {pillar.description}
                  </p>
                </article>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Interactive Technical Architecture Blueprint & Summary Layers */}
      <section class="py-10 px-5">
        <div class="max-w-5xl mx-auto space-y-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
              System Architecture
            </p>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[var(--text-primary)]">
              End-to-end production stack
            </h2>
          </div>

          <AgoraArchitectureBlueprint />

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <For each={AGORA.architectureLayers}>
              {(layer) => (
                <article class="studio-card rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div class="text-xs font-mono text-[var(--accent-text)]">
                      {layer.index} / {layer.tag}
                    </div>
                    <h3 class="text-base font-bold mt-2 text-[var(--text-primary)]">
                      {layer.title}
                    </h3>
                    <p class="text-xs sm:text-sm mt-2 leading-relaxed text-[var(--text-secondary)]">
                      {layer.description}
                    </p>
                  </div>
                  <div class="mt-4 pt-3 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
                    <For each={layer.stack}>
                      {(tech) => (
                        <span class="px-2 py-0.5 rounded text-[11px] font-mono studio-surface-subtle text-[var(--text-secondary)]">
                          {tech}
                        </span>
                      )}
                    </For>
                  </div>
                </article>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Agora Product & Architecture FAQs */}
      <FaqSection
        eyebrow="Agora FAQ"
        heading="Questions about Agora & its architecture"
        items={AGORA_FAQS}
        containerClass="max-w-5xl"
      />

      {/* Why it matters for consultancy clients */}
      <section class="py-8 px-5 pb-16">
        <div class="max-w-5xl mx-auto studio-card-accent rounded-3xl p-6 sm:p-8 space-y-5">
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-[var(--text-primary)] m-0">
              {AGORA.whyItMattersTitle}
            </h2>
            <p class="text-sm sm:text-base mt-3 leading-relaxed text-[var(--text-secondary)]">
              {AGORA.whyItMattersBody}
            </p>
          </div>

          <ul class="space-y-2.5 list-none p-0 m-0">
            <For each={AGORA.whyItMattersPoints}>
              {(point) => (
                <li class="flex items-start gap-2.5 text-sm text-[var(--text-primary)]">
                  <CheckIcon class="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              )}
            </For>
          </ul>

          <div class="pt-2 flex flex-wrap gap-3">
            <a
              href="/contact"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors no-underline"
            >
              <span>Engage Us on Your Platform</span>
              <ArrowRightIcon class="w-4 h-4" />
            </a>
            <a
              href="/work"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold studio-surface-subtle text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-colors no-underline"
            >
              <span>Explore Client Case Studies</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
