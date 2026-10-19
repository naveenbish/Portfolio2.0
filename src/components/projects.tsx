import { NamedIcon } from "@/components/icons";
import { ProjectItem } from "@/components/project-item";
import { Section, SectionHeading, Tag } from "@/components/section";
import { site, type Project } from "@/data/site";

export function Projects() {
  const projects: Project[] = site.projects;
  return (
    <Section id="projects">
      <SectionHeading id="projects" count={projects.length}>
        Projects
      </SectionHeading>
      <ul>
        {projects.map((project, i) => (
          <ProjectItem
            key={project.title}
            title={project.title}
            subtitle={new URL(project.url).hostname.replace(/^www\./, "")}
            url={project.url}
            icon={<NamedIcon name={project.icon} />}
            defaultOpen={i === 0}
          >
            <div className="text-[15px] leading-[1.6]">
              <p>{project.description}</p>
              {project.bullets && (
                <ul className="mt-4 list-disc space-y-2 pl-[1.5em] marker:text-foreground/25">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="pl-[0.4em]">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="flex">
                  <Tag>{tag}</Tag>
                </li>
              ))}
            </ul>
          </ProjectItem>
        ))}
      </ul>
    </Section>
  );
}
