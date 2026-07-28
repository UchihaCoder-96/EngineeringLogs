"use client";

import { useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import { formatEnums } from "@/utils/Utility";
import {
    Project,
    ProjectCategory,
    ProjectDifficulty,
    ProjectStatus,
} from "@/types/project";
import Link from "next/dist/client/link";
import { deleteProject } from "@/lib/projects";

type ProjectsClientProps = {
    projects: Project[];
};

export default function ProjectsClient({
    projects,
    isAdmin = false,
}: ProjectsClientProps & { isAdmin?: boolean }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<ProjectCategory | "all">("all");
    const [status, setStatus] = useState<ProjectStatus | "all">("all");
    const [difficulty, setDifficulty] = useState<ProjectDifficulty | "all">("all");
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [dialog, setDialog] = useState<{
        open: boolean;
        title: string;
        message: string;
    }>({
        open: false,
        title: "",
        message: "",
    });

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


    async function handleDelete() {
        if (!projectToDelete) return;
        setIsDeleting(true);
        try {
            await deleteProject(projectToDelete);

            setDialog({
                open: true,
                title: "Project Deleted",
                message: "The project was deleted successfully.",
            });

            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch (error) {
            setDialog({
                open: true,
                title: "Delete Failed",
                message: "Couldn't delete the project. Please try again.\n [EXCEPTION] " + (error as Error).message,
            });
        } finally {
            setIsDeleting(false);
            setProjectToDelete(null);
        }
    }

    return (
        <section className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-5xl px-6 py-20">

                <div className="text-center">
                    {!isAdmin && (
                        <div>
                            <h1 className="text-5xl font-bold tracking-tight">
                                My Projects
                            </h1>

                            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
                                A collection of engineering projects documenting my learning,
                                experiments and ideas.
                            </p>
                        </div>
                    )}
                    {isAdmin && (

                        <div className="mb-10 flex flex-col gap-4 md:flex md:items-center md:justify-between">
                            <p className="mt-2 text-sm text-zinc-500">
                                You are logged in as an admin. You can edit or delete projects.
                            </p>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    Manage Projects
                                </h1>

                                <p className="mt-2 text-zinc-400">
                                    Create, edit and organize your engineering projects.
                                </p>
                            </div>

                            <Link
                                href="/admin/projects/new"
                                className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-500"
                            >
                                + New Project
                            </Link>

                        </div>
                    )}
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
                                        {formatEnums(category)}
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
                                        {formatEnums(status)}
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
                                        {formatEnums(difficulty)}
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
                            <div key={project.id}>
                                <ProjectCard
                                    project={project}
                                    variant="full"
                                />

                                { isAdmin && (
                                    <div className="mt-3 flex gap-3">
                                        <Link
                                            href={`/admin/projects/${project.slug}/edit`}
                                            className="rounded-xl border border-blue-500 px-5 py-2 font-medium text-blue-400 transition hover:bg-blue-500 hover:text-white"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => setProjectToDelete(project.slug)}
                                            className="rounded-xl border border-red-500 px-5 py-2 font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
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
            {projectToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                        <h2 className="text-xl font-semibold text-white">
                            Delete Project?
                        </h2>

                        <p className="mt-3 text-zinc-400">
                            This action cannot be undone.
                        </p>

                        <div className="mt-8 flex justify-end gap-3">

                            <button
                                onClick={() => setProjectToDelete(null)}
                                disabled={isDeleting}
                                className="rounded-xl border border-zinc-700 px-5 py-2 text-zinc-300 transition hover:bg-zinc-800"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="rounded-xl bg-red-600 px-5 py-2 text-white transition hover:bg-red-500 disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>

                        </div>

                    </div>

                </div>
            )}
            {dialog.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

                    <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">

                        <h2 className="text-xl font-semibold text-white">
                            {dialog.title}
                        </h2>

                        <p className="mt-3 text-zinc-400">
                            {dialog.message}
                        </p>

                        <button
                            onClick={() =>
                                setDialog({
                                    open: false,
                                    title: "",
                                    message: "",
                                })
                            }
                            className="mt-6 rounded-xl bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-500"
                        >
                            OK
                        </button>

                    </div>

                </div>
            )}
        </section>
    );
}
