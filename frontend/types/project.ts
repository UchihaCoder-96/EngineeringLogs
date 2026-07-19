export type ProjectStatus =
    | "Planned"
    | "In Progress"
    | "Completed";

export type ProjectDifficulty =
    | "Beginner"
    | "Intermediate"
    | "Advanced";

export type ProjectCategory =
    | "Robotics"
    | "Electronics"
    | "Computer Science"
    | "Game Development"
    | "Web Development";

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
    category: ProjectCategory;
    difficulty: ProjectDifficulty;
    viewCount: number;
    slug: string;
};