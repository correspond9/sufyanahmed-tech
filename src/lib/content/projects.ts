import fs from "fs";
import path from "path";
import type { Project } from "./types";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export function getProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".json"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    return JSON.parse(raw) as Project;
  });

  return projects.sort((a, b) => a.name.localeCompare(b.name));
}

export function getProjectBySlug(slug: string): Project | null {
  return getProjects().find((p) => p.id === slug) ?? null;
}

export function getProjectSlugs(): string[] {
  return getProjects().map((p) => p.id);
}
