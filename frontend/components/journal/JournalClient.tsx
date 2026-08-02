"use client";

import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";

import API_BASE_URL from "@/lib/api";

import { useEffect } from "react";

export default function JournalClient({
    journal,
}: {
    journal: any;
}) {
    if (!journal) {
        notFound();
    }

    useEffect(() => {
        async function addView() {
            const key = `viewed-${journal.slug}`;

            if (localStorage.getItem(key)) {
                return;
            }

            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/journals/${journal.slug}/view`,
                    {
                        method: "POST",
                    }
                );

                if (response.ok) {
                    localStorage.setItem(key, "true");
                }
            } catch (err) {
                console.error("Failed to record view:", err);
            }
        }

        addView();
    }, [journal.slug]);

    const words = journal.content
        .split(/\s+/)
        .filter(Boolean).length;

    const readingTime = Math.max(
        1,
        Math.ceil(words / 200)
    );

    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32">

                <div className="space-y-8">

                    <div className="flex flex-wrap gap-3">

                        <span className="rounded-full border border-sky-500/40 bg-sky-500/10 px-4 py-1 text-sm text-sky-300">
                            Journal Entry
                        </span>

                        {journal.projectSlug && (
                            <span className="rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1 text-sm text-violet-300">
                                Linked Project
                            </span>
                        )}

                    </div>

                    <h1 className="text-5xl font-extrabold tracking-tight">
                        {journal.title}
                    </h1>

                    <p className="max-w-3xl text-xl leading-8 text-zinc-400">
                        {journal.summary}
                    </p>

                    <div className="grid gap-4 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 md:grid-cols-4">

                        <div>
                            <p className="text-sm text-zinc-500">
                                Reading Time
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                                {readingTime} min
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">
                                Views
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                                {journal.viewCount}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">
                                Published
                            </p>

                            <p className="mt-1 text-lg font-semibold">
                                {new Date(journal.date).toLocaleDateString('en-US')}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">
                                Related Project
                            </p>

                            <p className="mt-1 text-lg font-semibold break-all">
                                {journal.projectSlug ?? "Standalone Journal"}
                            </p>
                        </div>

                    </div>

                    {journal.tags.length > 0 && (
                        <div>

                            <p className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
                                Tags
                            </p>

                            <div className="flex flex-wrap gap-2">

                                {journal.tags.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300"
                                    >
                                        {tag}
                                    </span>
                                ))}

                            </div>

                        </div>
                    )}

                </div>

                <hr className="my-14 border-zinc-800" />

                <article className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-28 prose-img:rounded-xl prose-pre:rounded-2xl prose-pre:border prose-pre:border-zinc-800 prose-code:text-blue-300 prose-a:text-blue-400 hover:prose-a:text-blue-300">

                    <ReactMarkdown
                        remarkPlugins={[
                            remarkGfm,
                            remarkMath,
                        ]}
                        rehypePlugins={[
                            rehypeRaw,
                            rehypeHighlight,
                            rehypeKatex,
                        ]}
                    >
                        {journal.content}
                    </ReactMarkdown>

                </article>

            </div>
        </section>
    );
}

