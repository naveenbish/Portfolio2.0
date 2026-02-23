"use client"

import { MotionSection } from "@/components/layout/motion-section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas"
import type { PortfolioData } from "@/lib/data"

interface AboutSectionProps {
  personal: PortfolioData["personal"]
}

export function AboutSection({ personal }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <MotionSection>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-2 heading-accent">
            About Me
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            My introduction
          </p>
        </MotionSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <MotionSection delay={0.1}>
            <div className="relative aspect-square w-full max-w-sm mx-auto md:mx-0 overflow-hidden rounded-lg ring-2 ring-accent-brand/20">
              <PixelatedCanvas
                src={personal.aboutImage}
                width={384}
                height={384}
                cellSize={3}
                dotScale={0.9}
                shape="square"
                dropoutStrength={0.3}
                interactive
                distortionStrength={3}
                distortionRadius={80}
                distortionMode="swirl"
                followSpeed={0.2}
                jitterStrength={3}
                jitterSpeed={3}
                sampleAverage
                tintColor="#d4944a"
                tintStrength={0.1}
                responsive
                className="w-full h-full"
              />
            </div>
          </MotionSection>

          <MotionSection delay={0.2}>
            <div className="flex flex-col gap-4">
              <Badge variant="outline" className="w-fit border-accent-brand/30 text-accent-brand">
                {personal.experienceYears} Years Experience
              </Badge>

              <p className="text-base text-muted-foreground leading-relaxed">
                {personal.bio}
              </p>

              <div className="mt-2">
                <Button variant="outline" className="border-accent-brand/30 text-accent-brand hover:bg-accent-brand/10" asChild>
                  <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer">
                    Download CV
                  </a>
                </Button>
              </div>
            </div>
          </MotionSection>
        </div>
      </div>
    </section>
  )
}
