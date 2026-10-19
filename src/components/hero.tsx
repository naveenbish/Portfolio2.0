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
        sizes="(min-width: 640px) 165px, 122px"
        priority
        className="object-cover"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="name" className="relative overflow-hidden">
      <div className="relative mx-auto flex h-[19rem] w-full max-w-3xl flex-col justify-end border-x sm:h-[28.9rem]">
        <IsoArt className="pointer-events-none absolute top-4 right-4 h-[calc(100%-8.6rem)] w-[calc(100%-2rem)] sm:h-[calc(100%-6.4rem)]" />

        <div className="screen-line-top flex h-[7.6rem] sm:h-[10.3rem]">
          <div className="-ml-px size-[7.6rem] shrink-0 border-r sm:size-[10.3rem]">
            <Avatar />
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-end">
            <div className="flex h-[2.15rem] items-center gap-2 border-t px-4 sm:h-[2.1rem]">
              <h1 id="name" className="truncate text-2xl font-medium tracking-tight sm:text-3xl">
                {site.name}
              </h1>
              <BadgeCheck
                aria-label="Verified"
                className="fill-foreground text-background size-5 shrink-0 sm:size-6"
              />
            </div>
            <div className="text-muted-foreground flex h-[2.15rem] items-center border-t px-4 font-mono text-xs sm:text-sm">
              <TextFlip lines={site.taglines} className="block max-w-full truncate" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
