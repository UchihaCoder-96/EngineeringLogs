import { Journal } from "@/types/journal";

export default function JournalCard(
    { journal }: {
        journal: Journal;
    }
) {
    return (
        <div className="bg-zinc-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-white">{journal.title}</h3>
            <p className="mt-2 text-zinc-300">{journal.summary}</p>
            <p className="mt-2 text-sm text-zinc-400">
                {journal.date.toLocaleDateString()}
            </p>
        </div>
    );
}