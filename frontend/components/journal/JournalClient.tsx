"use client";

import { useState } from "react";
import JournalCard from "@/components/journal/JournalCard";
import { Journal } from "@/types/journal";

type JournalClientProps = {
    journals: Journal[];
};

export default function JournalClient({
    journals,
}: JournalClientProps) {
    const [query, setQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("All");

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

    return (
        <section className="min-h-screen bg-zinc-950 text-white">
            <div className="mx-auto max-w-5xl px-6 py-20">

                <div className="text-center">

                    <h1 className="text-5xl font-bold">
                        Developer Journal
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
                        A raw engineering log documenting what I build,
                        what breaks, and what I learn every day.
                    </p>

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
                            <>
                                <JournalCard
                                    key={journal.id}
                                    journal={journal} />
                                <br />
                            </>
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
        </section>
    );
}