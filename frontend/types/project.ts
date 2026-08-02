export const PROJECT_STATUSES = [
    "Planned",
    "InProgress",
    "Completed",
] as const;

export type ProjectStatus = typeof PROJECT_STATUSES[number];

export const PROJECT_DIFFICULTIES = [
    "Beginner",
    "Intermediate",
    "Advanced",
] as const;

export type ProjectDifficulty = typeof PROJECT_DIFFICULTIES[number];

export const PROJECT_CATEGORIES = [
    "Robotics",
    "Electronics",
    "ComputerScience",
    "GameDevelopment",
    "WebDevelopment",
] as const;

export type ProjectCategory = typeof PROJECT_CATEGORIES[number];

export type Project = {
    id: number;
    title: string;
    shortDescription: string;
    content: string;
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

export type CreateProjectRequest = {
    title: string;
    shortDescription: string;
    content: string;
    category: ProjectCategory;
    difficulty: ProjectDifficulty;
    status: ProjectStatus;
    githubUrl: string;
    demoUrl: string;
    thumbnail: string;
    technologies: string[];
};

export type UpdateProjectRequest = CreateProjectRequest;
