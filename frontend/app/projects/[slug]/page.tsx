import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
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

    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32">
                <h1 className="text-5xl font-bold">
                {project.title}
            </h1>

            <p className="mt-6 text-xl text-zinc-400">
                {project.shortDescription}
            </p>

            <hr className="my-12 border-zinc-800" />
                <div className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
                    >
                        {project.content}
                    </ReactMarkdown>
                </div>
            </div>
        </section>
    );
}
