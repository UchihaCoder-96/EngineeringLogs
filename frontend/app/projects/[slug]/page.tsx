import ProjectClient from "@/components/projects/ProjectClient";
import { getProject } from "@/lib/projects";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProject(slug);

    return <ProjectClient project={project} />;
}
