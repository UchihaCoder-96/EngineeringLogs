import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
    const featuredProjects = projects
        .filter((project) => project.featuredOrder !== undefined)
        .sort((a, b) => (a.featuredOrder! - b.featuredOrder!));
    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl text-left px-6">
                    Featured Projects
                </h1>
                <div className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {featuredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} variant="compact" />
                    ))}
                </div>
            </div>
        </section>
    );
}