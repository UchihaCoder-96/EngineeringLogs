import { getJournals } from "@/lib/journals";
import JournalsClient from "@/components/journal/JournalsClient";

export default async function Page() {
    const journals = await getJournals();
    const isAdmin = true;

    return <JournalsClient journals={journals} isAdmin={isAdmin} />;
}
