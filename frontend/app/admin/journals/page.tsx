import { getJournals } from "@/lib/journals";
import JournalClient from "@/components/journal/JournalClient";

export default async function Page() {
    const journals = await getJournals();
    const isAdmin = true;

    return <JournalClient journals={journals} isAdmin={isAdmin} />;
}
