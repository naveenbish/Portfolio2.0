import { Greeting } from "@/components/greeting";
import { site } from "@/data/site";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="screen-line-bottom">
      <h2 id="about-heading" className="sr-only">
        About
      </h2>
      <div className="mx-auto max-w-3xl border-x">
        <div className="screen-line-bottom px-4 py-2">
          <Greeting />
        </div>
        <ul className="space-y-3 px-4 py-4 text-sm leading-relaxed">
          {site.about.map((line) => (
            <li key={line} className="flex gap-3">
              <span
                aria-hidden
                className="bg-muted-foreground/40 mt-[0.6rem] size-1 shrink-0 rounded-full"
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
