export type Journal = {
    id: number;
    title: string;
    slug: string;
    date: Date;
    summary: string;
    content: string;
    tags: string[];
    projectSlug?: string;
    viewCount: number;
};
