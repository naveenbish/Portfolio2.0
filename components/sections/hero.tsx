"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "motion/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Linkedin, Github, Instagram,
  Code2, Settings, Sparkles, Cloud, Rocket,
  FileCode, FileType, Hexagon, Zap,
} from "lucide-react"
import type { PortfolioData, SocialLink } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Github,
  Instagram,
}

const roles: { label: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  { label: "Web Dev",           icon: Code2,    color: "#3b82f6" },
  { label: "DevOps",            icon: Settings, color: "#f97316" },
  { label: "Vibe Coder",        icon: Sparkles, color: "#a855f7" },
  { label: "AWS",               icon: Cloud,    color: "#ff9900" },
  { label: "CI/CD Deployment",  icon: Rocket,   color: "#22c55e" },
  { label: "JavaScript",        icon: FileCode, color: "#f7df1e" },
  { label: "TypeScript",        icon: FileType, color: "#3178c6" },
  { label: "Node Js",           icon: Hexagon,  color: "#339933" },
  { label: "Express Js",        icon: Zap,      color: "#ef4444" },
]

function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const tick = useCallback(() => {
    const current = roles[roleIndex].label
    if (!isDeleting) {
      setDisplayed(current.slice(0, displayed.length + 1))
      if (displayed.length + 1 === current.length) {
        setTimeout(() => setIsDeleting(true), 1800)
        return
      }
    } else {
      setDisplayed(current.slice(0, displayed.length - 1))
      if (displayed.length - 1 === 0) {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
        return
      }
    }
  }, [displayed, isDeleting, roleIndex])

  useEffect(() => {
    const speed = isDeleting ? 40 : 80
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isDeleting])

  const { icon: Icon, color } = roles[roleIndex]

  return (
    <span className="inline-flex items-center gap-2">
      <span className="shrink-0 transition-colors duration-300" style={{ color }}>
        <Icon className="h-5 w-5" />
      </span>
      <span style={{ color }} className="transition-colors duration-300">{displayed}</span>
      <span className="animate-blink" style={{ color }}>|</span>
    </span>
  )
}

interface HeroSectionProps {
  personal: PortfolioData["personal"]
  socials: SocialLink[]
}

export function HeroSection({ personal, socials }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-24"
    >
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="order-2 md:order-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="text-sm font-medium text-muted-foreground mb-2"
            >
              {personal.subtitle}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient"
            >
              {personal.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mt-3 typewriter-strip rounded-xl px-5 py-3 w-72 md:w-80 text-lg md:text-xl font-medium flex items-center"
            >
              <span className="strip-highlight" />
              <Typewriter />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md"
            >
              {personal.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Button asChild>
                <a href="#contact">Contact Me</a>
              </Button>
              <Button variant="outline" asChild>
                <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="mt-6 flex items-center gap-3"
            >
              <TooltipProvider>
                {socials.map((social) => {
                  const Icon = iconMap[social.icon]
                  if (!Icon) return null
                  return (
                    <Tooltip key={social.name}>
                      <TooltipTrigger asChild>
                        <motion.a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.name}
                          className="text-muted-foreground transition-colors hover:text-accent-brand"
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <Icon className="h-5 w-5" />
                        </motion.a>
                      </TooltipTrigger>
                      <TooltipContent>{social.name}</TooltipContent>
                    </Tooltip>
                  )
                })}
              </TooltipProvider>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="order-1 md:order-2 flex justify-center drop-shadow-[0_0_30px_oklch(0.78_0.145_58_/_20%)]"
          >
            <div className="animate-float-gentle">
              <div className="gradient-ring h-64 w-64 md:h-72 md:w-72 lg:h-80 lg:w-80">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image
                    src={personal.profileImage}
                    alt={personal.name}
                    fill
                    priority
                    className="rounded-full object-cover"
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
