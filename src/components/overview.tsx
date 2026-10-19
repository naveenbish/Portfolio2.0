import { NamedIcon } from "@/components/icons";
import { LiveClock } from "@/components/live-clock";
import { IconChip } from "@/components/section";
import { site } from "@/data/site";

type Row = { icon: string; text: string; at?: string; href?: string };

function OverviewRow({ icon, text, at, href }: Row) {
  const body = (
    <>
      {text}
      {at && <span className="font-semibold"> {at}</span>}
    </>
  );
  return (
    <li className="flex min-h-[2.125rem] items-center gap-3 px-4 py-0.5 font-mono text-sm">
      <IconChip>
        <NamedIcon name={icon} />
      </IconChip>
      {href ? (
        <a
          href={href}
          className="decoration-muted-foreground/40 break-words underline-offset-4 hover:underline sm:truncate"
        >
          {body}
        </a>
      ) : (
        <span className="break-words sm:truncate">{body}</span>
      )}
    </li>
  );
}

export function Overview() {
  const [job, location, email] = site.overview.left;

  return (
    <section aria-labelledby="overview" className="screen-line-bottom">
      <h2 id="overview" className="sr-only">
        Overview
      </h2>
      <div className="mx-auto max-w-3xl border-x">
        <ul className="relative grid py-3 sm:grid-cols-[3fr_2fr] sm:before:absolute sm:before:inset-y-0 sm:before:left-[60%] sm:before:border-l sm:before:border-dashed">
          <OverviewRow {...job} />
          <li aria-hidden className="hidden sm:block" />
          <OverviewRow {...location} />
          <li className="flex h-[2.125rem] items-center gap-3 px-4 font-mono text-sm">
            <IconChip>
              <NamedIcon name="clock" />
            </IconChip>
            <span className="truncate">
              <LiveClock timeZone={site.timezone} />
            </span>
          </li>
          <OverviewRow {...email} />
        </ul>
      </div>
    </section>
  );
}
