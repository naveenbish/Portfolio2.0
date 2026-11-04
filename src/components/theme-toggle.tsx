"use client";

import { Contrast } from "lucide-react";
import type { MouseEvent } from "react";

let transitioning = false;

export function ThemeToggle() {
  async function toggle(event: MouseEvent<HTMLButtonElement>) {
    if (transitioning) return;
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    const applyTheme = () => {
      root.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {
        // The theme still works when storage is unavailable.
      }
    };

    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme();
      return;
    }

    // Grow a curved edge from the switch, including keyboard activation.
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    transitioning = true;
    root.dataset.themeTransition = "";
    try {
      const transition = document.startViewTransition(applyTheme);
      await transition.ready;
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        {
          duration: 650,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
      await transition.finished;
    } catch {
      // A skipped transition must still apply the requested theme.
      applyTheme();
    } finally {
      delete root.dataset.themeTransition;
      transitioning = false;
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="hover:bg-accent inline-flex size-11 sm:size-8 items-center justify-center rounded-lg transition-colors"
    >
      <Contrast className="size-4.5" />
    </button>
  );
}
