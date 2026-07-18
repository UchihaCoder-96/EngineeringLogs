import { Project } from "@/types/project";

export default function ProjectCard(
    { project, variant = "compact", showDescription = true }: {
        project: Project;
        variant?: "full" | "compact";
        showDescription?: boolean;
    }
) {
    return (
        <div className="bg-zinc-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            {showDescription && (
                <p className="mt-2 text-zinc-300">{project.shortDescription}</p>
            )}
            {variant === "full" && (
                <p className="mt-2 text-sm text-zinc-400">
                    {project.technologies.join(", ")}
                </p>
            )}
            <p className="mt-2 text-sm text-zinc-400">
                <b>Status:</b> {project.status} {variant === "full" && ( <span> &bull; <b>Difficulty:</b> {project.difficulty}</span>)} &bull; <b>Views:</b> {project.viewCount}
            </p>
        </div>
    );
}