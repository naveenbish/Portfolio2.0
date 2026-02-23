import { portfolioData } from "@/lib/data"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BackgroundPattern } from "@/components/layout/background-pattern"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { SkillsSection } from "@/components/sections/skills"
import { QualificationSection } from "@/components/sections/qualification"
import { ProjectsSection } from "@/components/sections/projects"
import { ContactSection } from "@/components/sections/contact"
import { StatsSection } from "@/components/sections/stats"
import { BackToTop } from "@/components/layout/back-to-top"

function SectionDivider() {
  return <hr className="section-divider" />
}

export default function Home() {
  return (
    <>
      <Navbar />
      <BackgroundPattern>
        <main className="pt-14">
          <HeroSection
            personal={portfolioData.personal}
            socials={portfolioData.socials}
          />
          <SectionDivider />
          <AboutSection personal={portfolioData.personal} />
          <StatsSection stats={portfolioData.stats} />
          <SectionDivider />
          <SkillsSection skills={portfolioData.skills} />
          <SectionDivider />
          <QualificationSection qualification={portfolioData.qualification} />
          <SectionDivider />
          <ProjectsSection projects={portfolioData.projects} />
          <SectionDivider />
          <ContactSection contact={portfolioData.contact} />
        </main>
      </BackgroundPattern>
      <Footer
        brand={portfolioData.footer.brand}
        subtitle={portfolioData.footer.subtitle}
        socials={portfolioData.socials}
      />
      <BackToTop />
    </>
  )
}
