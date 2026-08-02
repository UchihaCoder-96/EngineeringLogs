import { notFound } from "next/navigation";
import { getJournal } from "@/lib/journals";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const journal = await getJournal(slug);

    if (!journal) {
        notFound();
    }

    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32">
                <h1 className="text-5xl font-bold">
                    {journal.title}
                </h1>

                <p className="mt-6 text-xl text-zinc-400">
                    {journal.summary}
                </p>

                <hr className="my-12 border-zinc-800" />
                <div className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
                    >
                        {journal.content}
                    </ReactMarkdown>
                </div>
            </div>
        </section>
    );
}

