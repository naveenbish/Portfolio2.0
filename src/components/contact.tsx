import { Download, Mail } from "lucide-react";

import { NamedIcon } from "@/components/icons";
import { IconChip, Section, SectionHeading } from "@/components/section";
import { site } from "@/data/site";

const { contact } = site;

const rows = [
  { icon: "mail", label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: "map-pin", label: "Location", value: contact.location },
];

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading id="contact">Contact</SectionHeading>
      <p className="text-muted-foreground screen-line-bottom px-4 py-4 text-sm">{contact.blurb}</p>

      <ul className="grid sm:grid-cols-[1.4fr_1fr]">
        {rows.map((row) => {
          const body = (
            <>
              <IconChip>
                <NamedIcon name={row.icon} />
              </IconChip>
              <span className="min-w-0">
                <span className="text-muted-foreground block text-xs">{row.label}</span>
                <span className="block truncate font-mono text-sm">{row.value}</span>
              </span>
            </>
          );
          return (
            <li key={row.label} className="border-b sm:[&:not(:last-child)]:border-r">
              {row.href ? (
                <a href={row.href} className="hover:bg-accent/50 flex items-center gap-3 px-4 py-3 transition-colors">
                  {body}
                </a>
              ) : (
                <div className="flex items-center gap-3 px-4 py-3">{body}</div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap justify-center gap-2 px-4 py-4">
        <a
          href={`mailto:${contact.email}`}
          className="bg-primary text-primary-foreground inline-flex h-11 sm:h-8 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-opacity hover:opacity-90"
        >
          <Mail className="size-4" />
          Send message
        </a>
        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="hover:bg-accent bg-background inline-flex h-11 sm:h-8 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-colors"
        >
          <Download className="size-4" />
          Download CV
        </a>
      </div>
    </Section>
  );
}
