"use client";

import { useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import {
    ProjectCategory,
    ProjectDifficulty,
    ProjectStatus,
} from "@/types/project";

export default function Page() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<ProjectCategory | "all">("all");
    const [status, setStatus] = useState<ProjectStatus | "all">("all");
    const [difficulty, setDifficulty] = useState<ProjectDifficulty | "all">("all");

    const filteredProjects = projects.filter((project) => {
        const matchesQueryTitle = project.title.toLowerCase().includes(query.toLowerCase());
        const matchesQueryDescription = project.shortDescription.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "all" || project.category === category;
        const matchesStatus = status === "all" || project.status === status;
        const matchesDifficulty = difficulty === "all" || project.difficulty === difficulty;
        return (matchesQueryTitle || matchesQueryDescription) && matchesCategory && matchesStatus && matchesDifficulty;
    });

    const categories = Array.from(
        new Set(projects.map((p) => p.category))
    ).sort();
    const statuses = Array.from(
        new Set(projects.map((p) => p.status))
    );
    const difficulties = Array.from(
        new Set(projects.map((p) => p.difficulty))
    );


    return (
        <section className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-5xl px-6 py-20">

                <div className="text-center">
                    <h1 className="text-5xl font-bold tracking-tight">
                        My Projects
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
                        A collection of engineering projects documenting my learning,
                        experiments and ideas.
                    </p>
                </div>

                <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur">

                    <div className="flex flex-col gap-4 lg:flex-row">

                        <input
                            type="text"
                            placeholder="🔍 Search projects..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="
                        flex-1
                        rounded-xl
                        border
                        border-zinc-700
                        bg-zinc-950
                        px-5
                        py-3
                        text-white
                        placeholder:text-zinc-500
                        transition
                        focus:border-blue-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500/30
                    "
                        />

                        <button
                            onClick={() => {
                                setQuery("");
                                setCategory("all");
                                setStatus("all");
                                setDifficulty("all");
                            }}
                            className="
                        rounded-xl
                        border
                        border-zinc-700
                        bg-zinc-800
                        px-6
                        py-3
                        text-zinc-300
                        transition
                        hover:bg-zinc-700
                    "
                        >
                            Reset Filters
                        </button>

                    </div>

                    <div className="mt-6 grid gap-5 md:grid-cols-3">

                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                Category
                            </p>

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value as ProjectCategory | "all")
                                }
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="all">All Categories</option>

                                {categories.map((category) => (
                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                Status
                            </p>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as ProjectStatus | "all")
                                }
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="all">All Status</option>

                                {statuses.map((status) => (
                                    <option
                                        key={status}
                                        value={status}
                                    >
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                                Difficulty
                            </p>

                            <select
                                value={difficulty}
                                onChange={(e) =>
                                    setDifficulty(e.target.value as ProjectDifficulty | "all")
                                }
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                            >
                                <option value="all">All Difficulties</option>

                                {difficulties.map((difficulty) => (
                                    <option
                                        key={difficulty}
                                        value={difficulty}
                                    >
                                        {difficulty}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                </div>

                <div className="mt-8 flex items-center justify-between mt-8 border-b border-zinc-800 pb-4">

                    <p className="text-sm text-zinc-500">
                        Showing{" "}
                        <span className="font-semibold text-white">
                            {filteredProjects.length}
                        </span>{" "}
                        project{filteredProjects.length !== 1 && "s"}
                    </p>

                </div>

                <div className="mt-6 grid gap-8">

                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                variant="full"
                            />
                        ))
                    ) : (
                        <div className="rounded-3xl border border-dashed border-zinc-800 py-20 text-center">
                            <h3 className="text-xl font-semibold">
                                No projects found
                            </h3>

                            <p className="mt-2 text-zinc-500">
                                Try changing the search or filter options.
                            </p>
                        </div>
                    )}

                </div>

            </div>
        </section>
    );
}