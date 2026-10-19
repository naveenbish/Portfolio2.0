import {
  Bot,
  Clapperboard,
  Clock,
  Cloud,
  CodeXml,
  Database,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Pi,
  SquareTerminal,
  Tv,
  Wind,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import {
  SiAnthropic,
  SiDocker,
  SiExpress,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGrafana,
  SiInstagram,
  SiJavascript,
  SiJenkins,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiTailwindcss,
} from "@icons-pack/react-simple-icons";
import type { ComponentType, SVGProps } from "react";

const lucideByName: Record<string, LucideIcon> = {
  code: CodeXml,
  "map-pin": MapPin,
  mail: Mail,
  clock: Clock,
  graduation: GraduationCap,
  globe: Globe,
  layers: Layers,
  clapperboard: Clapperboard,
  tv: Tv,
};

export function NamedIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = lucideByName[name] ?? CodeXml;
  return <Icon aria-hidden className={className} strokeWidth={1.75} />;
}

/** Simple Icons dropped LinkedIn, so the glyph is inlined. */
export function LinkedInIcon({
  size = 24,
  ...props
}: Omit<SVGProps<SVGSVGElement>, "color"> & { size?: number; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

type SiProps = { size?: number; className?: string; color?: string };

const socialIcons: Record<string, ComponentType<SiProps>> = {
  github: SiGithub,
  linkedin: LinkedInIcon,
  instagram: SiInstagram,
};

export function SocialIcon({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const Icon = socialIcons[id];
  if (!Icon) return null;
  return <Icon className={className} size={16} color="currentColor" />;
}

const techIcons: Record<string, ComponentType<SiProps>> = {
  Docker: SiDocker,
  Jenkins: SiJenkins,
  "GitHub Actions": SiGithubactions,
  Grafana: SiGrafana,
  Git: SiGit,
  JavaScript: SiJavascript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  Redux: SiRedux,
  Tailwind: SiTailwindcss,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  "Claude Code": SiAnthropic,
};

/** Services with no brand mark in the icon set get a generic glyph instead. */
const genericTechIcons: Record<string, LucideIcon> = {
  AWS: Cloud,
  "E2E Networks": Cloud,
  "CI/CD": Workflow,
  NoSQL: Database,
  Codex: SquareTerminal,
  Pi: Pi,
  OpenClaw: Bot,
  Hermes: Wind,
};

export function TechIcon({ name }: { name: string }) {
  const Generic = genericTechIcons[name];
  if (Generic) return <Generic aria-hidden className="size-3 shrink-0" strokeWidth={1.75} />;
  const Icon = techIcons[name];
  if (!Icon)
    return (
      <span
        aria-hidden
        className="size-3 shrink-0 rounded-[3px] border border-current opacity-50"
      />
    );
  return <Icon size={12} color="currentColor" className="shrink-0" />;
}
