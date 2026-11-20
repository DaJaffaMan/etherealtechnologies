import { For, type Component } from "solid-js";
import { buildPersonSchema, SITE } from "../data/site";
import { CERTIFICATIONS, LANGUAGES } from "../data/work";
import { ArrowRightIcon, AwardIcon, GithubIcon, LinkedinIcon, MapPinIcon } from "../components/Icons";
import { SeoHead } from "../components/SeoHead";

interface StudioPrinciple {
  readonly title: string;
  readonly body: string;
}

const PRINCIPLES: readonly StudioPrinciple[] = [
  {
    title: "Direct Principal Execution",
    body: "You work directly with the engineer designing your cloud topology, reviewing pull requests, and shipping production releases — never handed down through account layers.",
  },
  {
    title: "Built for Long-Term Ownership",
    body: "Whether rescuing an undocumented monolith or handing an agency MVP in-house, every engagement prioritises repeatable IaC, clear onboarding docs, and maintainable code.",
  },
  {
    title: "Product-Minded Pragmatism",
    body: "Operating Agora in production keeps every architectural recommendation anchored to real delivery velocity, unit economics, and operational simplicity.",
  },
];

export const AboutPage: Component = () => {
  return (
    <div class="page-enter">
      <SeoHead
        title={`About & Principal Profile | ${SITE.name}`}
        description="Meet Jack Jefferies, founder of Ethereal Technologies — a Bristol-based principal software consultancy and product studio."
        path="/about"
        jsonLd={buildPersonSchema()}
      />

      <section class="pt-14 pb-16 px-5">
        <div class="max-w-5xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Narrative */}
            <div class="lg:col-span-7 space-y-5">
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
                About {SITE.name}
              </p>
              <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Direct access to principal-level software engineering.
              </h1>
              <p class="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                Founded in Bristol by{" "}
                <strong class="font-semibold text-[var(--text-primary)]">{SITE.founder}</strong>,{" "}
                {SITE.name} partners with technology leaders, scale-ups, and enterprise teams on
                high-impact software architecture and delivery — without traditional consultancy
                overhead.
              </p>
              <p class="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]">
                With over a decade across TypeScript, Java, Flutter, GraphQL supergraphs, RDBMS/OLAP
                warehousing, Neo4j graph databases, and multi-cloud Terraform estates (AWS &amp; GCP),
                we combine client consultancy with building and operating{" "}
                <a href="/agora" class="text-[var(--accent-text)] font-medium hover:underline">
                  Agora
                </a>
                , our in-house marketplace product.
              </p>

              {/* Working Principles */}
              <div class="pt-4 space-y-3">
                <h2 class="text-lg font-bold text-[var(--text-primary)]">How We Work</h2>
                <For each={PRINCIPLES}>
                  {(principle) => (
                    <div class="studio-card rounded-2xl p-5">
                      <h3 class="text-sm sm:text-base font-bold text-[var(--text-primary)] m-0">
                        {principle.title}
                      </h3>
                      <p class="text-xs sm:text-sm mt-1.5 leading-relaxed text-[var(--text-secondary)] m-0">
                        {principle.body}
                      </p>
                    </div>
                  )}
                </For>
              </div>
            </div>

            {/* Principal Profile & Credentials Column */}
            <aside class="lg:col-span-5 space-y-4">
              <div class="studio-card rounded-2xl p-6">
                <div class="flex items-center gap-4">
                  <img
                    src="/profile.jpeg"
                    alt="Jack Jefferies"
                    width="80"
                    height="80"
                    class="w-20 h-20 rounded-2xl object-cover border border-[var(--border-accent)] shrink-0"
                  />
                  <div>
                    <h2 class="text-lg font-bold text-[var(--text-primary)] m-0">{SITE.founder}</h2>
                    <p class="text-xs font-semibold text-[var(--accent-text)] mt-0.5 m-0">
                      Founder &amp; Principal Consultant
                    </p>
                    <p class="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] mt-1.5 m-0">
                      <MapPinIcon class="w-3.5 h-3.5 text-[var(--accent-text)]" />
                      <span>{SITE.location}</span>
                    </p>
                  </div>
                </div>

                <div class="mt-5 pt-4 border-t border-[var(--border-hairline)] flex flex-wrap gap-2">
                  <a
                    href={SITE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium studio-surface-subtle text-[var(--text-primary)] hover:border-[var(--border-accent)] no-underline"
                  >
                    <GithubIcon class="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={SITE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium studio-surface-subtle text-[var(--text-primary)] hover:border-[var(--border-accent)] no-underline"
                  >
                    <LinkedinIcon class="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              <div class="studio-card rounded-2xl p-5">
                <div class="text-xs font-mono text-[var(--accent-text)] mb-3">CERTIFICATIONS</div>
                <ul class="space-y-3 list-none p-0 m-0">
                  <For each={CERTIFICATIONS}>
                    {(cert) => (
                      <li class="flex items-start justify-between gap-3 text-sm">
                        <div class="flex items-start gap-2">
                          <AwardIcon class="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                          <div>
                            <div class="font-semibold text-[var(--text-primary)]">{cert.name}</div>
                            <div class="text-xs text-[var(--text-secondary)]">{cert.issuer}</div>
                          </div>
                        </div>
                        <span class="text-xs font-mono text-[var(--text-secondary)] shrink-0">
                          {cert.year}
                        </span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>

              <div class="studio-card rounded-2xl p-5">
                <div class="text-xs font-mono text-[var(--accent-text)] mb-3">STUDIO DETAILS</div>
                <dl class="space-y-2 text-xs sm:text-sm m-0">
                  <div>
                    <dt class="inline font-semibold text-[var(--text-primary)]">Base: </dt>
                    <dd class="inline text-[var(--text-secondary)] m-0">{SITE.region}</dd>
                  </div>
                  <div>
                    <dt class="inline font-semibold text-[var(--text-primary)]">Languages: </dt>
                    <dd class="inline text-[var(--text-secondary)] m-0">
                      {LANGUAGES.map((lang) => `${lang.name} (${lang.level})`).join(", ")}
                    </dd>
                  </div>
                </dl>
              </div>

              <a
                href="/contact"
                class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors no-underline"
              >
                <span>Start a Project Inquiry</span>
                <ArrowRightIcon class="w-4 h-4" />
              </a>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};
