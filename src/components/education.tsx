import { GraduationCap } from "lucide-react";

import { IconTile, MetaDivider, Section, SectionHeading, Tag } from "@/components/section";
import { site, type Degree } from "@/data/site";

export function Education() {
  const items: Degree[] = site.education;

  return (
    <Section id="education">
      <SectionHeading id="education">Education</SectionHeading>
      <ul>
        {items.map((item) => (
          <li
            key={item.institution + item.degree}
            className="screen-line-bottom scroll-mt-14 p-4"
          >
            <div
              className={
                item.tags
                  ? "relative before:absolute before:left-3 before:h-full before:w-px before:bg-border"
                  : "relative"
              }
            >
              {item.tags && (
                // Rounded elbow that ends the timeline line and points at the tags.
                <div
                  aria-hidden
                  className="bg-background pointer-events-none absolute bottom-0 left-3 flex size-4"
                >
                  <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l" />
                </div>
              )}

              <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
                <IconTile>
                  <GraduationCap aria-hidden strokeWidth={2} />
                </IconTile>
                <h3 className="flex-1 font-medium text-balance">{item.institution}</h3>
              </div>

              <dl className="text-muted-foreground flex flex-wrap items-center gap-x-2 pl-9 text-sm">
                <div>
                  <dt className="sr-only">Study period</dt>
                  <dd className="flex items-center gap-0.5 tabular-nums">
                    <span>{item.start}</span>
                    <span className="font-mono">—</span>
                    <span>{item.end}</span>
                  </dd>
                </div>
                <MetaDivider />
                <div>
                  <dt className="sr-only">Degree</dt>
                  <dd>{item.degree}</dd>
                </div>
                {item.field && (
                  <>
                    <MetaDivider />
                    <div>
                      <dt className="sr-only">Field of study</dt>
                      <dd>{item.field}</dd>
                    </div>
                  </>
                )}
              </dl>

              {item.tags && (
                <ul className="flex flex-wrap gap-1.5 pt-3 pl-9">
                  {item.tags.map((tag) => (
                    <li key={tag} className="flex">
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
