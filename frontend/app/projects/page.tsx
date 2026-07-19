"use client";

import { useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export default function Page() {
    const [query, setSearchQuery] = useState("");

    const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    My Projects
                </h1>

                <p className="mt-4 text-lg text-zinc-300">
                    A collection of my projects, showcasing my skills and learning journey.
                </p>

                <div className="mt-6">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="w-full rounded-2xl bg-zinc-800 px-4 py-3 text-zinc-300 placeholder:text-zinc-500 border border-zinc-600 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                        value={query}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="py-6 grid gap-6">
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            variant="full"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}