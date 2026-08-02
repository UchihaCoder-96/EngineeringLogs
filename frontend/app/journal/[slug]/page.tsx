import JournalClient from "@/components/journal/JournalClient";
import { getJournal } from "@/lib/journals";
import type { Metadata } from "next";
import Script from "next/script";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const journal = await getJournal(slug);

     return (
        <>
            <Script
                id="journal-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TechArticle",
                        headline: journal.title,
                        description: journal.summary,
                        author: {
                            "@type": "Person",
                            name: "Uwuchiha san",
                        },
                    }),
                }}
            />

            <JournalClient journal={journal} />
        </>
    );
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {

    const { slug } = await params;
    const journal = await getJournal(slug);

    if (!journal) {
        return {
            title: "Journal Not Found",
        };
    }

    return {

        title: journal.title,

        description: journal.summary,

        keywords: [
            journal.tags.map((tag) => tag).join(", "),
        ],

        openGraph: {

            title: journal.title,

            description: journal.summary,

            type: "article",

        },

        twitter: {

            card: "summary_large_image",

            title: journal.title,

            description: journal.summary,

        },

    };
}
