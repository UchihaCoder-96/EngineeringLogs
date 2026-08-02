import JournalCard from "@/components/journal/JournalCard";
import { getJournals } from "@/lib/journals";
import type { Journal } from "@/types/journal";

export default async function LatestJournals() {
    const JOURNAL_COUNT = 3;

    let journals: Journal[] = [];

    try {
        journals = await getJournals();
    } catch (error) {
        console.error("Failed to load latest journals:", error);
        return null;
    }

    const latestJournals = [...journals]
        .sort(
            (a, b) =>
                new Date(b.date).getTime() -
                new Date(a.date).getTime()
        )
        .slice(0, JOURNAL_COUNT);

    if (latestJournals.length === 0) {
        return null;
    }

    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-24">

                <div className="mb-10 flex items-end justify-between">

                    <div>
                        <h2 className="text-3xl font-bold">
                            Latest Journals
                        </h2>

                        <p className="mt-2 text-zinc-400">
                            Recent progress logs, ideas, experiments and engineering updates.
                        </p>
                    </div>

                </div>

                <div className="grid gap-6">
                    {latestJournals.map((journal) => (
                        <JournalCard
                            key={journal.id}
                            journal={journal}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}

