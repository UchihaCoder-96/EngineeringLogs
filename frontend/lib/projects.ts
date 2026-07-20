import API_BASE_URL from "./api";
import { Project } from "@/types/project";

export async function getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/api/projects`);

    if (!response.ok) {
        throw new Error("Failed to fetch projects");
    }

    return response.json();
}

export async function getProject(slug: string): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/api/projects/${slug}`);

    if (!response.ok) {
        throw new Error("Failed to fetch project");
    }

    return response.json();
}
