export type ProjectStatus = "Live" | "In Progress";
export type ProjectTheme = "dark" | "light";

export interface ArchitectureLayer {
  name: string;
  tech: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
  status: ProjectStatus;
  tags: string[];
  href: string;
  linkLabel: string;
  theme: ProjectTheme;
  caseStudy: {
    challenge: string;
    solution: string;
    outcome: string;
  };
  architecture: {
    summary: string;
    layers: ArchitectureLayer[];
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  readingTime: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}
