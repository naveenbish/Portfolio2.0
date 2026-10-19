import { SocialIcon } from "@/components/icons";
import { site } from "@/data/site";

export function SocialLinks() {
  return (
    <section aria-labelledby="social-links" className="screen-line-bottom">
      <h2 id="social-links" className="sr-only">
        Social links
      </h2>

      <div className="relative mx-auto flex max-w-3xl gap-2 border-x px-4 py-4">
        {/* handwritten annotation hanging outside the column */}
        <div
          aria-hidden
          className="font-handwritten text-muted-foreground absolute top-2 right-full mr-3 hidden -rotate-6 text-xl leading-none xl:block"
        >
          <span className="block whitespace-nowrap">follow me</span>
          <svg viewBox="0 0 40 28" className="mt-0.5 ml-auto h-6 w-9" fill="none">
            <path
              d="M3 3c3 12 14 18 30 17m0 0-8-6m8 6-9 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {site.socials.map((social) => (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="bg-background hover:bg-accent inline-flex size-8 items-center justify-center rounded-lg border shadow-xs transition-colors"
          >
            <SocialIcon id={social.id} />
          </a>
        ))}
      </div>
    </section>
  );
}
