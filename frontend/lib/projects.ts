import API_BASE_URL from "./api";
import { Project } from "@/types/project";
import { stripEmptyFields } from "@/utils/Utility";

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

export async function deleteProject(slug: string) {
    const response = await fetch(`${API_BASE_URL}/api/projects/${slug}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("[DELETE FETCH ERROR] Status: " + response.status);
    }
    return response;
}

export async function createProject(project: any) {
    const formattedProject = stripEmptyFields(project);

    const response = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedProject),
    });

    if (!response.ok) {
        throw new Error("[POST FETCH ERROR] Status: " + response.status);
    }

    return response;
}

export async function updateProject(
    slug: string,
    project: any
) {
    const formattedProject = stripEmptyFields(project);
    const response = await fetch(`${API_BASE_URL}/api/projects/${slug}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedProject),
    });

    if (!response.ok) {
        throw new Error("[PUT FETCH ERROR] Status: " + response.status);
    }

    return response;
}
