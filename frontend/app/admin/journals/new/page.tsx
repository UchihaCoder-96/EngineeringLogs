"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import JournalForm from "@/components/journal/JournalForm";

import { Project } from "@/types/project";

import { getProjects } from "@/lib/projects";
import { createJournal } from "@/lib/journals";

export default function Page() {
    const router = useRouter();

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await getProjects();

                setProjects(data);
            } catch {
                alert("Failed to load project.");
            } finally {
                setLoading(false);
            }
        }

        loadProjects();
    }, []);

    async function addJournal(journal: any) {
        const response = await createJournal(journal);

        if (!response.ok) {
            alert("Failed to create journal.");
            return;
        }

        router.push("/admin/journals");
    }

    if (loading) {
        return (
            <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <p className="text-zinc-400">Loading...</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-5xl px-6 py-20">

                <h1 className="text-4xl font-bold">
                    Create Journal
                </h1>

                <p className="mt-3 text-zinc-400">
                    Record today's progress, ideas, or development notes.
                </p>

                <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                    <JournalForm
                        projects={projects}
                        submitText="Create Journal"
                        onSubmit={addJournal}
                    />

                </div>

            </div>
        </section>
    );
}

