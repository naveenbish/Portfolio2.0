"use client";

import { useEffect, useState } from "react";

/** Wall-clock time in `timeZone` for a given instant, as total minutes offset from UTC. */
function offsetMinutes(timeZone: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).formatToParts(at);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"));
  return Math.round((asUtc - Math.floor(at.getTime() / 60000) * 60000) / 60000);
}

function describeDiff(diffMinutes: number) {
  if (diffMinutes === 0) return "same time";
  const abs = Math.abs(diffMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  const span = [h ? `${h}h` : "", m ? `${m}m` : ""].filter(Boolean).join(" ");
  return `${span} ${diffMinutes > 0 ? "ahead" : "behind"}`;
}

export function LiveClock({ timeZone }: { timeZone: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Defer to an async callback so the first client render matches the server HTML.
    const tick = () => setNow(new Date());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000 * 15);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  if (!now) {
    return <span className="text-muted-foreground">--:-- --</span>;
  }

  const time = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(now);
  const localOffset = -now.getTimezoneOffset(); // minutes ahead of UTC
  const diff = offsetMinutes(timeZone, now) - localOffset;

  return (
    <>
      <time dateTime={now.toISOString()}>{time}</time>{" "}
      <span className="text-muted-foreground">{`// ${describeDiff(diff)}`}</span>
    </>
  );
}
