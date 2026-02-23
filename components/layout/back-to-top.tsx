"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="fixed bottom-6 right-6 z-50 transition-opacity duration-300"
      style={{
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="border-accent-brand/30 text-accent-brand hover:bg-accent-brand/10"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}
