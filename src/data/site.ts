/**
 * All page content lives here — taken from https://portfolio.errorop.com/.
 * Edit this file to change what the site says; the components only render it.
 */

export type Role = {
  title: string;
  start: string;
  /** "Present" for a current role (shown as ∞). */
  end: string;
  icon: string;
  type?: string;
  duration?: string;
  bullets?: string[];
  tags?: string[];
};

export type Job = {
  company: string;
  location?: string;
  /** e.g. "Remote" — shown in brackets after the location. */
  locationType?: string;
  current?: boolean;
  roles: Role[];
};

export type Degree = {
  institution: string;
  degree: string;
  /** Field of study, shown after the degree. */
  field?: string;
  start: string;
  end: string;
  /** Optional subjects; when present they hang off a timeline elbow under the entry. */
  tags?: string[];
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  url: string;
  icon: string;
  /** Optional bullet list shown under the description. */
  bullets?: string[];
  image: { src: string; width: number; height: number };
};

export type SkillGroup = {
  group: string;
  experience: string;
  items: { name: string; level?: number }[];
};

export const site = {
  name: "Naveen Bisht",
  brand: "ErrorOp",
  role: "Software Engineer",
  title: "DevOps + Web Dev",
  description:
    "DevOps Engineer turned Software Engineer with 3+ years of experience. Skilled in AWS, CI/CD pipelines, Docker, Grafana monitoring, and the MERN stack.",
  taglines: ["Software Engineer", "Building reliable systems and modern web experiences."],
  avatar: { src: "/images/profile.webp" },
  /** IANA time zone for the live clock in the overview. */
  timezone: "Asia/Kolkata",
  resumeUrl: "https://portfolio.errorop.com/pdf/resume.pdf",
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  socials: [
    { id: "github", label: "GitHub", href: "https://github.com/naveenbish" },
    { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/naveen-bisht-775410221" },
    { id: "instagram", label: "Instagram", href: "https://instagram.com/errorop003" },
  ],
  contact: {
    email: "bishtnitin003@gmail.com",
    location: "New Delhi, India",
    blurb: "I'm currently open to freelance projects and collaboration opportunities.",
  },
  overview: {
    left: [
      { icon: "code", text: "Software Development Engineer", at: "@Synlex.Tech" },
      { icon: "map-pin", text: "New Delhi, India" },
      { icon: "mail", text: "bishtnitin003@gmail.com", href: "mailto:bishtnitin003@gmail.com" },
    ],
  },
  about: [
    "DevOps Engineer turned Software Engineer with 3+ years of experience.",
    "Skilled in AWS, CI/CD pipelines, Docker, Grafana monitoring, and the MERN stack.",
    "Currently building full-stack web applications and managing cloud infrastructure at Synlex.Tech.",
  ],
  skills: [
    {
      group: "Cloud",
      experience: "3+ years",
      items: [
        { name: "AWS", level: 90 },
        { name: "Docker", level: 40 },
        { name: "E2E Networks", level: 60 },
      ],
    },
    {
      group: "DevOps Tools",
      experience: "3+ years",
      items: [
        { name: "Jenkins", level: 80 },
        { name: "CI/CD", level: 70 },
        { name: "GitHub Actions", level: 60 },
        { name: "Grafana", level: 55 },
        { name: "Git", level: 75 },
      ],
    },
    {
      group: "Web Dev",
      experience: "2+ years",
      items: [
        { name: "JavaScript", level: 70 },
        { name: "React", level: 65 },
        { name: "Next.js", level: 55 },
        { name: "Node.js", level: 65 },
        { name: "Express.js", level: 60 },
        { name: "Redux", level: 50 },
        { name: "Tailwind", level: 70 },
      ],
    },
    {
      group: "Database",
      experience: "2+ years",
      items: [
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 60 },
        { name: "NoSQL", level: 55 },
      ],
    },
    {
      group: "Vibe Coding",
      experience: "AI-assisted",
      items: [
        { name: "Claude Code" },
        { name: "Codex" },
        { name: "Pi" },
        { name: "OpenClaw" },
        { name: "Hermes" },
      ],
    },
  ] satisfies SkillGroup[],
  experience: [
    {
      company: "Synlex.Tech",
      current: true,
      roles: [{ title: "Software Development Engineer", start: "Jan 2025", end: "Present", icon: "code" }],
    },
    {
      company: "Codxia.com",
      locationType: "Remote",
      roles: [{ title: "Software Engineer", start: "Jan 2024", end: "Dec 2024", icon: "code" }],
    },
    {
      company: "Techme24x7",
      location: "Faridabad, India",
      roles: [
        { title: "DevOps Engineer", start: "May 2022", end: "Jun 2023", icon: "layers" },
        { title: "DevOps Intern", start: "Feb 2022", end: "May 2022", icon: "layers" },
      ],
    },
  ] satisfies Job[],
  education: [
    { institution: "IGNOU – New Delhi", degree: "Master of Computer Application", start: "2024", end: "2026" },
    { institution: "IGNOU – New Delhi", degree: "Bachelor of Computer Application", start: "2019", end: "2023" },
    { institution: "NIIT – New Delhi", degree: "Diploma", field: "Software Engineering", start: "2019", end: "2022" },
  ] satisfies Degree[],
  projects: [
    {
      title: "Synergetic",
      description:
        "Movie purchase platform with infinite scroll, real-time notifications, and responsive carousel.",
      tags: ["Next.js", "React", "Axios"],
      url: "https://www.synergetic.film/",
      icon: "clapperboard",
      image: { src: "/images/projects/synergetic.png", width: 1908, height: 933 },
    },
    {
      title: "Scarenetwork.tv",
      description:
        "Web OTT platform with S3 video uploads and AWS MediaConvert transcoding to multiple formats.",
      tags: ["Node.js", "Express", "AWS S3", "CloudFront", "MediaConvert"],
      url: "https://www.scarenetwork.tv/",
      icon: "tv",
      image: { src: "/images/projects/scarenetwork.png", width: 1908, height: 933 },
    },
  ] satisfies Project[],
  footer: {
    year: 2026,
    stack: ["next@16.4.2", "react@19.3.0", "tailwindcss@4", "lucide-react@1"],
    typeface: "Geist",
    inspiredBy: { label: "chanhdai.com", href: "https://chanhdai.com/" },
  },
};
