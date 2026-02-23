"use client"

import { motion } from "motion/react"
import { MotionSection } from "@/components/layout/motion-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <MotionSection className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight heading-accent">Projects</h2>
          <p className="mt-2 text-muted-foreground">What I&apos;ve built</p>
        </MotionSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden h-full group glass-card flex flex-col">
                <div className="overflow-hidden relative h-48">
                  <PixelatedCanvas
                    src={project.image}
                    width={400}
                    height={192}
                    cellSize={3}
                    dotScale={0.85}
                    shape="square"
                    dropoutStrength={0.3}
                    interactive
                    distortionStrength={2}
                    distortionRadius={60}
                    distortionMode="swirl"
                    followSpeed={0.15}
                    jitterStrength={2}
                    jitterSpeed={3}
                    sampleAverage
                    tintColor="#d4944a"
                    tintStrength={0.08}
                    responsive
                    className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <CardContent className="flex flex-col flex-1 space-y-3">
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex gap-2 pt-1 mt-auto">
                      {project.liveUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink />
                            Live
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
