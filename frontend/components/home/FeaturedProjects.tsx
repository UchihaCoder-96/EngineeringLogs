import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/types/project";

export default async function FeaturedProjects() {
    let projects: Project[] = [];

    try {
        projects = await getProjects();
    } catch (error) {
        console.error("Failed to load featured projects:", error);
        return null;
    }

    const featuredProjects = projects
        .filter((project) => (project.featuredOrder ?? 0) > 0)
        .sort((a, b) => a.featuredOrder! - b.featuredOrder!);

    if (featuredProjects.length === 0) {
        return null;
    }

    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-24">

                <div className="mb-10 flex items-end justify-between">
                    <div>
                        <h2 className="text-3xl font-bold">
                            Featured Projects
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            Some of my most important engineering projects.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {featuredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            variant="compact"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
