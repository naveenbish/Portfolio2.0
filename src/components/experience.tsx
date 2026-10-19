import { Infinity as InfinityIcon } from "lucide-react";

import { NamedIcon } from "@/components/icons";
import { IconTile, MetaDivider, Section, SectionHeading, Tag } from "@/components/section";
import { site, type Job, type Role } from "@/data/site";
import { cn } from "@/lib/utils";

/** Live dot for the current employer; the ping is skipped when motion is reduced. */
function CurrentDot() {
  return (
    <>
      <dt className="sr-only">Employment status</dt>
      <dd>
        <span className="sr-only">Current</span>
        <span aria-hidden className="relative flex size-2.5 translate-px items-center justify-center">
          <span className="bg-info absolute inline-flex size-2.5 animate-ping rounded-full opacity-50 motion-reduce:animate-none" />
          <span className="bg-info relative inline-flex size-1.5 rounded-full" />
        </span>
      </dd>
    </>
  );
}

function RoleMeta({ role }: { role: Role }) {
  const ongoing = role.end === "Present";
  return (
    <dl className="text-muted-foreground flex flex-wrap items-center gap-x-2 pl-9 text-sm">
      {role.type && (
        <>
          <div>
            <dt className="sr-only">Employment type</dt>
            <dd>{role.type}</dd>
          </div>
          <MetaDivider />
        </>
      )}
      <div>
        <dt className="sr-only">Employment period</dt>
        <dd className="flex items-center gap-0.5 tabular-nums">
          <span>{role.start}</span>
          <span className="font-mono">—</span>
          {ongoing ? (
            <>
              <InfinityIcon aria-hidden className="size-4" />
              <span className="sr-only">Present</span>
            </>
          ) : (
            <span>{role.end}</span>
          )}
        </dd>
      </div>
      {role.duration && (
        <>
          <MetaDivider />
          <div>
            <dt className="sr-only">Duration</dt>
            <dd className="tabular-nums">{role.duration}</dd>
          </div>
        </>
      )}
    </dl>
  );
}

export function Experience() {
  const jobs: Job[] = site.experience;

  return (
    <Section id="experience">
      <SectionHeading id="experience">Experience</SectionHeading>
      <div className="px-4">
        {jobs.map((job) => {
          // The timeline joins several roles, or leads into a role's bullets and tags.
          const timeline =
            job.roles.length > 1 || job.roles.some((role) => role.bullets || role.tags);

          return (
            <div
              key={job.company}
              className="screen-line-bottom scroll-mt-14 space-y-4 py-4"
            >
              <div className="flex items-start gap-3 sm:items-center">
                <div
                  aria-hidden
                  className="bg-foreground text-background flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold select-none"
                >
                  {job.company[0]}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-x-3 gap-y-1 pr-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl/6 font-medium">{job.company}</h3>
                  <dl className="text-muted-foreground flex min-w-0 items-center gap-1.5 text-sm whitespace-nowrap">
                    {job.location && (
                      <>
                        <dt className="sr-only">Location</dt>
                        <dd className="truncate">{job.location}</dd>
                      </>
                    )}
                    {job.locationType && (
                      <>
                        <dt className="sr-only">Location type</dt>
                        <dd>{job.location ? `(${job.locationType})` : job.locationType}</dd>
                      </>
                    )}
                    {job.current && <CurrentDot />}
                  </dl>
                </div>
              </div>

              <div
                className={cn(
                  "relative space-y-4",
                  timeline &&
                    "before:absolute before:left-3 before:h-full before:w-px before:bg-border",
                )}
              >
                {job.roles.map((role, i) => (
                  <div key={role.title + role.start} className="relative">
                    {timeline && i === job.roles.length - 1 && (
                      // Rounded elbow that ends the timeline line.
                      <div
                        aria-hidden
                        className="bg-background pointer-events-none absolute bottom-0 left-3 flex size-4"
                      >
                        <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l" />
                      </div>
                    )}

                    <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
                      <IconTile>
                        <NamedIcon name={role.icon} />
                      </IconTile>
                      <h4 className="flex-1 font-medium text-balance">{role.title}</h4>
                    </div>
                    <RoleMeta role={role} />

                    {role.bullets && (
                      <ul className="marker:text-foreground/25 list-disc space-y-2 pt-3 pb-1 pl-[calc(2.25rem+1.5em)] text-[15px] leading-[1.6]">
                        {role.bullets.map((bullet) => (
                          <li key={bullet} className="pl-[0.4em]">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {role.tags && (
                      <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
                        {role.tags.map((tag) => (
                          <li key={tag} className="flex">
                            <Tag>{tag}</Tag>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
