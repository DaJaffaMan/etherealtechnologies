import { createSignal, onSettled, type Component } from "solid-js";
import { isServer } from "@solidjs/web";
import {
  COLOR_SCHEME_STORAGE_KEY,
  applySchemeToMeta,
  getEffectiveScheme,
  getStoredScheme,
  getSystemScheme,
  toggleColorScheme,
  type ColorScheme,
} from "../utils/theme";
import { MoonIcon, SunIcon } from "./Icons";

export const ThemeToggle: Component = () => {
  const [effectiveScheme, setEffectiveScheme] = createSignal<ColorScheme>("dark");

  onSettled(() => {
    if (isServer) return;

    const syncFromSystemAndStorage = () => {
      const override = getStoredScheme();
      const system = getSystemScheme();
      applySchemeToMeta(override);
      setEffectiveScheme(getEffectiveScheme(override, system));
    };

    syncFromSystemAndStorage();

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onMediaChange = () => {
      // Never remove a stored override when the OS preference shifts to match it
      const override = getStoredScheme();
      setEffectiveScheme(getEffectiveScheme(override, getSystemScheme()));
    };
    const onStorageChange = (event: StorageEvent) => {
      if (event.key === null || event.key === COLOR_SCHEME_STORAGE_KEY) {
        syncFromSystemAndStorage();
      }
    };

    mq?.addEventListener("change", onMediaChange);
    window.addEventListener("storage", onStorageChange);

    return () => {
      mq?.removeEventListener("change", onMediaChange);
      window.removeEventListener("storage", onStorageChange);
    };
  });

  const handleToggle = () => {
    const result = toggleColorScheme();
    setEffectiveScheme(result.effective);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={
        effectiveScheme() === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      title={effectiveScheme() === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      class="theme-toggle-btn inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer border border-[var(--border-hairline)] bg-[var(--surface-subtle)] text-[var(--text-primary)] hover:border-[var(--border-accent)] transition-colors"
    >
      <span class="icon-when-dark items-center gap-1.5">
        <SunIcon class="w-3.5 h-3.5 text-[var(--accent-text)]" />
        <span class="hidden sm:inline">Light</span>
      </span>
      <span class="icon-when-light items-center gap-1.5">
        <MoonIcon class="w-3.5 h-3.5 text-[var(--accent-text)]" />
        <span class="hidden sm:inline">Dark</span>
      </span>
    </button>
  );
};
