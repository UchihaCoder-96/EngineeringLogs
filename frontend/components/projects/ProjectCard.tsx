import Link from "next/link";
import { Project } from "@/types/project";
import { formatEnums } from "@/utils/Utility";

export default function ProjectCard({
    project,
    variant = "compact",
    showDescription = true,
}: {
    project: Project;
    variant?: "full" | "compact";
    showDescription?: boolean;
}) {
    return (
        <Link href={`/projects/${project.slug}`}>
            <article className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10">

                <div className="aspect-video bg-zinc-800 flex items-center justify-center text-zinc-500">
                    Image Placeholder
                </div>

                <div className="p-6">

                    <span className="text-xs uppercase tracking-wider text-blue-400">
                        {formatEnums(project.category)}
                    </span>

                    <h3 className="mt-2 text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                    </h3>

                    {showDescription && (
                        <p className="mt-3 text-zinc-400 leading-7">
                            {project.shortDescription}
                        </p>
                    )}

                    {/* Technologies */}
                    <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800 pt-5">

                        <div className="flex items-center gap-2">

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    project.status === "Completed"
                                        ? "bg-green-500/15 text-green-400"
                                        : formatEnums(project.status) === "In Progress"
                                        ? "bg-yellow-500/15 text-yellow-400"
                                        : "bg-blue-500/15 text-blue-400"
                                }`}
                            >
                                {formatEnums(project.status)}
                            </span>

                            {variant === "full" && (
                                <span className="text-sm text-zinc-500">
                                    {formatEnums(project.difficulty)}
                                </span>
                            )}
                        </div>

                        <span className="text-sm text-zinc-500">
                            👁 {project.viewCount}
                        </span>

                    </div>
                </div>
            </article>
        </Link>
    );
}