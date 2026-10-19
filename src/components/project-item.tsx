"use client";

import { ChevronsDownUp, ChevronsUpDown, Link as LinkIcon } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

import { IconTile } from "@/components/section";
import { cn } from "@/lib/utils";

/**
 * One row of the Projects list: ringed icon tile, dashed divider, title with a
 * muted line under it, then a link icon and an expand chevron. The whole row
 * toggles the panel below it; the link sits above that hit area.
 */
export function ProjectItem({
  title,
  subtitle,
  url,
  icon,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle: string;
  url: string;
  icon: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <li className="border-line border-b">
      <div className="hover:bg-accent relative flex items-center transition-colors">
        <IconTile className="mx-4">{icon}</IconTile>

        <div className="border-line flex flex-1 items-center gap-2 border-l border-dashed p-4">
          <div className="flex-1">
            <h3 className="mb-1 leading-snug font-medium text-balance">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
                className="text-left"
              >
                <span aria-hidden className="absolute inset-0" />
                {title}
              </button>
            </h3>
            <p className="text-muted-foreground text-sm">{subtitle}</p>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener"
            aria-label={`Open ${title}`}
            className="text-muted-foreground hover:text-foreground relative flex size-6 shrink-0 items-center justify-center after:absolute after:-inset-2"
          >
            <LinkIcon aria-hidden className="pointer-events-none size-4" />
          </a>

          <div aria-hidden className="text-muted-foreground shrink-0 [&_svg]:size-4">
            {open ? <ChevronsDownUp /> : <ChevronsUpDown />}
          </div>
        </div>
      </div>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-expo-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="border-line space-y-4 border-t p-4">{children}</div>
        </div>
      </div>
    </li>
  );
}
