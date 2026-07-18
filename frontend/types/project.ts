type ProjectStatus =
    | "Planned"
    | "In Progress"
    | "Completed";

type ProjectDifficulty = 
    | "Beginner" 
    | "Intermediate" 
    | "Advanced";

export type Project = {
    id: number;
    title: string;
    shortDescription: string;
    status: ProjectStatus;
    technologies: string[];
    featuredOrder?: number;
    thumbnail: string;
    githubUrl: string;
    demoUrl: string;
    startDate?: Date;
    lastUpdated?: Date;
    category: string;
    difficulty: ProjectDifficulty;
    viewCount: number;
    slug: string;
};