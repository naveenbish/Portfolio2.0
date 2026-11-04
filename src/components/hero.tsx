import { BadgeCheck } from "lucide-react";
import Image from "next/image";

import { IsoArt } from "@/components/iso-art";
import { TextFlip } from "@/components/text-flip";
import { site } from "@/data/site";

/** Ghibli-style portrait, already framed on the face, so it just fills the circle. */
function Avatar() {
  return (
    <div className="bg-muted relative size-full overflow-hidden rounded-full border">
      <Image
        src={site.avatar.src}
        alt={`Illustrated portrait of ${site.name}`}
        fill
        sizes="(min-width: 640px) 165px, 88px"
        priority
        className="object-cover"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="name" className="relative overflow-hidden">
      <div className="relative mx-auto flex min-h-[22rem] w-full max-w-3xl flex-col justify-end border-x sm:h-[28.9rem] sm:min-h-0">
        <IsoArt className="pointer-events-none absolute top-4 right-4 h-40 w-[calc(100%-2rem)] sm:h-[calc(100%-6.4rem)]" />

        <div className="screen-line-top flex flex-wrap sm:h-[10.3rem] sm:flex-nowrap">
          <div className="-ml-px size-[5.5rem] shrink-0 border-r sm:size-[10.3rem]">
            <Avatar />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-end max-sm:contents">
            <div className="flex min-h-[5.5rem] min-w-0 flex-1 items-center gap-2 px-3 sm:h-[2.1rem] sm:min-h-0 sm:flex-none sm:border-t sm:px-4">
              <h1 id="name" className="text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
                {site.name}
              </h1>
              <BadgeCheck
                aria-label="Verified"
                className="fill-foreground text-background size-5 shrink-0 sm:size-6"
              />
            </div>
            <div className="text-muted-foreground flex min-h-16 w-full items-center border-t px-4 py-3 font-mono text-xs leading-relaxed sm:h-[2.15rem] sm:min-h-0 sm:py-0 sm:text-sm">
              <TextFlip lines={site.taglines} className="block max-w-full sm:truncate" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
