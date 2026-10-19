import { Link as LinkIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Full-bleed hatched band between sections, ruled top and bottom. */
export function Separator({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("screen-line-top screen-line-bottom h-8", className)}
    >
      <div className="bg-hatch absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2" />
    </div>
  );
}

/** The bordered 768px column every section lives in. */
export function Column({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-3xl border-x", className)}>
      {children}
    </div>
  );
}

export function SectionHeading({
  id,
  children,
  count,
}: {
  id: string;
  children: ReactNode;
  count?: number;
}) {
  return (
    <div className="screen-line-bottom group flex items-baseline gap-2 px-4 py-3">
      <h2 className="text-3xl font-medium tracking-tight">
        {children}
        {count !== undefined && (
          <sup className="text-muted-foreground top-[-0.75em] ml-1 text-sm font-medium tracking-normal">
            ({count})
          </sup>
        )}
      </h2>
      <a
        href={`#${id}`}
        aria-label="Copy link to section"
        className="text-muted-foreground hover:text-foreground ml-auto opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        <LinkIcon className="size-4" />
      </a>
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-14", className)}>
      <Column>{children}</Column>
    </section>
  );
}

/** Ringed 24px icon tile used by the Projects and Education rows. */
export function IconTile({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-muted-foreground/15 bg-muted text-muted-foreground ring-border/50 ring-offset-background dark:ring-line flex size-6 shrink-0 items-center justify-center rounded-md border ring-1 ring-offset-1 select-none [&_svg]:size-4 [&_svg]:shrink-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function IconChip({ children }: { children: ReactNode }) {
  return (
    <span className="bg-muted text-muted-foreground inline-flex size-7 shrink-0 items-center justify-center rounded-lg border [&_svg]:size-4">
      {children}
    </span>
  );
}

/** Thin vertical rule between the facts on an entry's meta line. */
export function MetaDivider() {
  return <div aria-hidden className="bg-border h-4 w-px shrink-0 self-center" />;
}

/** Rounded pill tag, as used under Experience, Education and Projects entries. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="text-muted-foreground inline-flex items-center rounded-full border bg-zinc-50 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-900">
      {children}
    </span>
  );
}
