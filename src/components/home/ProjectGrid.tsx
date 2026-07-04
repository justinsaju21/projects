import { ProjectGridClient } from "./ProjectGridClient";
import { getProjects } from "@/lib/sheets";
import type { Project } from "@/types";

export async function ProjectGrid({ limit, hideSearch = false }: { limit?: number; hideSearch?: boolean }) {
  let projects: Project[] = [];

  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Failed to fetch projects for grid", error);
  }

  if (limit) {
    projects = projects.slice(0, limit);
  }

  return <ProjectGridClient projects={projects} hideSearch={hideSearch} />;
}
