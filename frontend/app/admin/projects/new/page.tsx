"use client";

import { useRouter } from "next/navigation";

import ProjectForm from "@/components/projects/ProjectForm";
import { createProject }  from '@/lib/projects';

export default function Page() {
    const router = useRouter();

    async function addProject(project: any) {
        const response = await createProject(project);

        if (!response.ok) {
            alert("Failed to create project.");
            return;
        }

        router.push("/admin/projects");
    }

    return (
        <section className="min-h-screen bg-zinc-950 text-white">

            <div className="mx-auto max-w-5xl px-6 py-20">

                <h1 className="text-4xl font-bold">
                    Create Project
                </h1>

                <p className="mt-3 text-zinc-400">
                    Add a new engineering project to your portfolio.
                </p>

                <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                    <ProjectForm
                        submitText="Create Project"
                        onSubmit={addProject}
                    />

                </div>

            </div>

        </section>
    );
}
