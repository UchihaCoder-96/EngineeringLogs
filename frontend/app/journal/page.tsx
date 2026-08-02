import { getJournals } from "@/lib/journals";
import JournalsClient from "@/components/journal/JournalsClient";

export default async function Page() {
    const journals = await getJournals();

    return <JournalsClient journals={journals} />;
}
