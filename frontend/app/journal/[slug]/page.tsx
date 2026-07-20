//import { journals } from "@/data/journal";
import { notFound } from "next/navigation";
import { getJournal } from "@/lib/journals";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const journal = await getJournal(slug);
    // const journal = journals.find((j) => j.slug === slug);

    if (!journal) {
        notFound();
    }

    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    {journal.title}
                </h1>
                <div className="mt-6 text-lg text-zinc-300">
                    <p>{journal.summary}</p>
                </div>
            </div>
        </section>
    );
}