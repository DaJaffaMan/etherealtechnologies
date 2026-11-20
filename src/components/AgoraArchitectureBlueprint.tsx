import { createMemo, createSignal, For, type Component } from "solid-js";
import { AGORA, type AgoraNodeId } from "../data/agora";
import { CheckIcon } from "./Icons";

export const AgoraArchitectureBlueprint: Component = () => {
  const [selectedId, setSelectedId] = createSignal<AgoraNodeId>("nestjs");

  const activeNode = createMemo(() => {
    const id = selectedId();
    return AGORA.architectureNodes.find((node) => node.id === id) ?? AGORA.architectureNodes[0]!;
  });

  return (
    <div class="studio-card rounded-3xl p-5 sm:p-7 space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <p class="text-xs font-mono uppercase tracking-widest text-[var(--accent-text)] m-0">
            Interactive Architecture Blueprint
          </p>
          <h3 class="text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-1 m-0">
            Inspect the live Agora production topology
          </h3>
        </div>
        <span class="text-xs text-[var(--text-secondary)]">
          Select any node to inspect architectural decisions
        </span>
      </div>

      {/* Topology Nodes + Decorative Connector Diagram */}
      <div class="relative">
        {/* Decorative architectural bus lines behind cards on wide screens */}
        <svg
          class="hidden lg:block absolute inset-0 w-full h-full pointer-events-none opacity-45"
          viewBox="0 0 900 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line
            x1="150"
            y1="56"
            x2="750"
            y2="56"
            stroke="var(--accent)"
            stroke-width="1.5"
            stroke-dasharray="5 5"
          />
          <line
            x1="150"
            y1="164"
            x2="750"
            y2="164"
            stroke="var(--accent)"
            stroke-width="1.5"
            stroke-dasharray="5 5"
          />
          <line
            x1="450"
            y1="56"
            x2="450"
            y2="164"
            stroke="var(--accent)"
            stroke-width="1.5"
            stroke-dasharray="5 5"
          />
        </svg>

        <div
          class="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          role="group"
          aria-label="Agora system architecture components"
        >
          <For each={AGORA.architectureNodes}>
            {(node) => (
              <button
                type="button"
                aria-pressed={selectedId() === node.id ? "true" : "false"}
                onClick={() => setSelectedId(node.id)}
                class={[
                  "text-left rounded-2xl p-4 border cursor-pointer transition-all",
                  selectedId() === node.id
                    ? "bg-[var(--surface-card)] border-[var(--accent)] shadow-[0_0_0_2px_var(--accent-soft)]"
                    : "bg-[var(--surface-subtle)] border-[var(--border-hairline)] hover:border-[var(--border-accent)]",
                ]}
              >
                <div class="flex items-center justify-between gap-2">
                  <span class="text-[11px] font-mono text-[var(--accent-text)]">
                    {node.step} / {node.layer}
                  </span>
                  <span
                    class={[
                      "w-2 h-2 rounded-full",
                      selectedId() === node.id
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--border-hairline)]",
                    ]}
                    aria-hidden="true"
                  />
                </div>
                <div class="font-bold text-sm sm:text-base mt-1.5 text-[var(--text-primary)]">
                  {node.label}
                </div>
                <div class="text-xs text-[var(--text-secondary)] mt-0.5">{node.role}</div>
              </button>
            )}
          </For>
        </div>
      </div>

      {/* Live Inspector Panel */}
      <div
        aria-live="polite"
        class="studio-surface-subtle rounded-2xl p-5 sm:p-6 border border-[var(--border-accent)]"
      >
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span class="text-xs font-mono text-[var(--accent-text)] uppercase">
              Selected Node · {activeNode().layer}
            </span>
            <h4 class="text-lg font-bold text-[var(--text-primary)] mt-0.5 m-0">
              {activeNode().label} — {activeNode().role}
            </h4>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <For each={activeNode().technologies}>
              {(tech) => (
                <span class="px-2.5 py-0.5 rounded-md text-xs font-mono studio-card text-[var(--text-primary)]">
                  {tech}
                </span>
              )}
            </For>
          </div>
        </div>

        <p class="text-sm mt-3 leading-relaxed text-[var(--text-secondary)]">
          {activeNode().summary}
        </p>

        <div class="mt-4 pt-4 border-t border-[var(--border-hairline)]">
          <div class="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] mb-2.5">
            Key Engineering Decisions
          </div>
          <ul class="space-y-2 list-none p-0 m-0">
            <For each={activeNode().decisions}>
              {(decision) => (
                <li class="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                  <CheckIcon class="w-4 h-4 text-[var(--accent-text)] shrink-0 mt-0.5" />
                  <span>{decision}</span>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </div>
  );
};
