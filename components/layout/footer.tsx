"use client"

import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Linkedin, Github, Instagram } from "lucide-react"
import type { SocialLink } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Linkedin,
  Github,
  Instagram,
}

interface FooterProps {
  brand: string
  subtitle: string
  socials: SocialLink[]
}

export function Footer({ brand, subtitle, socials }: FooterProps) {
  return (
    <footer className="w-full py-10 md:py-12 footer-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-lg font-bold tracking-tight">{brand}</p>
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>

        <div className="flex items-center justify-center gap-4 mt-4">
          <TooltipProvider>
            {socials.map((social) => {
              const Icon = iconMap[social.icon]
              if (!Icon) return null
              return (
                <Tooltip key={social.name}>
                  <TooltipTrigger asChild>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="text-muted-foreground transition-colors hover:text-accent-brand"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>{social.name}</TooltipContent>
                </Tooltip>
              )
            })}
          </TooltipProvider>
        </div>

        <Separator className="my-6" />

        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {brand}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
