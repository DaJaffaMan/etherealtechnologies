import { For, Show, type Component } from "solid-js";
import type { JSX } from "@solidjs/web";
import type { FaqItem } from "../data/faqs";
import { ChevronDownIcon } from "./Icons";

export interface FaqSectionProps {
  readonly eyebrow: string;
  readonly heading: string;
  readonly lead?: string;
  readonly items: readonly FaqItem[];
  readonly containerClass?: JSX.ClassValue;
}

export const FaqSection: Component<FaqSectionProps> = (props) => {
  return (
    <section class="py-10 px-5">
      <div class={["mx-auto", props.containerClass ?? "max-w-5xl"]}>
        <div class="mb-6">
          <p class="text-xs font-semibold uppercase tracking-widest text-[var(--accent-text)] m-0">
            {props.eyebrow}
          </p>
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight mt-1 text-[var(--text-primary)]">
            {props.heading}
          </h2>
          <Show when={props.lead}>
            {(leadText) => (
              <p class="mt-2 text-sm max-w-2xl leading-relaxed text-[var(--text-secondary)]">
                {leadText()}
              </p>
            )}
          </Show>
        </div>

        <div class="space-y-3">
          <For each={props.items}>
            {(item) => (
              <details class="faq-item studio-card rounded-2xl">
                <summary class="faq-summary px-5 py-4 flex items-center justify-between gap-4 text-left text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                  <span>{item.question}</span>
                  <ChevronDownIcon class="faq-chevron w-4 h-4 text-[var(--accent-text)] shrink-0 transition-transform duration-200" />
                </summary>
                <div class="px-5 pb-4 pt-2 border-t border-[var(--border-hairline)]">
                  <p class="m-0 text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.answer}
                  </p>
                </div>
              </details>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};
