"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "motion/react"
import { MotionSection } from "@/components/layout/motion-section"
import { Cloud, Settings, Code, Database, Sparkles } from "lucide-react"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"

import type { SkillCategory } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Settings,
  Code,
  Database,
  Sparkles,
}

const categoryColors: Record<string, string> = {
  Cloud: "#3b82f6",
  "DevOps Tools": "#f97316",
  "Web Dev": "#22c55e",
  Database: "#a855f7",
  "Vibe Coding": "#ec4899",
}

const categoryLightBg: Record<string, { bg: string; border: string }> = {
  Cloud:          { bg: "oklch(0.93 0.04 235)",  border: "oklch(0.85 0.07 235)" },
  "DevOps Tools": { bg: "oklch(0.94 0.05 65)",   border: "oklch(0.87 0.08 60)" },
  "Web Dev":      { bg: "oklch(0.93 0.045 150)",  border: "oklch(0.85 0.07 150)" },
  Database:       { bg: "oklch(0.93 0.04 295)",   border: "oklch(0.85 0.07 295)" },
  "Vibe Coding":  { bg: "oklch(0.94 0.04 335)",   border: "oklch(0.86 0.06 335)" },
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

const ringContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const ringItem = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
}

/* ── Circular SVG gauge with animated fill ────────────────────────────────── */
function SkillRing({ value, color, name }: { value: number; color: string; name: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState(0)

  const size = 76
  const stroke = 5
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (display / 100) * circumference

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now()
          const dur = 800
          function tick(now: number) {
            const t = Math.min((now - start) / dur, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setDisplay(Math.round(eased * value))
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  return (
    <motion.div
      ref={ref}
      variants={ringItem}
      className="group flex flex-col items-center gap-2 cursor-default"
    >
      <div
        className="relative transition-transform duration-300 group-hover:scale-110"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          style={{ filter: `drop-shadow(0 0 8px ${color}30)` }}
        >
          {/* track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            className="text-foreground/[0.06]"
            strokeWidth={stroke}
          />
          {/* filled arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-100"
          />
        </svg>
        {/* centre value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xs font-bold tabular-nums tracking-tight"
            style={{ color }}
          >
            {display}%
          </span>
        </div>
      </div>
      <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
        {name}
      </span>
    </motion.div>
  )
}

/* ── Section ──────────────────────────────────────────────────────────────── */
interface SkillsSectionProps {
  skills: SkillCategory[]
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-2 heading-accent">
            Skills
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            My technical level
          </p>
        </MotionSection>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
        >
          {skills.map((category) => {
            const Icon = iconMap[category.icon]
            const color = categoryColors[category.title] ?? "var(--accent-brand)"
            const lightBg = categoryLightBg[category.title]
            return (
              <motion.div key={category.title} variants={cardItem}>
                <div
                  className="skill-card glass-card rounded-xl overflow-hidden h-full relative"
                  style={lightBg ? { background: lightBg.bg, borderColor: lightBg.border } as React.CSSProperties : undefined}
                >
                  {/* animated dot background */}
                  <DottedGlowBackground
                    className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
                    opacity={0.8}
                    gap={10}
                    radius={1.4}
                    color="rgba(150,150,150,0.4)"
                    darkColor="rgba(150,150,150,0.3)"
                    glowColor={color}
                    darkGlowColor={color}
                    backgroundOpacity={0}
                    speedMin={0.3}
                    speedMax={1.2}
                    speedScale={1}
                  />
                  {/* coloured top edge */}
                  <div className="h-[2px] relative z-10" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

                  <div className="p-5 md:p-6 relative z-10">
                    {/* header */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="flex items-center justify-center h-9 w-9 rounded-lg"
                        style={{
                          backgroundColor: `${color}12`,
                          boxShadow: `0 0 12px ${color}15`,
                        }}
                      >
                        {Icon && (
                          <span style={{ color }}>
                            <Icon className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm leading-tight">{category.title}</h3>
                        <p className="text-[11px] text-muted-foreground">{category.experience}</p>
                      </div>
                    </div>

                    {/* ring gauges */}
                    <motion.div
                      className="flex flex-wrap justify-center gap-5"
                      variants={ringContainer}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      {category.skills.map((skill) => (
                        <SkillRing
                          key={skill.name}
                          value={skill.level}
                          color={color}
                          name={skill.name}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
