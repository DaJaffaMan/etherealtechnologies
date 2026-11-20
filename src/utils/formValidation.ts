type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface InteractionState {
  hasInteracted: boolean;
  hasBlurred: boolean;
}

function isFormControl(target: EventTarget | null): target is FormControlElement {
  return (
    target instanceof HTMLElement &&
    (target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement)
  );
}

function supportsUserInvalid(): boolean {
  return (
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    CSS.supports("selector(:user-invalid)")
  );
}

function linkError(el: FormControlElement, shown: boolean): void {
  const errorId = el.dataset.error;
  if (!errorId) return;
  const ids = (el.getAttribute("aria-describedby") ?? "")
    .split(/\s+/)
    .filter((id) => id !== "" && id !== errorId);
  if (shown) ids.push(errorId);
  if (ids.length > 0) {
    el.setAttribute("aria-describedby", ids.join(" "));
  } else {
    el.removeAttribute("aria-describedby");
  }
}

function spokenText(node: HTMLElement): string {
  const copy = node.cloneNode(true) as HTMLElement;
  copy.querySelectorAll('[aria-hidden="true"]').forEach((child) => child.remove());
  copy.querySelectorAll('[role="img"][aria-label]').forEach((img) => {
    const label = img.getAttribute("aria-label") ?? "";
    img.replaceWith(`${label}: `);
  });
  return (copy.textContent ?? "").replace(/\s+/g, " ").trim();
}

/**
 * Synchronizes ARIA invalid state, conditional aria-describedby error linking,
 * polite screen-reader error announcements, and :user-invalid CSS fallback
 * for forms inside a component.
 */
export function attachAccessibleValidation(form: HTMLFormElement): () => void {
  const doc = form.ownerDocument;
  const nativeSupport = supportsUserInvalid();
  const flagged = new WeakSet<FormControlElement>();
  const announced = new WeakSet<FormControlElement>();
  const dirtyState = new WeakMap<FormControlElement, InteractionState>();

  const announcer = doc.createElement("div");
  announcer.setAttribute("aria-live", "polite");
  announcer.classList.add("visually-hidden");
  doc.body.append(announcer);

  let announceTimer: ReturnType<typeof setTimeout> | undefined;
  let announcedField: FormControlElement | undefined;

  const announceError = (el: FormControlElement): void => {
    const errorId = el.dataset.error;
    if (!errorId) return;
    const errorEl = doc.getElementById(errorId);
    if (!errorEl) return;

    const firstLabel = el.labels?.[0];
    const labelPrefix = firstLabel ? `${spokenText(firstLabel)}: ` : "";

    if (announceTimer !== undefined) clearTimeout(announceTimer);
    announcer.textContent = "";
    announcedField = el;
    announceTimer = setTimeout(() => {
      announcer.textContent = labelPrefix + spokenText(errorEl);
    }, 500);
  };

  const syncAria = (el: FormControlElement, announce = false, forceInvalid?: boolean): void => {
    const invalid =
      forceInvalid !== undefined
        ? forceInvalid
        : nativeSupport
          ? el.matches(":user-invalid")
          : el.classList.contains("user-invalid-fallback");

    if (invalid) {
      if (announce && !announced.has(el)) {
        announceError(el);
        announced.add(el);
      }
      el.setAttribute("aria-invalid", "true");
      linkError(el, true);
      flagged.add(el);
    } else if (flagged.has(el) || el.getAttribute("aria-invalid") !== "true") {
      el.setAttribute("aria-invalid", "false");
      linkError(el, false);
      flagged.delete(el);
      announced.delete(el);
      if (announcedField === el) {
        if (announceTimer !== undefined) clearTimeout(announceTimer);
        announcer.textContent = "";
      }
    }
  };

  const applyFallbackState = (el: FormControlElement, announce: boolean): void => {
    const isValid = el.validity.valid;
    el.classList.toggle("user-invalid-fallback", !isValid);
    el.classList.toggle("user-valid-fallback", isValid);
    syncAria(el, announce, !isValid);
  };

  // Start every control at aria-invalid="false"
  form.querySelectorAll("input, select, textarea").forEach((node) => {
    if (isFormControl(node)) {
      syncAria(node, false, false);
    }
  });

  const onBlur = (event: Event): void => {
    if (!isFormControl(event.target)) return;
    const el = event.target;
    if (nativeSupport) {
      syncAria(el, true);
      return;
    }
    const state = dirtyState.get(el) ?? { hasInteracted: false, hasBlurred: false };
    state.hasBlurred = true;
    dirtyState.set(el, state);
    if (state.hasInteracted) {
      applyFallbackState(el, true);
    }
  };

  const onInput = (event: Event): void => {
    if (!isFormControl(event.target)) return;
    const el = event.target;
    if (nativeSupport) {
      if (el.hasAttribute("aria-invalid")) syncAria(el, false);
      return;
    }
    const state = dirtyState.get(el) ?? { hasInteracted: false, hasBlurred: false };
    state.hasInteracted = true;
    dirtyState.set(el, state);
    if (state.hasBlurred) {
      applyFallbackState(el, false);
    }
  };

  const onChange = (event: Event): void => {
    if (!isFormControl(event.target)) return;
    const el = event.target;
    if (nativeSupport) {
      syncAria(el, true);
      return;
    }
    const state = dirtyState.get(el) ?? { hasInteracted: false, hasBlurred: false };
    state.hasInteracted = true;
    dirtyState.set(el, state);
    if (state.hasBlurred || el instanceof HTMLSelectElement) {
      applyFallbackState(el, true);
    }
  };

  const onInvalid = (event: Event): void => {
    if (!isFormControl(event.target)) return;
    const el = event.target;
    announced.add(el);
    if (nativeSupport) {
      syncAria(el, false);
    } else {
      dirtyState.set(el, { hasInteracted: true, hasBlurred: true });
      applyFallbackState(el, false);
    }
  };

  const onReset = (): void => {
    setTimeout(() => {
      form.querySelectorAll("input, select, textarea").forEach((node) => {
        if (!isFormControl(node)) return;
        dirtyState.delete(node);
        node.classList.remove("user-invalid-fallback", "user-valid-fallback");
        syncAria(node, false, false);
      });
    });
  };

  form.addEventListener("blur", onBlur, true);
  form.addEventListener("input", onInput);
  form.addEventListener("change", onChange, true);
  form.addEventListener("invalid", onInvalid, true);
  form.addEventListener("reset", onReset, true);

  return () => {
    if (announceTimer !== undefined) clearTimeout(announceTimer);
    form.removeEventListener("blur", onBlur, true);
    form.removeEventListener("input", onInput);
    form.removeEventListener("change", onChange, true);
    form.removeEventListener("invalid", onInvalid, true);
    form.removeEventListener("reset", onReset, true);
    announcer.remove();
  };
}
