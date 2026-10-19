import { TechIcon } from "@/components/icons";
import { Section, SectionHeading } from "@/components/section";
import { site } from "@/data/site";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading id="skills">Skills</SectionHeading>
      <dl>
        {site.skills.map((row, i) => (
          <div
            key={row.group}
            className="grid grid-cols-1 gap-2 border-b px-4 py-3 last:border-b-0 sm:grid-cols-[10.5rem_1fr] sm:gap-4"
          >
            <dt className="flex items-baseline gap-2 text-sm">
              <span className="text-muted-foreground/70 font-mono text-xs">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                {row.group}
                <span className="text-muted-foreground mt-0.5 block text-xs">{row.experience}</span>
              </span>
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {row.items.map((item) => (
                  <li
                    key={item.name}
                    className="bg-background text-foreground/90 inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-xs"
                  >
                    <TechIcon name={item.name} />
                    {item.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
