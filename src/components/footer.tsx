import { SocialIcon } from "@/components/icons";
import { LogoMark } from "@/components/logo-mark";
import { NameArt } from "@/components/name-art";
import { Column } from "@/components/section";
import { site } from "@/data/site";

function Meta({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`px-4 py-3 ${className}`}>
      <dt className="text-muted-foreground font-mono text-[0.625rem] tracking-widest uppercase">
        {label}
      </dt>
      <dd className="mt-2 font-mono text-sm">{children}</dd>
    </div>
  );
}

const linkClass =
  "decoration-muted-foreground/50 underline underline-offset-4 hover:decoration-foreground";

export function Footer() {
  const f = site.footer;
  return (
    <footer className="relative overflow-x-clip">
      <Column>
        <div className="screen-line-bottom flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
          <p className="font-mono text-sm font-medium">{site.brand}</p>
          <p className="text-muted-foreground text-sm">{site.title}</p>
        </div>

        <dl className="grid grid-cols-2 sm:grid-cols-4 [&>div]:border-b [&>div:not(:nth-child(2n))]:border-r sm:[&>div:not(:nth-child(2n))]:border-r-0 sm:[&>div:not(:nth-child(4n))]:border-r">
          <Meta label="Crafted by">{site.name}</Meta>
          <Meta label="Based in">{site.contact.location}</Meta>
          <Meta label="Typeface">{f.typeface}</Meta>
          <Meta label="Resume">
            <a href={site.resumeUrl} target="_blank" rel="noreferrer" className={linkClass}>
              Download CV
            </a>
          </Meta>

          <Meta label="Stack" className="col-span-2">
            <ul className="space-y-0.5">
              {f.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Meta>
          <Meta label="Elsewhere" className="col-span-2">
            <ul className="space-y-0.5">
              {site.socials.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noreferrer" className={linkClass}>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Meta>
        </dl>

        <div className="screen-line-bottom text-muted-foreground px-4 py-3 text-sm">
          Layout inspired by{" "}
          <a href={f.inspiredBy.href} target="_blank" rel="noreferrer" className={linkClass}>
            {f.inspiredBy.label}
          </a>
          .
        </div>

        <div className="screen-line-bottom flex flex-col items-start justify-between gap-3 px-4 py-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <LogoMark pixel={2} className="text-foreground" />
            <p className="text-muted-foreground text-xs">
              © {f.year} {site.brand}. All rights reserved.
            </p>
          </div>
          <ul className="flex items-center gap-1">
            {site.socials.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="text-muted-foreground hover:text-foreground inline-flex size-7 items-center justify-center rounded-md transition-colors"
                >
                  <SocialIcon id={s.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Column>

      <div className="screen-line-bottom after:bg-foreground/15">
        <div className="mx-auto w-full max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
          <NameArt text={site.name} className="block h-auto w-full" />
        </div>
      </div>
    </footer>
  );
}
