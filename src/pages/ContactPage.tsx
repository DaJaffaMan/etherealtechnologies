import { createSignal, For, onSettled, Show, type Component } from "solid-js";
import { isServer } from "@solidjs/web";
import { useInRouter, useSearchParams } from "@solidjs/router";
import { AVAILABILITY, SITE } from "../data/site";
import {
  buildMailtoUrl,
  ENGAGEMENT_TYPES,
  TIMELINE_OPTIONS,
  type EngagementType,
  type TimelineOption,
} from "../utils/contact";
import { attachAccessibleValidation } from "../utils/formValidation";
import { CheckIcon, CopyIcon, MailIcon, MapPinIcon, PhoneIcon } from "../components/Icons";
import { SeoHead } from "../components/SeoHead";

function isEngagementType(value: string): value is EngagementType {
  return (ENGAGEMENT_TYPES as readonly string[]).includes(value);
}

function isTimelineOption(value: string): value is TimelineOption {
  return (TIMELINE_OPTIONS as readonly string[]).includes(value);
}

export const ContactPage: Component = () => {
  const inRouter = useInRouter();
  const searchParams = inRouter ? useSearchParams()[0] : undefined;

  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [engagementType, setEngagementType] = createSignal<EngagementType>(() => {
    const raw = searchParams?.engagement;
    const candidate = Array.isArray(raw) ? raw[0] : raw;
    return candidate && isEngagementType(candidate) ? candidate : ENGAGEMENT_TYPES[0];
  });
  const [timeline, setTimeline] = createSignal<TimelineOption>(TIMELINE_OPTIONS[1]);
  const [message, setMessage] = createSignal("");
  const [formStatus, setFormStatus] = createSignal("");
  const [copied, setCopied] = createSignal(false);

  let formEl: HTMLFormElement | undefined;
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  onSettled(() => {
    if (isServer) return;
    const cleanupValidation = formEl ? attachAccessibleValidation(formEl) : undefined;
    return () => {
      cleanupValidation?.();
      if (copyTimer !== undefined) clearTimeout(copyTimer);
    };
  });

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (formEl && !formEl.checkValidity()) {
      formEl.reportValidity?.();
      return;
    }

    const mailtoUrl = buildMailtoUrl({
      name: name(),
      email: email(),
      engagementType: engagementType(),
      timeline: timeline(),
      message: message(),
    });

    setFormStatus(
      `Draft compiled for ${SITE.email}. Complete sending in your email app, or copy the address directly.`
    );
    window.location.href = mailtoUrl;
  };

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(SITE.email);
      }
      setCopied(true);
      setFormStatus(`Copied ${SITE.email} to clipboard.`);
      if (copyTimer !== undefined) clearTimeout(copyTimer);
      copyTimer = setTimeout(() => setCopied(false), 3000);
    } catch {
      setFormStatus(`Direct email: ${SITE.email}`);
    }
  };

  return (
    <div class="page-enter">
      <SeoHead
        title={`Contact & Consultancy Inquiries | ${SITE.name}`}
        description="Start a consultancy engagement, legacy modernisation project, or Agora partnership conversation with Ethereal Technologies in Bristol, UK."
        path="/contact"
      />

      <section class="pt-14 pb-16 px-5">
        <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Direct Contact Details */}
          <div class="md:col-span-5 space-y-5">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-3 bg-[var(--accent-soft)] border border-[var(--border-accent)] text-[var(--accent-text)]">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>{AVAILABILITY.status}</span>
              </div>
              <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0 mb-2">
                Get in Touch
              </p>
              <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Let's talk about your next system.
              </h1>
              <p class="text-sm sm:text-base mt-3 leading-relaxed text-[var(--text-secondary)]">
                {AVAILABILITY.detail}. Available for targeted cloud architecture engagements, legacy
                modernisation, and full-stack product delivery partnerships.
              </p>
            </div>

            <div class="studio-card rounded-2xl p-5 space-y-3.5 text-sm">
              <div class="flex items-center gap-3">
                <MailIcon class="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  class="font-mono text-xs sm:text-sm text-[var(--text-primary)] hover:text-[var(--accent-text)] no-underline break-all"
                >
                  {SITE.email}
                </a>
              </div>
              <div class="flex items-center gap-3">
                <PhoneIcon class="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                <a
                  href={SITE.phoneHref}
                  class="text-[var(--text-primary)] hover:text-[var(--accent-text)] no-underline"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
              <div class="flex items-center gap-3">
                <MapPinIcon class="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                <span class="text-[var(--text-secondary)]">{SITE.region}</span>
              </div>
            </div>
          </div>

          {/* Structured Inquiry Form */}
          <div class="md:col-span-7">
            <form
              ref={(el) => (formEl = el)}
              onSubmit={handleSubmit}
              class="studio-card rounded-2xl p-6 sm:p-7 space-y-5"
            >
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    for="contact-name"
                    class="block text-xs font-semibold text-[var(--text-secondary)] mb-1"
                  >
                    Your Name
                  </label>
                  <span id="name-hint" class="block text-xs text-[var(--text-secondary)] mb-1.5">
                    Full name or organisation contact
                  </span>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autocomplete="name"
                    aria-describedby="name-hint"
                    data-error="name-error"
                    value={name()}
                    onInput={(e) => setName(e.currentTarget.value)}
                    placeholder="Jane Smith"
                    class="field-control"
                  />
                  <div id="name-error" class="error-msg">
                    <span role="img" aria-label="Error">
                      ⚠
                    </span>
                    <span>Please enter your name so we know who to address.</span>
                  </div>
                </div>

                <div>
                  <label
                    for="contact-email"
                    class="block text-xs font-semibold text-[var(--text-secondary)] mb-1"
                  >
                    Work Email
                  </label>
                  <span id="email-hint" class="block text-xs text-[var(--text-secondary)] mb-1.5">
                    Format: you@company.com
                  </span>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autocomplete="email"
                    aria-describedby="email-hint"
                    data-error="email-error"
                    value={email()}
                    onInput={(e) => setEmail(e.currentTarget.value)}
                    placeholder="jane@company.com"
                    class="field-control"
                  />
                  <div id="email-error" class="error-msg">
                    <span role="img" aria-label="Error">
                      ⚠
                    </span>
                    <span>Enter an email address in the format you@company.com.</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    for="engagement-type"
                    class="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5"
                  >
                    Engagement Type
                  </label>
                  <select
                    id="engagement-type"
                    name="engagementType"
                    value={engagementType()}
                    onChange={(e) => {
                      const val = e.currentTarget.value;
                      if (isEngagementType(val)) setEngagementType(val);
                    }}
                    class="field-control"
                  >
                    <For each={ENGAGEMENT_TYPES}>
                      {(option) => <option value={option}>{option}</option>}
                    </For>
                  </select>
                </div>

                <div>
                  <label
                    for="target-timeline"
                    class="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5"
                  >
                    Target Timeline
                  </label>
                  <select
                    id="target-timeline"
                    name="timeline"
                    value={timeline()}
                    onChange={(e) => {
                      const val = e.currentTarget.value;
                      if (isTimelineOption(val)) setTimeline(val);
                    }}
                    class="field-control"
                  >
                    <For each={TIMELINE_OPTIONS}>
                      {(option) => <option value={option}>{option}</option>}
                    </For>
                  </select>
                </div>
              </div>

              <div>
                <label
                  for="project-context"
                  class="block text-xs font-semibold text-[var(--text-secondary)] mb-1"
                >
                  Project Context
                </label>
                <span id="message-hint" class="block text-xs text-[var(--text-secondary)] mb-1.5">
                  Include goals, current stack, or key constraints
                </span>
                <textarea
                  id="project-context"
                  name="message"
                  rows={4}
                  required
                  aria-describedby="message-hint"
                  data-error="message-error"
                  value={message()}
                  onInput={(e) => setMessage(e.currentTarget.value)}
                  placeholder="Briefly describe what you're building or modernising..."
                  class="field-control resize-y"
                />
                <div id="message-error" class="error-msg">
                  <span role="img" aria-label="Error">
                    ⚠
                  </span>
                  <span>Please provide a short summary of your project or inquiry.</span>
                </div>
              </div>

              <div aria-live="polite" class="min-h-5">
                <Show when={formStatus()}>
                  {(msg) => (
                    <p class="m-0 text-xs font-medium text-[var(--accent-text)]">{msg()}</p>
                  )}
                </Show>
              </div>

              <div class="flex flex-wrap gap-3">
                <button
                  type="submit"
                  class="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition-colors border-0 cursor-pointer"
                >
                  Open Draft in Email Client
                </button>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold studio-surface-subtle text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-colors cursor-pointer"
                >
                  <Show
                    when={copied()}
                    fallback={<CopyIcon class="w-4 h-4 text-[var(--accent-text)]" />}
                  >
                    <CheckIcon class="w-4 h-4 text-[var(--accent-text)]" />
                  </Show>
                  <span>{copied() ? "Email Copied" : "Copy Email Address"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
