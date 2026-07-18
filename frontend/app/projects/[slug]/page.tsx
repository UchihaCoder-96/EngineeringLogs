import { projects } from "@/data/projects";
import { notFound } from "next/navigation";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <section className="bg-zinc-950 text-white">
            <div className="mx-auto max-w-6xl px-6 py-32 text-center">
                <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
                    {project.title}
                </h1>
                <div className="mt-6 text-lg text-zinc-300">
                    <p>{project.shortDescription}</p>
                </div>
            </div>
        </section>
    );
}