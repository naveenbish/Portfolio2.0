"use client"

import { useState, useEffect, useSyncExternalStore, useCallback } from "react"
import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Qualification", href: "#qualification" },
  { label: "Contact", href: "#contact" },
]

const sectionIds = ["hero", "about", "skills", "projects", "qualification", "contact"]

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })
  return () => observer.disconnect()
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark")
}

function getServerSnapshot() {
  return false
}

export function Navbar() {
  const dark = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const toggleDark = useCallback(() => {
    const next = !dark
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }, [dark])

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 bg-background/50 backdrop-blur-md border-b transition-shadow duration-300",
      scrolled ? "shadow-sm border-border" : "border-transparent"
    )}>
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 h-14">
        <a href="#hero" className="text-lg font-bold tracking-tight text-gradient">
          ErrorOp
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "")
            const isActive = activeSection === sectionId
            return (
              <li key={link.href} className="relative pb-1">
                <a
                  href={link.href}
                  className={cn(
                    "text-sm transition-colors",
                    isActive
                      ? "text-accent-brand font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-brand rounded-full" />
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDark}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile nav */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Brand header */}
                  <div className="px-6 pt-6 pb-4 border-b border-border/50">
                    <a
                      href="#hero"
                      onClick={() => setOpen(false)}
                      className="text-lg font-bold tracking-tight text-gradient"
                    >
                      ErrorOp
                    </a>
                  </div>

                  {/* Nav links */}
                  <ScrollArea className="flex-1 px-3 py-4">
                    <nav className="flex flex-col gap-1">
                      {navLinks.map((link) => {
                        const sectionId = link.href.replace("#", "")
                        const isActive = activeSection === sectionId
                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                              isActive
                                ? "bg-accent-brand/10 text-accent-brand"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground active:bg-muted"
                            )}
                          >
                            {isActive && (
                              <span className="w-1 h-5 rounded-full bg-accent-brand shrink-0" />
                            )}
                            <span className={cn(!isActive && "ml-4")}>{link.label}</span>
                          </a>
                        )
                      })}
                    </nav>
                  </ScrollArea>

                  {/* Footer */}
                  <div className="px-6 py-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">DevOps + Web Dev</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
