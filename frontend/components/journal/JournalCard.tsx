import Link from "next/link";
import { Journal } from "@/types/journal";

export default function JournalCard({
    journal,
}: {
    journal: Journal;
}) {
    return (
        <Link href={`/journal/${journal.slug}`}>
            <article className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">

                <div className="flex flex-wrap items-center justify-between gap-3">

                    <time className="text-sm font-medium text-zinc-500">
                        {journal.date.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                        })}
                    </time>

                    {journal.projectSlug && (
                        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                            Linked Project
                        </span>
                    )}

                </div>

                <h2 className="mt-4 text-2xl font-semibold text-white transition-colors group-hover:text-blue-400">
                    {journal.title}
                </h2>

                <p className="mt-3 leading-7 text-zinc-400">
                    {journal.summary}
                </p>

                {journal.tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                        {journal.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-5">

                    <span className="text-sm text-zinc-500">
                        Developer Journal
                    </span>

                    <span className="text-sm font-medium text-blue-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        Read →
                    </span>

                </div>

            </article>
        </Link>
    );
}