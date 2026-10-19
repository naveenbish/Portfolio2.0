"use client";

import { Contrast } from "lucide-react";

export function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage can be blocked; the toggle still works for this session
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className="hover:bg-accent inline-flex size-8 items-center justify-center rounded-lg transition-colors"
    >
      <Contrast className="size-4.5" />
    </button>
  );
}
