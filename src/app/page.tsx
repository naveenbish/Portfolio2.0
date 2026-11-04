import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { ContributionGraph } from "@/components/contribution-graph";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Overview } from "@/components/overview";
import { Projects } from "@/components/projects";
import { ScrollTop } from "@/components/scroll-top";
import { Separator } from "@/components/section";
import { Skills } from "@/components/skills";
import { SocialLinks } from "@/components/social-links";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Separator />
        <SocialLinks />
        <Overview />
        <ContributionGraph />
        <Separator />
        <About />
        <Separator />
        <Skills />
        <Separator />
        <Experience />
        <Separator />
        <Education />
        <Separator />
        <Projects />
        <Separator />
        <Contact />
        <Separator />
      </main>
      <Footer />

      <ScrollTop />
    </>
  );
}
