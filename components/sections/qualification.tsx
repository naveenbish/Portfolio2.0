"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { MotionSection } from "@/components/layout/motion-section"
import { GraduationCap, Briefcase, Calendar } from "lucide-react"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { cn } from "@/lib/utils"
import type { QualificationItem } from "@/lib/data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const leftItem = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const rightItem = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const mobileItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

interface QualificationSectionProps {
  qualification: {
    education: QualificationItem[]
    work: QualificationItem[]
  }
}

/* ── Timeline card ─────────────────────────────────────────────────────────── */
function TimelineCard({ item, side }: { item: QualificationItem; side: "left" | "right" }) {
  return (
    <div className={cn(
      "group relative skill-card glass-card rounded-xl overflow-hidden transition-all duration-300",
      "hover:border-accent-brand/25",
    )}>
      {/* dotted glow background */}
      <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
        opacity={0.8}
        gap={10}
        radius={1.4}
        color="rgba(150,150,150,0.4)"
        darkColor="rgba(150,150,150,0.3)"
        glowColor="oklch(0.78 0.145 58)"
        darkGlowColor="oklch(0.78 0.145 58)"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.2}
        speedScale={1}
      />

      {/* connector arrow pointing to center line */}
      <div className={cn(
        "hidden md:block absolute top-5 w-3 h-3 rotate-45 border-accent-brand/15 z-10",
        "bg-[oklch(0.16_0.02_52)] dark:bg-[oklch(0.14_0.018_55)]",
        side === "left"
          ? "right-0 translate-x-1/2 border-r border-t"
          : "left-0 -translate-x-1/2 border-l border-b",
      )} />

      <div className="relative z-10 p-4 md:p-5">
        <h3 className="font-semibold text-sm md:text-base leading-tight">{item.title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">{item.subtitle}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <Calendar className="h-3 w-3 text-accent-brand" />
          <span className="text-[11px] font-medium text-accent-brand">{item.period}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Pulsing timeline dot ──────────────────────────────────────────────────── */
function TimelineDot() {
  return (
    <div className="relative flex items-center justify-center">
      <span className="absolute h-6 w-6 rounded-full bg-accent-brand/15 animate-ping" style={{ animationDuration: "3s" }} />
      <span className="relative h-3 w-3 rounded-full bg-accent-brand shadow-[0_0_8px_var(--accent-brand)]" />
    </div>
  )
}

/* ── Section ───────────────────────────────────────────────────────────────── */
export function QualificationSection({ qualification }: QualificationSectionProps) {
  const [tab, setTab] = useState<"education" | "work">("education")
  const items = tab === "education" ? qualification.education : qualification.work

  return (
    <section id="qualification" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <MotionSection className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight heading-accent">
            Qualification
          </h2>
          <p className="mt-2 text-muted-foreground">My journey</p>
        </MotionSection>

        {/* Tab switcher */}
        <div className="flex justify-center gap-1 mb-12">
          <button
            onClick={() => setTab("education")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer",
              tab === "education"
                ? "bg-accent-brand/15 text-accent-brand border border-accent-brand/25 shadow-[0_0_12px_var(--accent-brand)/10%]"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            )}
          >
            <GraduationCap className="size-4" />
            Education
          </button>
          <button
            onClick={() => setTab("work")}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer",
              tab === "work"
                ? "bg-accent-brand/15 text-accent-brand border border-accent-brand/25 shadow-[0_0_12px_var(--accent-brand)/10%]"
                : "text-muted-foreground hover:text-foreground border border-transparent"
            )}
          >
            <Briefcase className="size-4" />
            Work
          </button>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="relative"
            >
              {/* center vertical line (desktop) */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-accent-brand/40 via-accent-brand/20 to-transparent" />

              {/* left line (mobile) */}
              <div className="md:hidden absolute left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-accent-brand/40 via-accent-brand/20 to-transparent" />

              {items.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={item.title + item.period}
                    variants={{ hidden: mobileItem.hidden, visible: mobileItem.visible }}
                    className="md:hidden relative pl-8 pb-8 last:pb-0"
                  >
                    {/* mobile dot */}
                    <div className="absolute left-0 top-1">
                      <TimelineDot />
                    </div>
                    <TimelineCard item={item} side="right" />
                  </motion.div>
                )
              })}

              {/* Desktop alternating layout */}
              {items.map((item, i) => {
                const isLeft = i % 2 === 0
                return (
                  <motion.div
                    key={item.title + item.period + "-desktop"}
                    variants={isLeft ? leftItem : rightItem}
                    className={cn(
                      "hidden md:grid grid-cols-[1fr_40px_1fr] gap-0 items-start pb-8 last:pb-0",
                    )}
                  >
                    {/* left column */}
                    <div className={isLeft ? "pr-6" : ""}>
                      {isLeft && <TimelineCard item={item} side="left" />}
                    </div>

                    {/* center dot */}
                    <div className="flex justify-center pt-1">
                      <TimelineDot />
                    </div>

                    {/* right column */}
                    <div className={!isLeft ? "pl-6" : ""}>
                      {!isLeft && <TimelineCard item={item} side="right" />}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
