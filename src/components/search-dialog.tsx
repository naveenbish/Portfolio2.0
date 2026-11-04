"use client";

import { CornerDownLeft, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

type Entry = { label: string; href: string; group: string };

const subscribe = () => () => {};
const getIsMac = () => /Mac|iPhone|iPad/.test(navigator.platform);
const getServerIsMac = () => false;

export function SearchDialog({ entries }: { entries: Entry[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const isMac = useSyncExternalStore(subscribe, getIsMac, getServerIsMac);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? entries.filter((e) => e.label.toLowerCase().includes(q)) : entries;
  }, [entries, query]);

  function open() {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      setQuery("");
      setActive(0);
      dialog.showModal();
      inputRef.current?.focus();
    }
  }

  function close() {
    dialogRef.current?.close();
  }

  function go(entry: Entry | undefined) {
    if (!entry) return;
    close();
    if (entry.href.startsWith("#")) window.location.hash = entry.href.slice(1);
    else window.open(entry.href, "_blank", "noopener,noreferrer");
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!window.matchMedia("(min-width: 640px)").matches) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        const dialog = dialogRef.current;
        if (dialog?.open) dialog.close();
        else open();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Search"
        className="text-muted-foreground hover:bg-accent hover:text-foreground inline-flex h-11 sm:h-8 items-center gap-2 rounded-lg px-3 sm:px-2 text-sm transition-colors"
      >
        <Search className="size-4" />
        <span className="hidden items-center gap-1 sm:flex">
          <kbd className="bg-muted rounded px-1.5 font-sans text-xs leading-5">
            {isMac ? "⌘" : "Ctrl"}
          </kbd>
          <kbd className="bg-muted rounded px-1.5 font-sans text-xs leading-5">K</kbd>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search the site"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="bg-background text-foreground m-auto mt-[15vh] w-[min(32rem,calc(100vw-2rem))] rounded-xl border p-0 shadow-2xl backdrop:bg-black/40 backdrop:backdrop-blur-[2px]"
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search className="text-muted-foreground size-4 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((i) => Math.min(i + 1, results.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                go(results[active]);
              }
            }}
            placeholder="Search sections…"
            aria-label="Search sections"
            className="h-12 min-w-0 w-full bg-transparent text-base sm:text-sm outline-none"
          />
        </div>
        <ul className="max-h-72 overflow-y-auto p-1.5">
          {results.length === 0 && (
            <li className="text-muted-foreground px-3 py-6 text-center text-sm">
              No results.
            </li>
          )}
          {results.map((entry, i) => (
            <li key={entry.href}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(entry)}
                className="data-[active=true]:bg-accent flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm"
                data-active={i === active}
              >
                <span>{entry.label}</span>
                <span className="text-muted-foreground flex items-center gap-2 text-xs">
                  {entry.group}
                  {i === active && <CornerDownLeft className="size-3.5" />}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  );
}
