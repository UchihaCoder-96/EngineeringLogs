"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import ProjectForm from "@/components/projects/ProjectForm";
import { Project, CreateProjectRequest } from "@/types/project";

import { getProject, updateProject } from "@/lib/projects";

export default function Page() {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter();

    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProject() {
            try {
                const data = await getProject(slug);

                setProject(data);
            } catch {
                alert("Failed to load project.");
            } finally {
                setLoading(false);
            }
        }

        loadProject();
    }, [slug]);

    async function editProject(updatedProject: CreateProjectRequest) {
        const response = await updateProject(slug, updatedProject);

        if (!response.ok) {
            alert("Failed to update project.");
            return;
        }

        router.push("/admin/projects");
    }

    if (loading) {
        return (
            <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <p className="text-zinc-400">Loading...</p>
            </section>
        );
    }

    if (!project) {
        return (
            <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <p className="text-red-400">Project not found.</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-zinc-950 text-white">

            <div className="mx-auto max-w-5xl px-6 py-20">

                <h1 className="text-4xl font-bold">
                    Edit Project
                </h1>

                <p className="mt-3 text-zinc-400">
                    Update your project information.
                </p>

                <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                    <ProjectForm
                        initialData={project}
                        submitText="Save Changes"
                        onSubmit={editProject}
                    />

                </div>

            </div>

        </section>
    );
}