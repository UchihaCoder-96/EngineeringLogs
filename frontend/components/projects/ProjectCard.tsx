import Link from "next/link";
import Image from "next/image";

import { Project } from "@/types/project";
import { formatEnums } from "@/utils/Utility";
import { EyeIcon } from "lucide-react";

export default function ProjectCard({
    project,
    variant = "compact",
    showDescription = true,
}: {
    project: Project;
    variant?: "compact" | "full";
    showDescription?: boolean;
}) {
    const technologies =
        variant === "compact"
            ? project.technologies.slice(0, 4)
            : project.technologies;

    const remainingTechnologies =
        project.technologies.length - technologies.length;

    const compact = variant === "compact";

    return (
        <article
            className={`group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10 ${
                compact ? "flex h-full flex-col" : ""
            }`}
        >
            <Link
                href={`/projects/${project.slug}`}
                className={compact ? "flex h-full flex-col" : "block"}
            >
                <div className="relative aspect-video overflow-hidden bg-zinc-800">
                    {project.thumbnail ? (
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-zinc-600">
                            No Thumbnail
                        </div>
                    )}
                </div>

                <div
                    className={`p-6 ${
                        compact ? "flex flex-1 flex-col" : ""
                    }`}
                >
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-blue-400">
                        {formatEnums(project.category)}
                    </span>

                    <h3
                        className={`mt-3 font-bold text-white transition-colors group-hover:text-blue-400 ${
                            compact
                                ? "line-clamp-2 min-h-[4rem] text-3xl"
                                : "text-3xl"
                        }`}
                    >
                        {project.title}
                    </h3>

                    {showDescription && (
                        <p
                            className={`mt-4 text-zinc-400 ${
                                compact
                                    ? "line-clamp-2 min-h-[3.5rem]"
                                    : "leading-7"
                            }`}
                        >
                            {project.shortDescription}
                        </p>
                    )}

                    <div
                        className={`mt-5 flex flex-wrap gap-2 ${
                            compact ? "min-h-[2.25rem]" : ""
                        }`}
                    >
                        {technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                            >
                                {tech}
                            </span>
                        ))}

                        {compact && remainingTechnologies > 0 && (
                            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                                +{remainingTechnologies}
                            </span>
                        )}
                    </div>

                    {compact && <div className="flex-1" />}

                    <div className="mt-6 border-t border-zinc-800 pt-5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                        project.status === "Completed"
                                            ? "bg-green-500/15 text-green-400"
                                            : project.status === "InProgress"
                                            ? "bg-yellow-500/15 text-yellow-400"
                                            : "bg-blue-500/15 text-blue-400"
                                    }`}
                                >
                                    {formatEnums(project.status)}
                                </span>

                                {!compact && (
                                    <span className="text-sm text-zinc-500">
                                        {formatEnums(project.difficulty)}
                                    </span>
                                )}
                            </div>

                            <span className="text-sm text-zinc-500">
                            <EyeIcon className="inline-block h-4 w-4" /> &emsp;
                            {project.viewCount}
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}

