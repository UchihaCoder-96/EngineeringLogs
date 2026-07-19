export type Journal = {
    id: number;
    title: string;
    slug: string;
    date: Date;
    summary: string;
    tags: string[];
    projectSlug?: string;
};