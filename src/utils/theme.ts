export type ColorScheme = "light" | "dark";

export const COLOR_SCHEME_STORAGE_KEY = "color-scheme";

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export function getStoredScheme(storage?: StorageLike | null): ColorScheme | null {
  try {
    const store = storage ?? (typeof window !== "undefined" ? window.localStorage : null);
    if (!store) return null;
    const raw = store.getItem(COLOR_SCHEME_STORAGE_KEY);
    return raw === "light" || raw === "dark" ? raw : null;
  } catch {
    return null;
  }
}

export function setStoredScheme(override: ColorScheme | null, storage?: StorageLike | null): void {
  try {
    const store = storage ?? (typeof window !== "undefined" ? window.localStorage : null);
    if (!store) return;
    if (override === null) {
      store.removeItem(COLOR_SCHEME_STORAGE_KEY);
    } else {
      store.setItem(COLOR_SCHEME_STORAGE_KEY, override);
    }
  } catch {
    // Storage may be disabled in private browsing contexts; visual toggle still applies.
  }
}

export function getSystemScheme(
  matchMediaFn?: (query: string) => { matches: boolean }
): ColorScheme {
  if (matchMediaFn) {
    return matchMediaFn("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "dark";
}

export function getEffectiveScheme(
  override: ColorScheme | null,
  system: ColorScheme
): ColorScheme {
  return override ?? system;
}

/**
 * Computes the next override per modern-web-guidance `dark-mode-toggle`:
 * Target is the opposite of the currently rendered scheme. If that target
 * differs from the OS preference, store it literally; if it matches the OS
 * preference, clear the stored override so the site follows the OS again.
 */
export function computeNextScheme(
  currentEffective: ColorScheme,
  system: ColorScheme
): ColorScheme | null {
  const target: ColorScheme = currentEffective === "dark" ? "light" : "dark";
  return target === system ? null : target;
}

export function applySchemeToMeta(
  override: ColorScheme | null,
  doc?: Document
): void {
  const targetDoc = doc ?? (typeof document !== "undefined" ? document : undefined);
  if (!targetDoc) return;
  const meta = targetDoc.querySelector('meta[name="color-scheme"]');
  if (meta) {
    meta.setAttribute("content", override ?? "light dark");
  }
}

export interface ToggleSchemeResult {
  readonly override: ColorScheme | null;
  readonly effective: ColorScheme;
}

export function toggleColorScheme(options?: {
  storage?: StorageLike | null;
  system?: ColorScheme;
  doc?: Document;
}): ToggleSchemeResult {
  const storage = options?.storage;
  const system = options?.system ?? getSystemScheme();
  const currentOverride = getStoredScheme(storage);
  const currentEffective = getEffectiveScheme(currentOverride, system);
  const nextOverride = computeNextScheme(currentEffective, system);

  setStoredScheme(nextOverride, storage);
  applySchemeToMeta(nextOverride, options?.doc);

  return {
    override: nextOverride,
    effective: getEffectiveScheme(nextOverride, system),
  };
}
