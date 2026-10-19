"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** Cross-fades through a list of lines. Static when reduced motion is requested. */
export function TextFlip({
  lines,
  interval = 3500,
  className,
}: {
  lines: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (lines.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let swap: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % lines.length);
        setVisible(true);
      }, 250);
    }, interval);
    return () => {
      clearInterval(id);
      clearTimeout(swap);
    };
  }, [lines, interval]);

  return (
    <span
      aria-live="off"
      className={cn(
        "inline-block transition-[opacity,filter,transform] duration-300 ease-out",
        visible ? "opacity-100 blur-0" : "translate-y-1 opacity-0 blur-[2px]",
        className,
      )}
    >
      {lines[index]}
    </span>
  );
}
