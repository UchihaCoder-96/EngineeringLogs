import { getProjects } from "@/lib/projects";
import ProjectsClient from "@/components/projects/ProjectsClient";

export default async function Page() {
    const projects = await getProjects();
    const isAdmin = true;

    return <ProjectsClient  projects={projects} isAdmin={isAdmin} />;
}
