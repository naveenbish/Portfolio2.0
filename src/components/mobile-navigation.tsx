"use client";

import { Menu, Search, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";

type Entry = { label: string; href: string; group: string };

export function MobileNavigation({ entries }: { entries: Entry[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogId = useId();
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [open, setOpen] = useState(false);
  const results = entries.filter((entry) =>
    entry.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function show(focusSearch: boolean) {
    setQuery("");
    setSearchMode(focusSearch);
    dialogRef.current?.showModal();
    setOpen(true);
    if (focusSearch) requestAnimationFrame(() => searchRef.current?.focus());
    else closeRef.current?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 640px)");
    const onResize = () => {
      if (desktop.matches) dialogRef.current?.close();
    };
    const onKey = (event: KeyboardEvent) => {
      if (!desktop.matches && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setQuery("");
        setSearchMode(true);
        dialogRef.current?.showModal();
        setOpen(true);
        requestAnimationFrame(() => searchRef.current?.focus());
      }
    };
    desktop.addEventListener("change", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      desktop.removeEventListener("change", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <nav aria-label="Mobile navigation" className="mobile-dock border-border/80 bg-background/90 fixed left-1/2 z-50 flex w-fit -translate-x-1/2 items-center gap-1 rounded-2xl border p-1.5 shadow-lg backdrop-blur-xl sm:hidden">
        <button
          type="button"
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-controls={dialogId}
          aria-expanded={open}
          onClick={() => show(false)}
          className="text-muted-foreground hover:bg-accent hover:text-foreground flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <Menu aria-hidden className="size-5" />
        </button>
        <span className="shrink-0"><ThemeToggle /></span>
      </nav>

      <dialog
        id={dialogId}
        ref={dialogRef}
        aria-label="Navigation"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
          }
        }}
        className="mobile-menu bg-background text-foreground fixed inset-x-4 top-auto mx-auto w-auto max-w-xs overflow-hidden rounded-2xl border p-0 shadow-lg backdrop:bg-black/15 sm:hidden"
      >
        <div className="flex items-center justify-between pl-5 pr-2 py-1">
          <h2 className="text-muted-foreground text-sm">{searchMode ? "Search" : "Navigate"}</h2>
          <button ref={closeRef} type="button" onClick={close} aria-label="Close menu" className="text-muted-foreground hover:bg-accent flex size-11 shrink-0 items-center justify-center rounded-full focus-visible:outline-2">
            <X aria-hidden className="size-5" />
          </button>
        </div>
        {searchMode && <div className="bg-muted/60 mx-4 mb-3 flex items-center gap-2 rounded-xl border px-3 focus-within:ring-2 focus-within:ring-ring">
          <Search aria-hidden className="text-muted-foreground size-4 shrink-0" />
          <input
            ref={searchRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                dialogRef.current?.querySelector<HTMLAnchorElement>("nav a")?.click();
              }
            }}
            aria-label="Search portfolio sections"
            aria-controls={`${dialogId}-results`}
            placeholder="Find a section…"
            className="h-11 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
        </div>}
        <nav id={`${dialogId}-results`} aria-label="Portfolio sections" className="mobile-menu-results overflow-y-auto overscroll-contain border-t px-2 py-1">
          {results.length ? results.map((entry) => (
            <a
              key={entry.href}
              href={entry.href}
              onClick={close}
              target={entry.href.startsWith("#") ? undefined : "_blank"}
              rel={entry.href.startsWith("#") ? undefined : "noreferrer"}
              className="hover:bg-accent focus-visible:bg-accent flex min-h-11 items-center rounded-lg px-3 py-2 outline-none transition-colors"
            >
              <span className={entry.group === "Link" ? "text-muted-foreground text-sm" : "text-sm"}>{entry.label}</span>
            </a>
          )) : <p role="status" className="text-muted-foreground px-3 py-6 text-center text-sm">No sections found. Try “Projects”.</p>}
        </nav>
      </dialog>
    </>
  );
}
