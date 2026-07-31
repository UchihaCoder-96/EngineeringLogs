"use client";

import { Fragment, useState } from "react";
import JournalCard from "@/components/journal/JournalCard";
import { Journal } from "@/types/journal";
import { deleteJournal } from "@/lib/journals";
import Link from "next/dist/client/link";

type JournalClientProps = {
    journals: Journal[];
};

export default function JournalClient({
    journals,
    isAdmin = false
}: JournalClientProps & { isAdmin?: boolean }) {
    const [query, setQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");
    const [journalToDelete, setJournalToDelete] = useState<string | null>(null);
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

    const tags = [
        "All",
        ...Array.from(
            new Set(journals.flatMap((journal) => journal.tags))
        ).sort(),
    ];

    const filteredJournals = journals
        .filter((journal) => {
            const matchesSearch =
                journal.title.toLowerCase().includes(query.toLowerCase()) ||
                journal.summary.toLowerCase().includes(query.toLowerCase()) ||
                journal.tags.some((tag) =>
                    tag.toLowerCase().includes(query.toLowerCase())
                );

            const matchesTag =
                selectedTag === "All" ||
                journal.tags.includes(selectedTag);

            return matchesSearch && matchesTag;
        })
        .sort(
            (a, b) =>
                b.date.getTime() - a.date.getTime()
        );


    async function handleDelete() {
        if (!journalToDelete) return;
        setIsDeleting(true);
        try {
            await deleteJournal(journalToDelete);

            setDialog({
                open: true,
                title: "Journal Deleted",
                message: "The journal was deleted successfully.",
            });

            setTimeout(() => {
                window.location.reload();
            }, 1200);
        } catch (error) {
            setDialog({
                open: true,
                title: "Delete Failed",
                message: "Couldn't delete the journal. Please try again.\n [EXCEPTION] " + (error as Error).message,
            });
        } finally {
            setIsDeleting(false);
            setJournalToDelete(null);
        }
    }
    return (
        <section className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-5xl px-6 py-20">

                <div className="text-center">

                    {!isAdmin && (
                        <div>
                            <h1 className="text-5xl font-bold">
                                Developer Journal
                            </h1>

                            <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
                                A raw engineering log documenting what I build,
                                what breaks, and what I learn every day.
                            </p>
                        </div>
                    )}
                    {isAdmin && (

                        <div className="mb-10 flex flex-col gap-4 md:flex md:items-center md:justify-between">
                            <p className="mt-2 text-sm text-zinc-500">
                                You are logged in as an admin. You can edit or delete journals.
                            </p>
                            <div>
                                <h1 className="text-4xl font-bold">
                                    Manage Journals
                                </h1>

                                <p className="mt-2 text-zinc-400">
                                    Create, edit and organize your engineering journals.
                                </p>
                            </div>

                            <Link
                                href="/admin/journals/new"
                                className="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-500"
                            >
                                + New Journal
                            </Link>

                        </div>
                    )}

                </div>

                <div className="mt-12">

                    <input
                        type="text"
                        placeholder="🔍 Search journal entries..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="
                            w-full
                            rounded-xl
                            border
                            border-zinc-700
                            bg-zinc-900
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

                </div>

                <div className="mt-6 flex flex-wrap gap-3">

                    {tags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`
                                rounded-full
                                px-4
                                py-2
                                text-sm
                                transition
                                ${
                                    selectedTag === tag
                                        ? "bg-blue-600 text-white"
                                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                                }
                            `}
                        >
                            {tag}
                        </button>
                    ))}

                </div>

                <div className="mt-8 border-b border-zinc-800 pb-4">

                    <p className="text-sm text-zinc-500">
                        Showing{" "}
                        <span className="font-semibold text-white">
                            {filteredJournals.length}
                        </span>{" "}
                        {filteredJournals.length === 1
                            ? "entry"
                            : "entries"}
                    </p>

                </div>

                <div className="mt-8 space-y-8">

                    {filteredJournals.length > 0 ? (
                        filteredJournals.map((journal) => (
                            <Fragment key={journal.id}>
                                <JournalCard journal={journal} />
                                { isAdmin && (
                                    <div className="mt-3 flex gap-3">
                                        <Link
                                            href={`/admin/journals/${journal.slug}/edit`}
                                            className="rounded-xl border border-blue-500 px-5 py-2 font-medium text-blue-400 transition hover:bg-blue-500 hover:text-white"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() => setJournalToDelete(journal.slug)}
                                            className="rounded-xl border border-red-500 px-5 py-2 font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                                <br />
                            </Fragment>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-dashed border-zinc-800 py-16 text-center">

                            <h2 className="text-xl font-semibold">
                                No journal entries found
                            </h2>

                            <p className="mt-3 text-zinc-500">
                                Try a different search or tag.
                            </p>

                        </div>
                    )}

                </div>

            </div>
            {journalToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                        <h2 className="text-xl font-semibold text-white">
                            Delete Journal?
                        </h2>

                        <p className="mt-3 text-zinc-400">
                            This action cannot be undone.
                        </p>

                        <div className="mt-8 flex justify-end gap-3">

                            <button
                                onClick={() => setJournalToDelete(null)}
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
