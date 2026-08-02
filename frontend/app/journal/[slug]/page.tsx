import JournalClient from "@/components/journal/JournalClient";
import { getJournal } from "@/lib/journals";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const journal = await getJournal(slug);

    return <JournalClient journal={journal} />;
}
