import { createMemo, createSignal, For, type Component } from "solid-js";
import type { ServiceDomainId } from "../data/services";
import { buildWorkGraph, SITE } from "../data/site";
import { CASE_STUDIES, TRACK_RECORD } from "../data/work";
import { ArrowRightIcon, ChevronDownIcon } from "../components/Icons";
import { SeoHead } from "../components/SeoHead";

type FilterOption = "all" | ServiceDomainId;

interface FilterTab {
  readonly id: FilterOption;
  readonly label: string;
}

const FILTER_TABS: readonly FilterTab[] = [
  { id: "all", label: "All Engagements" },
  { id: "cloud", label: "Cloud & IaC" },
  { id: "fullstack", label: "Full-Stack & Web" },
  { id: "data-legacy", label: "Data & Legacy" },
  { id: "leadership", label: "Leadership" },
];

export const WorkPage: Component = () => {
  const [activeFilter, setActiveFilter] = createSignal<FilterOption>("all");
  const [trackRecordOpen, setTrackRecordOpen] = createSignal(false);

  const filteredStudies = createMemo(() => {
    const filter = activeFilter();
    if (filter === "all") return CASE_STUDIES;
    return CASE_STUDIES.filter((study) => study.domains.includes(filter));
  });

  return (
    <div class="page-enter">
      <SeoHead
        title={`Selected Work & Case Studies | ${SITE.name}`}
        description="Over a decade delivering high-stakes engineering projects across energy, national infrastructure, IoT analytics, retail, and UK public sector."
        path="/work"
        jsonLd={buildWorkGraph()}
      />

      <section class="pt-14 pb-16 px-5">
        <div class="max-w-5xl mx-auto">
          <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0 mb-2">
            Case Studies &amp; Track Record
          </p>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Selected Client Engagements
          </h1>
          <p class="mt-3 text-base max-w-2xl leading-relaxed text-[var(--text-secondary)]">
            Over a decade delivering resilient production systems across clean energy, national
            infrastructure, IoT telemetry, retail e-commerce, and UK public sector platforms.
          </p>

          {/* Interactive Filter Controls */}
          <div
            class="mt-8 flex flex-wrap gap-2"
            role="group"
            aria-label="Filter case studies by capability"
          >
            <For each={FILTER_TABS}>
              {(tab) => (
                <button
                  type="button"
                  aria-pressed={activeFilter() === tab.id ? "true" : "false"}
                  onClick={() => setActiveFilter(tab.id)}
                  class={[
                    "px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium border cursor-pointer transition-colors",
                    activeFilter() === tab.id
                      ? "bg-[var(--accent-soft)] border-[var(--border-accent)] text-[var(--accent-text)] font-semibold"
                      : "bg-[var(--surface-card)] border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                  ]}
                >
                  {tab.label}
                </button>
              )}
            </For>
          </div>

          {/* Curated Case Studies */}
          <div class="mt-8 space-y-5">
            <For each={filteredStudies()}>
              {(study) => (
                <article class="studio-card rounded-2xl p-6 sm:p-7">
                  <div class="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div class="text-xs font-mono text-[var(--accent-text)] uppercase">
                        {study.sector} · {study.role}
                      </div>
                      <h2 class="text-lg sm:text-xl font-bold mt-1 text-[var(--text-primary)]">
                        {study.client} — {study.headline}
                      </h2>
                    </div>
                    <span class="text-xs font-mono px-2.5 py-1 rounded-md studio-surface-subtle text-[var(--text-secondary)]">
                      {study.period}
                    </span>
                  </div>

                  {/* Quantified Impact Metrics Strip */}
                  <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <For each={study.metrics}>
                      {(metric) => (
                        <div class="px-3.5 py-2.5 rounded-xl bg-[var(--accent-soft)] border border-[var(--border-accent)] flex items-baseline justify-between gap-2 sm:block">
                          <div class="text-sm sm:text-base font-extrabold font-mono text-[var(--accent-text)]">
                            {metric.value}
                          </div>
                          <div class="text-xs text-[var(--text-secondary)] sm:mt-0.5">
                            {metric.label}
                          </div>
                        </div>
                      )}
                    </For>
                  </div>

                  <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                    <div class="studio-surface-subtle rounded-xl p-4">
                      <div class="font-semibold text-[var(--text-primary)] mb-1">Challenge</div>
                      <p class="m-0 leading-relaxed text-[var(--text-secondary)]">
                        {study.challenge}
                      </p>
                    </div>
                    <div class="studio-surface-subtle rounded-xl p-4">
                      <div class="font-semibold text-[var(--text-primary)] mb-1">Execution</div>
                      <p class="m-0 leading-relaxed text-[var(--text-secondary)]">
                        {study.solution}
                      </p>
                    </div>
                    <div class="studio-surface-subtle rounded-xl p-4">
                      <div class="font-semibold text-[var(--text-primary)] mb-1">Outcome</div>
                      <p class="m-0 leading-relaxed text-[var(--text-secondary)]">{study.impact}</p>
                    </div>
                  </div>

                  <div class="mt-4 pt-3 border-t border-[var(--border-hairline)] flex flex-wrap gap-1.5">
                    <For each={study.stack}>
                      {(tech) => (
                        <span class="px-2.5 py-0.5 rounded text-xs font-mono studio-surface-subtle text-[var(--text-secondary)]">
                          {tech}
                        </span>
                      )}
                    </For>
                  </div>
                </article>
              )}
            </For>
          </div>

          {/* Expandable Full Track Record */}
          <div class="mt-10 studio-card rounded-2xl p-5 sm:p-6">
            <button
              type="button"
              aria-expanded={trackRecordOpen() ? "true" : "false"}
              aria-controls="track-record-panel"
              onClick={() => setTrackRecordOpen((open) => !open)}
              class="w-full flex items-center justify-between gap-4 text-left bg-transparent border-0 p-0 cursor-pointer text-[var(--text-primary)]"
            >
              <div>
                <span class="block text-sm sm:text-base font-bold">
                  Full Engineering Track Record (2013 – Present · {TRACK_RECORD.length} Engagements)
                </span>
                <span class="block text-xs text-[var(--text-secondary)] mt-0.5">
                  Chronological history including Agora, Pynea, BJSS, GameBench, Northrop Grumman
                  &amp; Nominet
                </span>
              </div>
              <span class="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--accent-text)] shrink-0">
                <span>{trackRecordOpen() ? "Collapse" : "Expand"}</span>
                <ChevronDownIcon
                  class={[
                    "w-4 h-4 transition-transform duration-200",
                    { "rotate-180": trackRecordOpen() },
                  ]}
                />
              </span>
            </button>

            <div
              id="track-record-panel"
              hidden={!trackRecordOpen()}
              class="mt-5 pt-5 border-t border-[var(--border-hairline)]"
            >
              <div class="space-y-3">
                <For each={TRACK_RECORD}>
                  {(entry) => (
                    <div class="studio-surface-subtle rounded-xl p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div class="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span class="font-bold text-sm text-[var(--text-primary)]">
                            {entry.company}
                          </span>
                          <span class="text-xs text-[var(--accent-text)] font-medium">
                            {entry.role}
                          </span>
                        </div>
                        <p class="text-xs sm:text-sm mt-1.5 leading-relaxed text-[var(--text-secondary)] m-0">
                          {entry.summary}
                        </p>
                        <div class="mt-2 flex flex-wrap gap-1.5">
                          <For each={entry.skills}>
                            {(skill) => (
                              <span class="px-2 py-0.5 rounded text-[11px] font-mono studio-card text-[var(--text-secondary)]">
                                {skill}
                              </span>
                            )}
                          </For>
                        </div>
                      </div>
                      <span class="text-xs font-mono text-[var(--text-secondary)] shrink-0">
                        {entry.duration}
                      </span>
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div class="mt-10 flex flex-wrap items-center justify-between gap-4 studio-card-accent rounded-2xl p-6">
            <div>
              <h2 class="text-lg font-bold text-[var(--text-primary)] m-0">
                Have a complex system or modernisation milestone ahead?
              </h2>
              <p class="text-xs sm:text-sm text-[var(--text-secondary)] mt-1 m-0">
                Let's discuss scope, architecture risks, and how Ethereal Technologies can help.
              </p>
            </div>
            <a
              href="/contact"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors no-underline shrink-0"
            >
              <span>Start a Conversation</span>
              <ArrowRightIcon class="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
