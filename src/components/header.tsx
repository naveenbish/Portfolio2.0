import { SiGithub } from "@icons-pack/react-simple-icons";

import { LogoMark } from "@/components/logo-mark";
import { SearchDialog } from "@/components/search-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/data/site";

const searchEntries = [
  ...site.nav.map((n) => ({ ...n, group: "Navigate" })),
  { label: "Education", href: "#education", group: "Section" },
  { label: "Download CV", href: site.resumeUrl, group: "Link" },
];

function Divider() {
  return <span aria-hidden className="bg-line mx-1 hidden h-6 w-px sm:block" />;
}

export function Header() {
  const github = site.socials.find((s) => s.id === "github");

  return (
    <header className="bg-background/80 sticky top-0 z-50 backdrop-blur-md">
      <div className="screen-line-bottom">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between border-x px-4">
          <a href="#" aria-label="Back to top" className="text-foreground">
            <LogoMark />
          </a>

          <div className="flex items-center gap-1">
            <nav aria-label="Primary" className="hidden items-center sm:flex">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground px-2 text-sm font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <Divider />
            <SearchDialog entries={searchEntries} />
            {github && (
              <>
                <Divider />
                <a
                  href={github.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-muted-foreground hover:bg-accent hover:text-foreground inline-flex size-8 items-center justify-center rounded-lg transition-colors"
                >
                  <SiGithub size={16} color="currentColor" />
                </a>
              </>
            )}
            <Divider />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
