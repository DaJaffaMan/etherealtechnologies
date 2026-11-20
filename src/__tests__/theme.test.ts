import { describe, expect, it } from "vitest";
import {
  COLOR_SCHEME_STORAGE_KEY,
  computeNextScheme,
  getEffectiveScheme,
  getStoredScheme,
  toggleColorScheme,
  type StorageLike,
} from "../utils/theme";

function createMemoryStorage(initial?: Record<string, string>): StorageLike & {
  snapshot(): Record<string, string>;
} {
  const data = new Map<string, string>(Object.entries(initial ?? {}));
  return {
    getItem(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    snapshot() {
      return Object.fromEntries(data.entries());
    },
  };
}

describe("theme color-scheme utilities", () => {
  it("computes the next override relative to current effective and OS preference", () => {
    expect(computeNextScheme("light", "light")).toBe("dark");
    expect(computeNextScheme("dark", "light")).toBeNull();
    expect(computeNextScheme("dark", "dark")).toBe("light");
    expect(computeNextScheme("light", "dark")).toBeNull();
  });

  it("follows the full dark-mode-toggle state lifecycle without clearing pins on OS shifts", () => {
    const storage = createMemoryStorage();
    document.head.innerHTML = '<meta name="color-scheme" content="light dark">';
    const meta = document.head.querySelector('meta[name="color-scheme"]');

    // 1. OS is light, no stored value -> toggle pins dark
    const step1 = toggleColorScheme({ storage, system: "light", doc: document });
    expect(step1).toEqual({ override: "dark", effective: "dark" });
    expect(storage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBe("dark");
    expect(meta?.getAttribute("content")).toBe("dark");

    // 2. OS changes to dark -> stored override stays pinned at dark
    const storedStep2 = getStoredScheme(storage);
    expect(storedStep2).toBe("dark");
    expect(getEffectiveScheme(storedStep2, "dark")).toBe("dark");

    // 3. OS changes back to light -> site stays dark because dark is pinned
    expect(getEffectiveScheme(getStoredScheme(storage), "light")).toBe("dark");

    // 4. User toggles again while OS is light -> target (light) matches OS, so pin is removed
    const step4 = toggleColorScheme({ storage, system: "light", doc: document });
    expect(step4).toEqual({ override: null, effective: "light" });
    expect(storage.getItem(COLOR_SCHEME_STORAGE_KEY)).toBeNull();
    expect(meta?.getAttribute("content")).toBe("light dark");
  });

  it("handles storage access exceptions gracefully without throwing", () => {
    const blockedStorage: StorageLike = {
      getItem() {
        throw new Error("SecurityError");
      },
      setItem() {
        throw new Error("SecurityError");
      },
      removeItem() {
        throw new Error("SecurityError");
      },
    };
    document.head.innerHTML = '<meta name="color-scheme" content="light dark">';

    expect(getStoredScheme(blockedStorage)).toBeNull();
    const res = toggleColorScheme({ storage: blockedStorage, system: "light", doc: document });
    expect(res).toEqual({ override: "dark", effective: "dark" });
    expect(document.head.querySelector('meta[name="color-scheme"]')?.getAttribute("content")).toBe(
      "dark"
    );
  });
});
