import { For, type Component } from "solid-js";
import { AGORA } from "../data/agora";
import { ENGAGEMENT_MODELS, SERVICE_PILLARS } from "../data/services";
import { AVAILABILITY, buildOrganizationSchema, CLIENT_ORGS, SITE } from "../data/site";
import { CASE_STUDIES, CERTIFICATIONS } from "../data/work";
import { ArrowRightIcon, AwardIcon, CheckIcon, ExternalLinkIcon } from "../components/Icons";
import { SeoHead } from "../components/SeoHead";
import { ThemePicture } from "../components/ThemePicture";

const FEATURED_CASE_IDS = new Set(["costain", "octopus-energy", "homelink"]);

export const HomePage: Component = () => {
  const featuredCases = CASE_STUDIES.filter((cs) => FEATURED_CASE_IDS.has(cs.id));
  const spotlightScreen = AGORA.screens[0]!;

  return (
    <div class="page-enter">
      <SeoHead
        title={`${SITE.name} | ${SITE.tagline}`}
        description={SITE.description}
        path="/"
        jsonLd={buildOrganizationSchema()}
      />

      {/* Hero Section */}
      <section class="hero-backdrop pt-14 pb-12 px-5">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-wrap items-center gap-2.5 mb-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[var(--accent-soft)] border border-[var(--border-accent)] text-[var(--accent-text)]">
              <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              <span>
                {SITE.tagline} · {SITE.location}
              </span>
            </div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium studio-surface-subtle text-[var(--text-secondary)]">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              <span>{AVAILABILITY.status}</span>
            </div>
          </div>

          <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl leading-[1.12] text-[var(--text-primary)]">
            We architect resilient systems for ambitious teams — and build our own products.
          </h1>

          <p class="mt-5 text-base sm:text-lg max-w-2xl leading-relaxed text-[var(--text-secondary)]">
            {SITE.name} is a principal-led UK engineering consultancy specialising in cloud
            architecture, legacy modernisation, and full-stack product delivery. Alongside client
            engagements, we design, engineer, and operate{" "}
            <strong class="font-semibold text-[var(--text-primary)]">Agora</strong>, our flagship
            cleaning services marketplace.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="/contact"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors no-underline"
            >
              <span>Discuss an Engagement</span>
              <ArrowRightIcon class="w-4 h-4" />
            </a>
            <a
              href="/agora"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold studio-card studio-card-interactive text-[var(--text-primary)] no-underline"
            >
              <span>Explore Agora</span>
              <ArrowRightIcon class="w-4 h-4 text-[var(--accent-text)]" />
            </a>
          </div>

          {/* Client Trust Strip */}
          <div class="mt-12 pt-6 border-t border-[var(--border-hairline)] flex flex-wrap items-center gap-x-8 gap-y-3">
            <span class="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Delivered for teams at
            </span>
            <For each={CLIENT_ORGS}>
              {(org) => (
                <span class="text-sm font-bold tracking-tight text-[var(--text-primary)] opacity-85">
                  {org}
                </span>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Consultancy Service Pillars */}
      <section class="py-12 px-5">
        <div class="max-w-6xl mx-auto">
          <div class="mb-8">
            <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
              Consultancy Services
            </p>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[var(--text-primary)]">
              Hands-on principal engineering, zero agency layers
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <For each={SERVICE_PILLARS}>
              {(pillar) => (
                <article class="studio-card studio-card-interactive rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div class="text-xs font-mono text-[var(--accent-text)] mb-3">
                      {pillar.index} / {pillar.category}
                    </div>
                    <h3 class="text-base font-bold text-[var(--text-primary)]">{pillar.title}</h3>
                    <p class="text-xs sm:text-sm mt-2 leading-relaxed text-[var(--text-secondary)]">
                      {pillar.summary}
                    </p>
                  </div>
                  <div class="mt-4 pt-3 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
                    <For each={pillar.technologies.slice(0, 4)}>
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

      {/* Packaged Engagement Models */}
      <section class="py-10 px-5">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
                How We Engage
              </p>
              <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[var(--text-primary)]">
                Clear engagement models tailored to your stage
              </h2>
            </div>
            <span class="text-xs font-mono text-[var(--text-secondary)]">
              {AVAILABILITY.detail}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <For each={ENGAGEMENT_MODELS}>
              {(model) => (
                <article class="studio-card studio-card-interactive rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between gap-2 mb-3">
                      <span class="text-xs font-mono text-[var(--accent-text)]">
                        {model.index} / MODEL
                      </span>
                      <span class="text-xs font-mono px-2.5 py-0.5 rounded-full studio-surface-subtle text-[var(--text-secondary)]">
                        {model.cadence}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold text-[var(--text-primary)]">{model.title}</h3>
                    <p class="text-xs sm:text-sm mt-2 leading-relaxed text-[var(--text-secondary)]">
                      {model.summary}
                    </p>
                    <ul class="mt-4 space-y-2 list-none p-0 m-0">
                      <For each={model.deliverables}>
                        {(item) => (
                          <li class="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                            <CheckIcon class="w-3.5 h-3.5 text-[var(--accent-text)] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>

                  <div class="mt-6 pt-4 border-t border-[var(--border-hairline)]">
                    <a
                      href={`/contact?engagement=${encodeURIComponent(model.engagementParam)}`}
                      class="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-text)] hover:underline no-underline"
                    >
                      <span>{model.ctaLabel}</span>
                      <ArrowRightIcon class="w-4 h-4" />
                    </a>
                  </div>
                </article>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Flagship Product Spotlight: Agora */}
      <section class="py-12 px-5">
        <div class="max-w-6xl mx-auto">
          <div class="studio-card-accent rounded-3xl p-6 sm:p-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-7">
                <div class="flex items-center gap-3 mb-4">
                  <img
                    src={AGORA.iconPath}
                    alt="Agora platform icon"
                    width="44"
                    height="44"
                    class="w-11 h-11 rounded-xl object-cover border border-[var(--border-accent)] shrink-0"
                  />
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
                      {AGORA.tagline}
                    </p>
                    <span class="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent-text)]">
                      {AGORA.statusBadge}
                    </span>
                  </div>
                </div>

                <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  {AGORA.headline}
                </h2>
                <p class="mt-3 text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                  {AGORA.spotlightSummary}
                </p>

                <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <For each={AGORA.highlights}>
                    {(item) => (
                      <div class="studio-surface-subtle rounded-xl p-3">
                        <div class="text-[var(--text-secondary)]">{item.label}</div>
                        <div class="font-bold mt-0.5 text-sm text-[var(--text-primary)]">
                          {item.value}
                        </div>
                      </div>
                    )}
                  </For>
                </div>

                <div class="mt-5 flex flex-wrap gap-2">
                  <For each={AGORA.stackBadges.slice(0, 6)}>
                    {(badge) => (
                      <span class="px-2.5 py-1 rounded-md text-xs font-mono studio-surface-subtle text-[var(--text-primary)]">
                        {badge}
                      </span>
                    )}
                  </For>
                </div>

                <div class="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/agora"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors no-underline"
                  >
                    <span>Explore Agora Architecture &amp; Screens</span>
                    <ArrowRightIcon class="w-4 h-4" />
                  </a>
                  <a
                    href={AGORA.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold studio-surface-subtle text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-colors no-underline"
                  >
                    <span>Visit agora.cleaning</span>
                    <ExternalLinkIcon class="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div class="lg:col-span-5 flex flex-col items-center">
                <div class="studio-surface-subtle rounded-3xl p-4 sm:p-5 w-full max-w-[300px] flex flex-col items-center">
                  <ThemePicture
                    lightSrc={spotlightScreen.lightSrc}
                    darkSrc={spotlightScreen.darkSrc}
                    alt={spotlightScreen.alt}
                    width={spotlightScreen.width}
                    height={spotlightScreen.height}
                    loading="lazy"
                    class="w-full max-w-[230px] h-auto rounded-2xl"
                  />
                  <div class="mt-3 text-center">
                    <div class="text-[11px] font-mono text-[var(--accent-text)]">
                      {spotlightScreen.badge}
                    </div>
                    <div class="text-xs font-semibold text-[var(--text-primary)] mt-0.5">
                      {spotlightScreen.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Client Work Preview */}
      <section class="py-12 px-5">
        <div class="max-w-6xl mx-auto">
          <div class="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
                Selected Client Work
              </p>
              <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[var(--text-primary)]">
                High-stakes engineering engagements
              </h2>
            </div>
            <a
              href="/work"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent-text)] hover:underline no-underline"
            >
              <span>View all case studies &amp; track record</span>
              <ArrowRightIcon class="w-4 h-4" />
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <For each={featuredCases}>
              {(study) => (
                <article class="studio-card studio-card-interactive rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <div class="text-xs font-mono text-[var(--accent-text)] uppercase">
                        {study.sector} · {study.client}
                      </div>
                      <span class="px-2 py-0.5 rounded-md text-[11px] font-mono bg-[var(--accent-soft)] text-[var(--accent-text)]">
                        {study.metrics[0]?.value}
                      </span>
                    </div>
                    <h3 class="text-lg font-bold mt-2 text-[var(--text-primary)]">
                      {study.headline}
                    </h3>
                    <p class="text-xs sm:text-sm mt-2 leading-relaxed text-[var(--text-secondary)]">
                      {study.summary}
                    </p>
                  </div>
                  <div class="mt-4 pt-3 border-t border-[var(--border-hairline)] text-xs font-mono text-[var(--text-secondary)]">
                    {study.stack.slice(0, 3).join(" · ")}
                  </div>
                </article>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Principal & Credentials Confidence Band */}
      <section class="py-10 px-5 pb-16">
        <div class="max-w-6xl mx-auto studio-card rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="flex items-start sm:items-center gap-4">
            <img
              src="/profile.jpeg"
              alt="Jack Jefferies, Founder of Ethereal Technologies"
              width="64"
              height="64"
              class="w-16 h-16 rounded-2xl object-cover border border-[var(--border-accent)] shrink-0"
            />
            <div>
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
                Principal-Led Studio
              </p>
              <h2 class="text-lg sm:text-xl font-bold mt-1 text-[var(--text-primary)]">
                Direct engagement with {SITE.founder} &amp; certified cloud engineering
              </h2>
              <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)]">
                <For each={CERTIFICATIONS}>
                  {(cert) => (
                    <span class="inline-flex items-center gap-1.5">
                      <AwardIcon class="w-3.5 h-3.5 text-[var(--accent-text)]" />
                      <span>{cert.name}</span>
                    </span>
                  )}
                </For>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-3 shrink-0">
            <a
              href="/about"
              class="px-4 py-2 rounded-xl text-sm font-semibold studio-surface-subtle text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-colors no-underline"
            >
              About the Studio
            </a>
            <a
              href="/contact"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors no-underline"
            >
              <span>Book an Intro Call</span>
              <ArrowRightIcon class="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
