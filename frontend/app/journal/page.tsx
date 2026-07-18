import JournalCard from "@/components/journal/JournalCard";
import { journals } from "@/data/journal";

export default function Page() {
    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    My Journals
                </h1>
                <p className="mt-4 text-lg text-zinc-300">
                    A collection of my journal entries, showcasing my thoughts and learning journey.
                </p>
                <div className="py-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                    {journals.map((journal) => (
                        <JournalCard journal={journal} key={journal.id} />
                    ))}
                </div>
            </div>
        </section>
    );
}