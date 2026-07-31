"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import JournalForm from "@/components/journal/JournalForm";

import { Journal } from "@/types/journal";
import { Project } from "@/types/project";

import { getProjects } from "@/lib/projects";
import { getJournal, updateJournal } from "@/lib/journals";

export default function Page() {
    const { slug } = useParams<{ slug: string }>();
    const router = useRouter();

    const [journal, setJournal] = useState<Journal | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
    try {
        console.log("Loading journal:", slug);

        const journalData = await getJournal(slug);

        console.log("Journal loaded:");
        console.log(journalData);

        setJournal(journalData);
    }
    catch (error) {
        console.error("[GET JOURNAL ERROR]");
        console.error(error);

        alert("Failed to load journal.");
        return;
    }

    try {
        console.log("Loading projects...");

        const projectData = await getProjects();

        console.log("Projects loaded:");
        console.log(projectData);

        setProjects(projectData);
    }
    catch (error) {
        console.error("[GET PROJECTS ERROR]");
        console.error(error);

        alert("Failed to load projects.");
        return;
    }

    setLoading(false);
}

        loadData();
    }, [slug]);

    async function editJournal(updatedJournal: any) {
        const response = await updateJournal(slug, updatedJournal);

        if (!response.ok) {
            alert("Failed to update journal.");
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

    if (!journal) {
        return (
            <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <p className="text-red-400">Journal not found.</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-5xl px-6 py-20">

                <h1 className="text-4xl font-bold">
                    Edit Journal
                </h1>

                <p className="mt-3 text-zinc-400">
                    Update your journal entry.
                </p>

                <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

                    <JournalForm
                        projects={projects}
                        initialData={journal}
                        submitText="Save Changes"
                        onSubmit={editJournal}
                    />

                </div>

            </div>
        </section>
    );
}

