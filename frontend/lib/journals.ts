import API_BASE_URL from "./api";
import { Journal } from "@/types/journal";

export async function getJournals(): Promise<Journal[]> {
    const response = await fetch(`${API_BASE_URL}/api/journals`);

    if (!response.ok) {
        throw new Error("Failed to fetch journals");
    }

    return response.json();
}

export async function getJournal(slug: string): Promise<Journal> {
    const response = await fetch(`${API_BASE_URL}/api/journals/${slug}`);

    if (!response.ok) {
        throw new Error("Failed to fetch journal");
    }

    return response.json();
}
