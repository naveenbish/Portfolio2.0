import data from "@/data/contributions.json";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const DAYS_PER_WEEK = 7;

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });
const at = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** GitHub's own 0–4 intensity levels, in GitHub's light and dark greens. */
const LEVEL_CLASS = [
  "bg-[#ebedf0] dark:bg-[#161b22]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

const weeks = Math.ceil(data.days.length / DAYS_PER_WEEK);

/** One label per month, at the first week it appears; skips ones that would collide. */
function monthLabels() {
  const labels: { week: number; label: string }[] = [];
  let lastMonth = -1;
  for (let w = 0; w < weeks; w++) {
    const date = at(data.days[w * DAYS_PER_WEEK].d);
    const month = date.getUTCMonth();
    if (month === lastMonth) continue;
    lastMonth = month;
    const previous = labels.at(-1);
    if (previous && w - previous.week < 3) labels.pop(); // keep the later one
    labels.push({ week: w, label: monthFmt.format(date) });
  }
  return labels;
}

export function ContributionGraph() {
  const github = site.socials.find((s) => s.id === "github");
  const plural = data.total === 1 ? "contribution" : "contributions";

  return (
    <section aria-labelledby="contributions" className="screen-line-bottom">
      <h2 id="contributions" className="sr-only">
        GitHub contributions
      </h2>
      <figure className="mx-auto max-w-3xl border-x">
        <div className="px-4 pt-4 pb-3">
          <p id="contribution-scroll-hint" className="text-muted-foreground mb-3 text-xs sm:hidden">Swipe to explore the year →</p>
          <div role="region" aria-label="Contribution calendar" aria-describedby="contribution-scroll-hint" tabIndex={0} className="overflow-x-auto rounded-sm pb-2 focus-visible:outline-2 focus-visible:outline-offset-4">
            <div className="min-w-[36rem]">
              <div aria-hidden className="text-muted-foreground relative mb-2 h-4 text-xs">
                {monthLabels().map(({ week, label }) => (
                  <span
                    key={week}
                    className="absolute top-0 whitespace-nowrap"
                    style={{ left: `${(week / weeks) * 100}%` }}
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div
                role="img"
                aria-label={`${data.total} ${plural} on GitHub in the last year`}
                className="grid grid-flow-col grid-rows-7 gap-[3px]"
                style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
              >
                {data.days.map((day) => (
                  <span
                    key={day.d}
                    title={`${day.c} contribution${day.c === 1 ? "" : "s"} on ${dateFmt.format(at(day.d))}`}
                    className={cn("aspect-square rounded-[2px] ring-1 ring-black/5 ring-inset dark:ring-white/5", LEVEL_CLASS[day.l])}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <figcaption className="screen-line-top text-muted-foreground flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 text-sm">
          <span>
            <span className="text-foreground">
              {data.total.toLocaleString("en-US")} {plural}, {dateFmt.format(at(data.from))} –{" "}
              {dateFmt.format(at(data.to))}. Source:{" "}
              <a
                href={github?.href}
                target="_blank"
                rel="noreferrer"
                className="decoration-muted-foreground/50 underline underline-offset-4"
              >
                GitHub
              </a>
              .
            </span>
          </span>
          <span aria-hidden className="flex items-center gap-1 text-xs">
            Less
            {LEVEL_CLASS.map((c) => (
              <span key={c} className={cn("size-2.5 rounded-[2px] ring-1 ring-black/5 ring-inset dark:ring-white/5", c)} />
            ))}
            More
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
