"use client";

import { useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export default function Page() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [difficulty, setDifficulty] = useState("all");

    const filteredProjects = projects.filter((project) => {
        const matchesQueryTitle = project.title.toLowerCase().includes(query.toLowerCase());
        const matchesQueryDescription = project.shortDescription.toLowerCase().includes(query.toLowerCase());
        const matchesCategory = category === "all" || project.category === category;
        const matchesStatus = status === "all" || project.status === status;
        const matchesDifficulty = difficulty === "all" || project.difficulty === difficulty;
        return matchesQueryTitle && matchesQueryDescription && matchesCategory && matchesStatus && matchesDifficulty;
    });

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
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="mt-2 grid gap-3 text-sm text-zinc-400 sm:grid-cols-3">
                        <label className="block">
                            <span className="text-zinc-400">Category</span>
                            <select
                                className="mt-1 w-full rounded-2xl bg-zinc-800 px-4 py-3 text-zinc-300 border border-zinc-600 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="robotics">Robotics</option>
                                <option value="web">Web Development</option>
                                <option value="computerScience">Computer Science</option>
                                <option value="electronics">Electronics</option>
                                <option value="gameDevelopment">Game Development</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-zinc-400">Status</span>
                            <select
                                className="mt-1 w-full rounded-2xl bg-zinc-800 px-4 py-3 text-zinc-300 border border-zinc-600 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="planned">Planned</option>
                                <option value="inProgress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-zinc-400">Difficulty</span>
                            <select
                                className="mt-1 w-full rounded-2xl bg-zinc-800 px-4 py-3 text-zinc-300 border border-zinc-600 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </label>
                    </div>
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