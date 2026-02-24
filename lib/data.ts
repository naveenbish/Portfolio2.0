// ─── Types ───────────────────────────────────────────────────────────────────

export interface SocialLink {
  name: string
  url: string
  icon: string // lucide-react icon name
}

export interface Skill {
  name: string
  level: number // 0-100
}

export interface SkillCategory {
  title: string
  icon: string // lucide-react icon name
  experience: string
  skills: Skill[]
}

export interface QualificationItem {
  title: string
  subtitle: string
  period: string
}

export interface Project {
  title: string
  description: string
  image: string // path relative to /public
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  category: "fullstack" | "frontend"
}

export interface ContactInfo {
  icon: string
  title: string
  value: string
  href?: string
}

export interface PortfolioData {
  personal: {
    name: string
    title: string
    subtitle: string
    tagline: string
    brand: string
    domain: string
    bio: string
    experienceYears: string
    profileImage: string
    aboutImage: string
    resumeUrl: string
  }
  socials: SocialLink[]
  skills: SkillCategory[]
  qualification: {
    education: QualificationItem[]
    work: QualificationItem[]
  }
  projects: Project[]
  contact: {
    info: ContactInfo[]
    formAction: string
  }
  footer: {
    brand: string
    subtitle: string
  }
  stats: { label: string; value: number; suffix: string }[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const portfolioData: PortfolioData = {
  personal: {
    name: "Naveen Bisht",
    title: "DevOps + Web Dev",
    subtitle: "Software Engineer",
    tagline: "Building reliable systems and modern web experiences.",
    brand: "ErrorOp",
    domain: "errorop.com",
    bio: "DevOps Engineer turned Software Engineer with 3+ years of experience. Skilled in AWS, CI/CD pipelines, Docker, Grafana monitoring, and the MERN stack. Currently building full-stack web applications and managing cloud infrastructure at Codxia.",
    experienceYears: "3+",
    profileImage: "/images/profile.png",
    aboutImage: "/images/about.jpg",
    resumeUrl: "/pdf/resume.pdf",
  },

  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/naveen-bisht-775410221",
      icon: "Linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/naveenbish",
      icon: "Github",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/errorop003",
      icon: "Instagram",
    },
  ],

  skills: [
    {
      title: "Cloud",
      icon: "Cloud",
      experience: "3+ years",
      skills: [
        { name: "AWS", level: 90 },
        { name: "Docker", level: 40 },
        { name: "E2E Networks", level: 60 },
        { name: "Yotta", level: 50 },
      ],
    },
    {
      title: "DevOps Tools",
      icon: "Settings",
      experience: "3+ years",
      skills: [
        { name: "Jenkins", level: 80 },
        { name: "CI/CD", level: 70 },
        { name: "GitHub Actions", level: 60 },
        { name: "Grafana", level: 55 },
        { name: "Git", level: 75 },
      ],
    },
    {
      title: "Web Dev",
      icon: "Code",
      experience: "2+ years",
      skills: [
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
      title: "Database",
      icon: "Database",
      experience: "2+ years",
      skills: [
        { name: "MySQL", level: 80 },
        { name: "MongoDB", level: 60 },
        { name: "NoSQL", level: 55 },
      ],
    },
    {
      title: "Vibe Coding",
      icon: "Sparkles",
      experience: "AI-assisted",
      skills: [
        { name: "Claude Code (Opus 4.6)", level: 90 },
        { name: "Gemini Studio + Claude", level: 80 },
        { name: "ChatGPT", level: 75 },
        { name: "Kimi K2/K5 (OpenClaw)", level: 65 },
        { name: "Veo 3.1 (AI Video)", level: 60 },
        { name: "Nano Banana (AI Image)", level: 55 },
        { name: "Claude + Remotion", level: 70 },
      ],
    },
  ],

  qualification: {
    education: [
      {
        title: "Master of Computer Application",
        subtitle: "IGNOU - New Delhi",
        period: "2024 - Present",
      },
      {
        title: "Bachelor of Computer Application",
        subtitle: "IGNOU - New Delhi",
        period: "2019 - 2023",
      },
      {
        title: "Diploma (Software Engineering)",
        subtitle: "NIIT - New Delhi",
        period: "2019 - 2022",
      },
    ],
    work: [
      {
        title: "Software Development Engineer",
        subtitle: "Synlex.Tech",
        period: "Jan 2025 - Present",
      },
      {
        title: "Software Engineer",
        subtitle: "Codxia.com - Remote",
        period: "Jan 2024 - Dec 2024",
      },
      {
        title: "DevOps Engineer",
        subtitle: "Techme24x7 - Faridabad",
        period: "May 2022 - Jun 2023",
      },
      {
        title: "DevOps Intern",
        subtitle: "Techme24x7 - Faridabad",
        period: "Feb 2022 - May 2022",
      },
    ],
  },

  projects: [
    {
      title: "Synergetic",
      description: "Movie purchase platform with infinite scroll, real-time notifications, and responsive carousel.",
      image: "/images/projects/synergetic.png",
      tags: ["Next.js", "React", "Axios"],
      liveUrl: "https://www.synergetic.film/",
      category: "fullstack",
    },
    {
      title: "Scarenetwork.tv",
      description: "Web OTT platform with S3 video uploads and AWS MediaConvert transcoding to multiple formats.",
      image: "/images/projects/scarenetwork.png",
      tags: ["Node.js", "Express", "AWS S3", "CloudFront", "MediaConvert"],
      liveUrl: "https://www.scarenetwork.tv/",
      category: "fullstack",
    },
  ],

  contact: {
    info: [
      {
        icon: "Phone",
        title: "Call Me",
        value: "+91 95995 08607",
        href: "tel:+919599508607",
      },
      {
        icon: "Mail",
        title: "Email",
        value: "bishtnitin003@gmail.com",
        href: "mailto:bishtnitin003@gmail.com",
      },
      {
        icon: "MapPin",
        title: "Location",
        value: "New Delhi, India",
      },
    ],
    formAction: "/api/contact",
  },

  footer: {
    brand: "ErrorOp",
    subtitle: "DevOps + Web Dev",
  },

  stats: [
    { label: "Projects Completed", value: 2, suffix: "+" },
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Technologies", value: 20, suffix: "+" },
  ],
}
