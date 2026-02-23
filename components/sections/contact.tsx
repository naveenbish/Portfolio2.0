"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { MotionSection } from "@/components/layout/motion-section"
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"
import { Phone, Mail, MapPin, Send, ArrowRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import type { ContactInfo } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone,
  Mail,
  MapPin,
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

interface ContactSectionProps {
  contact: {
    info: ContactInfo[]
    formAction: string
  }
}

/* ── Glowing contact info pill ─────────────────────────────────────────────── */
function ContactPill({ info }: { info: ContactInfo }) {
  const Icon = iconMap[info.icon]
  const content = (
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center shrink-0">
        <span className="absolute h-9 w-9 rounded-full bg-accent-brand/10 animate-ping" style={{ animationDuration: "4s" }} />
        <div className="relative h-9 w-9 rounded-full bg-accent-brand/10 flex items-center justify-center border border-accent-brand/20">
          {Icon && <Icon className="h-4 w-4 text-accent-brand" />}
        </div>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-accent-brand uppercase tracking-wider">{info.title}</p>
        <p className="text-sm text-foreground/80 truncate">{info.value}</p>
      </div>
    </div>
  )

  if (info.href) {
    return (
      <a
        href={info.href}
        className="block p-3 rounded-lg transition-all hover:bg-accent-brand/5 group"
      >
        {content}
        <ArrowRight className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-accent-brand/0 group-hover:text-accent-brand/60 transition-all group-hover:translate-x-0.5" />
      </a>
    )
  }

  return <div className="p-3">{content}</div>
}

/* ── Custom input with light/dark styling ──────────────────────────────────── */
function ContactInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-lg px-4 py-3 text-sm",
        "bg-white/80 dark:bg-[oklch(0.10_0.012_55)]",
        "border border-accent-brand/15 dark:border-accent-brand/10",
        "placeholder:text-muted-foreground",
        "text-foreground outline-none transition-all duration-300",
        "focus:border-accent-brand/50 focus:ring-2 focus:ring-accent-brand/15",
        "focus:shadow-[0_0_20px_oklch(0.62_0.19_52_/_10%)] dark:focus:shadow-[0_0_20px_oklch(0.78_0.145_58_/_8%)]",
        "hover:border-accent-brand/25 dark:hover:border-accent-brand/20",
        className,
      )}
      {...props}
    />
  )
}

function ContactTextarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg px-4 py-3 text-sm",
        "bg-white/80 dark:bg-[oklch(0.10_0.012_55)]",
        "border border-accent-brand/15 dark:border-accent-brand/10",
        "placeholder:text-muted-foreground",
        "text-foreground outline-none transition-all duration-300 resize-none",
        "focus:border-accent-brand/50 focus:ring-2 focus:ring-accent-brand/15",
        "focus:shadow-[0_0_20px_oklch(0.62_0.19_52_/_10%)] dark:focus:shadow-[0_0_20px_oklch(0.78_0.145_58_/_8%)]",
        "hover:border-accent-brand/25 dark:hover:border-accent-brand/20",
        className,
      )}
      {...props}
    />
  )
}

/* ── Section ───────────────────────────────────────────────────────────────── */
export function ContactSection({ contact }: ContactSectionProps) {
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      const res = await fetch(contact.formAction, {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Request failed")
      toast.success("Message sent successfully!")
      form.reset()
    } catch {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <MotionSection className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight heading-accent">
            Contact Me
          </h2>
          <p className="mt-2 text-muted-foreground">Get in touch</p>
        </MotionSection>

        {/* Main contact card */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={item}>
            <div
              className="skill-card glass-card rounded-2xl overflow-hidden relative"
              style={{ background: "oklch(0.94 0.045 65)", borderColor: "oklch(0.87 0.07 58)" }}
            >
              {/* Dotted glow background */}
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

              {/* Top gradient edge */}
              <div className="h-[2px] relative z-10" style={{ background: "linear-gradient(90deg, transparent, var(--accent-brand), transparent)" }} />

              <div className="relative z-10 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
                  {/* Left: Contact info */}
                  <motion.div variants={item} className="space-y-1">
                    <h3 className="text-sm font-semibold text-accent-brand mb-4 px-3">
                      Reach out
                    </h3>

                    {contact.info.map((info) => (
                      <div key={info.title} className="relative">
                        <ContactPill info={info} />
                      </div>
                    ))}

                    {/* Decorative separator on desktop */}
                    <div className="hidden md:block pt-4 px-3">
                      <div className="h-px bg-gradient-to-r from-accent-brand/20 via-accent-brand/10 to-transparent" />
                      <p className="text-[11px] text-muted-foreground mt-3 leading-relaxed">
                        I&apos;m currently open to freelance projects and collaboration opportunities.
                      </p>
                    </div>
                  </motion.div>

                  {/* Right: Form */}
                  <motion.div variants={item}>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <ContactInput
                          name="name"
                          placeholder="Your name"
                          required
                          autoComplete="name"
                        />
                        <ContactInput
                          name="email"
                          type="email"
                          placeholder="Your email"
                          required
                          autoComplete="email"
                        />
                      </div>

                      <ContactInput
                        name="_subject"
                        placeholder="Subject"
                      />

                      <ContactTextarea
                        name="message"
                        placeholder="Write your message..."
                        rows={5}
                        required
                      />

                      <input type="hidden" name="_captcha" value="false" />

                      <button
                        type="submit"
                        disabled={sending}
                        className={cn(
                          "w-full relative overflow-hidden rounded-lg px-6 py-3 text-sm font-medium",
                          "bg-gradient-to-r from-accent-brand to-accent-brand-dark",
                          "text-white shadow-[0_0_20px_var(--accent-brand)/15%]",
                          "transition-all duration-300 cursor-pointer",
                          "hover:shadow-[0_0_30px_var(--accent-brand)/25%] hover:brightness-110",
                          "disabled:opacity-60 disabled:cursor-not-allowed",
                          "group",
                        )}
                      >
                        {/* Shine sweep on button */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />

                        <span className="relative flex items-center justify-center gap-2">
                          {sending ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </>
                          )}
                        </span>
                      </button>
                    </form>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
